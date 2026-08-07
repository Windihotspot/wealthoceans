<script setup lang="ts">
import { ref } from 'vue'

const mobileMenuOpen = ref(true)
const activeFaq = ref<number | null>(0)

const toggleFaq = (i: number) => {
  activeFaq.value = activeFaq.value === i ? null : i
}

const skills = [
  {
    num: '01',
    title: 'Audience & Awareness Mapping',
    desc: 'Know exactly who\'s ready to buy and who still needs convincing, and stop talking to both the same way.'
  },
  {
    num: '02',
    title: 'Psychology of Desire & Attention',
    desc: 'The specific triggers that stop the right person mid-scroll. Not luck. A method.'
  },
  {
    num: '03',
    title: 'Offer Engineering',
    desc: 'Build an offer so strong, saying no feels irrational — without just discounting.'
  },
  {
    num: '04',
    title: 'The Trust-to-Close Path',
    desc: 'The exact sequence from stranger → comment → conversation → payment, built on your real pipeline.'
  },
  {
    num: '05',
    title: 'High-Stakes Negotiation',
    desc: 'Hostage-negotiation tactics, adapted for the moment a warm lead hesitates in your DMs.'
  },
  {
    num: '06',
    title: 'Live Role-Play & Installation',
    desc: 'Practiced on your team\'s real leads, with live correction, until it sticks.'
  }
]

const phases = [
  {
    phase: '01',
    title: 'Diagnostic',
    desc: 'We audit your targeting, content, ads, and real DM threads. You get a Leak Report showing exactly where the right people are dropping off — and a baseline your results get measured against.'
  },
  {
    phase: '02',
    title: 'Installation',
    desc: 'Your team\'s own content, offers, and DM-to-close scripts, built live in your voice — not handed to you as a template.'
  },
  {
    phase: '03',
    title: 'Reinforcement',
    desc: '30 days of tracking against your baseline, with check-ins to stop old habits creeping back.'
  }
]

const results = [
  { metric: 'UK-based agency client', outcome: '₦20 million in revenue attributed to content & ad messaging' },
  { metric: 'Consumer app client', outcome: '11,000+ users converted to active app users' },
  { metric: 'Technology sector client', outcome: 'Qualified leads driving tens of millions (₦) in business' },
  { metric: 'Health & wellness sector client', outcome: '8 figures in direct sales attributed to the same conversion path' },
  { metric: 'Digital agency client', outcome: 'Over 800 quality leads pulled in, in under 14 days' }
]

const pricingTiers = [
  {
    team: '2–5 People',
    price: '$4,900',
    desc: 'Full diagnostic, live installation, 30-day reinforcement.',
    highlight: false
  },
  {
    team: '6–12 People',
    price: '$9,700',
    desc: 'Everything in Starter, plus priority access and extended reinforcement.',
    highlight: true
  },
  {
    team: '13–20 People',
    price: '$14,500',
    desc: 'Full team, dedicated session facilitator, ongoing group access.',
    highlight: false
  },
  {
    team: '21+ People',
    price: 'Custom',
    desc: 'Enterprise pricing. Let\'s talk about what your team needs.',
    highlight: false
  }
]

const faqs = [
  {
    q: 'We already have a sales team. Is this redundant?',
    a: 'No. This gives them the sequence and language to attract, nurture, and close, instead of relying on individual talent to figure it out mid-conversation. Your sales team becomes 10x more effective when your marketing and DMs are running the right sequence.'
  },
  {
    q: 'How is this different from a course we could buy online?',
    a: 'A course teaches in general. This is diagnosed against your actual leak, built on your actual content and DMs, guaranteed against your actual numbers. You\'re not learning theory—you\'re fixing what\'s broken in your funnel, right now.'
  },
  {
    q: 'Is this just ad and content writing training?',
    a: 'No. Attention and content are 2 of 6 skills. The other 4—offers, closing, negotiation, and installation—are where most of the revenue is actually won or lost.'
  },
  {
    q: 'What if my team resists the changes?',
    a: 'That\'s built into the process. Phase 3 is 30 days of reinforcement with check-ins specifically to stop old habits creeping back. We\'re not handing you a playbook and leaving. We\'re staying until it sticks.'
  },
  {
    q: 'Do you work with international teams?',
    a: 'Yes. We\'ve worked with teams in Nigeria, the UK, and the US. As long as you have real DMs, real content, and real ads running, we can diagnose and install the system.'
  }
]
</script>

