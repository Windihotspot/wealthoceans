<script setup lang="ts">
import { ref } from 'vue'

const mobileMenuOpen = ref(false)
const activeFaq = ref<number | null>(0)

const toggleFaq = (i: number) => {
  activeFaq.value = activeFaq.value === i ? null : i
}

const comparisonRows = [
  { label: 'Understands what the lead actually means', chatbot: false, crm: false, lci: true },
  { label: 'Adapts the conversation in real time', chatbot: false, crm: false, lci: true },
  { label: 'Handles objections like a human closer', chatbot: false, crm: false, lci: true },
  { label: 'Actually closes the sale', chatbot: false, crm: false, lci: true }
]

const integrations = [
  {
    step: '01',
    title: 'Market Intelligence Engine',
    desc: 'Feed it your business type, offer, and price point. It returns your ideal customer profile, their real pain points, the objections they\u2019ll raise, and the messaging angles that move them.'
  },
  {
    step: '02',
    title: 'Offer & Funnel Generator',
    desc: 'Builds and refines your offer stack \u2014 bonuses, urgency, guarantees \u2014 and maps the funnel from ad to lead magnet to close. Fully editable, fully versioned.'
  },
  {
    step: '03',
    title: 'AI Sales Agent \u2014 The Core Engine',
    desc: 'Asks the qualifying questions a trained closer would ask, detects real intent, handles objections with no dead ends, and sends payment links to close the sale.'
  },
  {
    step: '04',
    title: 'Omnichannel Orchestration',
    desc: 'A lead who found you on TikTok, followed on Instagram, then messaged on WhatsApp isn\u2019t three people. LCI carries full context and history across every platform.'
  },
  {
    step: '05',
    title: 'Lead Qualification System',
    desc: 'Every conversation is scored in real time \u2014 Cold, Warm, Hot \u2014 based on actual responses, budget signals, and urgency. No more guessing who to follow up with.'
  },
  {
    step: '06',
    title: 'Payment & Delivery Automation',
    desc: 'When a lead says yes, LCI sends the payment link (Stripe, Paystack, or Flutterwave), confirms the transaction, delivers access, and triggers your upsell.'
  },
  {
    step: '07',
    title: 'High-Ticket Closing System',
    desc: 'Pre-qualifies the lead, gates your calendar so only serious buyers can book, and syncs directly with Google Calendar or Calendly.'
  }
]

const channels = ['Website', 'WhatsApp', 'Instagram', 'Facebook', 'LinkedIn', 'TikTok']

const plans = [
  {
    name: 'Starter',
    price: '$97',
    tagline: 'For businesses just getting their first AI closer live.',
    features: [
      '2 channels (Website + WhatsApp, or Instagram + WhatsApp)',
      'Up to 500 active conversations/month',
      'Lead qualification & scoring',
      'Basic offer generator',
      'Standard dashboard',
      'Email support'
    ],
    best: 'Solo coaches, consultants, and creators testing their first automated close.',
    highlight: false
  },
  {
    name: 'Growth',
    price: '$297',
    tagline: 'For businesses ready to stop losing leads across multiple platforms.',
    features: [
      'Up to 3 channels (pick any 3)',
      'Up to 2,500 active conversations/month',
      'Full AI Sales Agent (objections, closing, payment links)',
      'Omnichannel identity tracking',
      'Offer & funnel generator',
      'Priority chat + email support'
    ],
    best: 'Growing coaches, SaaS founders, and info-product businesses running real ad spend.',
    highlight: true
  },
  {
    name: 'Premium',
    price: '$797',
    tagline: 'For businesses that want the full closer, not just the chat.',
    features: [
      'All channels, fully connected',
      'Up to 10,000 active conversations/month',
      'Full AI Sales Agent + High-Ticket Closing System',
      'AI Email Marketing & Nurture (ActiveCampaign / Systeme.io / Mailchimp)',
      'Advanced analytics & drop-off points',
      'Dedicated onboarding + priority support'
    ],
    best: 'Established coaches, agencies, and real estate teams with high-ticket offers.',
    highlight: false
  }
]

const faqs = [
  {
    q: 'Will this replace my full sales team?',
    a: 'No. It replaces the leads you\u2019re currently losing before your sales team ever sees them.'
  },
  {
    q: 'What if the AI gets a question wrong?',
    a: 'LCI is trained on your specific FAQs and escalates anything it can\u2019t confidently answer \u2014 which is extremely rare.'
  },
  {
    q: 'Is this just another chatbot with a new name?',
    a: 'No. Chatbots follow scripts and break the moment a real human goes off-script. LCI understands intent, adapts mid-conversation, and closes \u2014 the way a trained salesperson would.'
  }
]
</script>

