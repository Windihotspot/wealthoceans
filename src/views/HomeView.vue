<template>
  <div
    class="min-h-screen w-full bg-black relative overflow-hidden flex items-center justify-center"
  >
    <!-- Subtle Glow Background -->
    <div class="absolute inset-0 bg-gradient-radial from-blue-900/20 via-black to-black"></div>

    <!-- Star / Particle Effect (optional dots) -->
    <div class="absolute inset-0 opacity-20">
      <div
        v-for="i in 80"
        :key="i"
        class="absolute w-[2px] h-[2px] bg-white rounded-full"
        :style="randomStarStyle()"
      ></div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 text-center px-6 max-w-3xl mx-auto">
      <!-- Badge -->
      <div
        class="inline-flex items-center px-4 py-1.5 mb-8 text-xs font-medium rounded-full bg-white/10 text-white backdrop-blur border border-white/10"
      >
        Waitlister AI STOCK
      </div>

      <!-- Headline -->
      <h1
        class="text-white text-4xl md:text-6xl font-light leading-tight mb-6"
      >
        The wait is part <br />
        of the
        <span class="italic font-serif">journey.</span>
      </h1>

      <!-- Subtext -->
      <p class="text-gray-400 text-base md:text-lg mb-10">
        Drive interest, collect emails, and build <br />
        momentum ahead of your launch.
      </p>

      <!-- Email Input -->
      <form
        @submit.prevent="submitEmail"
        class="flex flex-col sm:flex-row items-center justify-center gap-3"
      >
        <input
          v-model="email"
          type="email"
          placeholder="Your email address"
          required
          class="w-full sm:w-[360px] px-5 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
        />

        <button
          type="submit"
          class="px-6 py-3 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition"
        >
          Get Notified
        </button>
      </form>
    </div>

    <!-- Bottom Glow -->
    <div
      class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-blue-500/20 blur-3xl rounded-full"
    ></div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");

const submitEmail = () => {
  if (!email.value) return;

  // TODO: Replace with API call
  console.log("Waitlist email:", email.value);

  alert("You're on the waitlist!");
  email.value = "";
};

// Random star placement for background effect
const randomStarStyle = () => {
  return {
    top: Math.random() * 100 + "%",
    left: Math.random() * 100 + "%",
    opacity: Math.random(),
  };
};
</script>

<style>
/* Custom radial gradient for Tailwind */
.bg-gradient-radial {
  background: radial-gradient(
    ellipse at center,
    rgba(59, 130, 246, 0.15) 0%,
    rgba(0, 0, 0, 0.9) 50%,
    #000 100%
  );
}
</style>
