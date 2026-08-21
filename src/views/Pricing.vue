<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
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
    name: 'Tier 1',
    members: '1–5 members',
    phase1: '₦350,000',
    phase2: '₦1,500,000',
    phase3: '₦600,000',
    total: '₦2,450,000',
    highlight: false
  },
  {
    name: 'Tier 2',
    members: '6–15 members',
    phase1: '₦450,000',
    phase2: '₦1,900,000',
    phase3: '₦750,000',
    total: '₦3,100,000',
    highlight: true
  },
  {
    name: 'Tier 3',
    members: '16–30 members',
    phase1: '₦550,000',
    phase2: '₦2,300,000',
    phase3: '₦900,000',
    total: '₦3,750,000',
    highlight: false
  },
  {
    name: 'Tier 4',
    members: '31–40 members',
    phase1: '₦600,000',
    phase2: '₦2,500,000',
    phase3: '₦1,000,000',
    total: '₦4,100,000',
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

   <navbar/>

    <!-- PRICING -->
    <!-- PRICING -->
    <section id="pricing" class="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Pricing</h2>

        <!-- <p class="mx-auto mt-3 max-w-2xl text-white/60">
      Flexible team-based implementation pricing designed to help your
      organization deploy LCI across your sales team.
    </p> -->
        <p class="mx-auto mt-3 max-w-2xl text-white/60">
          14-day pilot period so you can see real conversations close before you commit.
        </p>
      </div>

      <!-- Pricing Cards -->
      <div class="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div
          v-for="plan in plans"
          :key="plan.name"
          class="relative flex flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1"
          :class="
            plan.highlight
              ? 'border-purple-400/50 bg-gradient-to-b from-purple-500/15 to-fuchsia-500/5 shadow-2xl shadow-purple-500/10'
              : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
          "
        >
          <!-- Most Popular -->
          <span
            v-if="plan.highlight"
            class="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 px-4 py-1 text-xs font-semibold"
          >
            Most Popular
          </span>

          <!-- Tier Header -->
          <div>
            <h3 class="text-lg font-semibold">
              {{ plan.name }}
            </h3>

            <p class="mt-2 text-sm text-white/60">
              {{ plan.members }}
            </p>
          </div>

          <!-- Total Investment -->
          <div class="mt-6">
            <p class="text-xs uppercase tracking-wider text-white/40">Total Investment</p>

            <p class="mt-2 text-3xl font-bold">
              {{ plan.total }}
            </p>
          </div>

          <!-- Phase Breakdown -->
          <div class="mt-7 space-y-3">
            <div
              class="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3"
            >
              <span class="text-sm text-white/60"> Phase 1 </span>

              <span class="text-sm font-semibold text-white">
                {{ plan.phase1 }}
              </span>
            </div>

            <div
              class="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3"
            >
              <span class="text-sm text-white/60"> Phase 2 </span>

              <span class="text-sm font-semibold text-white">
                {{ plan.phase2 }}
              </span>
            </div>

            <div
              class="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3"
            >
              <span class="text-sm text-white/60"> Phase 3 </span>

              <span class="text-sm font-semibold text-white">
                {{ plan.phase3 }}
              </span>
            </div>
          </div>

          <!-- CTA -->
          <router-link
            to="/pricing"
            class="mt-7 block rounded-full px-6 py-3 text-center text-sm font-semibold transition"
            :class="
              plan.highlight
                ? 'bg-gradient-to-r from-purple-500 to-fuchsia-500 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50'
                : 'border border-white/15 bg-white/5 hover:bg-white/10'
            "
          >
            Get Started
          </router-link>
        </div>
      </div>

      <!-- Pricing Note -->
      <div
        class="mx-auto mt-10 max-w-4xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center"
      >
        <p class="text-sm leading-6 text-white/60">
          Pricing reflects a
          <span class="font-semibold text-white"> full-team implementation </span>
          rather than per-seat licensing.
        </p>

        <p class="mt-3 text-sm leading-6 text-white/50">
          Teams above 40 members, engagements involving multiple teams, or engagements spanning
          multiple office locations will be quoted separately based on the required cohort
          structure.
        </p>
      </div>

      <!-- Enterprise / Custom -->
      <div
        class="mt-6 flex flex-col items-start justify-between gap-6 rounded-2xl border border-white/10 bg-gradient-to-r from-purple-500/10 to-fuchsia-500/5 p-7 sm:flex-row sm:items-center"
      >
        <div>
          <h3 class="text-lg font-semibold">Enterprise — Custom Pricing</h3>

          <p class="mt-2 max-w-2xl text-sm leading-6 text-white/60">
            For teams above 40 members, multiple teams, or deployments across multiple office
            locations. Pricing is tailored to your required cohort structure and implementation
            needs.
          </p>
        </div>

        <router-link
          to="/pricing"
          class="whitespace-nowrap rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold shadow-lg shadow-purple-500/20 transition hover:shadow-purple-500/40"
        >
          Talk to Sales →
        </router-link>
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
