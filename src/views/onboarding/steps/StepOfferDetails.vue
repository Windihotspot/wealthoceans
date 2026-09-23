<template>
  <div class="offer-form">
    <h1 class="form-title">
      What Are You Selling, and to Whom?
    </h1>

    <p class="form-subtitle mb-6">
      LCI's Market Intelligence Engine uses this to script your AI Sales Closer.
    </p>

    <v-form
      ref="formRef"
      @submit.prevent="handleNext"
    >
      <!-- Business Description -->
      <div class="field-wrapper">
        <v-textarea
          v-model="store.form.business_description"
          variant="outlined"
          label="Business description"
          placeholder="What does your business do?"
          rows="2"
          prepend-inner-icon="mdi-briefcase-outline"
          :rules="[required]"
          class="custom-field"
          density="comfortable"
          auto-grow
        />
      </div>

      <!-- Target Audience -->
      <div class="field-wrapper">
        <v-textarea
          v-model="store.form.target_audience"
          variant="outlined"
          label="Target audience"
          placeholder="Who is your ideal customer?"
          rows="2"
          prepend-inner-icon="mdi-account-group-outline"
          :rules="[required]"
          class="custom-field"
          density="comfortable"
          auto-grow
        />
      </div>

      <!-- Main Offer -->
      <div class="field-wrapper">
        <v-textarea
          v-model="store.form.main_offer"
          variant="outlined"
          label="Main offer"
          placeholder="What's your main offer or product?"
          rows="2"
          prepend-inner-icon="mdi-tag-outline"
          :rules="[required]"
          class="custom-field"
          density="comfortable"
          auto-grow
        />
      </div>

      <!-- Monthly Ad Budget -->
      <div class="field-wrapper">
        <v-text-field
          v-model.number="store.form.monthly_ad_budget"
          variant="outlined"
          label="Monthly ad budget (optional)"
          placeholder="Enter monthly ad budget"
          type="number"
          prepend-inner-icon="mdi-cash-multiple"
          class="custom-field"
          density="comfortable"
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

      <!-- Navigation Buttons -->
      <div class="navigation-buttons">
        <v-btn
          type="button"
          variant="outlined"
          class="back-btn"
          :disabled="store.isSubmitting"
          @click="store.goToStep(1)"
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

const store = useOnboardingStore()

const formRef = ref()

const required = (v: string) =>
  !!v || 'Required'

async function handleNext() {
  const { valid } = await formRef.value.validate()

  if (!valid) return

  try {
    await store.submitOfferDetails()
  } catch {
    // error already set in the store
  }
}
</script>

<style scoped lang="scss">
.offer-form {
  width: 100%;
}

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
   FIELDS
   ========================================= */

.field-wrapper {
  margin-bottom: 18px;
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
   * Textarea height
   */
  :deep(.v-textarea .v-field__input) {
    min-height: 76px;
    padding-top: 14px;
    padding-bottom: 14px;
  }

  /*
   * Icons
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
}

/* =========================================
   FOCUS
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

/*
 * Both buttons are exactly equal width
 */
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

/* Back hover */
.back-btn:hover:not(:disabled) {
  border-color: #6c4bf4 !important;
  color: #6c4bf4 !important;
  background: #faf9ff !important;
}

/* Continue */
.continue-btn {
  background: #6c4bf4 !important;
  color: #ffffff !important;
  border: 1.5px solid #6c4bf4 !important;
}

/* Continue hover */
.continue-btn:hover:not(:disabled) {
  background: #5b3de0 !important;
  border-color: #5b3de0 !important;
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

  .field-wrapper {
    margin-bottom: 15px;
  }

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
   * Put Continue first on mobile if desired.
   * Remove these two blocks if you want Back first.
   */
  .continue-btn {
    order: 1;
  }

  .back-btn {
    order: 2;
  }
}
</style>