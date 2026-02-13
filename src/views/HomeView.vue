<template>
  <v-container
    fluid
    class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-indigo-50 to-blue-50"
  >
    <!-- Logo (Top Left Inside Container) -->
    <div class="absolute top-6 left-6 z-20 flex items-center">
      <img
        src="../assets/wealthoceans-removebg-preview.png"
        alt="Wealth Oceans"
        class="h-14 md:h-16 w-auto"
      />
    </div>

    <div class="w-full max-w-7xl px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <!-- LEFT COLUMN: Core Messaging -->
      <!-- LEFT COLUMN: Core Messaging (Enhanced) -->
      <div class="relative">
        <!-- Accent badge -->
        <div
          class="inline-flex items-center px-4 py-2 rounded-full bg-purple-600/10 text-purple-700 text-sm font-semibold mb-6"
        >
          🚀 AI-Powered Lead Conversion
        </div>

        <h1 class="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
          Stop Losing Leads <br />
          <span
            class="bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent"
          >
            the Moment They Show Interest.
          </span>
        </h1>

        <p class="text-lg md:text-xl text-gray-700 mb-8">
          Most businesses don’t lose sales because of bad offers. They lose them because
          <span class="font-semibold text-gray-900">
            nothing happens when interest is highest.
          </span>
        </p>

        <!-- Glass highlight card -->
        <div
          class="bg-white/60 backdrop-blur rounded-2xl p-6 mb-8 border border-white/40 shadow-sm"
        >
          <p class="text-gray-800 leading-relaxed mb-4">
            Wealth Oceans Technologies is launching an
            <span class="font-semibold text-purple-700"> AI-powered conversion system </span>
            that captures leads, responds instantly, asks the right questions, and follows up across
            your website, ads, and social DMs — even when your team is offline.
          </p>

          <p class="font-semibold text-gray-900 mb-3">
            We call it the Intelligent Conversion Layer.
          </p>

          <ul class="space-y-3 text-gray-700">
            <li class="flex items-center gap-3">
              <i class="fa-solid fa-circle-check text-purple-600"></i>

              <span>No missed follow-ups</span>
            </li>

            <li class="flex items-center gap-3">
              <i class="fa-solid fa-circle-check text-purple-600"></i>

              <span>No poor conversions</span>
            </li>

            <li class="flex items-center gap-3">
              <i class="fa-solid fa-circle-check text-purple-600"></i>

              <span>No wasted ad spend</span>
            </li>
          </ul>
        </div>

        <!-- Brand -->
        <div class="mt-10">
          <p class="font-bold text-gray-900">Wealth Oceans Technologies Ltd</p>
          <p class="text-sm text-gray-600">Lead. Nurture. Convert. With AI</p>
        </div>
      </div>

      <!-- RIGHT COLUMN: Waitlist Card -->
      <!-- RIGHT COLUMN: Waitlist Card -->
      <div class="bg-white/90 backdrop-blur-xl rounded-3xl p-10 shadow-xl border border-white/40">
        <h2 class="text-2xl font-bold mb-6">Join the waitlist</h2>

        <v-form ref="formRef" v-model="isValid" @submit.prevent="joinWaitlist">
          <!-- First Name -->
          <v-text-field
            v-model="firstName"
            label="First name"
            variant="outlined"
            :rules="nameRules"
            required
            class="mb-4"
          />

          <!-- Email -->
          <v-text-field
            v-model="email"
            label="Email address"
            variant="outlined"
            :rules="emailRules"
            required
            class="mb-6"
          />

          <!-- Benefits -->
          <div class="space-y-4 mb-6">
            <div class="flex gap-3"><span>⚡</span><span>First access at launch</span></div>
            <div class="flex gap-3"><span>🚀</span><span>Priority onboarding</span></div>
            <div class="flex gap-3"><span>💸</span><span>37% early-access discount</span></div>
            <div class="flex gap-3">
              <span>📩</span><span>Free marketing emails & insights</span>
            </div>
          </div>

          <!-- Submit -->
          <v-btn
            block
            type="submit"
            :loading="loading"
            class="bg-purple-600 text-white font-semibold rounded-xl"
            height="52"
          >
            Join the Waitlist
          </v-btn>
        </v-form>

        <!-- success message -->
        <v-alert v-if="success" type="success" variant="tonal" class="mt-6">
          🎉 You're on the waitlist! Check your inbox soon.
        </v-alert>

        <!-- error message -->
        <v-alert v-if="errorMessage" type="error" variant="tonal" class="mt-6">
          {{ errorMessage }}
        </v-alert>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import confetti from 'canvas-confetti'
import { supabase } from '@/services/supabase'

const firstName = ref('')
const email = ref('')

const formRef = ref()
const isValid = ref(false)
const loading = ref(false)
const success = ref(false)
const errorMessage = ref('')

// replace with your org UUID
const ORG_ID = 'YOUR-ORG-ID'

// ✅ validation rules
const nameRules = [
  (v: string) => !!v || 'Your name is required',
  (v: string) => v.length >= 2 || 'Name must be at least 2 characters'
]

const emailRules = [
  (v: string) => !!v || 'Email is required',
  (v: string) => /.+@.+\..+/.test(v) || 'Enter a valid email'
]

// 🎉 confetti celebration
const fireConfetti = () => {
  confetti({
    particleCount: 120,
    spread: 70,
    origin: { y: 0.6 }
  })
}

const joinWaitlist = async () => {
  errorMessage.value = ''
  success.value = false

  const valid = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  const payload = {
      org_id: ORG_ID,
      p_first_name: firstName.value,
      p_email: email.value
    }
    console.log("join waitlist payload:", payload)
  try {
    const { data, error } = await supabase.rpc('add_waitlist_lead', payload)

    if (error) throw error

    if (data.status === 'exists') {
      errorMessage.value = 'You are already on the waitlist.'
      return
    }

    success.value = true
    fireConfetti()

    firstName.value = ''
    email.value = ''

  } catch (err) {
    errorMessage.value = 'Something went wrong. Please try again.'
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>


<style scoped>
.v-btn {
  background-color: #63376a;
}
.custom-btn {
  background-color: #63376a;
}
</style>
