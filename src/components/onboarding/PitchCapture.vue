<template>
  <div class="pitch-capture">
    <!-- Text input -->
    <div class="input-group">
      <label for="text-pitch">Your Pitch</label>
      <textarea
        id="text-pitch"
        v-model="textPitch"
        placeholder="Type or speak your pitch..."
        class="pitch-input"
      />
    </div>

    <!-- Speech recording controls -->
    <div class="speech-section">
      <div class="speech-controls">
        <button
          @click="toggleRecording"
          :disabled="isProcessing || isUploading"
          :class="{ 'is-recording': isRecording }"
          class="record-btn"
        >
          <span v-if="isRecording" class="pulse">🎙️</span>
          <span v-else>🎙️</span>
          {{ isRecording ? 'Stop Recording' : 'Record Pitch' }}
        </button>

        <span v-if="recordingTime" class="timer">
          {{ formatTime(recordingTime) }}
        </span>

        <span v-if="isProcessing" class="processing">
          Transcribing...
        </span>

        <span v-if="isUploading" class="processing">
          Uploading audio...
        </span>
      </div>

      <!-- Live transcript during recording -->
      <div v-if="isRecording && liveTranscript" class="live-transcript">
        <p class="label">Live transcript:</p>
        <p class="text">{{ liveTranscript }}</p>
      </div>

      <!-- Playback -->
      <div v-if="audioUrl" class="playback">
        <audio :src="audioUrl" controls class="audio-player" />
        <button 
          @click="clearRecording" 
          class="clear-btn"
          :disabled="isUploading"
        >
          Clear Recording
        </button>
      </div>

      <!-- Upload status -->
      <div v-if="uploadedAudioUrl" class="upload-status">
        <p class="success-badge">✓ Audio saved</p>
      </div>

      <!-- Error message -->
      <div v-if="uploadError" class="error-message">
        {{ uploadError }}
      </div>
    </div>

    <!-- Mode indicator -->
    <div class="mode-indicator">
      <span v-if="textPitch" class="badge badge-text">Text</span>
      <span v-if="audioUrl" class="badge badge-audio">Audio</span>
      <span v-if="uploadedAudioUrl" class="badge badge-uploaded">Uploaded</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { supabase } from '@/services/supabase'

const textPitch = ref('')
const isRecording = ref(false)
const isProcessing = ref(false)
const isUploading = ref(false)
const recordingTime = ref(0)
const audioUrl = ref('')
const audioBlob = ref<Blob | null>(null)
const liveTranscript = ref('')
const uploadedAudioUrl = ref('')
const uploadError = ref('')

let mediaRecorder: MediaRecorder
let audioChunks: BlobPart[] = []
let recordingTimer: ReturnType<typeof setInterval>
let recognition: any

// Emit the audio URL to parent
const emit = defineEmits<{
  'update:modelValue': [string]
  'update:audio-url': [string]
}>()

// Watch for audio URL changes and upload
watch(audioUrl, async (newUrl) => {
  if (newUrl && audioBlob.value) {
    await uploadAudio(audioBlob.value)
  }
})

// Watch textPitch and emit to parent (v-model sync)
watch(textPitch, (newVal) => {
  console.log('[PitchCapture] textPitch updated, emitting to parent:', newVal)
  emit('update:modelValue', newVal)
}, { immediate: true })

// Initialize Web Speech API
function initSpeechRecognition() {
  const SpeechRecognition =
    window.SpeechRecognition || (window as any).webkitSpeechRecognition

  if (!SpeechRecognition) {
    alert('Web Speech API not supported in this browser')
    return null
  }

  const rec = new SpeechRecognition()
  rec.continuous = true
  rec.interimResults = true
  rec.lang = 'en-US'
  rec.maxAlternatives = 1

  rec.onstart = () => {
    console.log('[SR] Speech recognition started')
  }

  rec.onresult = (event: any) => {
    console.log('[SR] onresult fired', {
      resultIndex: event.resultIndex,
      resultsLength: event.results.length,
      isFinal: event.results[event.results.length - 1]?.isFinal
    })

    let interim = ''
    let final = ''

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript
      const confidence = event.results[i][0].confidence

      console.log(`[SR] Result ${i}: "${transcript}" (confidence: ${confidence}, isFinal: ${event.results[i].isFinal})`)

      if (event.results[i].isFinal) {
        final += transcript + ' '
      } else {
        interim += transcript
      }
    }

    const combined = (final + interim).trim()
    console.log('[SR] Combined transcript:', combined)

    // Update live transcript
    liveTranscript.value = combined

    // Update textarea with final results
    if (final.trim()) {
      textPitch.value += final
      console.log('[SR] Added to textPitch:', textPitch.value)
    }
  }

  rec.onerror = (event: any) => {
    console.error('[SR] Error:', event.error)
    
    // Log more context
    if (event.error === 'no-speech') {
      console.error('[SR] No speech detected - check microphone and speak clearly')
    } else if (event.error === 'network') {
      console.error('[SR] Network error - speech recognition requires internet')
    } else if (event.error === 'permission-denied') {
      console.error('[SR] Microphone permission denied')
    }
  }

  rec.onend = () => {
    console.log('[SR] Speech recognition ended')
    // Keep the textPitch but clear live transcript after a delay
    setTimeout(() => {
      if (!isRecording.value) {
        liveTranscript.value = ''
      }
    }, 1000)
  }

  return rec
}

