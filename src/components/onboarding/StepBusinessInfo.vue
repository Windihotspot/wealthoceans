<template>
  <v-card class="pa-6">
    <h2 class="text-h6 font-weight-bold mb-1">Tell us about your business</h2>
    <p class="text-body-2 text-medium-emphasis mb-6">
      This becomes your organization inside LCI. You can change it later.
    </p>

    <v-form @submit.prevent="handleNext" ref="formRef">
      <v-text-field
      variant="outlined"
        v-model="store.form.organization_name"
        label="Business name"
        prepend-inner-icon="fa-solid fa-building"
        :rules="[required]"
        class="mb-2"
      />
      <v-text-field
       variant="outlined"
        v-model="store.form.website"
        label="Website (optional)"
        prepend-inner-icon="fa-solid fa-globe"
        class="mb-2"
      />
      <v-select
       variant="outlined"
        v-model="store.form.industry"
        :items="INDUSTRY_OPTIONS"
        label="Industry"
        prepend-inner-icon="fa-solid fa-layer-group"
        class="mb-2"
      />

      <v-alert v-if="store.error" type="error" variant="tonal" density="compact" class="mb-4">
        {{ store.error }}
      </v-alert>

      <v-btn type="submit" block size="large" color="primary" :loading="store.isSubmitting">
        Continue
      </v-btn>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useOnboardingStore } from '@/stores/onboarding.store'
import { INDUSTRY_OPTIONS } from '@/types/organization.types'

const store = useOnboardingStore()
const formRef = ref()

const required = (v: string) => !!v || 'Required'

async function handleNext() {
  const { valid } = await formRef.value.validate()
  if (!valid) return
  try {
    await store.submitBusinessSetup()
  } catch {
    // error already set in the store
  }
}
</script>