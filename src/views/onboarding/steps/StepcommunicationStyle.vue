<template>
  <div>
    <h1 class="form-title">How Do You Communicate?</h1>
    <p class="form-subtitle mb-6">
      LCI learns your tone and style to engage your leads the way you do. The more details, the better it closes.
    </p>

    <v-form @submit.prevent="handleNext" ref="formRef">
      <!-- Communication Style Select -->
      <div class="mb-4">
        <label class="select-label">Communication Style</label>
        <v-radio-group
          v-model="store.form.communication_style"
          :rules="[required]"
          class="mb-2"
        >
          <v-radio
            v-for="option in communicationStyleOptions"
            :key="option"
            :label="option"
            :value="option"
            class="mb-2"
          />
        </v-radio-group>
      </div>

      <!-- Tone Preference Select -->
      <div class="mb-4">
        <label class="select-label">Preferred Tone</label>
        <v-radio-group
          v-model="store.form.tone_preference"
          :rules="[required]"
          class="mb-2"
        >
          <v-radio
            v-for="option in toneOptions"
            :key="option"
            :label="option"
            :value="option"
            class="mb-2"
          />
        </v-radio-group>
      </div>

      <!-- Key Phrases -->
      <v-textarea
        v-model="store.form.key_phrases"
        v-bind="fieldProps"
        placeholder="e.g., 'Let's make it rain', 'Game-changing solutions', 'Scaling fast'"
        label="Key Phrases & Terminology (Optional)"
        rows="2"
        prepend-inner-icon="fa-solid fa-quote-left"
        class="mb-3"
        hint="Phrases you commonly use in conversations"
        persistent-hint
      />

      <!-- Pitch Example -->
      <v-textarea
        v-model="store.form.pitch_example"
        v-bind="fieldProps"
        placeholder="Describe how you typically pitch your offer to prospects..."
        label="How You Pitch (Example)"
        rows="3"
        prepend-inner-icon="fa-solid fa-microphone"
        :rules="[required]"
        class="mb-3"
        hint="1-2 paragraphs showing your natural pitch style"
        persistent-hint
      />

      <!-- Unique Selling Language -->
      <v-textarea
        v-model="store.form.unique_selling_language"
        v-bind="fieldProps"
        placeholder="e.g., 'We don't sell software, we sell freedom'"
        label="Your Unique Selling Language (Optional)"
        rows="2"
        prepend-inner-icon="fa-solid fa-sparkles"
        class="mb-3"
        hint="How you uniquely describe your offer"
        persistent-hint
      />

      <v-alert v-if="store.error" type="error" variant="tonal" density="compact" class="mb-4">
        {{ store.error }}
      </v-alert>

      <div class="d-flex ga-3">
        <v-btn variant="text" class="text-none" @click="store.goToStep(2)">Back</v-btn>
        <v-btn type="submit" block size="large" class="register-btn" :loading="store.isSubmitting">
          Continue
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useOnboardingStore } from '@/stores/onboarding.store'

const store = useOnboardingStore()
const formRef = ref()

const communicationStyleOptions = ['Formal & Professional', 'Casual & Conversational', 'Energetic & Playful', 'Direct & No-Nonsense']
const toneOptions = ['Professional', 'Friendly', 'Enthusiastic', 'Empathetic', 'Authoritative']

const fieldProps = {
  variant: 'solo-filled' as const,
  flat: true,
  rounded: 'lg' as const,
  bgColor: '#F5F5F9',
  density: 'comfortable' as const,
  hideDetails: false as const
}

const required = (v: string) => !!v || 'Required'

async function handleNext() {
  const { valid } = await formRef.value.validate()
  if (!valid) return
  try {
    await store.submitCommunicationStyle()
  } catch {
    // error already set in the store
  }
}
</script>

<style scoped>
.form-title {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
}

.form-subtitle {
  font-size: 13px;
  color: #6b7280;
  line-height: 1.5;
}

.select-label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  margin-bottom: 10px;
}

:deep(.v-radio-group) {
  gap: 12px;
}

:deep(.v-radio) {
  font-size: 13px;
  color: #374151;
}

.register-btn {
  background: #6c4bf4 !important;
  color: #ffffff !important;
  border-radius: 12px !important;
  text-transform: none;
  font-weight: 600;
  height: 48px !important;
}

.ga-3 {
  gap: 12px;
}
</style>