async function toggleRecording() {
  if (!isRecording.value) {
    // Start recording
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
      })

      mediaRecorder = new MediaRecorder(stream)
      audioChunks = []
      liveTranscript.value = ''
      uploadError.value = ''

      mediaRecorder.ondataavailable = (e) => {
        audioChunks.push(e.data)
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunks, { type: 'audio/webm' })
        audioBlob.value = blob
        audioUrl.value = URL.createObjectURL(blob)

        clearInterval(recordingTimer)
        recordingTime.value = 0
        isProcessing.value = false

        // Stop speech recognition
        if (recognition) {
          recognition.stop()
        }
      }

      mediaRecorder.start()
      isRecording.value = true

      // Start speech recognition (fresh instance each time)
      recognition = initSpeechRecognition()

      if (recognition) {
        console.log('[toggleRecording] Starting speech recognition')
        recognition.start()
      }

      // Timer
      recordingTime.value = 0
      recordingTimer = setInterval(() => {
        recordingTime.value++
      }, 1000)
    } catch (err) {
      console.error('Error accessing microphone:', err)
      alert('Cannot access microphone. Please check permissions.')
    }
  } else {
    // Stop recording
    isProcessing.value = true
    console.log('[toggleRecording] Stopping speech recognition')
    
    // Stop both mediaRecorder and speech recognition
    mediaRecorder.stop()
    isRecording.value = false

    // Finalize any pending speech results
    if (recognition) {
      recognition.stop()
    }

    const tracks = mediaRecorder.stream.getTracks()
    tracks.forEach((track) => track.stop())

    // If there's live transcript text that hasn't been added yet, add it
    if (liveTranscript.value.trim() && !textPitch.value.includes(liveTranscript.value)) {
      textPitch.value += liveTranscript.value + ' '
      console.log('[toggleRecording] Finalized pending transcript:', textPitch.value)
    }
  }
}

async function uploadAudio(blob: Blob) {
  if (!blob) return

  isUploading.value = true
  uploadError.value = ''

  try {
    // Generate unique filename
    const timestamp = Date.now()
    const filename = `pitch-${timestamp}.webm`

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('pitch-recordings') // bucket name
      .upload(filename, blob, {
        contentType: 'audio/webm',
        upsert: false
      })

    if (error) {
      throw error
    }

    // Get public URL
    const { data: publicUrl } = supabase.storage
      .from('pitch-recordings')
      .getPublicUrl(filename)

    uploadedAudioUrl.value = publicUrl.publicUrl

    // Emit to parent component
    emit('update:audio-url', publicUrl.publicUrl)

    console.log('[pitch-capture] Audio uploaded:', publicUrl.publicUrl)
  } catch (err: any) {
    console.error('[pitch-capture] Upload failed:', err)
    uploadError.value = `Upload failed: ${err.message}`
  } finally {
    isUploading.value = false
  }
}

function clearRecording() {
  audioUrl.value = ''
  audioBlob.value = null
  uploadedAudioUrl.value = ''
  uploadError.value = ''
  liveTranscript.value = ''
  audioChunks = []
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}
</script>

<style scoped>
.pitch-capture {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: 600;
  font-size: 0.95rem;
  color: #1f2937;
}

.pitch-input {
  min-height: 120px;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.pitch-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.speech-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

.speech-controls {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.record-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: background 0.2s;
}

.record-btn:hover:not(:disabled) {
  background: #2563eb;
}

.record-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.record-btn.is-recording {
  background: #ef4444;
}

.record-btn.is-recording:hover {
  background: #dc2626;
}

.pulse {
  display: inline-block;
  animation: pulse-animation 1s infinite;
}

@keyframes pulse-animation {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.timer {
  font-size: 0.9rem;
  color: #6b7280;
  font-weight: 500;
  font-family: 'Monaco', 'Courier New', monospace;
  min-width: 45px;
}

.processing {
  font-size: 0.9rem;
  color: #059669;
  font-weight: 500;
}

.live-transcript {
  padding: 0.75rem;
  background: white;
  border-radius: 0.375rem;
  border-left: 3px solid #3b82f6;
}

.live-transcript .label {
  font-size: 0.8rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 0.25rem 0;
}

.live-transcript .text {
  font-size: 0.95rem;
  color: #1f2937;
  margin: 0;
  line-height: 1.5;
}

.playback {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;
}

.audio-player {
  flex: 1;
  min-width: 200px;
  height: 32px;
}

.clear-btn {
  padding: 0.5rem 0.75rem;
  background: #e5e7eb;
  color: #374151;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background 0.2s;
}

.clear-btn:hover {
  background: #d1d5db;
}

.mode-indicator {
  display: flex;
  gap: 0.5rem;
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.625rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.badge-text {
  background: #dbeafe;
  color: #1e40af;
}

.badge-audio {
  background: #d1fae5;
  color: #065f46;
}

.badge-uploaded {
  background: #c7d2fe;
  color: #4f46e5;
}

.upload-status {
  padding: 0.75rem;
  background: #ecfdf5;
  border-radius: 0.375rem;
  border-left: 3px solid #10b981;
}

.success-badge {
  font-size: 0.9rem;
  color: #059669;
  font-weight: 500;
  margin: 0;
}

.error-message {
  padding: 0.75rem;
  background: #fef2f2;
  border-radius: 0.375rem;
  border-left: 3px solid #ef4444;
  color: #991b1b;
  font-size: 0.9rem;
}
</style>