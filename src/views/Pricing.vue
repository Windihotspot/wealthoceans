<script setup lang="ts">
import { ref } from 'vue'

const mobileMenuOpen = ref(true)
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
      <nav class="mx-auto flex w-full items-center justify-between px-5 py-4 ">
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
          <router-link to="/training" class="transition hover:text-white">Training</router-link>
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
            <router-link to="/about" @click="mobileMenuOpen = false" class="hover:text-white"
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
            <router-link to="/training" @click="mobileMenuOpen = false" class="hover:text-white"
              >Training</router-link
            >
            <router-link to="/faq" @click="mobileMenuOpen = false" class="hover:text-white"
              >FAQ</router-link
            >
            
          </div>
        </div>
      </transition>
    </header>

    <!-- PRICING -->
    <section id="pricing" class="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Simple, Honest Pricing</h2>
        <p class="mx-auto mt-3 max-w-xl text-white/60">
          No long-term contract required. 14-day pilot period so you can see real conversations
          close before you commit.
        </p>
      </div>

      <div class="mt-12 grid gap-6 lg:grid-cols-3">
        <div
          v-for="plan in plans"
          :key="plan.name"
          class="relative flex flex-col rounded-2xl border p-7"
          :class="
            plan.highlight
              ? 'border-purple-400/50 bg-gradient-to-b from-purple-500/15 to-fuchsia-500/5 shadow-2xl shadow-purple-500/10'
              : 'border-white/10 bg-white/[0.03]'
          "
        >
          <span
            v-if="plan.highlight"
            class="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 px-4 py-1 text-xs font-semibold"
          >
            Most Popular
          </span>

          <h3 class="text-lg font-semibold">{{ plan.name }}</h3>
          <p class="mt-4 text-4xl font-bold">
            {{ plan.price }} <span class="text-base font-normal text-white/50">/month</span>
          </p>
          <p class="mt-3 text-sm text-white/60">{{ plan.tagline }}</p>

          <ul class="mt-6 flex-1 space-y-3 text-sm text-white/70">
            <li v-for="f in plan.features" :key="f" class="flex items-start gap-2.5">
              <svg
                class="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {{ f }}
            </li>
          </ul>

          <p class="mt-6 text-xs text-white/40">Best for: {{ plan.best }}</p>

          <a
            href="#"
            class="mt-6 block rounded-full px-6 py-3 text-center text-sm font-semibold transition"
            :class="
              plan.highlight
                ? 'bg-gradient-to-r from-purple-500 to-fuchsia-500 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50'
                : 'border border-white/15 bg-white/5 hover:bg-white/10'
            "
          >
            Get Started Now
          </a>
        </div>
      </div>

      <!-- Enterprise -->
      <div
        class="mt-6 flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-7 sm:flex-row"
      >
        <div>
          <h3 class="text-lg font-semibold">Enterprise — Custom Pricing</h3>
          <p class="mt-1 text-sm text-white/60">
            Unlimited channels & conversations, custom AI training, full API access, dedicated
            account manager.
          </p>
        </div>
        <a
          href="#"
          class="whitespace-nowrap rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold transition hover:bg-white/10"
        >
          Talk to Sales →
        </a>
      </div>

      <p class="mx-auto mt-8 max-w-2xl text-center text-xs text-white/40">
        A single human closer costs $60,000–$130,000 a year fully loaded. Most standalone AI SDR
        tools run $900 to $10,000+ a month — and many only handle outbound email. LCI was priced to
        make that comparison embarrassing for them.
      </p>
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
