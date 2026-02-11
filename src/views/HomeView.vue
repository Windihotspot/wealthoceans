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

          <ul class="space-y-2 text-gray-700">
            <li>✅ No missed follow-ups</li>
            <li>✅ No poor conversions</li>
            <li>✅ No wasted ad spend</li>
          </ul>
        </div>

        <!-- Brand -->
        <div class="mt-10">
          <p class="font-bold text-gray-900">Wealth Oceans Technologies Ltd</p>
          <p class="text-sm text-gray-600">Lead. Nurture. Convert. With AI</p>
        </div>
      </div>

      <!-- RIGHT COLUMN: Waitlist Card -->
      <div class="bg-white/90 backdrop-blur-xl rounded-3xl p-10 shadow-xl border border-white/40">
        <h2 class="text-2xl font-bold mb-4">Join the waitlist</h2>

        <p class="text-sm text-gray-600 mb-6">Enter your email to get early access.</p>

        <!-- Email Input -->
        <div class="flex gap-2 mb-8">
          <v-text-field
            v-model="email"
            placeholder="you@company.com"
            variant="outlined"
            hide-details
            class="flex-1"
          />

          <!-- <v-btn
            class="bg-[#643568] custom-btn text-white font-semibold px-6 rounded-lg"
            height="52"
            @click="joinWaitlist"
          >
            Join
          </v-btn> -->
        </div>

        <!-- Early Access Benefits -->
        <div class="space-y-5">
          <div class="flex gap-3">
            <span class="text-purple-600 text-xl">⚡</span>
            <span class="font-medium">First access at launch</span>
          </div>

          <div class="flex gap-3">
            <span class="text-purple-600 text-xl">🚀</span>
            <span class="font-medium">Priority onboarding</span>
          </div>

          <div class="flex gap-3">
            <span class="text-purple-600 text-xl">💸</span>
            <span class="font-medium">37% early-access discount</span>
          </div>

          <div class="flex gap-3">
            <span class="text-purple-600 text-xl">📩</span>
            <span class="font-medium">
              Free practical marketing emails to generate and nurture leads
            </span>
          </div>
        </div>

        <!-- Primary CTA Button -->
        <v-btn
          block
          class="bg-purple-600 text-white font-semibold mt-8 rounded-xl"
          height="52"
          @click="joinWaitlist"
        >
          Join the Waitlist
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')

const joinWaitlist = () => {
  console.log('Waitlist email:', email.value)
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
