// src/types/organization.types.ts

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

export const INDUSTRY_OPTIONS = [
  'Coaching & Consulting',
  'SaaS / Software',
  'Real Estate',
  'E-commerce',
  'Info Products / Courses',
  'Agency',
  'Other'
] as const