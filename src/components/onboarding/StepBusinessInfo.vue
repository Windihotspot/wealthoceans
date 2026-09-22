<template>
  <v-card class="business-card">
    <h2 class="form-title">
      Tell us about your business
    </h2>

    <p class="form-description">
      This becomes your organization inside LCI. You can change it later.
    </p>

    <v-form
      ref="formRef"
      @submit.prevent="handleNext"
    >
      <!-- Business Name -->
      <div class="field-group">
        <label class="field-label">
          Business name
        </label>

        <v-text-field
          v-model="store.form.organization_name"
          placeholder="Enter business name"
          variant="outlined"
          density="comfortable"
          :rules="[required]"
          hide-details="auto"
          class="custom-field"
        />
      </div>

      <!-- Website -->
      <div class="field-group">
        <label class="field-label">
          Website
          <span class="optional">(optional)</span>
        </label>

        <v-text-field
          v-model="store.form.website"
          placeholder="https://example.com"
          variant="outlined"
          density="comfortable"
          hide-details="auto"
          class="custom-field"
        />
      </div>

      <!-- Industry -->
      <div class="field-group">
        <label class="field-label">
          Industry
        </label>

        <v-select
          v-model="store.form.industry"
          :items="INDUSTRY_OPTIONS"
          placeholder="Select industry"
          variant="outlined"
          density="comfortable"
          hide-details="auto"
          class="custom-field"
        />
      </div>

      <!-- Error -->
      <v-alert
        v-if="store.error"
        type="error"
        variant="tonal"
        density="compact"
        class="error-alert"
      >
        {{ store.error }}
      </v-alert>

      <!-- Submit -->
      <v-btn
        type="submit"
        block
        size="large"
        color="primary"
        :loading="store.isSubmitting"
        class="continue-btn"
      >
        Continue
      </v-btn>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useOnboardingStore } from '@/stores/onboarding.store'
import { INDUSTRY_OPTIONS } from '@/types/organization.types'

const store = useOnboardingStore()

const formRef = ref()

const required = (v: string) =>
  !!v || 'Required'

async function handleNext() {
  const { valid } = await formRef.value.validate()

  if (!valid) return

  try {
    await store.submitBusinessSetup()
  } catch {
    // Error already handled in store
  }
}
</script>

<style scoped>
.business-card {
  width: 100%;
  max-width: 620px;
  padding: 28px;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: none;
}

/* Heading */
.form-title {
  margin: 0;
  font-size: 20px;
  line-height: 1.4;
  font-weight: 700;
  color: #111827;
}

.form-description {
  margin: 6px 0 26px;
  font-size: 14px;
  line-height: 1.5;
  color: #6b7280;
}

/* Field wrapper */
.field-group {
  margin-bottom: 18px;
}

/* Label above input */
.field-label {
  display: block;
  margin-bottom: 7px;
  font-size: 13px;
  line-height: 1.3;
  font-weight: 500;
  color: #111827;
}

.optional {
  color: #9ca3af;
  font-weight: 400;
}

/*
 * Vuetify field
 */
:deep(.custom-field .v-field) {
  min-height: 44px;
  border-radius: 11px;
  background: #ffffff;
  box-shadow: none;
}

/* Normal border */
:deep(.custom-field .v-field__outline) {
  --v-field-border-width: 1px;
  color: #e5e7eb;
}

/* Input text */
:deep(.custom-field input) {
  font-size: 13px;
  color: #111827;
}

/* Placeholder */
:deep(.custom-field input::placeholder) {
  color: #9ca3af;
  opacity: 1;
}

/* Focused border */
:deep(.custom-field .v-field--focused .v-field__outline) {
  color: #8b2cff;
  --v-field-border-width: 1.5px;
}

/* Focused input */
:deep(.custom-field .v-field--focused) {
  box-shadow: 0 0 0 2px rgba(139, 44, 255, 0.08);
}

/* Select arrow */
:deep(.custom-field .v-field__append-inner) {
  color: #6b7280;
}

/* Remove default Vuetify floating label */
:deep(.custom-field .v-field__input) {
  padding-top: 0;
  padding-bottom: 0;
}

/* Validation message */
:deep(.custom-field .v-messages) {
  padding-top: 4px;
  font-size: 11px;
}

/* Error */
.error-alert {
  margin-top: 4px;
  margin-bottom: 18px;
  border-radius: 10px;
}

/* Continue button */
.continue-btn {
  height: 46px !important;
  margin-top: 8px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0;
  box-shadow: none;
}

/* Mobile */
@media (max-width: 600px) {
  .business-card {
    padding: 20px;
    border-radius: 14px;
  }

  .form-title {
    font-size: 18px;
  }

  .form-description {
    font-size: 13px;
    margin-bottom: 22px;
  }

  .field-group {
    margin-bottom: 15px;
  }
}
</style>