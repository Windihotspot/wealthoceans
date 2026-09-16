<template>
  <div>
    <h1 class="form-title">You're Almost Live</h1>
    <p class="form-subtitle mb-6">
      Review what LCI knows so far. You can refine everything from your dashboard.
    </p>

    <div class="summary-list mb-5">
      <div class="summary-row">
        <span class="summary-label">Business name</span> <br>
        <span class="summary-value">{{ store.form.organization_name || '—' }}</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">Industry</span> <br>
        <span class="summary-value">{{ store.form.industry || '—' }}</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">Target audience</span> <br>
        <span class="summary-value">{{ store.form.target_audience || '—' }}</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">Main offer</span> <br>
        <span class="summary-value">{{ store.form.main_offer || '—' }}</span>
      </div>
    </div>

    <v-alert v-if="store.error" type="error" variant="tonal" density="compact" class="mb-4">
      {{ store.error }}
    </v-alert>

    <div class="d-flex ga-3">
      <!-- <v-btn variant="text" class="text-none" @click="store.goToStep(2)">Back</v-btn> -->
      <v-btn block size="large" class="register-btn" :loading="store.isSubmitting" @click="handleFinish">
        Activate My AI Sales Agent
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useOnboardingStore } from '@/stores/onboarding.store'

const router = useRouter()
const store = useOnboardingStore()

async function handleFinish() {
  try {
    await store.finishOnboarding()
    router.push({ name: 'dashboard' })
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
}
.summary-list {
  border: 1px solid #eef0f4;
  border-radius: 12px;
  overflow: hidden;
}
.summary-row {
  justify-content: space-between;
  gap: 16px;
  padding: 12px 16px;
  border-bottom: 1px solid #f3f4f6;
  background: #fafafc;
}
.summary-row:last-child {
  border-bottom: none;
}
.summary-label {
  font-size: 12px;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}
.summary-value {
  font-size: 13px;
  color: #111827;
  font-weight: 500;
  text-align: right;
}
.register-btn {
  background: #6c4bf4 !important;
  color: #ffffff !important;
  border-radius: 12px !important;
  text-transform: none;
  font-weight: 600;
  height: 48px !important;
}
</style>
