<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '@/lib/supabase' // adjust to wherever your Supabase client lives

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'booked'): void
}>()

const formRef = ref()
const valid = ref(false)
const loading = ref(false)
const errorMsg = ref('')
const success = ref(false)

const firstName = ref('')
const lastName = ref('')
const email = ref('')

const rules = {
  required: (v: string) => !!v?.trim() || 'Required',
  email: (v: string) => /.+@.+\..+/.test(v) || 'Enter a valid email',
}

function close() {
  emit('update:modelValue', false)
  // give the dialog time to animate closed before wiping state
  setTimeout(resetForm, 200)
}

function resetForm() {
  firstName.value = ''
  lastName.value = ''
  email.value = ''
  errorMsg.value = ''
  success.value = false
  formRef.value?.resetValidation()
}

async function submit() {
  const { valid: isValid } = await formRef.value.validate()
  if (!isValid) return

  loading.value = true
  errorMsg.value = ''

  // Insert triggers a Supabase DB webhook -> send-demo-email edge function,
  // same pattern as your existing waitlist flow.
  const { error } = await supabase.from('demo_requests').insert({
    first_name: firstName.value.trim(),
    last_name: lastName.value.trim(),
    email: email.value.trim().toLowerCase(),
  })

  loading.value = false

  if (error) {
    errorMsg.value =
      error.code === '23505'
        ? "You're already booked — we'll be in touch."
        : 'Something went wrong. Please try again.'
    return
  }

  success.value = true
  emit('booked')
}
</script>

<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="(v) => emit('update:modelValue', v)"
    max-width="480"
    persistent
  >
    <v-card rounded="xl" class="pa-2">
      <v-card-item>
        <v-card-title class="text-h6 font-weight-bold">
          {{ success ? "You're booked 🎉" : 'Book a demo' }}
        </v-card-title>
        <v-card-subtitle v-if="!success">
          Takes 30 seconds. We'll confirm a time by email.
        </v-card-subtitle>
      </v-card-item>

      <v-card-text>
        <template v-if="!success">
          <v-form ref="formRef" v-model="valid" @submit.prevent="submit">
            <v-text-field
              v-model="firstName"
              label="First name"
              :rules="[rules.required]"
              variant="outlined"
              density="comfortable"
              class="mb-2"
              autofocus
            />
            <v-text-field
              v-model="lastName"
              label="Last name"
              :rules="[rules.required]"
              variant="outlined"
              density="comfortable"
              class="mb-2"
            />
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              :rules="[rules.required, rules.email]"
              variant="outlined"
              density="comfortable"
            />
            <v-alert
              v-if="errorMsg"
              type="error"
              variant="tonal"
              density="compact"
              class="mt-2"
            >
              {{ errorMsg }}
            </v-alert>
          </v-form>
        </template>
        <template v-else>
          <p class="text-body-2">
            Check your inbox — we just sent a confirmation with next steps to
            <strong>{{ email }}</strong>.
          </p>
        </template>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="close">{{ success ? 'Close' : 'Cancel' }}</v-btn>
        <v-btn
          v-if="!success"
          color="primary"
          :loading="loading"
          :disabled="!valid"
          @click="submit"
        >
          Book demo
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>