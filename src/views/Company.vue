<script setup lang="ts">
import ifiokImg from '../assets/ifiok.jpeg'
import blessingImg from '../assets/blessing.jpg'
import joeImg from '../assets/joe.png'
import demmyImg from '../assets/demmy.png'
import { ref } from 'vue'
const mobileMenuOpen = ref(true)
const capabilities = [
  {
    num: '01',
    title: 'AI-Powered Revenue Technology',
    desc: 'Our flagship product, LCI (Lead Conversion Infrastructure), is an AI Sales Closer that qualifies, engages, and closes leads across every channel — 24 hours a day. LCI is the first product, not the last. More are already in development, each targeting a deeper point where businesses lose money between attention and sale.'
  },
  {
    num: '02',
    title: 'Sales & Marketing Consultation',
    desc: 'Some businesses don\u2019t need software first — they need sharper eyes on what they\u2019re already doing. We audit the full path from stranger to customer, find exactly where it\u2019s leaking, and build the fix.'
  },
  {
    num: '03',
    title: 'Done-For-You Support & Facilitation',
    desc: 'For teams that know what needs to happen but lack the hands to execute, we step in directly — running campaigns, funnels, and conversion systems on your behalf.'
  },
  {
    num: '04',
    title: 'Training: The Psychology & Strategy of Conversion',
    desc: 'Most training teaches tactics. Ours teaches what actually drives a buying decision — the psychology behind why a stranger trusts you, and why they buy.'
  }
]

const builtFor = [
  'Marketing teams who drive attention but can\u2019t explain what converts',
  'Sales teams working leads on instinct, not framework',
  'Founders who want one company-wide way of thinking about conversion',
  'Agencies who want a genuinely different offer for their own clients'
]

const team = [
  {
    name: 'Joseph Imajini',
    role: 'Founder & Product Lead',
    bio: 'Owns every decision — from what gets built, to how it\u2019s positioned, to how it\u2019s sold. Shaped LCI from concept to first customers, and still owns the product\u2019s AI behavior and revenue strategy today.',
    initials: 'JI',
    // Point this at your real photo, e.g. imported asset or '/team/joseph.jpg'
    image: joeImg
  },
  {
    name: 'Demilade Oyekunbi',
    role: 'Operations & Quality Lead',
    bio: 'Tests LCI daily, catches what\u2019s broken before customers do, and keeps the entire team\u2019s execution — tasks, timelines, priorities — running on schedule.',
    initials: 'DO',
    image: demmyImg
  },
  {
    name: 'Ifiok Usanga',
    role: 'Lead Engineer',
    bio: 'Builds and ships LCI end to end — backend logic, AI integrations, APIs, and the interface customers actually use. If it\u2019s part of the product, he\u2019s touched the code behind it.',
    initials: 'IU',
    image: ifiokImg
  },
  {
    name: 'Blessing Imaji',
    role: 'Growth & Outreach Lead',
    bio: 'The first human touchpoint for most of Wealth Oceans\u2019 early customers — reaching out daily, booking calls, and keeping every lead moving instead of going cold. Fittingly, the exact problem LCI was built to solve at scale.',
    initials: 'BI',
    image: blessingImg
  }
]

const handleImgError = (e: Event) => {
  const target = e.target as HTMLImageElement
  target.style.display = 'none'
}

