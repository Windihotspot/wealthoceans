// src/types/auth.types.ts

export interface AppUser {
  id: string
  email: string
  name: string | null
  role: 'admin' | 'marketer' | string
  is_owner: boolean
  organization_id: string | null
  created_at: string
}

export interface SignUpPayload {
  email: string
  password: string
  full_name: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface OnboardingStatus {
  step: number
  completed: boolean
}

export interface CurrentUserResponse {
  user: AppUser
  organization: Organization | null
  onboarding: OnboardingStatus
}

// Re-declared here (kept in sync with organization.types.ts) so this
// file has no cross-import surprises when copy-pasted into Claude Code.
import type { Organization } from './organization.types'