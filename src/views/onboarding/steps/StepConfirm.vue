<template>
  <div>
    <h1 class="form-title">You're Almost Live</h1>
    <p class="form-subtitle mb-6">
      Review what LCI knows so far. You can refine everything from your dashboard.
    </p>

    <div class="summary-list mb-5">
      <!-- Business Info Section -->
      <div class="summary-section-header">Business Profile</div>
      
      <div class="summary-row">
        <span class="summary-label">Business name</span>
        <span class="summary-value">{{ store.form.organization_name || '—' }}</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">Industry</span>
        <span class="summary-value">{{ store.form.industry || '—' }}</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">Description</span>
        <span class="summary-value">{{ truncate(store.form.business_description) || '—' }}</span>
      </div>

      <!-- Offer Section -->
      <div class="summary-section-header">Your Offer</div>
      
      <div class="summary-row">
        <span class="summary-label">Target audience</span>
        <span class="summary-value">{{ truncate(store.form.target_audience) || '—' }}</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">Main offer</span>
        <span class="summary-value">{{ truncate(store.form.main_offer) || '—' }}</span>
      </div>
      <div class="summary-row" v-if="store.form.monthly_ad_budget">
        <span class="summary-label">Monthly budget</span>
        <span class="summary-value">${{ store.form.monthly_ad_budget }}</span>
      </div>

      <!-- Communication Style Section -->
      <div class="summary-section-header">How LCI Will Sound</div>
      
      <div class="summary-row">
        <span class="summary-label">Communication style</span>
        <span class="summary-value">{{ store.form.communication_style || '—' }}</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">Tone preference</span>
        <span class="summary-value">{{ store.form.tone_preference || '—' }}</span>
      </div>
      <div class="summary-row" v-if="store.form.key_phrases">
        <span class="summary-label">Key phrases</span>
        <span class="summary-value">{{ truncate(store.form.key_phrases) }}</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">Your pitch</span>
        <span class="summary-value">{{ truncate(store.form.pitch_example) || '—' }}</span>
      </div>
    </div>

    <v-alert v-if="store.error" type="error" variant="tonal" density="compact" class="mb-4">
      {{ store.error }}
    </v-alert>

    <div class="d-flex ga-3">
      <!-- Uncomment if you want a back button -->
      <!-- <v-btn variant="text" class="text-none" @click="store.goToStep(3)">Back</v-btn> -->
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

function truncate(text: string | undefined, length: number = 60): string {
  if (!text) return ''
  return text.length > length ? text.substring(0, length) + '...' : text
}

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
  line-height: 1.5;
}

.summary-list {
  border: 1px solid #eef0f4;
  border-radius: 12px;
  overflow: hidden;
}

.summary-section-header {
  background: #f9fafb;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  font-size: 11px;
  font-weight: 700;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 16px;
  border-bottom: 1px solid #f3f4f6;
  background: #fafafc;
  align-items: flex-start;
}

.summary-row:last-of-type {
  border-bottom: none;
}

.summary-label {
  font-size: 12px;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  flex-shrink: 0;
}

.summary-value {
  font-size: 13px;
  color: #374151;
  font-weight: 500;
  text-align: right;
  flex: 1;
  word-break: break-word;
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