<template>
  <MainLayout>
    <div class="min-h-screen bg-[#FAF9FE] text-[#171329]">
      <!-- MAIN CONTENT -->
      <main class="mx-auto w-full px-5 py-7 lg:px-8">
        <!-- PAGE INTRO -->
        <section class="mb-7">
          <div class="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div
                class="mb-3 inline-flex items-center gap-2 rounded-full border border-[#E7D8FF] bg-[#F8F2FF] px-3 py-1.5"
              >
                <span
                  class="h-1.5 w-1.5 rounded-full bg-[#8B3DFF] shadow-[0_0_8px_rgba(139,61,255,0.7)]"
                ></span>

                <span class="text-xs font-semibold text-[#7835C9]"> Live waitlist overview </span>
              </div>

              <h2 class="text-3xl font-bold tracking-tight text-[#171329] sm:text-4xl">
                Monitor your
                <span
                  class="bg-gradient-to-r from-[#7C2FE0] to-[#D946EF] bg-clip-text text-transparent"
                >
                  waitlist.
                </span>
              </h2>

              <p class="mt-2 max-w-2xl text-sm leading-6 text-[#777188]">
                Track new leads, confirmations, engagement and recent activity from one central
                dashboard.
              </p>
            </div>

            <div
              v-if="waitlistData"
              class="flex items-center gap-2 text-xs font-medium text-[#8A8399]"
            >
              <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
              Data loaded successfully
            </div>
          </div>
        </section>

        <!-- ERROR -->
        <div
          v-if="error"
          class="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700"
        >
          <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-100">
            <svg
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.5M12 16h.01M10.29 3.86l-7.1 12.27A2 2 0 004.92 19h14.16a2 2 0 001.73-2.87l-7.08-12.27a2 2 0 00-3.44 0z"
              />
            </svg>
          </div>

          <div>
            <p class="font-semibold">Unable to load dashboard</p>
            <p class="mt-1 text-sm text-red-600">
              {{ error }}
            </p>
          </div>
        </div>

        <!-- LOADING -->
        <div
          v-if="loading && !waitlistData"
          class="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4"
        >
          <div
            v-for="n in 4"
            :key="n"
            class="h-[145px] animate-pulse rounded-2xl border border-[#E8E3F0] bg-white"
          ></div>
        </div>

        <!-- DASHBOARD -->
        <template v-if="!loading && waitlistData">
          <!-- STATS -->
          <section class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <!-- TOTAL LEADS -->
            <div
              class="group relative overflow-hidden rounded-2xl border border-[#E5DFEE] bg-white p-5 shadow-[0_4px_20px_rgba(35,20,60,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(35,20,60,0.08)]"
            >
              <div
                class="absolute right-0 top-0 h-24 w-24 rounded-full bg-[#8B5CF6]/5 blur-2xl"
              ></div>

              <div class="flex items-start justify-between">
                <div
                  class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F3EAFE] text-[#7C2FE0]"
                >
                  <svg
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="1.8"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
                    />
                  </svg>
                </div>

                <span
                  class="rounded-full bg-[#F7F3FC] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#9A91AA]"
                >
                  Total
                </span>
              </div>

              <p class="mt-5 text-sm font-medium text-[#858096]">Total Leads</p>

              <p class="mt-1 text-3xl font-bold tracking-tight text-[#171329]">
                {{ waitlistData.total_leads }}
              </p>

              <div class="mt-4 h-1 w-16 overflow-hidden rounded-full bg-[#EDE8F5]">
                <div
                  class="h-full w-full rounded-full bg-gradient-to-r from-[#7C2FE0] to-[#D946EF]"
                ></div>
              </div>
            </div>

            <!-- CONFIRMED -->
            <div
              class="group relative overflow-hidden rounded-2xl border border-[#E5DFEE] bg-white p-5 shadow-[0_4px_20px_rgba(35,20,60,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(35,20,60,0.08)]"
            >
              <div
                class="absolute right-0 top-0 h-24 w-24 rounded-full bg-emerald-400/5 blur-2xl"
              ></div>

              <div class="flex items-start justify-between">
                <div
                  class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ECFDF5] text-[#10B981]"
                >
                  <svg
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 12l2 2 4-4m5.62-4.62a9 9 0 11-12.73 0 9 9 0 0112.73 0z"
                    />
                  </svg>
                </div>

                <span
                  class="rounded-full bg-[#ECFDF5] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#059669]"
                >
                  Verified
                </span>
              </div>

              <p class="mt-5 text-sm font-medium text-[#858096]">Confirmed Leads</p>

              <p class="mt-1 text-3xl font-bold tracking-tight text-[#171329]">
                {{ waitlistData.confirmed_leads }}
              </p>

              <div class="mt-4 h-1 w-16 overflow-hidden rounded-full bg-[#E5F7EF]">
                <div
                  class="h-full rounded-full bg-[#10B981]"
                  :style="{
                    width:
                      waitlistData.total_leads > 0
                        ? `${Math.min(
                            (waitlistData.confirmed_leads / waitlistData.total_leads) * 100,
                            100
                          )}%`
                        : '0%'
                  }"
                ></div>
              </div>
            </div>

            <!-- PENDING -->
            <div
              class="group relative overflow-hidden rounded-2xl border border-[#E5DFEE] bg-white p-5 shadow-[0_4px_20px_rgba(35,20,60,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(35,20,60,0.08)]"
            >
              <div
                class="absolute right-0 top-0 h-24 w-24 rounded-full bg-amber-400/5 blur-2xl"
              ></div>

              <div class="flex items-start justify-between">
                <div
                  class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF7E8] text-[#F59E0B]"
                >
                  <svg
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="1.8"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 8v4l2.5 2.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>

                <span
                  class="rounded-full bg-[#FFF7E8] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#D97706]"
                >
                  Pending
                </span>
              </div>

              <p class="mt-5 text-sm font-medium text-[#858096]">Pending Confirmation</p>

              <p class="mt-1 text-3xl font-bold tracking-tight text-[#171329]">
                {{ waitlistData.pending_leads }}
              </p>

              <div class="mt-4 h-1 w-16 overflow-hidden rounded-full bg-[#FEF3DC]">
                <div class="h-full w-3/4 rounded-full bg-[#F59E0B]"></div>
              </div>
            </div>

            <!-- EMAIL EVENTS -->
            <div
              class="group relative overflow-hidden rounded-2xl border border-[#E5DFEE] bg-white p-5 shadow-[0_4px_20px_rgba(35,20,60,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(35,20,60,0.08)]"
            >
              <div
                class="absolute right-0 top-0 h-24 w-24 rounded-full bg-fuchsia-400/5 blur-2xl"
              ></div>

              <div class="flex items-start justify-between">
                <div
                  class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F8EAFE] text-[#C026D3]"
                >
                  <svg
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="1.8"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>

                <span
                  class="rounded-full bg-[#F8EAFE] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#A21CAF]"
                >
                  Activity
                </span>
              </div>

              <p class="mt-5 text-sm font-medium text-[#858096]">Email Events</p>

              <p class="mt-1 text-3xl font-bold tracking-tight text-[#171329]">
                {{ waitlistData.email_events.length }}
              </p>

              <div class="mt-4 h-1 w-16 overflow-hidden rounded-full bg-[#F8EAFE]">
                <div
                  class="h-full w-full rounded-full bg-gradient-to-r from-[#7C2FE0] to-[#D946EF]"
                ></div>
              </div>
            </div>
          </section>

          <!-- MAIN GRADIENT PANEL -->
          <section
            class="relative mt-7 overflow-hidden rounded-3xl border border-[#E3D9EF] bg-white shadow-[0_8px_35px_rgba(43,20,70,0.05)]"
          >
            <!-- Gradient top border -->
            <div
              class="absolute left-0 right-0 top-0 h-[4px] bg-gradient-to-r from-[#7C2FE0] via-[#A855F7] to-[#D946EF]"
            ></div>

            <!-- Decorative glow -->
            <div
              class="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[#D946EF]/10 blur-3xl"
            ></div>

            <div
              class="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#7C2FE0]/10 blur-3xl"
            ></div>

            <!-- TABLE HEADER -->
            <div
              class="relative flex flex-col justify-between gap-4 border-b border-[#ECE7F2] px-6 py-6 sm:flex-row sm:items-center"
            >
              <div>
                <div class="flex items-center gap-2">
                  <div
                    class="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F3EAFE] text-[#7C2FE0]"
                  >
                    <svg
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4-4a4 4 0 100-8 4 4 0 000 8zm6 2a3 3 0 100-6"
                      />
                    </svg>
                  </div>

                  <h2 class="text-lg font-bold text-[#171329]">All Waitlist Leads</h2>
                </div>

                <p class="mt-1 pl-11 text-sm text-[#898196]">
                  Every signup captured by your waitlist.
                </p>
              </div>

              <div class="rounded-xl border border-[#E8E1F1] bg-[#FBF9FE] px-4 py-2 text-sm">
                <span class="text-[#8C8499]">Total:</span>
                <span class="ml-1 font-bold text-[#7C2FE0]">
                  {{ waitlistData.leads.length }}
                </span>
              </div>
            </div>

            <!-- LEADS TABLE -->
            <div class="relative overflow-x-auto">
              <table class="w-full min-w-[900px]">
                <thead>
                  <tr class="border-b border-[#ECE7F2] bg-[#FCFBFE]">
                    <th
                      class="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-[#928A9F]"
                    >
                      Name
                    </th>

                    <th
                      class="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-[#928A9F]"
                    >
                      Email
                    </th>

                    <th
                      class="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-[#928A9F]"
                    >
                      Phone
                    </th>

                    <th
                      class="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-[#928A9F]"
                    >
                      Status
                    </th>

                    <th
                      class="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-[#928A9F]"
                    >
                      Joined
                    </th>

                    <th
                      class="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-[#928A9F]"
                    >
                      Source
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr
                    v-for="lead in waitlistData.leads"
                    :key="lead.id"
                    class="border-b border-[#F0ECF4] transition hover:bg-[#FBF9FE]"
                  >
                    <!-- NAME -->
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-3">
                        <div
                          class="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#7C2FE0] to-[#D946EF] text-xs font-bold text-white"
                        >
                          {{ (lead.first_name || lead.email || '?').charAt(0).toUpperCase() }}
                        </div>

                        <span class="font-semibold text-[#30283D]">
                          {{ lead.first_name || '-' }}
                        </span>
                      </div>
                    </td>

                    <!-- EMAIL -->
                    <td class="px-6 py-4 text-sm text-[#686174]">
                      {{ lead.email }}
                    </td>

                    <!-- PHONE -->
                    <td class="px-6 py-4 text-sm text-[#686174]">
                      {{ lead.phone || '-' }}
                    </td>

                    <!-- STATUS -->
                    <td class="px-6 py-4">
                      <span
                        v-if="lead.confirmed"
                        class="inline-flex items-center gap-1.5 rounded-full border border-[#BBF7D0] bg-[#F0FDF4] px-3 py-1.5 text-xs font-semibold text-[#15803D]"
                      >
                        <span class="h-1.5 w-1.5 rounded-full bg-[#22C55E]"></span>
                        Confirmed
                      </span>

                      <span
                        v-else
                        class="inline-flex items-center gap-1.5 rounded-full border border-[#FDE68A] bg-[#FFFBEB] px-3 py-1.5 text-xs font-semibold text-[#B45309]"
                      >
                        <span class="h-1.5 w-1.5 rounded-full bg-[#F59E0B]"></span>
                        Pending
                      </span>
                    </td>

                    <!-- DATE -->
                    <td class="px-6 py-4 text-sm text-[#686174]">
                      {{ formatDate(lead.joined_at) }}
                    </td>

                    <!-- SOURCE -->
                    <td class="px-6 py-4">
                      <span
                        class="rounded-lg bg-[#F6F2FA] px-2.5 py-1.5 text-xs font-medium text-[#71687E]"
                      >
                        {{ lead.source || 'Direct' }}
                      </span>
                    </td>
                  </tr>

                  <!-- EMPTY -->
                  <tr v-if="waitlistData.leads.length === 0">
                    <td colspan="6" class="px-6 py-16 text-center">
                      <div
                        class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F4EFFA] text-[#8B5CF6]"
                      >
                        <svg
                          class="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="1.7"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4-4a4 4 0 100-8 4 4 0 000 8zm6 2a3 3 0 100-6"
                          />
                        </svg>
                      </div>

                      <p class="mt-4 font-semibold text-[#30283D]">No waitlist leads yet</p>

                      <p class="mt-1 text-sm text-[#91899E]">New signups will appear here.</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- RECENT ACTIVITY -->
          <section
            class="mt-7 overflow-hidden rounded-3xl border border-[#E5DFEE] bg-white shadow-[0_8px_35px_rgba(43,20,70,0.04)]"
          >
            <div
              class="flex flex-col justify-between gap-3 border-b border-[#ECE7F2] px-6 py-6 sm:flex-row sm:items-center"
            >
              <div>
                <div class="flex items-center gap-2">
                  <div
                    class="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F8EAFE] text-[#C026D3]"
                  >
                    <svg
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="1.8"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 8v4l2.5 2.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>

                  <h2 class="text-lg font-bold text-[#171329]">Recent Activity</h2>
                </div>

                <p class="mt-1 pl-11 text-sm text-[#898196]">
                  Latest events from your waitlist system.
                </p>
              </div>

              <span
                class="w-fit rounded-full bg-[#F8F2FF] px-3 py-1.5 text-xs font-semibold text-[#7835C9]"
              >
                Latest 20 events
              </span>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full min-w-[800px]">
                <thead>
                  <tr class="border-b border-[#ECE7F2] bg-[#FCFBFE]">
                    <th
                      class="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-[#928A9F]"
                    >
                      Event Type
                    </th>

                    <th
                      class="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-[#928A9F]"
                    >
                      Status
                    </th>

                    <th
                      class="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-[#928A9F]"
                    >
                      Timestamp
                    </th>

                    <th
                      class="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-[#928A9F]"
                    >
                      Request ID
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr
                    v-for="log in waitlistData.audit_logs.slice(0, 20)"
                    :key="log.id"
                    class="border-b border-[#F0ECF4] transition hover:bg-[#FBF9FE]"
                  >
                    <td class="px-6 py-4">
                      <span class="font-medium text-[#30283D]">
                        {{ log.event_type }}
                      </span>
                    </td>

                    <td class="px-6 py-4">
                      <span
                        v-if="log.status === 'success'"
                        class="inline-flex items-center gap-1.5 rounded-full bg-[#F0FDF4] px-3 py-1.5 text-xs font-semibold text-[#15803D]"
                      >
                        <span class="h-1.5 w-1.5 rounded-full bg-[#22C55E]"></span>
                        Success
                      </span>

                      <span
                        v-else-if="log.status === 'pending'"
                        class="inline-flex items-center gap-1.5 rounded-full bg-[#FFFBEB] px-3 py-1.5 text-xs font-semibold text-[#B45309]"
                      >
                        <span class="h-1.5 w-1.5 rounded-full bg-[#F59E0B]"></span>
                        Pending
                      </span>

                      <span
                        v-else
                        class="inline-flex items-center gap-1.5 rounded-full bg-[#FEF2F2] px-3 py-1.5 text-xs font-semibold text-[#DC2626]"
                      >
                        <span class="h-1.5 w-1.5 rounded-full bg-[#EF4444]"></span>
                        {{ log.status }}
                      </span>
                    </td>

                    <td class="px-6 py-4 text-sm text-[#686174]">
                      {{ formatDate(log.created_at) }}
                    </td>

                    <td class="px-6 py-4">
                      <code class="rounded-lg bg-[#F6F2FA] px-2.5 py-1.5 text-xs text-[#786F87]">
                        {{ log.request_id?.slice(0, 8) }}...
                      </code>
                    </td>
                  </tr>

                  <tr v-if="waitlistData.audit_logs.length === 0">
                    <td colspan="4" class="px-6 py-12 text-center">
                      <p class="text-sm text-[#91899E]">No activity recorded yet.</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </template>
      </main>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '@/services/supabase'
import MainLayout from '@/layouts/full/MainLayout.vue'

interface WaitlistData {
  leads: any[]
  email_events: any[]
  audit_logs: any[]
  total_leads: number
  confirmed_leads: number
  pending_leads: number
}

const loading = ref(false)
const error = ref('')
const waitlistData = ref<WaitlistData | null>(null)

const formatDate = (dateString: string) => {
  if (!dateString) return '-'

  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const fetchWaitlistData = async () => {
  loading.value = true
  error.value = ''

  try {
    const { data, error: err } = await supabase.functions.invoke('get-admin-dashboard-data', {
      method: 'GET'
    })

    console.log('admin dashboard:', data)

    if (err) {
      throw err
    }

    waitlistData.value = data.waitlist
  } catch (err: any) {
    console.error('Error fetching data:', err)
    error.value = err.message || 'Failed to fetch waitlist data'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchWaitlistData()
})
</script>

<style scoped>
table {
  width: 100%;
}
</style>