<template>
  <div class="min-h-screen bg-[#0B0A14] text-white antialiased overflow-x-hidden">
    <!-- Background glow -->
    <div class="pointer-events-none fixed inset-0 -z-10">
      <div
        class="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-purple-700/25 blur-[140px]"
      ></div>
      <div
        class="absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-fuchsia-600/15 blur-[140px]"
      ></div>
    </div>

    <!-- NAVBAR -->
   <header class="sticky top-0 z-50 border-b border-white/5 bg-[#0B0A14]/80 backdrop-blur-xl">
      <nav class="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <router-link to="/" class="flex items-center gap-2">
          <img src="../assets/wealthoceans-removebg-preview.png" class="w-40" alt="" />
        </router-link>

        <div class="hidden items-center gap-8 text-sm font-medium text-white/70 md:flex">
          <router-link to="/about" class="transition hover:text-white">About us</router-link>
          <router-link to="/product" class="transition hover:text-white">Product</router-link>
          <router-link to="/how-it-works" class="transition hover:text-white"
            >How It Works</router-link
          >
          <router-link to="/pricing" class="transition hover:text-white">Pricing</router-link>
          <router-link to="/pricing" class="transition hover:text-white">Training</router-link>
          <router-link to="/faq" class="transition hover:text-white">FAQ</router-link>
        </div>

        <div class="hidden items-center gap-3 md:flex">
          <router-link
            to="/pricing"
            class="text-sm font-medium text-white/70 transition hover:text-white"
            >Book a Demo</router-link
          >
          <router-link
            to="/pricing"
            class="rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold shadow-lg shadow-purple-500/30 transition hover:shadow-purple-500/50"
          >
            Get Started Free
          </router-link>
        </div>

        <button
          class="md:hidden"
          @click="mobileMenuOpen = !mobileMenuOpen"
          aria-label="Toggle menu"
        >
          <svg
            v-if="!mobileMenuOpen"
            class="h-6 w-6"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg
            v-else
            class="h-6 w-6"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </nav>

      <!-- Mobile menu -->
      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
      >
        <div
          v-if="mobileMenuOpen"
          class="border-t border-white/5 bg-[#0B0A14] px-5 pb-6 pt-4 md:hidden"
        >
          <div class="flex flex-col gap-4 text-sm font-medium text-white/70">
            <router-link to="/company" @click="mobileMenuOpen = false" class="hover:text-white"
              >About us</router-link
            >
            <router-link to="/product" @click="mobileMenuOpen = false" class="hover:text-white"
              >Product</router-link
            >
            <router-link to="/how-it-works" @click="mobileMenuOpen = false" class="hover:text-white"
              >How It Works</router-link
            >
            <router-link to="/pricing" @click="mobileMenuOpen = false" class="hover:text-white"
              >Pricing</router-link
            >
            <router-link to="/pricing" @click="mobileMenuOpen = false" class="hover:text-white"
              >Training</router-link
            >
            <router-link to="/faq" @click="mobileMenuOpen = false" class="hover:text-white"
              >FAQ</router-link
            >
            <router-link
              to="/pricing"
              @click="mobileMenuOpen = false"
              class="mt-2 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 px-5 py-3 text-center font-semibold"
            >
              Get Started Free
            </router-link>
          </div>
        </div>
      </transition>
    </header>

    <!-- HOW IT WORKS -->
    <section id="how-it-works" class="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
          7 Core Integrations, Working as One
        </h2>
        <p class="mx-auto mt-3 max-w-xl text-white/60">
          Not a chatbot add-on. A complete system built around one goal: turning attention into
          paying customers.
        </p>
      </div>

      <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="item in integrations"
          :key="item.step"
          class="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-purple-400/30 hover:bg-white/[0.05]"
        >
          <span
            class="mb-4 inline-block bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-2xl font-bold text-transparent"
          >
            {{ item.step }}
          </span>
          <h3 class="text-lg font-semibold">{{ item.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-white/60">{{ item.desc }}</p>
        </div>
      </div>

      <!-- Channels -->
      <div class="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <p class="text-center text-sm font-medium text-white/60">
          One brain, one memory, everywhere
        </p>
        <div class="mt-5 flex flex-wrap items-center justify-center gap-3">
          <span
            v-for="c in channels"
            :key="c"
            class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80"
          >
            {{ c }}
          </span>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="border-t border-white/5 px-5 py-10 sm:px-8">
      <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <p class="text-xs text-white/40">
          © {{ new Date().getFullYear() }} Wealth Oceans Technologies. All rights reserved.
        </p>
        <div class="flex gap-5 text-xs text-white/50">
          <router-link to="/about" class="transition hover:text-white">About us</router-link>
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
