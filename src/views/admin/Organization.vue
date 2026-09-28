<template>
    <MainLayout>
         <div class="min-h-screen bg-white p-6">
    <div class="mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <i class="fas fa-chart-line text-purple-600"></i>
          Organizations Dashboard
        </h1>
        <p class="text-gray-600 flex items-center gap-2">
          <i class="fas fa-info-circle text-gray-400"></i>
          Monitor all onboarded organizations and users
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-12">
        <div class="relative w-12 h-12">
          <div class="absolute inset-0 rounded-full border-4 border-gray-200"></div>
          <div class="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-600 border-r-purple-600 animate-spin"></div>
        </div>
      </div>

      <!-- Error State -->
      <div v-if="error" class="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-6 flex items-center gap-3">
        <i class="fas fa-exclamation-circle"></i>
        {{ error }}
      </div>

      <!-- Stats Cards -->
      <div v-if="!loading && organizationsData" class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white border border-gray-200 rounded-lg p-6 hover:border-purple-300 hover:shadow-md transition">
          <p class="text-gray-600 text-sm mb-2 flex items-center gap-2">
            <i class="fas fa-building text-purple-600"></i>
            Total Organizations
          </p>
          <p class="text-3xl font-bold text-gray-900">{{ organizationsData.total_organizations }}</p>
        </div>
        <div class="bg-white border border-gray-200 rounded-lg p-6 hover:border-green-300 hover:shadow-md transition">
          <p class="text-gray-600 text-sm mb-2 flex items-center gap-2">
            <i class="fas fa-check-circle text-green-600"></i>
            Onboarded
          </p>
          <p class="text-3xl font-bold text-green-600">{{ organizationsData.onboarded_count }}</p>
        </div>
        <div class="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition">
          <p class="text-gray-600 text-sm mb-2 flex items-center gap-2">
            <i class="fas fa-users text-blue-600"></i>
            Total Users
          </p>
          <p class="text-3xl font-bold text-blue-600">{{ organizationsData.total_users }}</p>
        </div>
        <div class="bg-white border border-gray-200 rounded-lg p-6 hover:border-pink-300 hover:shadow-md transition">
          <p class="text-gray-600 text-sm mb-2 flex items-center gap-2">
            <i class="fas fa-star text-pink-600"></i>
            Total Leads
          </p>
          <p class="text-3xl font-bold text-pink-600">{{ organizationsData.total_leads }}</p>
        </div>
      </div>

      <!-- Organizations Table -->
      <div v-if="!loading && organizationsData" class="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8 shadow-sm">
        <div class="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-white">
          <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">
            <i class="fas fa-th-list text-purple-600"></i>
            All Organizations
          </h2>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-50 border-b border-gray-200">
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  <i class="fas fa-building text-purple-600 mr-2"></i>Name
                </th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  <i class="fas fa-user text-blue-600 mr-2"></i>Owner
                </th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  <i class="fas fa-tag text-green-600 mr-2"></i>Industry
                </th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  <i class="fas fa-users text-yellow-600 mr-2"></i>Users
                </th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  <i class="fas fa-star text-pink-600 mr-2"></i>Leads
                </th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  <i class="fas fa-tasks text-orange-600 mr-2"></i>Onboarding
                </th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  <i class="fas fa-calendar text-indigo-600 mr-2"></i>Created
                </th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  <i class="fas fa-cog text-gray-600 mr-2"></i>Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="org in organizationsData.organizations"
                :key="org.id"
                class="border-b border-gray-100 hover:bg-purple-50 transition"
              >
                <td class="px-6 py-4 text-gray-900 font-semibold">{{ org.name }}</td>
                <td class="px-6 py-4 text-gray-600">{{ org.owner?.email || '-' }}</td>
                <td class="px-6 py-4 text-gray-600">{{ org.industry || '-' }}</td>
                <td class="px-6 py-4 text-gray-600">
                  <span class="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm flex items-center gap-2 w-fit border border-blue-200">
                    <i class="fas fa-user"></i>
                    {{ org.user_count }}
                  </span>
                </td>
                <td class="px-6 py-4 text-gray-600">
                  <span class="bg-purple-50 text-purple-700 px-2 py-1 rounded text-sm flex items-center gap-2 w-fit border border-purple-200">
                    <i class="fas fa-star"></i>
                    {{ org.lead_count }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-700 font-semibold">
                      {{ org.onboarding_progress.step }}/5
                    </div>
                    <span
                      :class="[
                        'text-xs px-2 py-1 rounded flex items-center gap-1 border',
                        org.onboarding_progress.completed
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                      ]"
                    >
                      <i :class="org.onboarding_progress.completed ? 'fas fa-check-circle' : 'fas fa-spinner'"></i>
                      {{ org.onboarding_progress.completed ? 'Complete' : 'In Progress' }}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4 text-gray-600">{{ formatDate(org.created_at) }}</td>
                <td class="px-6 py-4">
                  <button
                    @click="openOrgDrawer(org)"
                    class="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded text-sm flex items-center gap-2 transition transform hover:scale-105 shadow-sm"
                  >
                    <i class="fas fa-eye"></i>
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Users Table -->
      <div v-if="!loading && organizationsData" class="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div class="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
          <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">
            <i class="fas fa-th-list text-blue-600"></i>
            All Users
          </h2>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-50 border-b border-gray-200">
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  <i class="fas fa-user-circle text-blue-600 mr-2"></i>Name
                </th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  <i class="fas fa-envelope text-green-600 mr-2"></i>Email
                </th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  <i class="fas fa-building text-yellow-600 mr-2"></i>Organization
                </th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  <i class="fas fa-briefcase text-orange-600 mr-2"></i>Role
                </th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  <i class="fas fa-crown text-pink-600 mr-2"></i>Owner
                </th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  <i class="fas fa-calendar text-indigo-600 mr-2"></i>Joined
                </th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  <i class="fas fa-cog text-gray-600 mr-2"></i>Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="user in organizationsData.users"
                :key="user.id"
                class="border-b border-gray-100 hover:bg-blue-50 transition"
              >
                <td class="px-6 py-4 text-gray-900 flex items-center gap-2">
                  <i class="fas fa-user-circle text-blue-600"></i>
                  {{ user.name || '-' }}
                </td>
                <td class="px-6 py-4 text-gray-600">{{ user.email }}</td>
                <td class="px-6 py-4 text-gray-600">
                  {{
                    organizationsData.organizations.find((o) => o.id === user.organization_id)
                      ?.name || '-'
                  }}
                </td>
                <td class="px-6 py-4 text-gray-600">
                  <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm flex items-center gap-2 w-fit border border-gray-200">
                    <i class="fas fa-briefcase"></i>
                    {{ user.role }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <span v-if="user.is_owner" class="bg-green-50 text-green-700 px-2 py-1 rounded text-sm flex items-center gap-2 w-fit border border-green-200">
                    <i class="fas fa-crown"></i>
                    Owner
                  </span>
                  <span v-else class="text-gray-400 text-sm">-</span>
                </td>
                <td class="px-6 py-4 text-gray-600">{{ formatDate(user.created_at) }}</td>
                <td class="px-6 py-4">
                  <button
                    @click="openUserDrawer(user)"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm flex items-center gap-2 transition transform hover:scale-105 shadow-sm"
                  >
                    <i class="fas fa-eye"></i>
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Organization Drawer -->
    <div v-if="drawers.org" class="fixed inset-0 z-40" @click="drawers.org = false">
      <div class="absolute inset-0 bg-black/30"></div>
    </div>
    <div
      v-if="selectedOrg"
      :class="[
        'fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white border-l border-gray-200 z-50 flex flex-col transition-transform duration-300 ease-in-out shadow-lg',
        drawers.org ? 'translate-x-0' : 'translate-x-full'
      ]"
    >
      <div class="h-full flex flex-col">
        <!-- Drawer Header -->
        <div class="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-white">
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-lg bg-purple-100 border border-purple-300 flex items-center justify-center">
                <i class="fas fa-building text-purple-600 text-lg"></i>
              </div>
              <div>
                <h2 class="text-xl font-bold text-gray-900">{{ selectedOrg.name }}</h2>
                <p class="text-gray-600 text-sm flex items-center gap-1">
                  <i class="fas fa-tag"></i>
                  {{ selectedOrg.industry || 'N/A' }}
                </p>
              </div>
            </div>
            <button
              @click="drawers.org = false"
              class="text-gray-600 hover:text-gray-900 transition"
            >
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>

        <!-- Drawer Content -->
        <div class="flex-1 overflow-y-auto p-6 space-y-6">
          <!-- Basic Info -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <i class="fas fa-info-circle text-blue-600"></i>
              Basic Information
            </h3>
            <div class="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200">
              <div>
                <p class="text-gray-600 text-sm flex items-center gap-2">
                  <i class="fas fa-id-badge text-gray-500"></i>
                  Organization ID
                </p>
                <p class="text-gray-900 font-mono text-xs mt-1 break-all">{{ selectedOrg.id }}</p>
              </div>
              <div>
                <p class="text-gray-600 text-sm flex items-center gap-2">
                  <i class="fas fa-link text-gray-500"></i>
                  Slug
                </p>
                <p class="text-gray-900">{{ selectedOrg.slug }}</p>
              </div>
              <div>
                <p class="text-gray-600 text-sm flex items-center gap-2">
                  <i class="fas fa-globe text-gray-500"></i>
                  Website
                </p>
                <p class="text-gray-900">{{ selectedOrg.website || 'Not provided' }}</p>
              </div>
              <div>
                <p class="text-gray-600 text-sm flex items-center gap-2">
                  <i class="fas fa-file-alt text-gray-500"></i>
                  Description
                </p>
                <p class="text-gray-900 text-sm mt-1">{{ selectedOrg.business_description || 'N/A' }}</p>
              </div>
            </div>
          </div>

          <!-- Owner Info -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <i class="fas fa-user-tie text-green-600"></i>
              Owner Information
            </h3>
            <div class="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200">
              <div>
                <p class="text-gray-600 text-sm flex items-center gap-2">
                  <i class="fas fa-user text-gray-500"></i>
                  Name
                </p>
                <p class="text-gray-900">{{ selectedOrg.owner?.name || '-' }}</p>
              </div>
              <div>
                <p class="text-gray-600 text-sm flex items-center gap-2">
                  <i class="fas fa-envelope text-gray-500"></i>
                  Email
                </p>
                <p class="text-gray-900 break-all">{{ selectedOrg.owner?.email || '-' }}</p>
              </div>
            </div>
          </div>

          <!-- Business Info -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <i class="fas fa-chart-line text-yellow-600"></i>
              Business Details
            </h3>
            <div class="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200">
              <div>
                <p class="text-gray-600 text-sm flex items-center gap-2">
                  <i class="fas fa-users text-gray-500"></i>
                  Target Audience
                </p>
                <p class="text-gray-900 text-sm">{{ selectedOrg.target_audience || 'N/A' }}</p>
              </div>
              <div>
                <p class="text-gray-600 text-sm flex items-center gap-2">
                  <i class="fas fa-gift text-gray-500"></i>
                  Main Offer
                </p>
                <p class="text-gray-900 text-sm">{{ selectedOrg.main_offer || 'N/A' }}</p>
              </div>
              <div>
                <p class="text-gray-600 text-sm flex items-center gap-2">
                  <i class="fas fa-dollar-sign text-gray-500"></i>
                  Monthly Ad Budget
                </p>
                <p class="text-gray-900">{{ selectedOrg.monthly_ad_budget ? `₦${selectedOrg.monthly_ad_budget.toLocaleString()}` : 'Not set' }}</p>
              </div>
            </div>
          </div>

          <!-- Communication -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <i class="fas fa-comments text-orange-600"></i>
              Communication
            </h3>
            <div class="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200">
              <div>
                <p class="text-gray-600 text-sm flex items-center gap-2">
                  <i class="fas fa-microphone text-gray-500"></i>
                  Communication Style
                </p>
                <p class="text-gray-900">{{ selectedOrg.communication_style || 'Not set' }}</p>
              </div>
              <div>
                <p class="text-gray-600 text-sm flex items-center gap-2">
                  <i class="fas fa-smile text-gray-500"></i>
                  Tone Preference
                </p>
                <p class="text-gray-900">{{ selectedOrg.tone_preference || 'Not set' }}</p>
              </div>
              <div>
                <p class="text-gray-600 text-sm flex items-center gap-2">
                  <i class="fas fa-key text-gray-500"></i>
                  Key Phrases
                </p>
                <p class="text-gray-900 text-sm">{{ selectedOrg.key_phrases || 'N/A' }}</p>
              </div>
            </div>
          </div>

          <!-- Onboarding Stats -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <i class="fas fa-tasks text-pink-600"></i>
              Onboarding Status
            </h3>
            <div class="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200">
              <div>
                <p class="text-gray-600 text-sm flex items-center gap-2">
                  <i class="fas fa-step-forward text-gray-500"></i>
                  Current Step
                </p>
                <p class="text-gray-900">{{ selectedOrg.onboarding_step }} of 5</p>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  class="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all"
                  :style="{ width: `${(selectedOrg.onboarding_step / 5) * 100}%` }"
                ></div>
              </div>
              <div>
                <p class="text-gray-600 text-sm flex items-center gap-2">
                  <i :class="selectedOrg.onboarding_completed ? 'fas fa-check-circle text-green-600' : 'fas fa-clock text-yellow-600'"></i>
                  Status
                </p>
                <p :class="selectedOrg.onboarding_completed ? 'text-green-600' : 'text-yellow-600'">
                  {{ selectedOrg.onboarding_completed ? 'Completed' : 'In Progress' }}
                </p>
              </div>
              <div v-if="selectedOrg.onboarding_completed_at">
                <p class="text-gray-600 text-sm flex items-center gap-2">
                  <i class="fas fa-calendar-check text-gray-500"></i>
                  Completed At
                </p>
                <p class="text-gray-900">{{ formatDate(selectedOrg.onboarding_completed_at) }}</p>
              </div>
            </div>
          </div>

          <!-- Members & Leads -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <i class="fas fa-chart-bar text-indigo-600"></i>
              Statistics
            </h3>
            <div class="grid grid-cols-2 gap-3">
              <div class="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
                <p class="text-gray-600 text-xs flex items-center justify-center gap-1">
                  <i class="fas fa-users"></i>
                  Members
                </p>
                <p class="text-2xl font-bold text-blue-600 mt-1">{{ selectedOrg.user_count }}</p>
              </div>
              <div class="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
                <p class="text-gray-600 text-xs flex items-center justify-center gap-1">
                  <i class="fas fa-star"></i>
                  Leads
                </p>
                <p class="text-2xl font-bold text-pink-600 mt-1">{{ selectedOrg.lead_count }}</p>
              </div>
            </div>
          </div>

          <!-- Timestamps -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <i class="fas fa-history text-cyan-600"></i>
              Timestamps
            </h3>
            <div class="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200">
              <div>
                <p class="text-gray-600 text-sm flex items-center gap-2">
                  <i class="fas fa-plus-circle text-gray-500"></i>
                  Created At
                </p>
                <p class="text-gray-900 text-sm">{{ formatDate(selectedOrg.created_at) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Drawer Footer -->
        <div class="p-6 border-t border-gray-200 bg-gray-50">
          <button
            @click="drawers.org = false"
            class="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 px-4 py-2 rounded transition flex items-center justify-center gap-2"
          >
            <i class="fas fa-times"></i>
            Close
          </button>
        </div>
      </div>
    </div>

    <!-- User Drawer -->
    <div v-if="drawers.user" class="fixed inset-0 z-40" @click="drawers.user = false">
      <div class="absolute inset-0 bg-black/30"></div>
    </div>
    <div
      v-if="selectedUser"
      :class="[
        'fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white border-l border-gray-200 z-50 flex flex-col transition-transform duration-300 ease-in-out shadow-lg',
        drawers.user ? 'translate-x-0' : 'translate-x-full'
      ]"
    >
      <div class="h-full flex flex-col">
        <!-- Drawer Header -->
        <div class="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-lg bg-blue-100 border border-blue-300 flex items-center justify-center">
                <i class="fas fa-user-circle text-blue-600 text-lg"></i>
              </div>
              <div>
                <h2 class="text-xl font-bold text-gray-900">{{ selectedUser.name || 'Unnamed User' }}</h2>
                <p class="text-gray-600 text-sm flex items-center gap-1">
                  <i class="fas fa-envelope"></i>
                  {{ selectedUser.email }}
                </p>
              </div>
            </div>
            <button
              @click="drawers.user = false"
              class="text-gray-600 hover:text-gray-900 transition"
            >
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>

        <!-- Drawer Content -->
        <div class="flex-1 overflow-y-auto p-6 space-y-6">
          <!-- User Info -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <i class="fas fa-user-check text-blue-600"></i>
              User Profile
            </h3>
            <div class="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200">
              <div>
                <p class="text-gray-600 text-sm flex items-center gap-2">
                  <i class="fas fa-id-badge text-gray-500"></i>
                  User ID
                </p>
                <p class="text-gray-900 font-mono text-xs mt-1 break-all">{{ selectedUser.id }}</p>
              </div>
              <div>
                <p class="text-gray-600 text-sm flex items-center gap-2">
                  <i class="fas fa-user text-gray-500"></i>
                  Name
                </p>
                <p class="text-gray-900">{{ selectedUser.name || 'Not provided' }}</p>
              </div>
              <div>
                <p class="text-gray-600 text-sm flex items-center gap-2">
                  <i class="fas fa-envelope text-gray-500"></i>
                  Email
                </p>
                <p class="text-gray-900 break-all">{{ selectedUser.email }}</p>
              </div>
            </div>
          </div>

          <!-- Role & Access -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <i class="fas fa-lock text-green-600"></i>
              Role & Permissions
            </h3>
            <div class="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200">
              <div>
                <p class="text-gray-600 text-sm flex items-center gap-2">
                  <i class="fas fa-briefcase text-gray-500"></i>
                  Role
                </p>
                <p class="text-gray-900 capitalize">{{ selectedUser.role }}</p>
              </div>
              <div>
                <p class="text-gray-600 text-sm flex items-center gap-2">
                  <i class="fas fa-crown text-gray-500"></i>
                  Organization Owner
                </p>
                <div class="mt-1">
                  <span
                    :class="[
                      'text-xs px-3 py-1 rounded inline-flex items-center gap-2 border',
                      selectedUser.is_owner
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : 'bg-gray-100 text-gray-700 border-gray-300'
                    ]"
                  >
                    <i :class="selectedUser.is_owner ? 'fas fa-check-circle' : 'fas fa-times-circle'"></i>
                    {{ selectedUser.is_owner ? 'Yes' : 'No' }}
                  </span>
                </div>
              </div>
              <div>
                <p class="text-gray-600 text-sm flex items-center gap-2">
                  <i class="fas fa-building text-gray-500"></i>
                  Organization
                </p>
                <p class="text-gray-900">
                  {{
                    selectedUser.organization_id
                      ? organizationsData?.organizations.find((o) => o.id === selectedUser.organization_id)?.name || 'Not found'
                      : 'Not assigned'
                  }}
                </p>
              </div>
            </div>
          </div>

          <!-- Timestamps -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <i class="fas fa-calendar-alt text-orange-600"></i>
              Account History
            </h3>
            <div class="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200">
              <div>
                <p class="text-gray-600 text-sm flex items-center gap-2">
                  <i class="fas fa-user-plus text-gray-500"></i>
                  Joined
                </p>
                <p class="text-gray-900 text-sm">{{ formatDate(selectedUser.created_at) }}</p>
              </div>
              <div>
                <p class="text-gray-600 text-sm flex items-center gap-2">
                  <i class="fas fa-sync-alt text-gray-500"></i>
                  Last Updated
                </p>
                <p class="text-gray-900 text-sm">{{ formatDate(selectedUser.updated_at) }}</p>
              </div>
            </div>
          </div>

          <!-- Raw Data -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <i class="fas fa-database text-purple-600"></i>
              Raw Data
            </h3>
            <div class="bg-gray-900 border border-gray-700 rounded-lg p-3 overflow-auto max-h-48">
              <pre class="text-xs text-gray-300 font-mono">{{ JSON.stringify(selectedUser, null, 2) }}</pre>
            </div>
          </div>
        </div>

        <!-- Drawer Footer -->
        <div class="p-6 border-t border-gray-200 bg-gray-50">
          <button
            @click="drawers.user = false"
            class="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 px-4 py-2 rounded transition flex items-center justify-center gap-2"
          >
            <i class="fas fa-times"></i>
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
    </MainLayout>
 
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '@/services/supabase'
import MainLayout from '@/layouts/full/MainLayout.vue'

