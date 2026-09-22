// src/services/onboarding.service.ts (UPDATED)

import ApiService from '@/services/api.service'
import type {
  CreateOrganizationPayload,
  SaveBusinessProfilePayload,
  SaveCommunicationStylePayload,
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

  saveCommunicationStyle(payload: SaveCommunicationStylePayload) {
    return ApiService.post<{ organization: Organization }>(
      '/onboarding-save-communication-style',
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