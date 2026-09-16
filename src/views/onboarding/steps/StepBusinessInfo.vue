<template>
  <div>
    <h1 class="form-title">Tell Us About Your Business</h1>
    <p class="form-subtitle mb-6">This becomes your organization inside LCI. You can change it later.</p>

    <v-form @submit.prevent="handleNext" ref="formRef">
      <v-text-field
        v-model="store.form.organization_name"
        v-bind="fieldProps"
        placeholder="Business Name"
        prepend-inner-icon="fa-regular fa-building"
        :rules="[required]"
        class="mb-3"
      />
      <v-text-field
        v-model="store.form.website"
        v-bind="fieldProps"
        placeholder="Website (optional)"
        prepend-inner-icon="fa-solid fa-globe"
        class="mb-3"
      />
      <v-select
        v-model="store.form.industry"
        v-bind="fieldProps"
        :items="INDUSTRY_OPTIONS"
        placeholder="Industry"
        prepend-inner-icon="fa-solid fa-layer-group"
        class="mb-3"
      />

      <v-alert v-if="store.error" type="error" variant="tonal" density="compact" class="mb-4">
        {{ store.error }}
      </v-alert>

      <v-btn type="submit" block size="large" class="register-btn" :loading="store.isSubmitting">
        Continue
      </v-btn>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useOnboardingStore } from '@/stores/onboarding.store'
import { INDUSTRY_OPTIONS } from '@/types/organization.types'

const store = useOnboardingStore()
const formRef = ref()

const fieldProps = {
  variant: 'solo-filled' as const,
  flat: true,
  rounded: 'lg' as const,
  bgColor: '#F5F5F9',
  density: 'comfortable' as const,
  hideDetails: 'auto' as const
}

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

<style scoped>
.form-title {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
}
.form-subtitle {
  font-size: 13px;
  color: #6b7280;
}
.register-btn {
  background: #6c4bf4 !important;
  color: #ffffff !important;
  border-radius: 12px !important;
  text-transform: none;
  font-weight: 600;
  height: 48px !important;
}
</style>
