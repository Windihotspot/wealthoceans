<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
    <!-- Navigation Bar -->
   <Navbar />

    <!-- Hero Section -->
    <section id="form" class="relative overflow-hidden pt-20 pb-32">
      <div class="absolute inset-0 bg-cover bg-center"></div>
      <div
        class="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-900/20 to-slate-950/40"
      ></div>

      <div class="relative max-w-7xl mx-auto px-6 py-12">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Left Column -->
          <div data-aos="fade-up" data-aos-duration="800" class="space-y-8">
            <!-- Badge -->
            <div
              class="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 border border-purple-600/40 rounded-full"
            >
              <span class="text-purple-400 text-sm font-semibold uppercase tracking-wide"
                >🚀 Lead Conversion Infrastructure</span
              >
            </div>

            <!-- Main Heading -->
            <div class="space-y-4">
              <h1 class="text-5xl lg:text-6xl font-bold text-white leading-tight">
                Stop Losing Buyers
                <br />
                <span
                  class="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent"
                >
                  the Moment They Show Interest
                </span>
              </h1>
            </div>

            <!-- Subheading -->
            <p class="text-lg text-gray-300 leading-relaxed max-w-md">
              Most businesses don't lose sales because of bad offers. They lose them because
              <span class="text-white font-semibold"
                >nothing happens when interest is highest.</span
              >
            </p>

            <!-- Problem & Solution -->
            <div class="space-y-4">
              <p class="text-gray-300">
                That gap is where hot leads go cold because no one followed up, no one answered the
                objection, and no one closed.
              </p>
              <p class="text-gray-300">
                Meet
                <span class="font-semibold text-purple-400"
                  >LCI (Lead Conversion Infrastructure)</span
                >
                — the AI Sales Closer built to actually sell. It qualifies your leads, follows up
                with them, handles their objections, and closes them into paying customers.
              </p>
            </div>

            <!-- Stats Row -->
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="800"
              class="grid grid-cols-2 gap-4 py-4 border-t border-b border-slate-700"
            >
              <div>
                <p class="text-2xl font-bold text-purple-400">7×</p>
                <p class="text-sm text-gray-400">Higher response rate</p>
              </div>
              <div>
                <p class="text-2xl font-bold text-purple-400">24/7</p>
                <p class="text-sm text-gray-400">Qualifying & closing</p>
              </div>
            </div>
          </div>

          <!-- Right Column: Form -->
          <div data-aos="fade-up" data-aos-delay="300" data-aos-duration="800" class="relative">
            <div class="hidden lg:block mt-8">
              <WaitlistCard />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-slate-900/50 border-y border-slate-800">
      <div class="max-w-7xl mx-auto px-6">
        <div data-aos="fade-up" data-aos-duration="800" class="text-center mb-16">
          <h2 class="text-4xl font-bold text-white mb-4">
            The Intelligent Conversion Infrastructure
          </h2>
          <p class="text-gray-400 max-w-2xl mx-auto">
            LCI works 24/7 across your website, ads, and social DMs — even when your team is offline
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div data-aos="fade-up" data-aos-delay="0" data-aos-duration="800" class="relative group">
            <div
              class="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-purple-900/10 rounded-2xl blur-xl group-hover:blur-2xl transition"
            ></div>
            <div
              class="relative bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-2xl p-8 h-full"
            >
              <div
                class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4"
              >
                <i class="fa-solid fa-zap text-white"></i>
              </div>
              <h3 class="text-xl font-bold text-white mb-3">Instant Response</h3>
              <p class="text-gray-400">
                Respond to leads instantly, even at 3 AM. Never miss a hot moment again.
              </p>
            </div>
          </div>

          <!-- Feature 2 -->
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="800"
            class="relative group"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-purple-900/10 rounded-2xl blur-xl group-hover:blur-2xl transition"
            ></div>
            <div
              class="relative bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-2xl p-8 h-full"
            >
              <div
                class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4"
              >
                <i class="fa-solid fa-brain text-white"></i>
              </div>
              <h3 class="text-xl font-bold text-white mb-3">Intelligent Qualifying</h3>
              <p class="text-gray-400">
                AI asks the right questions. Disqualifies time-wasters. Focuses on real buyers.
              </p>
            </div>
          </div>

          <!-- Feature 3 -->
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="800"
            class="relative group"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-purple-900/10 rounded-2xl blur-xl group-hover:blur-2xl transition"
            ></div>
            <div
              class="relative bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-2xl p-8 h-full"
            >
              <div
                class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4"
              >
                <i class="fa-solid fa-handshake text-white"></i>
              </div>
              <h3 class="text-xl font-bold text-white mb-3">Close on Autopilot</h3>
              <p class="text-gray-400">
                Handles objections. Builds urgency. Converts leads into paying customers
                automatically.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-6">
        <div data-aos="fade-up" data-aos-duration="800" class="text-center mb-16">
          <h2 class="text-4xl font-bold text-white mb-4">What You Get</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            data-aos="fade-right"
            data-aos-delay="0"
            data-aos-duration="800"
            class="flex gap-4 p-6 bg-slate-800/30 border border-slate-700/50 rounded-xl"
          >
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center h-10 w-10 rounded-lg bg-purple-600/20">
                <i class="fa-solid fa-check text-purple-400"></i>
              </div>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-white">No Missed Follow-ups</h3>
              <p class="text-gray-400 text-sm mt-1">
                Every lead gets followed up, automatically and persistently.
              </p>
            </div>
          </div>

          <div
            data-aos="fade-left"
            data-aos-delay="0"
            data-aos-duration="800"
            class="flex gap-4 p-6 bg-slate-800/30 border border-slate-700/50 rounded-xl"
          >
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center h-10 w-10 rounded-lg bg-purple-600/20">
                <i class="fa-solid fa-check text-purple-400"></i>
              </div>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-white">No Poor Conversions</h3>
              <p class="text-gray-400 text-sm mt-1">
                AI handles objections with proven sales tactics.
              </p>
            </div>
          </div>

          <div
            data-aos="fade-right"
            data-aos-delay="100"
            data-aos-duration="800"
            class="flex gap-4 p-6 bg-slate-800/30 border border-slate-700/50 rounded-xl"
          >
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center h-10 w-10 rounded-lg bg-purple-600/20">
                <i class="fa-solid fa-check text-purple-400"></i>
              </div>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-white">No Wasted Ad Spend</h3>
              <p class="text-gray-400 text-sm mt-1">
                Every lead you pay for actually gets converted into revenue.
              </p>
            </div>
          </div>

          <div
            data-aos="fade-left"
            data-aos-delay="100"
            data-aos-duration="800"
            class="flex gap-4 p-6 bg-slate-800/30 border border-slate-700/50 rounded-xl"
          >
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center h-10 w-10 rounded-lg bg-purple-600/20">
                <i class="fa-solid fa-check text-purple-400"></i>
              </div>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-white">Omnichannel Coverage</h3>
              <p class="text-gray-400 text-sm mt-1">
                Works across your website, ads, and social DMs seamlessly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section
      class="py-20 bg-gradient-to-r from-purple-950/30 to-slate-950 border-y border-slate-800"
    >
      <div class="max-w-4xl mx-auto px-6 text-center">
        <div data-aos="fade-up" data-aos-duration="800" class="space-y-8">
          <h2 class="text-4xl lg:text-5xl font-bold text-white">
            Your Leads Are Dying in Your DMs
            <span
              class="bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent"
            >
              Right Now.
            </span>
          </h2>

          <p class="text-xl text-gray-300 max-w-2xl mx-auto">
            Don't wait. Join the waitlist today and be the first to access LCI when it launches.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#form"
              class="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold rounded-xl transition transform hover:scale-105"
            >
              Join the Waitlist
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
     <footer class="border-t border-white/5 px-5 py-10 sm:px-8">
      <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <p class="text-xs text-white/40">
          © {{ new Date().getFullYear() }} Wealth Oceans Technologies. All rights reserved.
        </p>
        <div class="flex gap-5 text-xs text-white/50">
          <router-link to="/about" class="transition hover:text-white">About us</router-link>
          <router-link to="/waitlist" class="transition hover:text-white">Waitlist</router-link>
          <router-link to="/product" class="transition hover:text-white">Product</router-link>
          <router-link to="/how-it-works" class="transition hover:text-white"
            >How It Works</router-link
          >
          <router-link to="/pricing" class="transition hover:text-white">Pricing</router-link>
          <router-link to="/faq" class="transition hover:text-white">FAQ</router-link>
          <router-link to="/pricing" class="transition hover:text-white">Training</router-link>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import confetti from 'canvas-confetti'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { supabase } from '@/services/supabase'
