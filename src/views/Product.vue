<script setup lang="ts">
import { ref } from 'vue'
import Navbar from '@/components/Navbar.vue'
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

   <Navbar/>

    <!-- COMPARISON -->
    <section id="product" class="mx-auto max-w-5xl px-5 py-16 sm:px-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">What Makes LCI Different</h2>
        <p class="mt-3 text-white/60">
          Chatbots follow scripts. CRMs organize contacts. LCI converts.
        </p>
      </div>

      <div class="mt-10 overflow-hidden rounded-2xl border border-white/10">
        <div
          class="grid grid-cols-4 bg-white/[0.04] text-xs font-semibold text-white/60 sm:text-sm"
        >
          <div class="col-span-2 px-4 py-4 sm:px-6">Capability</div>
          <div class="px-2 py-4 text-center">Chatbots</div>
          <div
            class="px-2 py-4 text-center bg-gradient-to-b from-purple-500/20 to-fuchsia-500/10 text-white"
          >
            LCI
          </div>
        </div>

        <div
          v-for="(row, i) in comparisonRows"
          :key="row.label"
          class="grid grid-cols-4 items-center text-xs sm:text-sm"
          :class="i % 2 === 0 ? 'bg-white/[0.015]' : ''"
        >
          <div class="col-span-2 px-4 py-4 text-white/80 sm:px-6">{{ row.label }}</div>
          <div class="flex justify-center px-2 py-4">
            <svg
              class="h-5 w-5 text-red-400/70"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div
            class="flex justify-center bg-gradient-to-b from-purple-500/10 to-fuchsia-500/5 px-2 py-4"
          >
            <svg
              class="h-5 w-5 text-emerald-400"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
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