<template>
  <div class="min-h-screen bg-[#0B0A14] text-white antialiased overflow-x-hidden">
    <!-- Background glow -->
    <div class="pointer-events-none fixed inset-0 -z-10">
      <div class="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-purple-700/25 blur-[140px]"></div>
      <div class="absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-fuchsia-600/15 blur-[140px]"></div>
    </div>

    <!-- NAVBAR -->
    <header class="sticky top-0 z-50 border-b border-white/5 bg-[#0B0A14]/80 backdrop-blur-xl">
      <nav class="mx-auto flex w-full items-center justify-between px-5 py-4">
        <router-link to="/" class="flex items-center gap-2">
          <img src="../assets/wealthoceans-removebg-preview.png" class="w-40" alt="Wealth Oceans" />
        </router-link>

        <div class="hidden items-center gap-8 text-sm font-medium text-white/70 md:flex">
          <router-link to="/about" class="transition hover:text-white">About us</router-link>
          <router-link to="/product" class="transition hover:text-white">Product</router-link>
          <router-link to="/how-it-works" class="transition hover:text-white">How It Works</router-link>
          <router-link to="/pricing" class="transition hover:text-white">Pricing</router-link>
          <router-link to="/training" class="transition hover:text-white font-semibold text-purple-400">Training</router-link>
          <router-link to="/faq" class="transition hover:text-white">FAQ</router-link>
        </div>

        <div class="hidden items-center gap-3 md:flex">
          <router-link to="/training" class="text-sm font-medium text-white/70 transition hover:text-white">
            Learn More
          </router-link>
          <router-link
            to="/training"
            class="rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold shadow-lg shadow-purple-500/30 transition hover:shadow-purple-500/50"
          >
            Apply Now
          </router-link>
        </div>

        <button class="md:hidden" @click="mobileMenuOpen = !mobileMenuOpen" aria-label="Toggle menu">
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
        <div v-if="mobileMenuOpen" class="border-t border-white/5 bg-[#0B0A14] px-5 pb-6 pt-4 md:hidden">
          <div class="flex flex-col gap-4 text-sm font-medium text-white/70">
            <router-link to="/about" @click="mobileMenuOpen = false" class="hover:text-white">About us</router-link>
            <router-link to="/product" @click="mobileMenuOpen = false" class="hover:text-white">Product</router-link>
            <router-link to="/how-it-works" @click="mobileMenuOpen = false" class="hover:text-white">How It Works</router-link>
            <router-link to="/pricing" @click="mobileMenuOpen = false" class="hover:text-white">Pricing</router-link>
            <router-link to="/training" @click="mobileMenuOpen = false" class="font-semibold text-purple-400 hover:text-white">Training</router-link>
            <router-link to="/faq" @click="mobileMenuOpen = false" class="hover:text-white">FAQ</router-link>
          </div>
        </div>
      </transition>
    </header>

    <!-- HERO -->
    <section class="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-12 text-center sm:px-8 sm:py-12">
      <img
        src="../assets/Gemini_Generated_Image_mstajimstajimsta.png"
        alt=""
        class="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />
      <div class="absolute inset-0 -z-10 bg-gradient-to-b from-black/75 via-black/55 to-black/80"></div>

      <div class="mx-auto max-w-4xl">
        <p class="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-white/80 sm:text-sm">
          For Founders & Business Teams
        </p>

        <h1 class="font-serif text-4xl font-normal leading-[1.15] text-white sm:text-6xl">
          Your Team Knows How to Create Content.
          <span class="italic text-fuchsia-300">They Don't Know How to Close.</span>
        </h1>

        <p class="mx-auto mt-8 max-w-2xl text-lg text-white/75 sm:text-xl">
          <span class="font-bold text-white">The Conversion Code</span> is a 6-week system that teaches your entire team the full sequence—from the first stranger who sees your ad to the moment they pay—installed live on your real campaigns, guaranteed.
        </p>

        <div class="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#pricing"
            class="w-full rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-purple-500/30 transition hover:shadow-purple-500/50 sm:w-auto"
          >
            Explore Pricing
          </a>
          <a
            href="#faq"
            class="w-full rounded-full border border-white bg-white px-8 py-4 text-sm font-semibold text-[#0B0A14] transition hover:bg-white/90 sm:w-auto"
          >
            Is This For You?
          </a>
        </div>
      </div>
    </section>

    <!-- THE PROBLEM -->
    <section class="mx-auto max-w-5xl px-5 py-16 sm:px-8">
      <div class="rounded-3xl border border-white/10 bg-gradient-to-br from-red-500/10 to-orange-500/5 p-8 sm:p-12">
        <h2 class="text-3xl font-bold sm:text-4xl">The Real Problem</h2>
        <p class="mt-4 text-lg text-white/80">
          Attracting the right audience, earning their attention, and closing them are usually taught as separate skills, by separate people, at separate times. So your team ends up fluent in pieces of the sale — never the whole thing.
        </p>

        <div class="mt-8 grid gap-4 sm:grid-cols-2">
          <div class="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <p class="font-medium text-white">Ads and content that pull in views...</p>
            <p class="mt-2 text-sm text-white/60">...but not the right people.</p>
          </div>
          <div class="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <p class="font-medium text-white">Content that gets attention...</p>
            <p class="mt-2 text-sm text-white/60">...but never builds real buying intent.</p>
          </div>
          <div class="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <p class="font-medium text-white">Offers that sound fine...</p>
            <p class="mt-2 text-sm text-white/60">...but don't make anyone feel stupid saying no.</p>
          </div>
          <div class="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <p class="font-medium text-white">Warm leads who hesitate once...</p>
            <p class="mt-2 text-sm text-white/60">...and disappear.</p>
          </div>
        </div>

        <p class="mt-8 text-white/70">
          <span class="font-semibold text-white">One weak link breaks the whole chain.</span> You don't need more training. You need one training, in the right order — from the first stranger who sees your content, to the moment they pay.
        </p>
      </div>
    </section>

    <!-- THE 6 SKILLS -->
    <section class="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <div class="text-center">
        <p class="text-sm font-bold uppercase tracking-wider text-purple-400">What You'll Learn</p>
        <h2 class="mt-3 text-3xl font-bold sm:text-4xl">6 Skills, Installed As One System</h2>
        <p class="mx-auto mt-4 max-w-2xl text-white/60">
          Not a workshop. Not a keynote. A live installation into your team's real content, real ads, and real DM threads — until it's reflex, not theory.
        </p>
      </div>

      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="skill in skills"
          :key="skill.num"
          class="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-purple-400/30 hover:bg-white/[0.05]"
        >
          <span class="inline-block bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-3xl font-bold text-transparent">
            {{ skill.num }}
          </span>
          <h3 class="mt-4 text-lg font-semibold leading-snug">{{ skill.title }}</h3>
          <p class="mt-3 text-sm leading-relaxed text-white/60">{{ skill.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 3-PHASE DELIVERY -->
    <section class="mx-auto max-w-5xl px-5 py-16 sm:px-8">
      <div class="text-center">
        <p class="text-sm font-bold uppercase tracking-wider text-purple-400">How We Work</p>
        <h2 class="mt-3 text-3xl font-bold sm:text-4xl">Three Phases, 6–8 Weeks</h2>
      </div>

      <div class="mt-12 grid gap-6 sm:grid-cols-3">
        <div
          v-for="(phase, i) in phases"
          :key="phase.phase"
          class="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
        >
          <span class="text-5xl font-bold text-purple-500/20">{{ phase.phase }}</span>
          <h3 class="mt-2 text-2xl font-semibold">{{ phase.title }}</h3>
          <p class="mt-4 text-sm leading-relaxed text-white/70">{{ phase.desc }}</p>

          <!-- Connector line (desktop only) -->
          <div
            v-if="i < phases.length - 1"
            class="absolute -right-3 top-1/2 hidden h-0.5 w-6 -translate-y-1/2 transform bg-gradient-to-r from-purple-500 to-transparent sm:block"
          ></div>
        </div>
      </div>
    </section>

    <!-- THE GUARANTEE -->
    <section class="mx-auto max-w-4xl px-5 py-16 sm:px-8">
      <div class="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 p-8 sm:p-12">
        <div class="flex items-start gap-4">
          <div class="mt-1 h-12 w-12 flex-shrink-0 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <svg class="h-6 w-6 text-emerald-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="flex-1">
            <h2 class="text-2xl font-bold sm:text-3xl">The Guarantee</h2>
            <p class="mt-4 text-white/80">
              If your engagement-to-lead, DM-to-nurture, nurture-to-payment rate hasn't measurably improved within 30 days of Phase 2 — measured against your own baseline — we come back and reinforce it free, for up to 30 more days, until it moves.
            </p>
            <p class="mt-4 font-semibold text-white">
              We're not asking you to trust a promise. We're asking you to trust a number we agree on before we start.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- RESULTS & SOCIAL PROOF -->
    <section class="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <div class="text-center">
        <p class="text-sm font-bold uppercase tracking-wider text-purple-400">Before It Had A Name</p>
        <h2 class="mt-3 text-3xl font-bold sm:text-4xl">Real Results From Real Teams</h2>
        <p class="mx-auto mt-4 max-w-2xl text-white/60">
          These outcomes came from applying this system on actual campaigns. Not case studies. Deals.
        </p>
      </div>

      <div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(result, i) in results"
          :key="i"
          class="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
        >
          <p class="text-sm font-medium text-purple-300">{{ result.metric }}</p>
          <p class="mt-3 text-lg font-semibold text-white">{{ result.outcome }}</p>
        </div>
      </div>

      <p class="mx-auto mt-10 max-w-2xl text-center text-xs text-white/40">
        Client names withheld in line with confidentiality standards to direct response work — available on request during due diligence.
      </p>
    </section>

    <!-- PRICING -->
    <section id="pricing" class="mx-auto max-w-5xl px-5 py-16 sm:px-8">
      <div class="text-center">
        <p class="text-sm font-bold uppercase tracking-wider text-purple-400">Investment</p>
        <h2 class="mt-3 text-3xl font-bold sm:text-4xl">Priced by Team Size, Not Per Seat</h2>
        <p class="mx-auto mt-4 max-w-2xl text-white/60">
          Every online customer-facing and marketing team member trained under one engagement.
        </p>
      </div>

      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="tier in pricingTiers"
          :key="tier.team"
          class="relative flex flex-col rounded-2xl border p-6 sm:p-7"
          :class="
            tier.highlight
              ? 'border-purple-400/50 bg-gradient-to-b from-purple-500/15 to-fuchsia-500/5 shadow-2xl shadow-purple-500/10'
              : 'border-white/10 bg-white/[0.03]'
          "
        >
          <span
            v-if="tier.highlight"
            class="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 px-4 py-1 text-xs font-semibold"
          >
            Most Popular
          </span>

          <h3 class="text-lg font-semibold">{{ tier.team }}</h3>
          <p class="mt-4 text-3xl font-bold">{{ tier.price }}</p>
          <p class="mt-2 text-xs text-white/50">One-time investment</p>

          <p class="mt-4 flex-1 text-sm text-white/70">{{ tier.desc }}</p>

          <a
            href="#"
            class="mt-6 block rounded-full px-6 py-3 text-center text-sm font-semibold transition"
            :class="
              tier.highlight
                ? 'bg-gradient-to-r from-purple-500 to-fuchsia-500 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50'
                : 'border border-white/15 bg-white/5 hover:bg-white/10'
            "
          >
            Get Started
          </a>
        </div>
      </div>

      <p class="mx-auto mt-10 max-w-2xl text-center text-xs text-white/40">
        Your exact tier and total is confirmed on a short scoping call. We only take a limited number of installations per quarter, to keep every diagnostic and live session properly resourced.
      </p>
    </section>

    <!-- IS THIS FOR YOU -->
    <section class="mx-auto max-w-4xl px-5 py-16 sm:px-8">
      <div class="rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-12">
        <h2 class="text-2xl font-bold sm:text-3xl">Is This For You?</h2>

        <div class="mt-6 space-y-5">
          <div class="flex items-start gap-3">
            <svg class="mt-1 h-5 w-5 flex-shrink-0 text-emerald-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p class="font-semibold text-white">Yes, if:</p>
              <p class="mt-1 text-white/70">You already have an audience, ads, or content running — and too many of the right people are slipping through without ever becoming customers.</p>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <svg class="mt-1 h-5 w-5 flex-shrink-0 text-orange-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <div>
              <p class="font-semibold text-white">Not yet, if:</p>
              <p class="mt-1 text-white/70">You have no ads, content, or DM activity running at all right now. There's nothing yet for this system to work with. We'd need to build your funnel from the ground up first, which is a different engagement.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section id="faq" class="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold sm:text-4xl">Common Questions</h2>
        <p class="mt-4 text-white/60">Already had some version of this before, or still wondering if it's right?</p>
      </div>

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
            enter-to-class="opacity-100 max-h-96"
            leave-active-class="transition-all duration-150 ease-in"
            leave-from-class="opacity-100 max-h-96"
            leave-to-class="opacity-0 max-h-0"
          >
            <p v-if="activeFaq === i" class="mt-3 overflow-hidden text-sm leading-relaxed text-white/60">
              {{ faq.a }}
            </p>
          </transition>
        </div>
      </div>
    </section>

    <!-- FINAL CTA -->
    <section class="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8">
      <h2 class="text-3xl font-bold tracking-tight sm:text-5xl">
        Ready to Stop Leaving Money on the Table?
      </h2>
      <p class="mx-auto mt-5 max-w-xl text-lg text-white/60 sm:text-xl">
        Your team did the hard part. They got the attention. They earned the DM. Now teach them how to close it.
      </p>
      <div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <a
          href="#pricing"
          class="inline-block rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 px-10 py-4 text-sm font-semibold shadow-xl shadow-purple-500/30 transition hover:shadow-purple-500/50"
        >
          See Pricing
        </a>
        <a
          href="#faq"
          class="inline-block rounded-full border border-white/15 bg-white/5 px-10 py-4 text-sm font-semibold transition hover:bg-white/10"
        >
          Schedule a Call
        </a>
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
          <router-link to="/how-it-works" class="transition hover:text-white">How It Works</router-link>
          <router-link to="/pricing" class="transition hover:text-white">Pricing</router-link>
          <router-link to="/training" class="transition hover:text-white">Training</router-link>
          <router-link to="/faq" class="transition hover:text-white">FAQ</router-link>
        </div>
      </div>
    </footer>
  </div>
</template>