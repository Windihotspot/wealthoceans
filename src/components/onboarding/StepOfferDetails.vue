<template>
  <v-card class="pa-6">
    <h2 class="text-h6 font-weight-bold mb-1">What are you selling, and to whom?</h2>
    <p class="text-body-2 text-medium-emphasis mb-6">
      LCI's Market Intelligence Engine uses this to script your AI Sales Closer.
    </p>

    <v-form @submit.prevent="handleNext" ref="formRef">
      <v-textarea
      variant="outlined"
        v-model="store.form.business_description"
        label="What does your business do?"
        rows="2"
        prepend-inner-icon="fa-solid fa-briefcase"
        :rules="[required]"
        class="mb-2"
      />
      <v-textarea
      variant="outlined"
        v-model="store.form.target_audience"
        label="Who is your ideal customer?"
        rows="2"
        prepend-inner-icon="fa-solid fa-user-group"
        :rules="[required]"
        class="mb-2"
      />
      <v-textarea
      variant="outlined"
        v-model="store.form.main_offer"
        label="What's your main offer or product?"
        rows="2"
        prepend-inner-icon="fa-solid fa-tags"
        :rules="[required]"
        class="mb-2"
      />
      <v-text-field
      variant="outlined"
        v-model.number="store.form.monthly_ad_budget"
        label="Monthly ad budget (optional)"
        type="number"
        prepend-inner-icon="fa-solid fa-money-bill"
        class="mb-2"
      />

      <v-alert v-if="store.error" type="error" variant="tonal" density="compact" class="mb-4">
        {{ store.error }}
      </v-alert>

      <div class="step-actions">
  <!-- <v-btn
    variant="text"
    class="back-btn"
    @click="store.goToStep(1)"
  >
    Back
  </v-btn> -->

  <v-btn
    type="submit"
    color="primary"
    class="continue-btn"
    :loading="store.isSubmitting"
  >
    Continue
  </v-btn>
</div>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useOnboardingStore } from '@/stores/onboarding.store'

const store = useOnboardingStore()
const formRef = ref()

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
.step-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  width: 100%;
}

.back-btn {
  flex: 0 0 auto;
}

.continue-btn {
  flex: 0 0 auto;
  min-width: 120px;
}

/* Mobile */
@media (max-width: 600px) {
  .step-actions {
    flex-direction: column-reverse;
    align-items: stretch;
    gap: 8px;
  }

}
</style>