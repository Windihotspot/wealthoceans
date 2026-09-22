// src/stores/auth.store.ts
import { defineStore } from 'pinia'
import AuthService from '@/services/auth.service'
import OnboardingService from '@/services/onboarding.service'
import type { AppUser, LoginPayload, OnboardingStatus, SignUpPayload } from '@/types/auth.types'
import type { Organization } from '@/types/organization.types'

interface AuthState {
  user: AppUser | null
  organization: Organization | null
  onboarding: OnboardingStatus | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  initialized: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    organization: null,
    onboarding: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    initialized: false
  }),

  getters: {
    needsOnboarding: (state) => state.isAuthenticated && state.onboarding?.completed === false,
    ownerName: (state) => state.user?.name ?? state.user?.email?.split('@')[0] ?? ''
  },

  actions: {
    async signUp(payload: SignUpPayload) {
  this.isLoading = true
  this.error = null

  try {
    const data = await AuthService.signUp(payload)

    console.log('[auth] Signup successful')
    console.log('[auth] User ID:', data.user?.id)
    console.log('[auth] Session exists:', !!data.session)

    return data
  } catch (err: any) {
    this.error = err.message ?? 'Sign up failed'
    throw err
  } finally {
    this.isLoading = false
  }
},

    async login(payload: LoginPayload) {
      this.isLoading = true
      this.error = null
      try {
        await AuthService.login(payload)
        await this.fetchCurrentUser()
      } catch (err: any) {
        this.error = err.message ?? 'Login failed'
        throw err
      } finally {
        this.isLoading = false
      }
    },

    async logout() {
      await AuthService.logout()
      this.$reset()
    },

    /** Pulls user + organization + onboarding status from the backend. */
    async fetchCurrentUser() {
      const session = await AuthService.getSession()
      if (!session) {
        this.isAuthenticated = false
        this.initialized = true
        return
      }

      try {
        const { user, organization, onboarding } = await OnboardingService.getCurrentUser()
        this.user = user
        this.organization = organization
        this.onboarding = onboarding
        this.isAuthenticated = true
      } catch (err) {
        this.isAuthenticated = false
        throw err
      } finally {
        this.initialized = true
      }
    },

    /** Call once on app boot (e.g. in App.vue or a router guard). */
    async initAuthListener() {
      AuthService.onAuthStateChange(async (_event, session) => {
        if (session) {
          await this.fetchCurrentUser()
        } else {
          this.$reset()
          this.initialized = true
        }
      })
      await this.fetchCurrentUser()
    },

    setOrganization(org: Organization) {
      this.organization = org
      this.onboarding = {
        step: org.onboarding_step,
        completed: org.onboarding_completed
      }
    }
  }
})