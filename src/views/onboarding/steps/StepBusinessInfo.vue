<template>
  <div class="form-container">
    <v-card class="form-card">
      <div class="form-header mb-6">
        <h2 class="text-h5 font-weight-bold mb-2">
          Tell us about your business
        </h2>

        <p class="text-body-2 text-medium-emphasis">
          This becomes your organization inside LCI. You can change it later.
        </p>
      </div>

      <v-form
        ref="formRef"
        @submit.prevent="handleNext"
        class="form-fields"
      >
        <!-- Business Name -->
        <div class="field-wrapper mb-6">
          <v-text-field
            v-model="store.form.organization_name"
            variant="outlined"
            label="Business name"
            prepend-inner-icon="mdi-domain"
            :rules="[required]"
            class="custom-field"
            density="comfortable"
            single-line
            :disabled="store.isSubmitting"
          />

          <p
            v-if="
              store.form.organization_name === '' &&
              touched.organization_name
            "
            class="field-error mt-2"
          >
            Business name is required
          </p>
        </div>

        <!-- Website -->
        <div class="field-wrapper mb-6">
          <v-text-field
            v-model="store.form.website"
            variant="outlined"
            label="Website (optional)"
            prepend-inner-icon="mdi-web"
            class="custom-field"
            density="comfortable"
            single-line
            :disabled="store.isSubmitting"
          />
        </div>

        <!-- Industry -->
        <div class="field-wrapper mb-6">
          <v-select
            v-model="store.form.industry"
            :items="INDUSTRY_OPTIONS"
            variant="outlined"
            label="Industry"
            prepend-inner-icon="mdi-layers-outline"
            class="custom-field"
            density="comfortable"
            :disabled="store.isSubmitting"
          />
        </div>

        <!-- Error Alert -->
        <v-alert
          v-if="store.error"
          type="error"
          variant="tonal"
          density="compact"
          class="mb-6"
        >
          {{ store.error }}
        </v-alert>

        <!-- Submit Button -->
        <v-btn
          type="submit"
          block
          size="x-large"
          class="submit-btn"
          :disabled="store.isSubmitting"
          :loading="store.isSubmitting"
        >
          <template v-if="store.isSubmitting">
            <v-progress-circular
              indeterminate
              size="24"
              width="3"
              class="mr-3"
            />
            Processing...
          </template>

          <template v-else>
            Continue
          </template>
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useOnboardingStore } from '@/stores/onboarding.store'
import { INDUSTRY_OPTIONS } from '@/types/organization.types'

const store = useOnboardingStore()

const formRef = ref()

const touched = reactive({
  organization_name: false,
  website: false,
  industry: false,
})

const required = (v: string) => !!v || 'Required'

async function handleNext() {
  touched.organization_name = true

  const { valid } = await formRef.value.validate()

  if (!valid) return

  try {
    await store.submitBusinessSetup()
  } catch {
    // error already set in the store
  }
}
</script>

<style scoped lang="scss">
.form-container {
  width: 100%;
  padding: 0;

  @media (max-width: 600px) {
    padding: 1rem;
  }
}

.form-card {
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 600px) {
    padding: 1.5rem;
    border-radius: 8px;
  }

  @media (max-width: 400px) {
    padding: 1rem;
  }
}

.form-header {
  h2 {
    color: #1f2937;
  }

  p {
    color: #6b7280;
  }
}

.field-wrapper {
  position: relative;
}

/* =========================================
   FORM FIELDS
   ========================================= */

.custom-field {
  :deep(.v-field) {
    min-height: 52px;
    border-radius: 10px;
    background: #ffffff;
  }

  :deep(.v-field__input) {
    padding: 12px 0;
    font-size: 0.95rem;
    color: #1f2937;
  }

  :deep(.v-field__prepend-inner) {
    padding-right: 10px;
    color: #6b7280;
  }

  :deep(.v-field__prepend-inner .v-icon) {
    font-size: 20px;
  }

  :deep(.v-field--appended) {
    padding-right: 0;
  }

  /*
   * Stronger border
   */
  :deep(.v-field__outline) {
    --v-field-border-width: 1.5px;
    --v-field-border-opacity: 1;

    color: #b8bec8 !important;
    opacity: 1 !important;
  }

  /*
   * Make every outline segment visible
   */
  :deep(.v-field__outline__start),
  :deep(.v-field__outline__end),
  :deep(.v-field__outline__notch) {
    border-color: #b8bec8 !important;
    opacity: 1 !important;
  }
}

/* =========================================
   FOCUS
   ========================================= */

:deep(.v-field--focused .v-field__outline) {
  --v-field-border-width: 1.5px;

  color: #6b3ba0 !important;
  opacity: 1 !important;
}

:deep(.v-field--focused .v-field__outline__start),
:deep(.v-field--focused .v-field__outline__end),
:deep(.v-field--focused .v-field__outline__notch) {
  border-color: #6b3ba0 !important;
}

/* =========================================
   LABEL
   ========================================= */

:deep(.v-field__label) {
  color: #4b5563;
  font-size: 0.9rem;
}

/* Focused label */
:deep(.v-field--focused .v-field__label) {
  color: #6b3ba0;
}

/* =========================================
   SELECT
   ========================================= */

:deep(.v-select .v-field__append-inner) {
  color: #6b7280;
}

/* =========================================
   ERROR
   ========================================= */

:deep(.v-field--error .v-field__outline) {
  color: #dc2626 !important;
  opacity: 1 !important;
}

:deep(.v-field--error .v-field__outline__start),
:deep(.v-field--error .v-field__outline__end),
:deep(.v-field--error .v-field__outline__notch) {
  border-color: #dc2626 !important;
}

.field-error {
  font-size: 0.875rem;
  color: #dc2626;
  margin-top: 0.5rem;
}

/* =========================================
   DISABLED
   ========================================= */

:deep(.v-field--disabled) {
  .v-field__outline {
    color: #d1d5db !important;
    opacity: 1 !important;
  }

  input,
  .v-field__input {
    opacity: 0.6;
  }
}

/* =========================================
   SUBMIT BUTTON
   ========================================= */

.submit-btn {
  background-color: #6b3ba0 !important;
  color: white !important;
  font-weight: 600;
  font-size: 1rem;
  text-transform: none;
  padding: 14px 24px;
  border-radius: 8px;
  height: auto;
  min-height: 48px;
  transition: all 0.3s ease;

  @media (max-width: 600px) {
    font-size: 0.95rem;
    min-height: 44px;
    padding: 12px 20px;
  }

  &:hover:not(:disabled) {
    background-color: #5a2e85 !important;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(107, 59, 160, 0.3);
  }

  &:disabled {
    background-color: #8b5ab0 !important;
    cursor: not-allowed;
    opacity: 0.9;
  }

  :deep(.v-progress-circular) {
    color: white !important;
  }
}
</style>