<script setup>
import { ref } from "vue";

const mobileMenuOpen = ref(true);
</script>

<template>
  <!-- NAVBAR -->
  <header
    class="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm backdrop-blur-xl"
  >
    <nav
      class="mx-auto flex w-full items-center justify-between px-5 py-4"
    >
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-2">
        <img
          src="../assets/wealthoceans-removebg-preview.png"
          class="w-40"
          alt="Wealth Oceans"
        />
      </RouterLink>

      <!-- Desktop Navigation -->
      <div
        class="hidden items-center gap-8 text-sm font-medium text-gray-600 md:flex"
      >
        <RouterLink
          to="/about"
          class="transition hover:text-purple-600"
          exact-active-class="text-purple-600"
        >
          About us
        </RouterLink>

        <RouterLink
          to="/product"
          class="transition hover:text-purple-600"
          exact-active-class="text-purple-600"
        >
          Product
        </RouterLink>

        <RouterLink
          to="/how-it-works"
          class="transition hover:text-purple-600"
          exact-active-class="text-purple-600"
        >
          How It Works
        </RouterLink>

        <RouterLink
          to="/pricing"
          class="transition hover:text-purple-600"
          exact-active-class="text-purple-600"
        >
          Pricing
        </RouterLink>

        <RouterLink
          to="/training"
          class="transition hover:text-purple-600"
          exact-active-class="text-purple-600"
        >
          Training
        </RouterLink>

        <RouterLink
          to="/faq"
          class="transition hover:text-purple-600"
          exact-active-class="text-purple-600"
        >
          FAQ
        </RouterLink>
      </div>

      <!-- Desktop Actions -->
      <div class="hidden items-center gap-3 md:flex">
       

        <RouterLink
          to="/"
          class="rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:shadow-purple-500/50"
        >
          Book a demo
        </RouterLink>
      </div>

      <!-- Mobile Menu Button -->
      <button
        class="text-gray-800 transition hover:text-purple-600 md:hidden"
        @click="mobileMenuOpen = !mobileMenuOpen"
        aria-label="Toggle menu"
      >
        <!-- Open Icon -->
        <svg
          v-if="!mobileMenuOpen"
          class="h-6 w-6"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>

        <!-- Close Icon -->
        <svg
          v-else
          class="h-6 w-6"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </nav>

    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="mobileMenuOpen"
        class="border-t border-gray-200 bg-white px-5 pb-6 pt-4 md:hidden"
      >
        <div class="flex flex-col gap-4 text-sm font-medium text-gray-600">
          <RouterLink
            to="/about"
            @click="mobileMenuOpen = false"
            class="transition hover:text-purple-600"
            exact-active-class="text-purple-600"
          >
            About us
          </RouterLink>

          <RouterLink
            to="/product"
            @click="mobileMenuOpen = false"
            class="transition hover:text-purple-600"
            exact-active-class="text-purple-600"
          >
            Product
          </RouterLink>

          <RouterLink
            to="/how-it-works"
            @click="mobileMenuOpen = false"
            class="transition hover:text-purple-600"
            exact-active-class="text-purple-600"
          >
            How It Works
          </RouterLink>

          <RouterLink
            to="/pricing"
            @click="mobileMenuOpen = false"
            class="transition hover:text-purple-600"
            exact-active-class="text-purple-600"
          >
            Pricing
          </RouterLink>

          <RouterLink
            to="/training"
            @click="mobileMenuOpen = false"
            class="transition hover:text-purple-600"
            exact-active-class="text-purple-600"
          >
            Training
          </RouterLink>

          <RouterLink
            to="/faq"
            @click="mobileMenuOpen = false"
            class="transition hover:text-purple-600"
            exact-active-class="text-purple-600"
          >
            FAQ
          </RouterLink>

          <!-- Mobile Actions -->
          <div class="mt-2 flex flex-col gap-3 border-t border-gray-200 pt-4">
           

            <RouterLink
              to="/"
              @click="mobileMenuOpen = false"
              class="rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 px-5 py-3 text-center font-semibold text-white shadow-lg shadow-purple-500/30"
            >
              Book a demo
            </RouterLink>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>