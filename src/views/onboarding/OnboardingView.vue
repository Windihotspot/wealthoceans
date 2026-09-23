<template>
  <AuthSplitLayout
    :logo-src="logoSrc"
    :illustration-src="illustrationSrc"
    :headline="leftCopy.headline"
    :subtext="leftCopy.subtext"
    :steps="4"
    :active-step="onboardingStore.currentStep - 1"
  >
    <!-- Progress bar + Step indicator -->
    <div class="d-flex align-center justify-space-between mb-2">
      <span class="progress-label">Step {{ onboardingStore.currentStep }} of 4</span>
    </div>
    <v-progress-linear
      :model-value="(onboardingStore.currentStep / 4) * 100"
      color="primary"
      height="6"
      rounded
      class="mb-8"
    />

    <!-- Step transitions -->
    <transition name="fade" mode="out-in">
      <StepBusinessInfo v-if="onboardingStore.currentStep === 1" key="1" />
      <StepOfferDetails v-else-if="onboardingStore.currentStep === 2" key="2" />
      <StepCommunicationStyle v-else-if="onboardingStore.currentStep === 3" key="3" />
      <StepConfirm v-else key="4" />
    </transition>
  </AuthSplitLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useOnboardingStore } from '@/stores/onboarding.store'
import AuthSplitLayout from '@/layouts/AuthSplitLayout.vue'
import StepBusinessInfo from './steps/StepBusinessInfo.vue'
import StepOfferDetails from './steps/StepOfferDetails.vue'
import StepCommunicationStyle from './steps/StepcommunicationStyle.vue'
import StepConfirm from './steps/StepConfirm.vue'

import logoSrc from '@/assets/wealthoceans.jpeg'
import illustrationSrc from '@/assets/onboarding-illustration.jpg'

const onboardingStore = useOnboardingStore()

const leftCopy = computed(() => {
  switch (onboardingStore.currentStep) {
    case 1:
      return {
        headline: 'Set Up Your AI Sales Closer',
        subtext: "Tell us who you are — we'll have LCI live in under 5 minutes."
      }
    case 2:
      return {
        headline: 'Teach LCI Your Offer',
        subtext: 'The more it knows about your offer and audience, the better it closes.'
      }
    case 3:
      return {
        headline: 'Teach LCI Your Voice',
        subtext: 'We capture your communication style so LCI sounds like you.'
      }
    default:
      return {
        headline: "You're Almost Live",
        subtext: 'One click and your AI closer starts working every channel, every hour.'
      }
  }
})
</script>

<style scoped>
.progress-label {
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>