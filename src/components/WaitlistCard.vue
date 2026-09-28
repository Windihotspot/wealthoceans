<script setup lang="ts">
import { ref, watch } from 'vue'
import confetti from 'canvas-confetti'
import { supabase } from '@/services/supabase'

const showConfirmDialog = ref(false)
const countdown = ref(15)
let timer: any = null

watch(showConfirmDialog, (val) => {
  if (val) {
    countdown.value = 15

    timer = setInterval(() => {
      countdown.value--

      if (countdown.value <= 0) {
        showConfirmDialog.value = false
        clearInterval(timer)
      }
    }, 1000)
  } else {
    clearInterval(timer)
  }
})

const firstName = ref('')
const whatsappNo = ref('')
const email = ref('')

const formRef = ref()
const isValid = ref(false)
const loading = ref(false)
const success = ref(false)
const errorMessage = ref('')

const nameRules = [
  (v: string) => !!v || 'Your name is required',
  (v: string) => v.length >= 2 || 'Name must be at least 2 characters'
]

const phoneRules = [
  (v: string) => !!v || 'WhatsApp number is required',
  (v: string) => /^[\d\s+()-]*$/.test(v) || 'Enter a valid phone number'
]

const emailRules = [
  (v: string) => !!v || 'Email is required',
  (v: string) => /.+@.+\..+/.test(v) || 'Enter a valid email'
]

const fireConfetti = () => {
  confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } })
}

const joinWaitlist = async () => {
  errorMessage.value = ''
  success.value = false

  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true

  try {
    const { data, error } = await supabase.rpc('add_waitlist_lead', {
      p_first_name: firstName.value,
      p_email: email.value,
      p_phone: whatsappNo.value,
      p_source: 'landing_page'
    })

    if (error) throw error

    if (data.status === 'exists') {
      errorMessage.value = 'You are already on the waitlist.'
      return
    }

    success.value = true
    fireConfetti()
    showConfirmDialog.value = true
    firstName.value = ''
    whatsappNo.value = ''
    email.value = ''

    formRef.value.resetValidation()
  } catch (err) {
    errorMessage.value = 'Something went wrong. Please try again.'
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="bg-white rounded-2xl p-8 shadow-2xl border-2 border-gray-200">
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-1">Join the waitlist</h2>
      <p class="text-gray-600 text-sm">Get early access to LCI at launch</p>
    </div>

    <v-form ref="formRef" v-model="isValid" @submit.prevent="joinWaitlist">
      <!-- First Name Field -->
      <div class="mb-4">
        <label for="firstName" class="block text-sm font-semibold text-gray-900 mb-2">First name</label>
        <v-text-field
          id="firstName"
          v-model="firstName"
          variant="outlined"
          :rules="nameRules"
          placeholder="John"
          density="comfortable"
          hide-details="true"
        />
      </div>

      <!-- WhatsApp Field -->
      <div class="mb-4">
        <label for="whatsappNo" class="block text-sm font-semibold text-gray-900 mb-2">WhatsApp number</label>
        <v-text-field
          id="whatsappNo"
          v-model="whatsappNo"
          variant="outlined"
          :rules="phoneRules"
          placeholder="+234 xxx xxx xxxx"
          density="comfortable"
          hide-details="true"
        />
      </div>

      <!-- Email Field -->
      <div class="mb-6">
        <label for="email" class="block text-sm font-semibold text-gray-900 mb-2">Email address</label>
        <v-text-field
          id="email"
          v-model="email"
          variant="outlined"
          :rules="emailRules"
          placeholder="you@example.com"
          density="comfortable"
          hide-details="true"
        />
      </div>

      <!-- Benefits List -->
      <div class="space-y-3 mb-6 text-sm bg-purple-50 rounded-lg p-4 border border-purple-100">
        <div class="flex gap-3 items-center">
          <span class="text-lg">⚡</span>
          <span class="text-gray-700">First access at launch</span>
        </div>
        <div class="flex gap-3 items-center">
          <span class="text-lg">🚀</span>
          <span class="text-gray-700">Priority onboarding</span>
        </div>
        <div class="flex gap-3 items-center">
          <span class="text-lg">💸</span>
          <span class="text-gray-700">37% early-access discount</span>
        </div>
        <div class="flex gap-3 items-center">
          <span class="text-lg">📩</span>
          <span class="text-gray-700">Free marketing emails & insights</span>
        </div>
      </div>

      <!-- Submit Button -->
      <v-btn
        block
        type="submit"
        :loading="loading"
        class="submit-btn font-semibold rounded-xl text-white"
        height="52"
      >
        Join the Waitlist
      </v-btn>
    </v-form>

    <!-- Success Message -->
    <v-alert v-if="success" type="success" variant="tonal" class="mt-6 rounded-lg">
      You're on the waitlist! Check your email.
    </v-alert>

    <!-- Error Message -->
    <v-alert v-if="errorMessage" type="error" variant="tonal" class="mt-6 rounded-lg">
      {{ errorMessage }}
    </v-alert>

    <!-- Confirmation Dialog -->
    <v-dialog v-model="showConfirmDialog" max-width="520" persistent>
      <v-card class="rounded-2xl">
        <div class="p-8 text-center">
          <div class="text-5xl mb-4">🎉</div>

          <h3 class="text-2xl font-bold text-gray-900 mb-4">You're In — One Final Step.</h3>

          <p class="text-gray-700 mb-6 leading-relaxed">
            We just sent you a confirmation email to secure your early-access spot.
            <br /><br />
            <strong>Confirming takes less than 9 seconds.</strong>
          </p>

          <p class="text-gray-700 mb-6 leading-relaxed">
            Until you confirm, your <strong>37% early-access discount</strong> and priority access to
            the Intelligent Conversion infrastructure are not locked in.
          </p>

          <p class="text-gray-700 mb-8 leading-relaxed">
            Open your inbox now and click the confirmation link. If you don't see it, check your spam
            or promotions tab — we don't want you missing your discounted access at launch.
          </p>

          <v-btn
            block
            size="large"
            class="submit-btn font-semibold text-white rounded-xl"
            @click="showConfirmDialog = false"
          >
            Got it! Check My Email
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
/* Input field border styling */
:deep(.v-field__outline) {
  border-color: #e5e7eb !important;
}

:deep(.v-field:hover .v-field__outline) {
  border-color: #d1d5db !important;
}

:deep(.v-field--focused .v-field__outline) {
  border-color: #a855f7 !important;
}

/* Input text styling - make text dark and visible */
:deep(.v-field__input) {
  color: #111827 !important;
  caret-color: #a855f7;
}

:deep(.v-input input) {
  color: #111827 !important;
}

:deep(.v-input input::placeholder) {
  color: #d1d5db !important;
  opacity: 1 !important;
}

/* Ensure text is visible when typing */
:deep(.v-field__input::selection) {
  background-color: #a855f7 !important;
  color: white !important;
}

/* Placeholder styling */
:deep(.v-field__input::placeholder) {
  color: #9ca3af !important;
}

/* Error state */
:deep(.v-input--error .v-field__outline) {
  border-color: #ef4444 !important;
}

:deep(.v-input--error .v-field__input) {
  color: #111827 !important;
}

/* Submit button styling */
.submit-btn {
  background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%) !important;
  text-transform: none !important;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background: linear-gradient(135deg, #9333ea 0%, #7e22ce 100%) !important;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(168, 85, 247, 0.3);
}

.submit-btn:active {
  transform: translateY(0);
}

/* Dialog styling */
:deep(.v-dialog .v-overlay__content) {
  backdrop-filter: blur(8px);
}
</style>