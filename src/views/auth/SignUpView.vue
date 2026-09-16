<template>
  <AuthSplitLayout
    :logo-src="logoSrc"
    :illustration-src="illustrationSrc"
    headline="Easy to Use Dashboard"
    subtext="Set up LCI once and let your AI closer handle every lead, on every channel, 24/7."
  >
    <h1 class="form-title">Create Your Account</h1>

    <!-- <v-btn
      block
      variant="outlined"
      size="large"
      class="google-btn mb-4"
      @click="handleGoogleSignup"
    >
      <i class="fa-brands fa-google mr-2" /> Sign Up with Google
    </v-btn> -->



    <v-form @submit.prevent="handleSubmit" ref="formRef">
    
<v-text-field
  v-model="fullName"
  v-bind="fieldProps"
  placeholder="Your Name"
  :rules="[required]"
  class="mb-3"
>
  <template #prepend-inner>
    <i class="fa-regular fa-user"></i>
  </template>
</v-text-field>

<v-text-field
  v-model="email"
  v-bind="fieldProps"
  placeholder="Your Email"
  type="email"
  :rules="[required, emailRule]"
  class="mb-3"
>
  <template #prepend-inner>
    <i class="fa-regular fa-envelope"></i>
  </template>
</v-text-field>

<v-text-field
  v-model="password"
  v-bind="fieldProps"
  placeholder="Password"
  :type="showPassword ? 'text' : 'password'"
  :rules="[required, minLength]"
  class="mb-1"
>
  <template #prepend-inner>
    <i class="fa-solid fa-lock"></i>
  </template>

  <template #append-inner>
    <i
      :class="showPassword
        ? 'fa-regular fa-eye-slash'
        : 'fa-regular fa-eye'"
      class="password-toggle"
      @click="showPassword = !showPassword"
    ></i>
  </template>
</v-text-field>

      <p class="hint-text mb-3">Must be 8 characters at least</p>

      <v-checkbox v-model="agreedToTerms" density="compact" hide-details class="mb-2" :rules="[mustAgree]">
        <template #label>
          <span class="text-body-2 text-medium-emphasis">
            I agree to the
            <a href="#" class="terms-link" @click.stop>Terms &amp; Conditions</a>
          </span>
        </template>
      </v-checkbox>

      <v-alert v-if="authStore.error" type="error" variant="tonal" density="compact" class="mb-4">
        {{ authStore.error }}
      </v-alert>

      <v-alert v-if="signupSuccess" type="success" variant="tonal" density="compact" class="mb-4">
        Check your inbox to confirm your email, then sign in.
      </v-alert>

      <v-btn
        type="submit"
        block
        size="large"
        class="register-btn"
        :loading="authStore.isLoading"
      >
        Register
      </v-btn>
    </v-form>

    <p class="footer-text">
      Already have an account?
      <router-link to="/login" class="footer-link">Sign In</router-link>
    </p>
  </AuthSplitLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import { supabase } from '@/services/supabase'
import AuthSplitLayout from '@/layouts/AuthSplitLayout.vue'

// Swap these for your actual asset filenames in src/assets
import logoSrc from '@/assets/wealthoceans.jpeg'
import illustrationSrc from '@/assets/onboarding-illustration.jpg'

const router = useRouter()
const authStore = useAuthStore()

const formRef = ref()
const fullName = ref('')
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const agreedToTerms = ref(false)
const signupSuccess = ref(false)

// shared visual style for every field on this screen — matches the
// flat, rounded, light-grey "pill" inputs in the reference design
const fieldProps = {
  variant: 'outlined' as const,
  rounded: 'lg' as const,
  density: 'comfortable' as const,
  color: 'primary',
  baseColor: '#D9D9E2',
  hideDetails: 'auto' as const
}

const required = (v: string) => !!v || 'Required'
const minLength = (v: string) => v.length >= 8 || 'At least 8 characters'
const emailRule = (v: string) => /.+@.+\..+/.test(v) || 'Enter a valid email'
const mustAgree = (v: boolean) => v || 'You must agree to continue'



async function handleSubmit() {
  router.push('/onboarding')
}

async function handleGoogleSignup() {
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${window.location.origin}/onboarding` }
  })
}
</script>

<style scoped>
.password-toggle {
  cursor: pointer;
}
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

.hint-text {
  font-size: 12px;
  color: #9ca3af;
}

.terms-link {
  color: #7c2fe0;
  font-weight: 500;
  text-decoration: none;
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
