<template>
  <div v-if="isLoading" class="dashboard-loader">
    <div class="loader-content">

      <div class="logo-wrapper">
        <div class="logo-glow"></div>

        <img
          :src="logoSrc"
          alt="Wealth Oceans Technologies"
          class="loader-logo"
        />
      </div>

     <div class="loading-text">
          <span>Getting things ready</span>

          <span class="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div> 
      
      <div class="progress-track">
        <div class="progress-bar"></div>
      </div>

      <p class="loading-subtext">
        Preparing your workspace
      </p>

    </div>
  </div>
  <MainLayout v-else>
     <div class="min-h-screen bg-[#faf9ff] text-[#18111f] overflow-hidden">
    <main class="min-h-screen relative z-10">
      <!-- =======================================================
           DASHBOARD CONTENT
      ======================================================== -->
      <section class="px-5 sm:px-8 lg:px-10 py-8">
        <!-- Preview stats -->
        <div class="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="bg-white/80 backdrop-blur border border-gray-100 rounded-2xl p-5 shadow-sm"
          >
            <div class="flex items-center justify-between">
              <div
                class="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center"
              >
                <i :class="stat.icon" class="text-sm"></i>
              </div>

              <span class="text-[10px] font-medium text-gray-300"> PREVIEW </span>
            </div>

            <p class="text-xs text-gray-400 mt-4">
              {{ stat.label }}
            </p>

            <div class="h-5 w-24 rounded-md bg-gray-100 mt-2" />

            <div class="h-2 w-16 rounded-full bg-purple-50 mt-2" />
          </div>
        </div>

        <!-- =====================================================
             COMING SOON HERO
        ====================================================== -->
        <div class="relative mx-auto">
          <!-- glow -->
          <div
            class="absolute inset-x-20 top-10 h-[400px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none"
          />

          <div
            class="relative overflow-hidden rounded-[30px] border border-purple-100 bg-white/90 backdrop-blur-xl shadow-[0_25px_80px_rgba(88,28,135,0.10)]"
          >
            <!-- top gradient -->
            <div class="h-1.5 bg-gradient-to-r from-purple-700 via-violet-500 to-fuchsia-500" />

            <div class="px-6 sm:px-10 lg:px-16 py-12 sm:py-16 text-center">
              <!-- AI Icon -->
              <div class="relative mx-auto w-fit mb-8">
                <div class="absolute inset-0 rounded-[28px] bg-purple-500/20 blur-2xl scale-125" />

                <div
                  class="relative w-24 h-24 sm:w-28 sm:h-28 rounded-[28px] bg-gradient-to-br from-[#6d28d9] via-[#7c3aed] to-[#9333ea] flex items-center justify-center shadow-2xl shadow-purple-300/40"
                >
                  <i class="fa-solid fa-brain text-white text-4xl"></i>

                  <!-- orbital dots -->
                  <span
                    class="absolute -top-2 right-1 w-3 h-3 rounded-full bg-fuchsia-400 border-2 border-white"
                  />

                  <span
                    class="absolute bottom-1 -left-2 w-2.5 h-2.5 rounded-full bg-violet-300 border-2 border-white"
                  />
                </div>
              </div>

              <!-- Badge -->
              <div
                class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs sm:text-sm font-semibold"
              >
                <span class="relative flex w-2 h-2">
                  <span
                    class="absolute inline-flex w-full h-full rounded-full bg-purple-400 animate-ping opacity-75"
                  />

                  <span class="relative inline-flex w-2 h-2 rounded-full bg-purple-600" />
                </span>

                LCI Platform · Coming Soon
              </div>

              <!-- Heading -->
              <h2
                class="mt-7 text-4xl sm:text-5xl lg:text-[58px] leading-[1.03] font-bold tracking-[-0.04em] text-gray-950"
              >
                Your AI sales
                <span
                  class="block bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent"
                >
                  command center.
                </span>
              </h2>

              <!-- Description -->
              <p
                class="max-w-2xl mx-auto mt-6 text-sm sm:text-base lg:text-lg text-gray-500 leading-relaxed"
              >
                We're putting the finishing touches on LCI — the AI-powered revenue operating system
                built to qualify leads, handle objections, close sales, and keep your revenue engine
                moving 24/7.
              </p>

              <!-- Progress -->
              <div class="max-w-lg mx-auto mt-10">
                <div class="flex items-center justify-between mb-2.5">
                  <span class="text-xs font-medium text-gray-500"> Platform readiness </span>

                  <span class="text-xs font-bold text-purple-600"> 85% </span>
                </div>

                <div class="h-2.5 rounded-full bg-purple-100 overflow-hidden">
                  <div
                    class="h-full w-[85%] rounded-full bg-gradient-to-r from-purple-700 via-violet-600 to-fuchsia-500"
                  />
                </div>
              </div>

              <!-- CTA -->
              <div class="mt-9">
                <button
                  class="group inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-700 to-violet-600 text-white text-sm font-semibold shadow-lg shadow-purple-200 hover:shadow-xl hover:shadow-purple-300 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <i class="fa-regular fa-bell"></i>

                  Get notified at launch

                  <i
                    class="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"
                  ></i>
                </button>
              </div>

              <!-- =================================================
                   FEATURE PILLS
              ================================================== -->
              <div
                class="mt-12 pt-8 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-5"
              >
                <div
                  v-for="feature in features"
                  :key="feature.title"
                  class="flex flex-col items-center"
                >
                  <div
                    class="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center"
                  >
                    <i :class="feature.icon"></i>
                  </div>

                  <p class="mt-3 text-xs font-semibold text-gray-800">
                    {{ feature.title }}
                  </p>

                  <p class="mt-1 text-[11px] text-gray-400">
                    {{ feature.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- =====================================================
             PRODUCT PREVIEW
        ====================================================== -->
        <div class="max-w-5xl mx-auto mt-8">
          <div class="flex items-center justify-between mb-4">
            <div>
              <p class="text-xs font-semibold text-gray-700">What's coming</p>

              <p class="text-[11px] text-gray-400 mt-0.5">A preview of your LCI command center</p>
            </div>

            <span
              class="text-[10px] font-medium px-2.5 py-1 rounded-full bg-purple-50 text-purple-600"
            >
              IN DEVELOPMENT
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Conversations -->
            <div class="bg-white/80 border border-gray-100 rounded-2xl p-5 shadow-sm">
              <div class="flex items-center justify-between mb-5">
                <div class="flex items-center gap-2.5">
                  <div
                    class="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center"
                  >
                    <i class="fa-regular fa-comments text-sm"></i>
                  </div>

                  <span class="text-sm font-semibold"> Conversations </span>
                </div>

                <i class="fa-solid fa-lock text-[10px] text-gray-300"></i>
              </div>

              <div class="space-y-3">
                <div v-for="n in 3" :key="n" class="flex items-center gap-3">
                  <div
                    class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-100 to-violet-100"
                  />

                  <div class="flex-1">
                    <div class="h-2.5 w-20 bg-gray-100 rounded-full" />
                    <div class="h-2 w-28 bg-gray-50 rounded-full mt-2" />
                  </div>

                  <div class="w-2 h-2 rounded-full bg-purple-200" />
                </div>
              </div>
            </div>

            <!-- Lead Score -->
            <div class="bg-white/80 border border-gray-100 rounded-2xl p-5 shadow-sm">
              <div class="flex items-center justify-between mb-5">
                <div class="flex items-center gap-2.5">
                  <div
                    class="w-9 h-9 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center"
                  >
                    <i class="fa-solid fa-bullseye text-sm"></i>
                  </div>

                  <span class="text-sm font-semibold"> Lead Intelligence </span>
                </div>

                <i class="fa-solid fa-lock text-[10px] text-gray-300"></i>
              </div>

              <div class="flex items-end gap-2">
                <div class="h-16 w-5 bg-purple-100 rounded-t" />
                <div class="h-24 w-5 bg-purple-200 rounded-t" />
                <div class="h-20 w-5 bg-purple-300 rounded-t" />
                <div class="h-32 w-5 bg-purple-400 rounded-t" />
                <div class="h-28 w-5 bg-purple-500 rounded-t" />
                <div class="h-36 w-5 bg-purple-600 rounded-t" />
              </div>

              <div class="mt-4 h-2 w-32 bg-gray-100 rounded-full" />
            </div>

            <!-- Revenue -->
            <div class="bg-white/80 border border-gray-100 rounded-2xl p-5 shadow-sm">
              <div class="flex items-center justify-between mb-5">
                <div class="flex items-center gap-2.5">
                  <div
                    class="w-9 h-9 rounded-lg bg-fuchsia-50 text-fuchsia-600 flex items-center justify-center"
                  >
                    <i class="fa-solid fa-chart-line text-sm"></i>
                  </div>

                  <span class="text-sm font-semibold"> Revenue </span>
                </div>

                <i class="fa-solid fa-lock text-[10px] text-gray-300"></i>
              </div>

              <div class="h-24 flex items-end gap-1.5">
                <div
                  v-for="height in revenueBars"
                  :key="height"
                  class="flex-1 rounded-t bg-gradient-to-t from-purple-200 to-purple-400"
                  :style="{ height: `${height}%` }"
                />
              </div>

              <div class="mt-4 flex items-center justify-between">
                <div class="h-2 w-20 bg-gray-100 rounded-full" />
                <div class="h-2 w-12 bg-purple-100 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="text-center mt-10 pb-5 text-[11px] text-gray-400">
          <span>Wealth Oceans Technologies</span>
          <span class="mx-2">•</span>
          <span>Lead Conversion Infrastructure</span>
        </div>
      </section>
    </main>
  </div>
  </MainLayout>
 
</template>

<script setup>
import MainLayout from '@/layouts/full/MainLayout.vue';
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
const route = useRoute()
const router = useRouter()
import logoSrc from '@/assets/wealthoceans-removebg-preview.png'

const isLoading = ref(route.query.welcome === 'true')

onMounted(() => {
  if (!isLoading.value) return

  setTimeout(async () => {
    isLoading.value = false

    await router.replace({
      path: route.path,
      query: {}
    })
  }, 1200)
})
const navigation = [
  {
    name: 'Overview',
    icon: 'fa-solid fa-grid-2',
    active: true
  },
  {
    name: 'Conversations',
    icon: 'fa-regular fa-comments',
    badge: 'AI'
  },
  {
    name: 'Leads',
    icon: 'fa-solid fa-users'
  },
  {
    name: 'Sales Closer',
    icon: 'fa-solid fa-wand-magic-sparkles',
    badge: 'AI'
  },
  {
    name: 'Funnels & Offers',
    icon: 'fa-solid fa-filter',
    locked: true
  },
  {
    name: 'Analytics',
    icon: 'fa-solid fa-chart-line',
    locked: true
  },
  {
    name: 'Email Marketing',
    icon: 'fa-regular fa-envelope',
    locked: true
  },
  {
    name: 'Integrations',
    icon: 'fa-solid fa-plug',
    locked: true
  }
]

const stats = [
  {
    label: 'Closed Revenue',
    icon: 'fa-solid fa-dollar-sign'
  },
  {
    label: 'Active Leads',
    icon: 'fa-solid fa-users'
  },
  {
    label: 'Conversion Rate',
    icon: 'fa-solid fa-arrow-trend-up'
  },
  {
    label: 'Conversations',
    icon: 'fa-regular fa-comments'
  }
]

const features = [
  {
    title: 'Unified Inbox',
    description: 'Every conversation',
    icon: 'fa-regular fa-comments'
  },
  {
    title: 'Lead Scoring',
    description: 'Know who is ready',
    icon: 'fa-solid fa-bullseye'
  },
  {
    title: 'AI Sales Closer',
    description: 'Qualify & close',
    icon: 'fa-solid fa-wand-magic-sparkles'
  },
  {
    title: 'Revenue Analytics',
    description: 'Track what converts',
    icon: 'fa-solid fa-chart-line'
  }
]

const revenueBars = [28, 42, 36, 55, 48, 65, 58, 78, 70, 90]
</script>

<style scoped>
.dashboard-loader {
  position: fixed;
  inset: 0;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background:
    radial-gradient(
      circle at center,
      rgba(108, 75, 244, 0.09) 0%,
      rgba(108, 75, 244, 0.03) 32%,
      transparent 68%
    ),
    #faf9ff;
}

.dashboard-loader::before {
  content: '';
  position: absolute;
  width: 600px;
  height: 600px;
  border: 1px solid rgba(108, 75, 244, 0.06);
  border-radius: 50%;
  animation: rotate-ring 12s linear infinite;
}

.dashboard-loader::after {
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
  width: 170px;
  height: 110px;
  border-radius: 50%;
  background: rgba(108, 75, 244, 0.2);
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
  gap: 3px;
  margin-left: 5px;
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

  .dashboard-loader::before {
    width: 450px;
    height: 450px;
  }

  .dashboard-loader::after {
    width: 320px;
    height: 320px;
  }
}
</style>