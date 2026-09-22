<template>
  <div class="review-form">
    <h1 class="form-title">
      You're Almost Live
    </h1>

    <p class="form-subtitle mb-6">
      Review what LCI knows so far. You can refine everything from your dashboard.
    </p>

    <!-- =========================================
         SUMMARY
         ========================================= -->

    <div class="summary-list">
      <!-- Business Profile -->
      <div class="summary-section-header">
        <div class="section-title">
          <v-icon
            icon="mdi-domain"
            size="18"
          />
          <span>Business Profile</span>
        </div>
      </div>

      <div class="summary-row">
        <span class="summary-label">
          Business name
        </span>

        <span class="summary-value">
          {{ store.form.organization_name || '—' }}
        </span>
      </div>

      <div class="summary-row">
        <span class="summary-label">
          Industry
        </span>

        <span class="summary-value">
          {{ store.form.industry || '—' }}
        </span>
      </div>

      <div class="summary-row">
        <span class="summary-label">
          Description
        </span>

        <span class="summary-value">
          {{ truncate(store.form.business_description) || '—' }}
        </span>
      </div>

      <!-- Your Offer -->
      <div class="summary-section-header">
        <div class="section-title">
          <v-icon
            icon="mdi-tag-multiple-outline"
            size="18"
          />
          <span>Your Offer</span>
        </div>
      </div>

      <div class="summary-row">
        <span class="summary-label">
          Target audience
        </span>

        <span class="summary-value">
          {{ truncate(store.form.target_audience) || '—' }}
        </span>
      </div>

      <div class="summary-row">
        <span class="summary-label">
          Main offer
        </span>

        <span class="summary-value">
          {{ truncate(store.form.main_offer) || '—' }}
        </span>
      </div>

      <div
        v-if="store.form.monthly_ad_budget"
        class="summary-row"
      >
        <span class="summary-label">
          Monthly budget
        </span>

        <span class="summary-value">
          ${{ store.form.monthly_ad_budget }}
        </span>
      </div>

      <!-- Communication -->
      <div class="summary-section-header">
        <div class="section-title">
          <v-icon
            icon="mdi-message-text-outline"
            size="18"
          />
          <span>How LCI Will Sound</span>
        </div>
      </div>

      <div class="summary-row">
        <span class="summary-label">
          Communication style
        </span>

        <span class="summary-value">
          {{ store.form.communication_style || '—' }}
        </span>
      </div>

      <div class="summary-row">
        <span class="summary-label">
          Tone preference
        </span>

        <span class="summary-value">
          {{ store.form.tone_preference || '—' }}
        </span>
      </div>

      <div
        v-if="store.form.key_phrases"
        class="summary-row"
      >
        <span class="summary-label">
          Key phrases
        </span>

        <span class="summary-value">
          {{ truncate(store.form.key_phrases) }}
        </span>
      </div>

      <div class="summary-row">
        <span class="summary-label">
          Your pitch
        </span>

        <span class="summary-value">
          {{ truncate(store.form.pitch_example) || '—' }}
        </span>
      </div>
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

    <!-- =========================================
         NAVIGATION
         ========================================= -->

    <div class="navigation-buttons">
      <v-btn
        type="button"
        variant="outlined"
        class="back-btn"
        :disabled="store.isSubmitting"
        @click="store.goToStep(3)"
      >
        <v-icon
          icon="mdi-arrow-left"
          class="mr-2"
        />

        Back
      </v-btn>

      <v-btn
        type="button"
        class="activate-btn"
        :loading="store.isSubmitting"
        :disabled="store.isSubmitting"
        @click="handleFinish"
      >
        <template v-if="!store.isSubmitting">
          <v-icon
            icon="mdi-rocket-launch-outline"
            class="mr-2"
          />
        </template>

        Submit
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useOnboardingStore } from '@/stores/onboarding.store'

const router = useRouter()
const store = useOnboardingStore()

function truncate(
  text: string | undefined,
  length: number = 60,
): string {
  if (!text) return ''

  return text.length > length
    ? text.substring(0, length) + '...'
    : text
}

async function handleFinish() {
  try {
    await store.finishOnboarding()

    router.push({
      name: 'dashboard',
    })
  } catch {
    // error already set in the store
  }
}
</script>

<style scoped lang="scss">
.review-form {
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
   SUMMARY CARD
   ========================================= */

.summary-list {
  width: 100%;

  overflow: hidden;

  border: 1.5px solid #b8bec8;
  border-radius: 12px;

  background: #ffffff;
}

/* =========================================
   SECTION HEADER
   ========================================= */

.summary-section-header {
  padding: 12px 16px;

  border-bottom: 1px solid #dfe3e8;

  background: #f8f9fb;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;

  font-size: 11px;
  font-weight: 700;

  color: #6c4bf4;

  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.section-title :deep(.v-icon) {
  color: #6c4bf4;
}

/* =========================================
   SUMMARY ROW
   ========================================= */

.summary-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  gap: 20px;

  padding: 13px 16px;

  border-bottom: 1px solid #e5e7eb;

  background: #ffffff;
}

.summary-row:last-child {
  border-bottom: none;
}

/* =========================================
   LABEL
   ========================================= */

.summary-label {
  flex-shrink: 0;

  min-width: 120px;

  font-size: 11px;
  line-height: 1.5;

  color: #6b7280;

  text-transform: uppercase;
  letter-spacing: 0.02em;
}

/* =========================================
   VALUE
   ========================================= */

.summary-value {
  flex: 1;

  min-width: 0;

  font-size: 13px;
  line-height: 1.5;

  font-weight: 500;

  color: #374151;

  text-align: right;

  word-break: break-word;
}

/* =========================================
   ERROR
   ========================================= */

.error-alert {
  margin-top: 20px;
  margin-bottom: 20px;

  border-radius: 10px;
}

/* =========================================
   NAVIGATION
   ========================================= */

.navigation-buttons {
  display: flex;

  width: 100%;

  gap: 12px;

  margin-top: 20px;
}

/*
 * Equal widths
 */
.back-btn,
.activate-btn {
  flex: 1 1 0;
  width: 50%;

  height: 48px !important;

  border-radius: 10px !important;

  font-size: 14px;
  font-weight: 600;

  text-transform: none;
  letter-spacing: 0;
}

/* =========================================
   BACK
   ========================================= */

.back-btn {
  border: 1.5px solid #b8bec8 !important;

  background: #ffffff !important;

  color: #374151 !important;
}

.back-btn:hover:not(:disabled) {
  border-color: #6c4bf4 !important;

  background: #faf9ff !important;

  color: #6c4bf4 !important;
}

/* =========================================
   ACTIVATE
   ========================================= */

.activate-btn {
  border: 1.5px solid #6c4bf4 !important;

  background: #6c4bf4 !important;

  color: #ffffff !important;
}

.activate-btn:hover:not(:disabled) {
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

  .summary-section-header {
    padding: 11px 13px;
  }

  .summary-row {
    gap: 10px;
    padding: 12px 13px;
  }

  .summary-label {
    min-width: 100px;
    font-size: 10px;
  }

  .summary-value {
    font-size: 12px;
  }

  /*
   * Stack buttons
   */
  .navigation-buttons {
    flex-direction: column;
    gap: 10px;
  }

  .back-btn,
  .activate-btn {
    width: 100%;
    flex: none;
  }

  /*
   * Primary action first
   */
  .activate-btn {
    order: 1;
  }

  .back-btn {
    order: 2;
  }
}
</style>