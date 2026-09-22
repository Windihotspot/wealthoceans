// src/stores/onboarding.store.ts (UPDATED)

import { defineStore } from 'pinia'
import OnboardingService from '@/services/onboarding.service'

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
    communication_style: string
    tone_preference: string
    key_phrases: string
    pitch_example: string
    unique_selling_language: string
  }
}

export const useOnboardingStore = defineStore('onboarding', {
  state: (): OnboardingState => ({
    currentStep: 3,
    isSubmitting: false,
    error: null,

    form: {
      organization_name: '',
      website: '',
      industry: '',
      business_description: '',
      target_audience: '',
      main_offer: '',
      monthly_ad_budget: null,
      communication_style: '',
      tone_preference: '',
      key_phrases: '',
      pitch_example: '',
      unique_selling_language: ''
    }
  }),

  actions: {
    // Step 1 → Step 2: Create organization
    async submitBusinessSetup() {
      this.error = null
      this.isSubmitting = true
      try {
        await OnboardingService.createOrganization({
          organization_name: this.form.organization_name,
          website: this.form.website,
          industry: this.form.industry
        })
        this.currentStep = 2
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Failed to create organization'
        throw err
      } finally {
        this.isSubmitting = false
      }
    },

    // Step 2 → Step 3: Save offer details
    async submitOfferDetails() {
      this.error = null
      this.isSubmitting = true
      try {
        await OnboardingService.saveBusinessProfile({
          business_description: this.form.business_description,
          target_audience: this.form.target_audience,
          main_offer: this.form.main_offer,
          monthly_ad_budget: this.form.monthly_ad_budget
        })
        this.currentStep = 3
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Failed to save business profile'
        throw err
      } finally {
        this.isSubmitting = false
      }
    },

    // Step 3 → Step 4: Save communication style
    async submitCommunicationStyle() {
      this.error = null
      this.isSubmitting = true
      try {
        await OnboardingService.saveCommunicationStyle({
          communication_style: this.form.communication_style,
          tone_preference: this.form.tone_preference,
          key_phrases: this.form.key_phrases,
          pitch_example: this.form.pitch_example,
          unique_selling_language: this.form.unique_selling_language
        })
        this.currentStep = 4
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Failed to save communication profile'
        throw err
      } finally {
        this.isSubmitting = false
      }
    },

    // Step 4: Final confirmation
    async finishOnboarding() {
      this.error = null
      this.isSubmitting = true
      try {
        await OnboardingService.completeOnboarding()
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Failed to complete onboarding'
        throw err
      } finally {
        this.isSubmitting = false
      }
    },

    // Navigate to specific step
    goToStep(step: number) {
      this.error = null
      this.currentStep = step
    }
  }
})