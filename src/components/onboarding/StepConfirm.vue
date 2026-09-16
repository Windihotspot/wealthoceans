
<template>
  <v-card class="step-confirm pa-4 pa-sm-6">
    <!-- Header -->
    <div class="mb-5">
      <h2 class="text-h6 font-weight-bold mb-1">
        You're almost live
      </h2>

      <p class="text-body-2 text-medium-emphasis mb-0">
        Review what LCI knows so far. You can refine everything from your dashboard.
      </p>
    </div>

    <!-- Confirmation Details -->
    <div class="confirm-list mb-5">

      <div class="confirm-item">
        <div class="confirm-icon">
          <i class="fa-solid fa-building"></i>
        </div>

        <div class="confirm-content">
          <span class="confirm-label">Business name</span>
          <span class="confirm-value">
            {{ store.form.organization_name || '—' }}
          </span>
        </div>
      </div>

      <div class="confirm-item">
        <div class="confirm-icon">
          <i class="fa-solid fa-layer-group"></i>
        </div>

        <div class="confirm-content">
          <span class="confirm-label">Industry</span>
          <span class="confirm-value">
            {{ store.form.industry || '—' }}
          </span>
        </div>
      </div>

      <div class="confirm-item">
        <div class="confirm-icon">
          <i class="fa-solid fa-users"></i>
        </div>

        <div class="confirm-content">
          <span class="confirm-label">Target audience</span>
          <span class="confirm-value">
            {{ store.form.target_audience || '—' }}
          </span>
        </div>
      </div>

      <div class="confirm-item">
        <div class="confirm-icon">
          <i class="fa-solid fa-tags"></i>
        </div>

        <div class="confirm-content">
          <span class="confirm-label">Main offer</span>
          <span class="confirm-value">
            {{ store.form.main_offer || '—' }}
          </span>
        </div>
      </div>

    </div>

    <!-- Error -->
    <v-alert
      v-if="store.error"
      type="error"
      variant="tonal"
      density="compact"
      class="mb-5"
    >
      {{ store.error }}
    </v-alert>

    <!-- Actions -->
   <div class="step-actions">
  <!-- <v-btn
    variant="text"
    class="back-btn"
    @click="store.goToStep(2)"
  >
    Back
  </v-btn> -->

  <v-btn
    color="primary"
    class="activate-btn bg-lci-gradient"
    :loading="store.isSubmitting"
    @click="handleFinish"
  >
    Activate My AI Sales Agent
  </v-btn>
</div>
  </v-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useOnboardingStore } from '@/stores/onboarding.store'

const router = useRouter()
const store = useOnboardingStore()

async function handleFinish() {
  try {
    await store.finishOnboarding()
    router.push('/dashboard')
  } catch {
    // Error is already handled by the store
  }
}
</script>

<style scoped>
.step-confirm {
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  box-sizing: border-box;
}

/* ================================
   Confirmation list
================================ */

.confirm-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
}

.confirm-item {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;

  gap: 14px;
  padding: 14px;

  border: 1px solid rgba(109, 40, 217, 0.12);
  border-radius: 12px;
  background: rgba(109, 40, 217, 0.025);
}

.confirm-icon {
  width: 38px;
  height: 38px;
  min-width: 38px;
  flex-shrink: 0;

  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(109, 40, 217, 0.1);
  color: #6d28d9;
}

.confirm-content {
  min-width: 0;
  flex: 1 1 auto;

  display: flex;
  flex-direction: column;
  gap: 3px;
}

.confirm-label {
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
}

.confirm-value {
  display: block;
  max-width: 100%;

  font-size: 14px;
  font-weight: 600;
  color: #1a0533;

  overflow-wrap: anywhere;
  word-break: break-word;
  white-space: normal;
}

/* ================================
   Actions
================================ */

.step-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;

  width: 100%;
  min-width: 0;
}

.back-btn {
  flex: 0 0 auto;
  flex-shrink: 0;
}

.activate-btn {
  flex: 1 1 auto;
  min-width: 0;
  max-width: 100%;

  white-space: normal !important;
  overflow-wrap: break-word;
}

/* ================================
   Mobile
================================ */

@media (max-width: 600px) {
  .step-confirm {
    width: 100%;
    padding: 18px !important;
  }

  /* Stack each confirmation item vertically */
  .confirm-list {
    display: flex !important;
    flex-direction: column !important;
    width: 100% !important;
  }

  .confirm-item {
    display: flex !important;
    flex-direction: row !important;
    width: 100% !important;
    box-sizing: border-box;
  }

  /* Stack the action buttons */
  .step-actions {
    display: flex !important;
    flex-direction: column !important;
    align-items: stretch !important;

    width: 100% !important;
    gap: 10px !important;
  }

  .back-btn,
  .activate-btn {
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    margin: 0 !important;
    flex: none !important;
  }

  .activate-btn {
    min-height: 48px;
    white-space: normal !important;
  }

  .back-btn {
    min-height: 44px;
  }

  .confirm-item {
    padding: 13px;
    gap: 11px;
  }

  .confirm-icon {
    width: 34px;
    height: 34px;
    min-width: 34px;
    font-size: 13px;
  }

  .confirm-value {
    font-size: 13px;
  }
}

/* ================================
   Extra small phones
================================ */

@media (max-width: 380px) {
  .step-confirm {
    padding: 14px !important;
  }

  .confirm-item {
    padding: 11px;
    gap: 10px;
  }

  .confirm-icon {
    width: 32px;
    height: 32px;
    min-width: 32px;
  }
}
</style>
