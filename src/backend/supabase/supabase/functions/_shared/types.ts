// _shared/types.ts

export interface CreateOrganizationPayload {
  organization_name: string
  website?: string
  industry?: string
}

export interface SaveBusinessProfilePayload {
  business_description: string
  target_audience: string
  main_offer: string
  monthly_ad_budget?: number
}

export interface OnboardingStatusResponse {
  onboarding_step: number
  onboarding_completed: boolean
  organization: Record<string, unknown> | null
}

export interface SaveCommunicationStylePayload {
  communication_style: string
  tone_preference: string
  key_phrases?: string
  pitch_example: string
  unique_selling_language?: string
}
 
export interface AuthenticatedUser {
  id: string
  email: string
  aud?: string
}