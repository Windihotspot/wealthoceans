
import { defineStore } from 'pinia'

interface OnboardingState {
  currentStep: number
  isSubmitting: boolean
  error: string | null

  form: {
    organization_name: string
    website: string
    industry: string
    business_description: string
    target_audience: string
    main_offer: string
    monthly_ad_budget: number | null
  }
}

export const useOnboardingStore = defineStore('onboarding', {
  state: (): OnboardingState => ({
    currentStep: 1,

    isSubmitting: false,

    error: null,

    form: {
      organization_name: '',
      website: '',
      industry: '',
      business_description: '',
      target_audience: '',
      main_offer: '',
      monthly_ad_budget: null
    }
  }),

  actions: {
    // Step 1 → Step 2
    submitBusinessSetup() {
      this.error = null
      this.currentStep = 2
    },

    // Step 2 → Step 3
    submitOfferDetails() {
      this.error = null
      this.currentStep = 3
    },

    // Final step
    finishOnboarding() {
      this.error = null
      return true
    },

    // Used by Back buttons
    goToStep(step: number) {
      this.error = null
      this.currentStep = step
    }
  }
})

