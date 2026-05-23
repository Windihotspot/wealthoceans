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
          🚀 AI-Powered Lead Conversion Infrastructure
        </div>

        <h1 class="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
          Stop Losing Leads <br />
          <span
            class="bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent"
          >
            the Moment They Show Interest.
          </span>
        </h1>

        <!-- Mobile only -->
        <div class="lg:hidden mt-8">
          <WaitlistCard />
        </div>

        <p class="text-lg md:text-xl text-gray-700 mt-4 mb-8">
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
            We call it the Intelligent Conversion Infrastructure.
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
      <!-- Desktop only -->
      <div class="hidden lg:block mt-8">
        <WaitlistCard />
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import WaitlistCard from '@/components/WaitlistCard.vue'

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
