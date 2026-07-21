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

    <!-- HERO -->
    <!-- HERO -->
    <section
      class="relative isolate flex min-h-[85vh] items-center justify-center overflow-hidden px-5 py-24 text-center sm:px-8 sm:py-32"
    >
      <!-- Background image -->
      <img
        src="../assets/wealth.png"
        alt=""
        class="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />

      <!-- Dark overlay for text legibility, same trick HubSpot uses -->
      <div
        class="absolute inset-0 -z-10 bg-gradient-to-b from-black/75 via-black/55 to-black/80"
      ></div>

      <div class="mx-auto max-w-4xl">
        <p class="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-white/80 sm:text-sm">
          Lead Conversion Infrastructure
        </p>

        <h1 class="font-serif text-4xl font-normal leading-[1.15] text-white sm:text-6xl">
          Your Leads Are Dying in Your DMs
          <span class="italic text-fuchsia-300">Right Now.</span>
        </h1>

        <p class="mx-auto mt-8 max-w-xl text-base text-white/75 sm:text-lg">
          Meet <span class="font-bold text-white">LCI(Lead Conversion Infrastructure)</span> — the
          AI built to actually sell. It qualifies your leads, handles their objections, and closes
          them into paying customers, across every channel, every hour of every day.
        </p>

        <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#pricing"
            class="w-full rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-purple-500/30 transition hover:shadow-purple-500/50 sm:w-auto"
          >
            Get Started Free
          </a>
          <a
            href="#"
            class="w-full rounded-full border border-white bg-white px-8 py-4 text-sm font-semibold text-[#0B0A14] transition hover:bg-white/90 sm:w-auto"
          >
            Get a Demo
          </a>
        </div>
      </div>
    </section>

    <!-- PAIN POINTS -->
    <section class="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <div class="grid gap-4 sm:grid-cols-3">
        <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <p class="text-sm text-white/70">
            A lead DMs <span class="text-white">"is this still available?"</span> — and waits
            <span class="font-semibold text-fuchsia-400">7 hours+</span> for a reply.
          </p>
        </div>
        <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <p class="text-sm text-white/70">
            A hot buyer asks a real question — and gets a
            <span class="font-semibold text-fuchsia-400">canned, robotic answer</span> that makes
            them feel like a number.
          </p>
        </div>
        <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <p class="text-sm text-white/70">
            Someone with cash in hand hits a wall of <span class="text-white">"please hold"</span> —
            and
            <span class="font-semibold text-fuchsia-400">buys from your competitor instead.</span>
          </p>
        </div>
      </div>

      <p class="mx-auto mt-10 max-w-2xl text-center text-lg text-white/80">
        Every one of those is a sale that should have closed itself. Instead, it evaporated. Your
        business currently has no one — human or otherwise — standing at the door when the money
        walks in, 24/7.
      </p>
    </section>

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

    <!-- DASHBOARD -->
    <section class="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <div class="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Your Command Center</h2>
          <p class="mt-4 text-white/60">
            A single view of your entire revenue engine — available on desktop and mobile, so you're
            never out of the loop, even when LCI is doing all the work.
          </p>
          <ul class="mt-6 space-y-3 text-sm text-white/70">
            <li class="flex items-start gap-3">
              <span class="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-fuchsia-400"></span>
              Unified Inbox — every conversation, every channel, in one place
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-fuchsia-400"></span>
              Leads — scores, tags, status, next best action
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-fuchsia-400"></span>
              Conversion Rate & Revenue — real numbers, not vanity metrics
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-fuchsia-400"></span>
              Funnels, Offers & Email Performance — view and edit anything the AI generates
            </li>
          </ul>
        </div>

        <div
          class="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.01] p-6 shadow-2xl"
        >
          <div class="grid grid-cols-2 gap-4">
            <div class="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p class="text-xs text-white/50">Active Conversations</p>
              <p class="mt-1 text-2xl font-bold">2,481</p>
            </div>
            <div class="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p class="text-xs text-white/50">Hot Leads</p>
              <p class="mt-1 text-2xl font-bold text-emerald-400">312</p>
            </div>
            <div class="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p class="text-xs text-white/50">Revenue This Month</p>
              <p class="mt-1 text-2xl font-bold">$48,220</p>
            </div>
            <div class="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p class="text-xs text-white/50">Conversion Rate</p>
              <p class="mt-1 text-2xl font-bold text-fuchsia-400">34.7%</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CASE STUDY -->
    <section class="mx-auto max-w-5xl px-5 py-16 sm:px-8">
      <div
        class="rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/10 to-fuchsia-500/5 p-8 text-center sm:p-12"
      >
        <p class="text-sm font-semibold uppercase tracking-wide text-purple-300">Case Study</p>
        <h3 class="mx-auto mt-3 max-w-2xl text-2xl font-bold sm:text-3xl">
          How One Coaching Business Closed $50,000 in 30 Days
        </h3>
        <p class="mx-auto mt-4 max-w-xl text-white/60">
          Not from more traffic — from finally converting the traffic that was already there.
        </p>
      </div>
    </section>

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

    <!-- FAQ -->
    <section id="faq" class="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <h2 class="text-center text-3xl font-bold tracking-tight sm:text-4xl">
        Frequently Asked Questions
      </h2>

      <div class="mt-10 space-y-3">
        <div
          v-for="(faq, i) in faqs"
          :key="faq.q"
          class="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4"
        >
          <button class="flex w-full items-center justify-between text-left" @click="toggleFaq(i)">
            <span class="font-medium">{{ faq.q }}</span>
            <svg
              class="h-5 w-5 flex-shrink-0 text-white/50 transition-transform"
              :class="activeFaq === i ? 'rotate-180' : ''"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <transition
            enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-40"
            leave-active-class="transition-all duration-150 ease-in"
            leave-from-class="opacity-100 max-h-40"
            leave-to-class="opacity-0 max-h-0"
          >
            <p
              v-if="activeFaq === i"
              class="mt-3 overflow-hidden text-sm leading-relaxed text-white/60"
            >
              {{ faq.a }}
            </p>
          </transition>
        </div>
      </div>
    </section>

    <!-- FINAL CTA -->
    <section class="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8">
      <h2 class="text-3xl font-bold tracking-tight sm:text-5xl">
        Ready to Stop Losing Sales You Already Won?
      </h2>
      <p class="mx-auto mt-5 max-w-xl text-white/60">
        You already did the hard part. You got the attention. You earned the DM. Don't let it die in
        your inbox.
      </p>
      <a
        href="#pricing"
        class="mt-8 inline-block rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 px-10 py-4 text-sm font-semibold shadow-xl shadow-purple-500/30 transition hover:shadow-purple-500/50"
      >
        Get Started For Free
      </a>
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