const paths = [
  {
    title: 'Want the technology doing the closing for you?',
    cta: 'Explore LCI',
    href: '#'
  },
  {
    title: 'Want a diagnosis of where your funnel is leaking conversion?',
    cta: 'Book a Consultation',
    href: '#'
  },
  {
    title: 'Want your team trained on why people actually buy?',
    cta: 'Join the Training Waitlist',
    href: '#'
  },
  {
    title:
      'Not sure which fits? Talk to us — we\u2019ll tell you honestly, even if it\u2019s "not us yet."',
    cta: 'Talk to Us',
    href: '#'
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
            <router-link to="/pricing" @click="mobileMenuOpen = false" class="hover:text-white"
              >Training</router-link
            >
            <router-link to="/faq" @click="mobileMenuOpen = false" class="hover:text-white"
              >FAQ</router-link
            >
            
          </div>
        </div>
      </transition>
    </header>

    <!-- HERO -->
    <section
      class="relative mx-auto max-w-4xl px-5 pt-20 pb-16 text-center sm:px-8 sm:pt-28 sm:pb-20"
    >
      <div
        class="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70"
      >
        <span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
        Wealth Oceans Technologies
      </div>

      <h1 class="text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
        Who We Are &
        <span
          class="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent"
        >
          What We Do
        </span>
      </h1>

      <p class="mx-auto mt-6 max-w-2xl text-base text-white/60 sm:text-lg">
        Businesses today have more ways to reach people than ever — and less clarity on how to
        convert them. More platforms, more content, more noise. Underneath it all, the same leak:
        attention that never becomes revenue.
      </p>
      <p class="mx-auto mt-4 max-w-2xl text-base font-medium text-white/85 sm:text-lg">
        Wealth Oceans Technologies closes that leak — through the software we build, the strategy we
        teach, and the teams we train.
      </p>
    </section>

    <!-- WHAT WE DO -->
    <section class="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">What We Do</h2>
        <p class="mx-auto mt-3 max-w-xl text-white/60">
          Four ways we close the gap between attention and revenue.
        </p>
      </div>

      <div class="mt-12 grid gap-5 sm:grid-cols-2">
        <div
          v-for="item in capabilities"
          :key="item.num"
          class="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-purple-400/30 hover:bg-white/[0.05]"
        >
          <span
            class="mb-4 inline-block bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-2xl font-bold text-transparent"
          >
            {{ item.num }}
          </span>
          <h3 class="text-lg font-semibold">{{ item.title }}</h3>
          <p class="mt-3 text-sm leading-relaxed text-white/60">{{ item.desc }}</p>
        </div>
      </div>

      <!-- Built for -->
      <div class="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-7 sm:p-8">
        <p class="text-sm font-semibold uppercase tracking-wide text-purple-300">Built For</p>
        <div class="mt-5 grid gap-4 sm:grid-cols-2">
          <div v-for="b in builtFor" :key="b" class="flex items-start gap-3">
            <span class="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-fuchsia-400"></span>
            <p class="text-sm text-white/70">{{ b }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- WHY ONE COMPANY -->
    <section class="mx-auto max-w-5xl px-5 py-16 sm:px-8">
      <div
        class="rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/10 to-fuchsia-500/5 p-8 sm:p-12"
      >
        <p class="text-sm font-semibold uppercase tracking-wide text-purple-300">Why One Company</p>
        <h3 class="mt-3 text-2xl font-bold sm:text-3xl">
          Software, strategy, execution, and training aren't separate businesses to us.
        </h3>
        <p class="mt-4 max-w-3xl text-white/70">
          They're four ways of solving the same problem at different stages. Learning the
          psychology, building the strategy, or automating the execution — there's a version of
          Wealth Oceans built for wherever you are.
        </p>
      </div>
    </section>

    <!-- THE STANDARD -->
    <section class="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8">
      <p class="text-sm font-semibold uppercase tracking-wide text-purple-300">The Standard</p>
      <h2 class="mt-3 text-2xl font-bold sm:text-4xl">
        Every product, engagement, and training is judged by one question:
      </h2>
      <p class="mx-auto mt-5 max-w-2xl text-lg font-medium text-white/85">
        "Did a stranger become a paying customer because of this — and can we prove it?"
      </p>
      <p class="mx-auto mt-4 max-w-2xl text-sm text-white/60">
        Not just impressions and engagement. Revenue, traceable to a decision that happened because
        the psychology, strategy, or system was right.
      </p>
    </section>

    <!-- TEAM -->
    <section class="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">The Team</h2>
        <p class="mx-auto mt-3 max-w-xl text-white/60">
          The people building, running, and selling Wealth Oceans every day.
        </p>
      </div>

      <div class="mt-12 grid gap-6 sm:grid-cols-2">
        <div
          v-for="member in team"
          :key="member.name"
          class="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-purple-400/30 hover:bg-white/[0.05]"
        >
          <div class="flex items-center gap-4">
            <div
              class="relative flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 text-lg font-bold shadow-lg shadow-purple-500/30"
            >
              <img
                v-if="member.image"
                :src="member.image"
                :alt="member.name"
                class="absolute inset-0 h-full w-full object-cover"
                @error="handleImgError"
              />
              <span v-if="!member.image">{{ member.initials }}</span>
            </div>
            <div>
              <h3 class="text-base font-semibold">{{ member.name }}</h3>
              <p class="text-xs font-medium text-purple-300">{{ member.role }}</p>
            </div>
          </div>
          <p class="mt-4 text-sm leading-relaxed text-white/60">{{ member.bio }}</p>
        </div>
      </div>
    </section>

    <!-- WHERE TO START -->
    <section class="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Where to Start</h2>
        <p class="mx-auto mt-3 max-w-xl text-white/60">
          Four doors in. Pick the one that matches where you are.
        </p>
      </div>

      <div class="mt-12 grid gap-5 sm:grid-cols-2">
        <div
          v-for="path in paths"
          :key="path.cta"
          class="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-7"
        >
          <p class="text-base font-medium text-white/80">{{ path.title }}</p>
          <a
            :href="path.href"
            class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-fuchsia-300 transition hover:text-fuchsia-200"
          >
            {{ path.cta }} →
          </a>
        </div>
      </div>
    </section>

    <!-- FINAL CTA -->
    <section class="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8">
      <h2 class="text-3xl font-bold tracking-tight sm:text-5xl">Not Sure Where You Fit?</h2>
      <p class="mx-auto mt-5 max-w-xl text-white/60">
        Talk to us. We'll tell you honestly which of these is right for you — even if it's "not us
        yet."
      </p>
      <div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <a
          href="#"
          class="w-full rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 px-8 py-4 text-sm font-semibold shadow-xl shadow-purple-500/30 transition hover:shadow-purple-500/50 sm:w-auto"
        >
          Explore LCI
        </a>
        <a
          href="#"
          class="w-full rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white/90 transition hover:bg-white/10 sm:w-auto"
        >
          Book a Consultation
        </a>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="border-t border-white/5 px-5 py-10 sm:px-8">
      <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div class="flex items-center gap-2">
          <span class="text-sm font-semibold">Wealth Oceans Technologies</span>
        </div>
        <p class="text-xs text-white/40">
          © {{ new Date().getFullYear() }} Wealth Oceans Technologies. All rights reserved.
        </p>
        <div class="flex gap-5 text-xs text-white/50">
          <a href="#" class="hover:text-white">LCI</a>
          <a href="#" class="hover:text-white">About</a>
          <a href="#" class="hover:text-white">Contact</a>
        </div>
      </div>
    </footer>
  </div>
</template>
