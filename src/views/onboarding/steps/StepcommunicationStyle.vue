<template>
  <div class="communication-form">
    <h1 class="form-title">
      How Do You Communicate?
    </h1>

    <p class="form-subtitle mb-6">
      LCI learns your tone and style to engage your leads the way you do.
      The more details, the better it closes.
    </p>

    <v-form
      ref="formRef"
      @submit.prevent="handleNext"
    >
      <!-- =========================================
           COMMUNICATION STYLE
           ========================================= -->

      <div class="option-section">
        <label class="select-label">
          Communication Style
        </label>

        <v-radio-group
          v-model="store.form.communication_style"
          :rules="[required]"
          hide-details="auto"
          class="option-group"
        >
          <v-radio
            v-for="option in communicationStyleOptions"
            :key="option"
            :label="option"
            :value="option"
            class="custom-radio"
          />
        </v-radio-group>
      </div>

      <!-- =========================================
           PREFERRED TONE
           ========================================= -->

      <div class="option-section">
        <label class="select-label">
          Preferred Tone
        </label>

        <v-radio-group
          v-model="store.form.tone_preference"
          :rules="[required]"
          hide-details="auto"
          class="option-group"
        >
          <v-radio
            v-for="option in toneOptions"
            :key="option"
            :label="option"
            :value="option"
            class="custom-radio"
          />
        </v-radio-group>
      </div>

      <!-- =========================================
           KEY PHRASES
           ========================================= -->

      <div class="field-wrapper">
        <v-textarea
          v-model="store.form.key_phrases"
          variant="outlined"
          label="Key Phrases & Terminology (Optional)"
          placeholder="e.g., 'Let's make it rain', 'Game-changing solutions', 'Scaling fast'"
          rows="2"
          prepend-inner-icon="mdi-format-quote-close"
          class="custom-field"
          density="comfortable"
          auto-grow
          hint="Phrases you commonly use in conversations"
          persistent-hint
        />
      </div>

      <!-- =========================================
           PITCH EXAMPLE (WITH SPEECH RECORDING)
           ========================================= -->

      <div class="field-wrapper">
        <label class="field-label">How You Pitch (Example)</label>

        <PitchCapture
          v-model="store.form.pitch_example"
          @update:model-value="(val) => store.form.pitch_example = val"
          @update:audio-url="(url) => store.form.pitch_audio_url = url"
        />

        <!-- Error message if empty -->
        <div 
          v-if="showPitchError && !store.form.pitch_example" 
          class="v-messages"
        >
          <div class="v-messages__message" style="color: #ef4444;">
            Required
          </div>
        </div>

        <!-- Hint -->
        <div class="v-messages">
          <div class="v-messages__message">
            1-2 paragraphs showing your natural pitch style. You can type or record.
          </div>
        </div>
      </div>

      <!-- =========================================
           UNIQUE SELLING LANGUAGE
           ========================================= -->

      <div class="field-wrapper">
        <v-textarea
          v-model="store.form.unique_selling_language"
          variant="outlined"
          label="Your Unique Selling Language (Optional)"
          placeholder="e.g., 'We don't sell software, we sell freedom'"
          rows="2"
          prepend-inner-icon="mdi-auto-fix"
          class="custom-field"
          density="comfortable"
          auto-grow
          hint="How you uniquely describe your offer"
          persistent-hint
        />
      </div>

      <!-- =========================================
           ERROR
           ========================================= -->

      <v-alert
        v-if="store.error"
        type="error"
        variant="tonal"
        density="compact"
        class="error-alert"
      >
        {{ store.error }}
      </v-alert>

      <!-- =========================================
           NAVIGATION
           ========================================= -->

      <div class="navigation-buttons">
        <v-btn
          type="button"
          variant="outlined"
          class="back-btn"
          :disabled="store.isSubmitting"
          @click="store.goToStep(2)"
        >
          <v-icon
            icon="mdi-arrow-left"
            class="mr-2"
          />

          Back
        </v-btn>

        <v-btn
          type="submit"
          class="continue-btn"
          :loading="store.isSubmitting"
          :disabled="store.isSubmitting"
        >
          Continue

          <v-icon
            icon="mdi-arrow-right"
            class="ml-2"
          />
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useOnboardingStore } from '@/stores/onboarding.store'
import PitchCapture from '@/components/onboarding/PitchCapture.vue'

const store = useOnboardingStore()

const formRef = ref()
const showPitchError = ref(false)

const communicationStyleOptions = [
  'Formal & Professional',
  'Casual & Conversational',
  'Energetic & Playful',
  'Direct & No-Nonsense',
]

const toneOptions = [
  'Professional',
  'Friendly',
  'Enthusiastic',
  'Empathetic',
  'Authoritative',
]

const required = (v: string) =>
  !!v || 'Required'

async function handleNext() {
  const { valid } = await formRef.value.validate()

   if (!store.form.pitch_example || !store.form.pitch_example.trim()) {
    store.error = 'Please record or type your pitch'
    return
  }

  if (!valid) return

  try {
    await store.submitCommunicationStyle()
  } catch {
    // error already set in the store
  }
}
</script>

<style scoped lang="scss">
.communication-form {
  width: 100%;
}

/* =========================================
   HEADER
   ========================================= */

.form-title {
  margin: 0;
  font-size: 20px;
  line-height: 1.4;
  font-weight: 700;
  color: #111827;
}

.form-subtitle {
  margin-top: 6px;
  font-size: 13px;
  line-height: 1.5;
  color: #6b7280;
}

