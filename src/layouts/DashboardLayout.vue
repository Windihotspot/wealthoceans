<template>
  <v-layout class="dashboard-layout">
    <v-navigation-drawer permanent color="white" class="border-e">
      <div class="pa-4">
        <img src="@/assets/wealthoceans.jpeg" alt="Wealth Oceans" width="120" />
      </div>

      <v-list nav density="comfortable">
        <v-list-item
          v-for="item in navItems"
          :key="item.title"
          :to="item.to"
          rounded="lg"
          class="mx-2 mb-1"
        >
          <template #prepend>
            <i :class="item.icon" class="mr-3 text-medium-emphasis" />
          </template>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>

      <template #append>
        <div class="pa-3">
          <v-btn block variant="tonal" color="primary" @click="handleLogout">
            <i class="fa-solid fa-arrow-right-from-bracket mr-2" /> Log out
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar color="white" elevation="0" class="border-b">
      <v-app-bar-title class="font-weight-bold">
        {{ authStore.organization?.name }}
      </v-app-bar-title>
      <v-spacer />
      <v-chip color="primary" variant="tonal" class="mr-4">
        <i class="fa-solid fa-circle-check mr-2" style="font-size: 10px" /> Onboarding complete
      </v-chip>
      <v-avatar color="primary" size="36" class="mr-4">
        <span class="text-white text-body-2 font-weight-bold">
          {{ authStore.ownerName.charAt(0).toUpperCase() }}
        </span>
      </v-avatar>
    </v-app-bar>

    <v-main class="bg-white">
      <router-view />
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

const router = useRouter()
const authStore = useAuthStore()

const navItems = [
  { title: 'Dashboard', to: '/', icon: 'fa-solid fa-gauge' },
  { title: 'Unified Inbox', to: '/inbox', icon: 'fa-solid fa-inbox' },
  { title: 'Leads', to: '/leads', icon: 'fa-solid fa-users' },
  { title: 'Funnels & Offers', to: '/funnels', icon: 'fa-solid fa-filter' },
  { title: 'Email', to: '/email', icon: 'fa-solid fa-envelope' },
  { title: 'Settings', to: '/settings', icon: 'fa-solid fa-gear' }
  // Routes for these get added in later sprints
]

async function handleLogout() {
  await authStore.logout()
  router.push({ name: 'login' })
}
</script>

<style scoped>
.dashboard-layout {
  min-height: 100vh;
}
</style>