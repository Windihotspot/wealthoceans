<template>
  <div>
    <h1 class="form-title">What Are You Selling, and to Whom?</h1>
    <p class="form-subtitle mb-6">
      LCI's Market Intelligence Engine uses this to script your AI Sales Agent.
    </p>

    <v-form @submit.prevent="handleNext" ref="formRef">
      <v-textarea
        v-model="store.form.business_description"
        v-bind="fieldProps"
        placeholder="What does your business do?"
        rows="2"
        prepend-inner-icon="fa-solid fa-briefcase"
        :rules="[required]"
        class="mb-3"
      />
      <v-textarea
        v-model="store.form.target_audience"
        v-bind="fieldProps"
        placeholder="Who is your ideal customer?"
        rows="2"
        prepend-inner-icon="fa-solid fa-user-group"
        :rules="[required]"
        class="mb-3"
      />
      <v-textarea
        v-model="store.form.main_offer"
        v-bind="fieldProps"
        placeholder="What's your main offer or product?"
        rows="2"
        prepend-inner-icon="fa-solid fa-tags"
        :rules="[required]"
        class="mb-3"
      />
      <v-text-field
        v-model.number="store.form.monthly_ad_budget"
        v-bind="fieldProps"
        placeholder="Monthly ad budget (optional)"
        type="number"
        prepend-inner-icon="fa-solid fa-money-bill"
        class="mb-3"
      />

      <v-alert v-if="store.error" type="error" variant="tonal" density="compact" class="mb-4">
        {{ store.error }}
      </v-alert>

      <div class="d-flex ga-3">
        <!-- <v-btn variant="text" class="text-none" @click="store.goToStep(1)">Back</v-btn> -->
        <v-btn type="submit" block size="large" class="register-btn" :loading="store.isSubmitting">
          Continue
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useOnboardingStore } from '@/stores/onboarding.store'

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
    await store.submitOfferDetails()
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
