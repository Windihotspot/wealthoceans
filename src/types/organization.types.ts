export interface Organization {
  id: string
  name: string
  website: string | null
  industry: string | null
  slug: string | null
  logo_url: string | null
  business_description: string | null
  target_audience: string | null
  main_offer: string | null
  monthly_ad_budget: number | null
 // Communication profile fields ⭐ NEW
 communication_style: string | null
 tone_preference: string | null
 key_phrases: string | null
 pitch_example: string | null
  pitch_audio_url?: string 
 unique_selling_language: string | null
  // Onboarding tracking
  onboarding_step: number
  onboarding_completed: boolean
  onboarding_completed_at: string | null
  created_at: string
}

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

 export interface SaveCommunicationStylePayload {
   communication_style: string
   tone_preference: string
   key_phrases?: string
   pitch_example: string
    pitch_audio_url?: string 
   unique_selling_language?: string
 }

export const INDUSTRY_OPTIONS = [
  'Coaching & Consulting',
  'SaaS / Software',
  'Real Estate',
  'E-commerce',
  'Info Products / Courses',
  'Agency',
  'Other'
] as const

 export const COMMUNICATION_STYLE_OPTIONS = [
   'Formal & Professional',
   'Casual & Conversational',
   'Energetic & Playful',
   'Direct & No-Nonsense'
 ] as const

 export const TONE_PREFERENCE_OPTIONS = [
   'Professional',
   'Friendly',
   'Enthusiastic',
   'Empathetic',
   'Authoritative'
 ] as const

 // Type exports for form validation
 export type IndustryOption = typeof INDUSTRY_OPTIONS[number]
 export type CommunicationStyle = typeof COMMUNICATION_STYLE_OPTIONS[number]
 export type TonePreference = typeof TONE_PREFERENCE_OPTIONS[number]