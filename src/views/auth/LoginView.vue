<template>
  <AuthSplitLayout
    :logo-src="logoSrc"
    :illustration-src="illustrationSrc"
    headline="Easy to Use Dashboard"
    subtext="Log back in and pick up right where your AI closer left off."
  >
    <h1 class="form-title">Welcome Back</h1>

    <!-- <v-btn block variant="outlined" size="large" class="google-btn mb-4" @click="handleGoogleLogin">
      <i class="fa-brands fa-google mr-2" /> Sign In with Google
    </v-btn> -->

    
    <v-form @submit.prevent="handleSubmit" ref="formRef">
      <v-text-field
  v-model="email"
  v-bind="fieldProps"
  placeholder="Your Email"
  type="email"
  :rules="[required]"
  class="auth-field mb-3"
>
  <template #prepend-inner>
    <i class="fa-regular fa-envelope text-gray-400"></i>
  </template>
</v-text-field>

<v-text-field
  v-model="password"
  v-bind="fieldProps"
  placeholder="Password"
  :type="showPassword ? 'text' : 'password'"
  :rules="[required]"
  class="auth-field mb-4"
>
  <template #prepend-inner>
    <i class="fa-solid fa-lock text-gray-400"></i>
  </template>

  <template #append-inner>
    <button
      type="button"
      class="flex cursor-pointer items-center"
      @click="showPassword = !showPassword"
    >
      <i
        :class="
          showPassword
            ? 'fa-regular fa-eye-slash'
            : 'fa-regular fa-eye'
        "
        class="text-gray-400 transition hover:text-gray-600"
      ></i>
    </button>
  </template>
</v-text-field>
      <v-alert v-if="authStore.error" type="error" variant="tonal" density="compact" class="mb-4">
        {{ authStore.error }}
      </v-alert>

      <v-btn type="submit" block size="large" class="register-btn" :loading="authStore.isLoading">
        Log In
      </v-btn>
    </v-form>

    <p class="footer-text">
      New to LCI?
      <router-link to="/signup" class="footer-link">Create an account</router-link>
    </p>
  </AuthSplitLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import { supabase } from '@/services/supabase'
import AuthSplitLayout from '@/layouts/AuthSplitLayout.vue'

import logoSrc from '@/assets/wealthoceans-removebg-preview.png'
import illustrationSrc from '@/assets/onboarding-illustration.jpg'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const formRef = ref()
const email = ref('')
const password = ref('')
const showPassword = ref(false)

const fieldProps = {
  variant: 'outlined' as const,
  rounded: 'md' as const,
  density: 'compact' as const,
  color: 'purple',
  baseColor: '#D9D9E2',
  hideDetails: 'auto' as const
}
const required = (v: string) => !!v || 'Required'



async function handleSubmit() {
  const { valid } = await formRef.value.validate()

  if (!valid) return

  try {
    await authStore.login({
      email: email.value,
      password: password.value
    })

    const redirect = (route.query.redirect as string) || null

    if (authStore.needsOnboarding) {
      await router.push({ name: 'onboarding' })
      return
    }

    if (redirect) {
      await router.push({
        path: redirect,
        query: {
          welcome: 'true'
        }
      })
      return
    }

    await router.push({
      name: 'dashboard',
      query: {
        welcome: 'true'
      }
    })
  } catch (error) {
    console.error('[login] Login failed:', error)
  }
}

async function handleGoogleLogin() {
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${window.location.origin}/` }
  })
}
</script>

<style scoped>
.form-title {
  font-size: 22px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 24px;
}
.google-btn {
  border-color: #e5e7eb !important;
  color: #374151;
  text-transform: none;
  font-weight: 500;
  border-radius: 12px !important;
}
.divider-row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.divider-row .line {
  flex: 1;
  height: 1px;
  background: #e5e7eb;
}
.or-text {
  font-size: 12px;
  color: #9ca3af;
}
.register-btn {
  background: #6c4bf4 !important;
  color: #ffffff !important;
  border-radius: 12px !important;
  text-transform: none;
  font-weight: 600;
  height: 48px !important;
}
.footer-text {
  text-align: center;
  font-size: 13px;
  color: #6b7280;
  margin-top: 20px;
}
.footer-link {
  color: #6c4bf4;
  font-weight: 600;
  text-decoration: none;
}
</style>