/* =========================================
   RADIO SECTIONS
   ========================================= */

.option-section {
  margin-bottom: 24px;
}

.select-label {
  display: block;
  margin-bottom: 10px;

  font-size: 13px;
  font-weight: 600;
  color: #374151;
}

/*
 * Radio group
 */
.option-group {
  margin: 0;
}

/*
 * Individual radio
 */
:deep(.custom-radio) {
  min-height: 40px;
  margin-bottom: 6px;
  padding: 4px 8px;

  border: 1.5px solid #b8bec8;
  border-radius: 9px;

  transition:
    border-color 0.2s ease,
    background-color 0.2s ease;
}

/*
 * Radio label
 */
:deep(.custom-radio .v-label) {
  font-size: 13px;
  color: #374151;
  opacity: 1;
}

/*
 * Radio control
 */
:deep(.custom-radio .v-selection-control__wrapper) {
  margin-right: 4px;
}

/*
 * Selected option
 */
:deep(
  .custom-radio:has(.v-selection-control--dirty)
) {
  border-color: #6c4bf4;
  background: #faf9ff;
}

:deep(
  .custom-radio:has(.v-selection-control--dirty) .v-label
) {
  color: #5b3de0;
  font-weight: 500;
}

/* Purple radio */
:deep(
  .custom-radio .v-selection-control--dirty .v-icon
) {
  color: #6c4bf4;
}

/* =========================================
   TEXT FIELDS
   ========================================= */

.field-wrapper {
  margin-bottom: 22px;
}

.field-label {
  display: block;
  margin-bottom: 10px;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}

.custom-field {
  :deep(.v-field) {
    min-height: 52px;
    border-radius: 10px;
    background: #ffffff;
  }

  :deep(.v-field__input) {
    padding-top: 12px;
    padding-bottom: 12px;

    font-size: 0.95rem;
    color: #1f2937;
  }

  /*
   * Textarea sizing
   */
  :deep(.v-textarea .v-field__input) {
    min-height: 76px;
    padding-top: 14px;
    padding-bottom: 14px;
  }

  /*
   * MDI icon
   */
  :deep(.v-field__prepend-inner) {
    padding-right: 10px;
    color: #6b7280;
  }

  :deep(.v-field__prepend-inner .v-icon) {
    font-size: 20px;
  }

  /*
   * Strong visible border
   */
  :deep(.v-field__outline) {
    --v-field-border-width: 1.5px;
    --v-field-border-opacity: 1;

    color: #b8bec8 !important;
    opacity: 1 !important;
  }

  :deep(.v-field__outline__start),
  :deep(.v-field__outline__end),
  :deep(.v-field__outline__notch) {
    border-color: #b8bec8 !important;
    opacity: 1 !important;
  }

  /*
   * Label
   */
  :deep(.v-field__label) {
    color: #4b5563;
    font-size: 0.9rem;
  }

  /*
   * Hint
   */
  :deep(.v-messages) {
    padding-top: 4px;
  }

  :deep(.v-messages__message) {
    font-size: 11px;
    color: #9ca3af;
  }
}

/* =========================================
   FIELD FOCUS
   ========================================= */

:deep(.v-field--focused .v-field__outline) {
  --v-field-border-width: 1.5px;

  color: #6c4bf4 !important;
  opacity: 1 !important;
}

:deep(.v-field--focused .v-field__outline__start),
:deep(.v-field--focused .v-field__outline__end),
:deep(.v-field--focused .v-field__outline__notch) {
  border-color: #6c4bf4 !important;
}

:deep(.v-field--focused .v-field__label) {
  color: #6c4bf4;
}

/* =========================================
   ERROR
   ========================================= */

.error-alert {
  margin-top: 4px;
  margin-bottom: 20px;
  border-radius: 10px;
}

/* =========================================
   NAVIGATION BUTTONS
   ========================================= */

.navigation-buttons {
  display: flex;
  gap: 12px;
  width: 100%;
  margin-top: 8px;
}

.back-btn,
.continue-btn {
  flex: 1 1 0;
  width: 50%;
  height: 48px !important;

  border-radius: 10px !important;

  font-size: 14px;
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0;
}

/* Back */
.back-btn {
  border: 1.5px solid #b8bec8 !important;
  color: #374151 !important;
  background: #ffffff !important;
}

.back-btn:hover:not(:disabled) {
  border-color: #6c4bf4 !important;
  color: #6c4bf4 !important;
  background: #faf9ff !important;
}

/* Continue */
.continue-btn {
  border: 1.5px solid #6c4bf4 !important;
  background: #6c4bf4 !important;
  color: #ffffff !important;
}

.continue-btn:hover:not(:disabled) {
  border-color: #5b3de0 !important;
  background: #5b3de0 !important;
}

/* =========================================
   MOBILE
   ========================================= */

@media (max-width: 600px) {
  .form-title {
    font-size: 18px;
  }

  .form-subtitle {
    font-size: 13px;
  }

  .option-section {
    margin-bottom: 20px;
  }

  .field-wrapper {
    margin-bottom: 18px;
  }

  /*
   * Stack navigation buttons
   */
  .navigation-buttons {
    flex-direction: column;
    gap: 10px;
  }

  .back-btn,
  .continue-btn {
    width: 100%;
    flex: none;
  }

  /*
   * Continue first on mobile
   */
  .continue-btn {
    order: 1;
  }

  .back-btn {
    order: 2;
  }
}
</style>