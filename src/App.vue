<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import logoSrc from '@/assets/wealthoceans-removebg-preview.png'

const authStore = useAuthStore()
const authReady = ref(false)

onMounted(async () => {
  try {
    await authStore.initAuthListener()
  } finally {
    authReady.value = true
  }
})
</script>

<template>
  <main class="text-neutral-800">
    <div v-if="!authReady" class="app-loader">
      <div class="loader-content">
        <div class="logo-wrapper">
          <div class="logo-glow"></div>

          <img
            :src="logoSrc"
            alt="Wealth Oceans Technologies"
            class="loader-logo"
          />
        </div>

        <!-- <div class="loading-text">
          <span>Getting things ready</span>

          <span class="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div> -->

        <div class="progress-track">
          <div class="progress-bar"></div>
        </div>

        <!-- <p class="loading-subtext">
          Preparing your workspace
        </p> -->
      </div>
    </div>

    <RouterView v-else />
  </main>
</template>

<style>
.custom-btn {
  background-color: #27bfa0;
}

.app-loader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background:
    radial-gradient(
      circle at center,
      rgba(108, 75, 244, 0.08) 0%,
      rgba(108, 75, 244, 0.025) 30%,
      transparent 65%
    ),
    #faf9ff;
}

.app-loader::before {
  content: '';
  position: absolute;
  width: 600px;
  height: 600px;
  border: 1px solid rgba(108, 75, 244, 0.06);
  border-radius: 50%;
  animation: rotate-ring 12s linear infinite;
}

.app-loader::after {
  content: '';
  position: absolute;
  width: 420px;
  height: 420px;
  border: 1px solid rgba(108, 75, 244, 0.05);
  border-radius: 50%;
  animation: rotate-ring-reverse 9s linear infinite;
}

.loader-content {
  position: relative;
  z-index: 2;
  display: flex;
  width: 320px;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.logo-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
}

.logo-glow {
  position: absolute;
  width: 150px;
  height: 100px;
  border-radius: 50%;
  background: rgba(108, 75, 244, 0.18);
  filter: blur(35px);
  animation: glow-pulse 2.4s ease-in-out infinite;
}

.loader-logo {
  position: relative;
  z-index: 1;
  width: 250px;
  height: auto;
  object-fit: contain;
  animation: logo-breathe 2.4s ease-in-out infinite;
}

.loading-text {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 24px;
  color: #21183d;
  font-size: 14px;
  font-weight: 600;
}

.loading-dots {
  display: inline-flex;
  margin-left: 4px;
  gap: 3px;
}

.loading-dots span {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: #6c4bf4;
  animation: dot-bounce 1.4s infinite ease-in-out both;
}

.loading-dots span:nth-child(1) {
  animation-delay: -0.32s;
}

.loading-dots span:nth-child(2) {
  animation-delay: -0.16s;
}

.progress-track {
  position: relative;
  width: 180px;
  height: 3px;
  margin-top: 18px;
  overflow: hidden;
  border-radius: 999px;
  background: #e9e4fb;
}

.progress-bar {
  position: absolute;
  top: 0;
  left: -40%;
  width: 40%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(
    90deg,
    transparent,
    #6c4bf4,
    #9a7cff,
    transparent
  );
  animation: progress-slide 1.6s ease-in-out infinite;
}

.loading-subtext {
  margin-top: 12px;
  color: #a19aad;
  font-size: 11px;
}

@keyframes logo-breathe {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.92;
  }

  50% {
    transform: scale(1.025);
    opacity: 1;
  }
}

@keyframes glow-pulse {
  0%,
  100% {
    transform: scale(0.85);
    opacity: 0.45;
  }

  50% {
    transform: scale(1.15);
    opacity: 0.8;
  }
}

@keyframes progress-slide {
  0% {
    left: -40%;
  }

  100% {
    left: 100%;
  }
}

@keyframes dot-bounce {
  0%,
  80%,
  100% {
    transform: scale(0.6);
    opacity: 0.4;
  }

  40% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes rotate-ring {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes rotate-ring-reverse {
  from {
    transform: rotate(360deg);
  }

  to {
    transform: rotate(0deg);
  }
}

@media (max-width: 640px) {
  .loader-logo {
    width: 210px;
  }

  .app-loader::before {
    width: 450px;
    height: 450px;
  }

  .app-loader::after {
    width: 320px;
    height: 320px;
  }
}
</style>