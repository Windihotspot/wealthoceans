// src/services/onboarding.service.ts
// Calls the onboarding edge functions using your existing ApiService
// (axios instance with the Supabase JWT already attached).

import ApiService from '@/services/api.service'
import type {
  CreateOrganizationPayload,
  SaveBusinessProfilePayload,
  Organization
} from '@/types/organization.types'
import type { CurrentUserResponse } from '@/types/auth.types'

const OnboardingService = {
  createOrganization(payload: CreateOrganizationPayload) {
    return ApiService.post<{ organization: Organization }>(
      '/onboarding-create-organization',
      payload
    )
  },

  saveBusinessProfile(payload: SaveBusinessProfilePayload) {
    return ApiService.post<{ organization: Organization }>(
      '/onboarding-save-business-profile',
      payload
    )
  },

  completeOnboarding() {
    return ApiService.post<{ organization: Organization }>('/onboarding-complete', {})
  },

  getCurrentUser() {
    return ApiService.get<CurrentUserResponse>('/get-current-user')
  }
}

export default OnboardingService