import WaitlistCard from '@/components/WaitlistCard.vue'
import Navbar from '@/components/Navbar.vue'

const firstName = ref('')
const whatsappNumber = ref('')
const email = ref('')

const formRef = ref()
const isValid = ref(false)
const loading = ref(false)
const success = ref(false)
const errorMessage = ref('')

const ORG_ID = 'YOUR-ORG-ID'

// Validation rules
const nameRules = [
  (v: string) => !!v || 'Your name is required',
  (v: string) => v.length >= 2 || 'Name must be at least 2 characters'
]

const phoneRules = [
  (v: string) => !!v || 'WhatsApp number is required',
  (v: string) => /^[\d\s+()-]*$/.test(v) || 'Enter a valid phone number'
]

const emailRules = [
  (v: string) => !!v || 'Email is required',
  (v: string) => /.+@.+\..+/.test(v) || 'Enter a valid email'
]

// Confetti celebration
const fireConfetti = () => {
  confetti({
    particleCount: 120,
    spread: 70,
    origin: { y: 0.6 }
  })
}

// Join waitlist function
const joinWaitlist = async () => {
  errorMessage.value = ''
  success.value = false

  const valid = await formRef.value.validate()
  if (!valid) return

  loading.value = true

  const payload = {
    p_first_name: firstName.value,
    p_email: email.value,
    p_phone: whatsappNumber.value,
    p_source: 'waitlist_page'
  }

  try {
    const { data, error } = await supabase.rpc('add_waitlist_lead', payload)

    if (error) throw error

    if (data?.status === 'exists') {
      errorMessage.value = 'You are already on the waitlist.'
      return
    }

    // Success
    success.value = true
    fireConfetti()

    // Clear fields
    firstName.value = ''
    whatsappNumber.value = ''
    email.value = ''

    // Reset form
    setTimeout(() => {
      formRef.value.reset()
    }, 2000)
  } catch (err) {
    errorMessage.value = 'Something went wrong. Please try again.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

// Initialize AOS on mount
onMounted(() => {
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: false,
    mirror: true
  })
})
</script>

<style scoped>
:deep(.v-field__input) {
  color: #ffffff !important;
}

:deep(.v-field__outline) {
  --v-border-opacity: 0.3;
  color: rgba(148, 163, 184, 0.3) !important;
}

:deep(.v-field:hover .v-field__outline) {
  color: rgba(168, 85, 247, 0.5) !important;
}

:deep(.v-field--focused .v-field__outline) {
  color: rgba(168, 85, 247, 0.8) !important;
}

:deep(.v-label) {
  color: #d1d5db !important;
}

:deep(.v-field--error .v-field__outline) {
  color: rgba(239, 68, 68, 0.8) !important;
}

:deep(.v-progress-circular) {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}
</style>
