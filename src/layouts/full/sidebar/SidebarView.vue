<script setup>
import sidebarItems from './sidebarItem'

defineEmits(['navigate'])
</script>

<template>
  <div class="flex h-full flex-col bg-white">
    <!-- Logo -->
    <div class="flex h-[76px] shrink-0 items-center border-b border-purple-50 px-6">
      <router-link to="/dashboard" class="flex items-center gap-3">      
        <div>
          <img src="../../../assets/wealthoceans-removebg-preview.png" alt="">
         
        </div>
      </router-link>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto px-4 py-4 sidebar-scroll">
      <div
        v-for="group in sidebarItems"
        :key="group.section"
        class="mb-5"
      >
        <p
          class="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400"
        >
          {{ group.section }}
        </p>

        <div class="space-y-1">
          <router-link
            v-for="item in group.items"
            :key="item.path"
            :to="item.path"
            class="group flex items-center gap-3 rounded-md px-3 py-2.5 transition-all duration-150"
            active-class="sidebar-active"
            @click="$emit('navigate')"
          >
            <div
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition-all group-hover:text-purple-600"
            >
              <i :class="item.icon" class="text-sm"></i>
            </div>

            <span
              class="min-w-0 flex-1 truncate text-[13px] font-medium text-gray-600 transition-colors group-hover:text-gray-900"
            >
              {{ item.title }}
            </span>

            <span
              v-if="item.badge"
              class="rounded-full bg-purple-100 px-2 py-0.5 text-[8px] font-bold text-purple-600"
            >
              {{ item.badge }}
            </span>
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Bottom card -->
    <div class="shrink-0 p-4">
      <div
        class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4c1d95] via-[#6d28d9] to-[#7c3aed] p-4 text-white"
      >
        <div
          class="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10"
        ></div>

        <div
          class="relative mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/15"
        >
          <i class="fa-solid fa-sparkles text-sm"></i>
        </div>

        <p class="relative text-sm font-semibold">
          AI Revenue Center
        </p>

        <p class="relative mt-1 text-[11px] leading-relaxed text-purple-100">
          Manage leads, conversations and sales from one place.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar-scroll {
  scrollbar-width: none;
}

.sidebar-scroll::-webkit-scrollbar {
  display: none;
}

.sidebar-active {
  background: #f5f3ff;
}

.sidebar-active div {
  background: white;
  color: #7c3aed;
  box-shadow: 0 2px 8px rgba(124, 58, 237, 0.08);
}

.sidebar-active span {
  color: #6d28d9;
  font-weight: 600;
}
</style>