interface OrganizationsData {
  organizations: any[]
  users: any[]
  leads: any[]
  total_organizations: number
  total_users: number
  total_leads: number
  onboarded_count: number
}

const loading = ref(false)
const error = ref('')
const organizationsData = ref<OrganizationsData | null>(null)

const drawers = ref({
  org: false,
  user: false,
})

const selectedOrg = ref<any>(null)
const selectedUser = ref<any>(null)

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const openOrgDrawer = (org: any) => {
  selectedOrg.value = org
  drawers.value.org = true
}

const openUserDrawer = (user: any) => {
  selectedUser.value = user
  drawers.value.user = true
}

const fetchOrganizationsData = async () => {
  loading.value = true
  error.value = ''

  try {
    // Call the edge function
    const { data, error: err } = await supabase.functions.invoke(
      'get-admin-dashboard-data',
      {
        method: 'GET',
      }
    )

    if (err) {
      throw err
    }
    console.log('admin dashboard:', data)
    organizationsData.value = data.organizations
  } catch (err: any) {
    console.error('Error fetching data:', err)
    error.value = err.message || 'Failed to fetch organizations data'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchOrganizationsData()
})
</script>

<style scoped>
table {
  width: 100%;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(245, 245, 245, 0.5);
}

::-webkit-scrollbar-thumb {
  background: rgba(147, 51, 234, 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(147, 51, 234, 0.7);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>