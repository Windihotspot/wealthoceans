```vue
<template>
  <div class="min-h-screen bg-[#faf9ff] text-[#18111f] overflow-hidden">
    <!-- =========================================================
         BACKGROUND
    ========================================================== -->
    <div class="fixed inset-0 pointer-events-none">
      <!-- Purple glow -->
      <div
        class="absolute -top-52 right-[-10%] w-[650px] h-[650px] rounded-full bg-purple-400/10 blur-[120px]"
      />

      <div
        class="absolute bottom-[-300px] left-[-10%] w-[600px] h-[600px] rounded-full bg-violet-500/10 blur-[120px]"
      />

      <!-- Grid -->
      <div
        class="absolute inset-0 opacity-[0.035]"
        style="
          background-image:
            linear-gradient(#6d28d9 1px, transparent 1px),
            linear-gradient(90deg, #6d28d9 1px, transparent 1px);
          background-size: 42px 42px;
        "
      />
    </div>

    <!-- =========================================================
         SIDEBAR
    ========================================================== -->
    <aside
      class="hidden lg:flex fixed left-0 top-0 bottom-0 w-[250px] bg-white/90 backdrop-blur-xl border-r border-purple-100/80 flex-col z-30"
    >
      <!-- Logo -->
      <div class="h-[76px] px-6 flex items-center border-b border-purple-50">
        <div
          class="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#5b21b6] flex items-center justify-center shadow-lg shadow-purple-200"
        >
          <span class="text-white font-black text-lg">W</span>
        </div>

        <div class="ml-3 leading-none">
          <div class="font-bold text-[17px] tracking-tight">
            Wealth Oceans
          </div>

          <div class="text-[9px] uppercase tracking-[0.18em] text-purple-500 mt-1">
            LCI Platform
          </div>
        </div>
      </div>

      <!-- Workspace -->
      <!-- <div class="px-5 pt-6 pb-3">
        <div
          class="flex items-center gap-3 p-3 rounded-xl bg-purple-50 border border-purple-100"
        >
          <div
            class="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-purple-600 shadow-sm"
          >
            <i class="fa-solid fa-building text-sm"></i>
          </div>

          <div class="min-w-0 flex-1">
            <p class="text-[10px] uppercase tracking-wider text-gray-400">
              Workspace
            </p>

            <p class="text-sm font-semibold truncate">
              My Business
            </p>
          </div>

          <i class="fa-solid fa-chevron-down text-[10px] text-gray-400"></i>
        </div>
      </div> -->

      <!-- Navigation -->
      <nav class="flex-1 px-4 py-3 overflow-y-auto">
        <p
          class="px-3 mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400"
        >
          Command Center
        </p>

        <div
          v-for="item in navigation"
          :key="item.name"
          class="group flex items-center gap-3 px-3 py-3 mb-1 rounded-xl transition-all"
          :class="
            item.active
              ? 'bg-purple-50 text-purple-700'
              : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
          "
        >
          <div
            class="w-8 h-8 rounded-lg flex items-center justify-center"
            :class="
              item.active
                ? 'bg-white shadow-sm text-purple-600'
                : 'text-gray-400 group-hover:text-gray-600'
            "
          >
            <i :class="item.icon" class="text-sm"></i>
          </div>

          <span class="text-sm font-medium">
            {{ item.name }}
          </span>

          <span
            v-if="item.badge"
            class="ml-auto text-[9px] px-2 py-1 rounded-full bg-purple-100 text-purple-600 font-semibold"
          >
            {{ item.badge }}
          </span>

          <span
            v-if="item.locked"
            class="ml-auto text-gray-300"
          >
            <i class="fa-solid fa-lock text-[9px]"></i>
          </span>
        </div>
      </nav>

      <!-- Sidebar bottom -->
      <div class="p-4">
        <div
          class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4c1d95] via-[#6d28d9] to-[#7c3aed] p-4 text-white"
        >
          <div
            class="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-white/10"
          />

          <div
            class="relative w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center mb-3"
          >
            <i class="fa-solid fa-sparkles text-sm"></i>
          </div>

          <p class="relative text-sm font-semibold">
            LCI is coming soon
          </p>

          <p class="relative text-[11px] text-purple-100 mt-1 leading-relaxed">
            Your AI sales command center is being prepared.
          </p>

          <div class="relative mt-3 h-1.5 rounded-full bg-white/15 overflow-hidden">
            <div
              class="h-full w-[85%] rounded-full bg-white"
            />
          </div>
        </div>
      </div>
    </aside>

    <!-- =========================================================
         MAIN
    ========================================================== -->
    <main class="lg:ml-[250px] min-h-screen relative z-10">
      <!-- =======================================================
           HEADER
      ======================================================== -->
      <header
        class="h-[76px] bg-white/80 backdrop-blur-xl border-b border-purple-100/80 flex items-center justify-between px-5 sm:px-8 lg:px-10"
      >
        <div>
          <p class="text-[10px] uppercase tracking-[0.16em] text-gray-400">
            LCI Command Center
          </p>

          <h1 class="text-[15px] font-semibold text-gray-900 mt-0.5">
            Dashboard
          </h1>
        </div>

        <div class="flex items-center gap-3">
          <!-- Notification -->
          <button
            class="relative hidden sm:flex w-10 h-10 rounded-xl border border-gray-200 bg-white items-center justify-center text-gray-500 hover:bg-gray-50 transition"
          >
            <i class="fa-regular fa-bell text-sm"></i>

            <span
              class="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-purple-600"
            />
          </button>

          <!-- User -->
          <div
            class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-violet-600 flex items-center justify-center text-white font-semibold text-sm shadow-md shadow-purple-200"
          >
            WO
          </div>
        </div>
      </header>

      <!-- =======================================================
           DASHBOARD CONTENT
      ======================================================== -->
      <section class="px-5 sm:px-8 lg:px-10 py-8">
        <!-- Preview stats -->
        <div
          class="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8"
        >
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

              <span
                class="text-[10px] font-medium text-gray-300"
              >
                PREVIEW
              </span>
            </div>

            <p class="text-xs text-gray-400 mt-4">
              {{ stat.label }}
            </p>

            <div
              class="h-5 w-24 rounded-md bg-gray-100 mt-2"
            />

            <div
              class="h-2 w-16 rounded-full bg-purple-50 mt-2"
            />
          </div>
        </div>

        <!-- =====================================================
             COMING SOON HERO
        ====================================================== -->
        <div class="relative max-w-5xl mx-auto">
          <!-- glow -->
          <div
            class="absolute inset-x-20 top-10 h-[400px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none"
          />

          <div
            class="relative overflow-hidden rounded-[30px] border border-purple-100 bg-white/90 backdrop-blur-xl shadow-[0_25px_80px_rgba(88,28,135,0.10)]"
          >
            <!-- top gradient -->
            <div
              class="h-1.5 bg-gradient-to-r from-purple-700 via-violet-500 to-fuchsia-500"
            />

            <div class="px-6 sm:px-10 lg:px-16 py-12 sm:py-16 text-center">
              <!-- AI Icon -->
              <div class="relative mx-auto w-fit mb-8">
                <div
                  class="absolute inset-0 rounded-[28px] bg-purple-500/20 blur-2xl scale-125"
                />

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

                  <span
                    class="relative inline-flex w-2 h-2 rounded-full bg-purple-600"
                  />
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
                We're putting the finishing touches on LCI — the AI-powered
                revenue operating system built to qualify leads, handle
                objections, close sales, and keep your revenue engine moving
                24/7.
              </p>

              <!-- Progress -->
              <div class="max-w-lg mx-auto mt-10">
                <div class="flex items-center justify-between mb-2.5">
                  <span class="text-xs font-medium text-gray-500">
                    Platform readiness
                  </span>

                  <span class="text-xs font-bold text-purple-600">
                    85%
                  </span>
                </div>

                <div
                  class="h-2.5 rounded-full bg-purple-100 overflow-hidden"
                >
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
              <p class="text-xs font-semibold text-gray-700">
                What's coming
              </p>

              <p class="text-[11px] text-gray-400 mt-0.5">
                A preview of your LCI command center
              </p>
            </div>

            <span
              class="text-[10px] font-medium px-2.5 py-1 rounded-full bg-purple-50 text-purple-600"
            >
              IN DEVELOPMENT
            </span>
          </div>

          <div
            class="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <!-- Conversations -->
            <div
              class="bg-white/80 border border-gray-100 rounded-2xl p-5 shadow-sm"
            >
              <div class="flex items-center justify-between mb-5">
                <div class="flex items-center gap-2.5">
                  <div
                    class="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center"
                  >
                    <i class="fa-regular fa-comments text-sm"></i>
                  </div>

                  <span class="text-sm font-semibold">
                    Conversations
                  </span>
                </div>

                <i class="fa-solid fa-lock text-[10px] text-gray-300"></i>
              </div>

              <div class="space-y-3">
                <div
                  v-for="n in 3"
                  :key="n"
                  class="flex items-center gap-3"
                >
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
            <div
              class="bg-white/80 border border-gray-100 rounded-2xl p-5 shadow-sm"
            >
              <div class="flex items-center justify-between mb-5">
                <div class="flex items-center gap-2.5">
                  <div
                    class="w-9 h-9 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center"
                  >
                    <i class="fa-solid fa-bullseye text-sm"></i>
                  </div>

                  <span class="text-sm font-semibold">
                    Lead Intelligence
                  </span>
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
            <div
              class="bg-white/80 border border-gray-100 rounded-2xl p-5 shadow-sm"
            >
              <div class="flex items-center justify-between mb-5">
                <div class="flex items-center gap-2.5">
                  <div
                    class="w-9 h-9 rounded-lg bg-fuchsia-50 text-fuchsia-600 flex items-center justify-center"
                  >
                    <i class="fa-solid fa-chart-line text-sm"></i>
                  </div>

                  <span class="text-sm font-semibold">
                    Revenue
                  </span>
                </div>

                <i class="fa-solid fa-lock text-[10px] text-gray-300"></i>
              </div>

              <div
                class="h-24 flex items-end gap-1.5"
              >
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
        <div
          class="text-center mt-10 pb-5 text-[11px] text-gray-400"
        >
          <span>Wealth Oceans Technologies</span>
          <span class="mx-2">•</span>
          <span>Lead Conversion Infrastructure</span>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
const navigation = [
  {
    name: 'Overview',
    icon: 'fa-solid fa-grid-2',
    active: true,
  },
  {
    name: 'Conversations',
    icon: 'fa-regular fa-comments',
    badge: 'AI',
  },
  {
    name: 'Leads',
    icon: 'fa-solid fa-users',
  },
  {
    name: 'Sales Agent',
    icon: 'fa-solid fa-wand-magic-sparkles',
    badge: 'AI',
  },
  {
    name: 'Funnels & Offers',
    icon: 'fa-solid fa-filter',
    locked: true,
  },
  {
    name: 'Analytics',
    icon: 'fa-solid fa-chart-line',
    locked: true,
  },
  {
    name: 'Email Marketing',
    icon: 'fa-regular fa-envelope',
    locked: true,
  },
  {
    name: 'Integrations',
    icon: 'fa-solid fa-plug',
    locked: true,
  },
]

const stats = [
  {
    label: 'Closed Revenue',
    icon: 'fa-solid fa-dollar-sign',
  },
  {
    label: 'Active Leads',
    icon: 'fa-solid fa-users',
  },
  {
    label: 'Conversion Rate',
    icon: 'fa-solid fa-arrow-trend-up',
  },
  {
    label: 'Conversations',
    icon: 'fa-regular fa-comments',
  },
]

const features = [
  {
    title: 'Unified Inbox',
    description: 'Every conversation',
    icon: 'fa-regular fa-comments',
  },
  {
    title: 'Lead Scoring',
    description: 'Know who is ready',
    icon: 'fa-solid fa-bullseye',
  },
  {
    title: 'AI Sales Agent',
    description: 'Qualify & close',
    icon: 'fa-solid fa-wand-magic-sparkles',
  },
  {
    title: 'Revenue Analytics',
    description: 'Track what converts',
    icon: 'fa-solid fa-chart-line',
  },
]

const revenueBars = [28, 42, 36, 55, 48, 65, 58, 78, 70, 90]
</script>
```
