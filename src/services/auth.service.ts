// src/services/auth.service.ts
// Thin wrapper around Supabase Auth. Session/token handling for API
// calls is already done in ApiService's axios interceptor — this file
// only owns sign up / login / logout / session reads.

import { supabase } from '@/services/supabase'
import type { LoginPayload, SignUpPayload } from '@/types/auth.types'

const AuthService = {
  async signUp({ email, password, full_name }: SignUpPayload) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name }
      }
    })
    if (error) throw error
    return data
  },

  async login({ email, password }: LoginPayload) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw error
    return data
  },

  async logout() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getSession() {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw error
    return data.session
  },

  onAuthStateChange(callback: Parameters<typeof supabase.auth.onAuthStateChange>[0]) {
    return supabase.auth.onAuthStateChange(callback)
  }
}

export default AuthService