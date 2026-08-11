<script setup lang="ts">
import { ref } from 'vue'
import { ArrowLeft } from '@lucide/vue'
import EFormField from '@/components/EFormField.vue'

const email = ref('')
const sent = ref(false)
const error = ref<string>()

function submit() {
  error.value = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)
    ? undefined
    : 'Please enter a valid email address.'
  sent.value = !error.value
}
</script>

<template>
  <VCard width="400" class="ma-4">
    <VCardText class="pa-8">
      <div class="text-center mb-6">
        <div class="text-title-large">
          <span class="text-primary">●</span> Encola
        </div>
        <h1 class="text-headline-small mt-4">Reset your password</h1>
        <p class="text-body-medium mt-1" style="opacity: 0.7">
          Enter your email and we'll send you a reset link.
        </p>
      </div>

      <VAlert
        v-if="sent"
        type="success"
        class="mb-4"
        text="If that address exists, a reset link is on its way."
      />

      <form class="d-flex flex-column ga-4" @submit.prevent="submit">
        <EFormField label="Email" required :error="error">
          <VTextField v-model="email" placeholder="you@example.com" type="email" autocomplete="email" />
        </EFormField>

        <EBtn type="submit" block>Send reset link</EBtn>

        <EBtnGhost :prepend-icon="ArrowLeft" block to="/auth/login">
          Back to sign in
        </EBtnGhost>
      </form>
    </VCardText>
  </VCard>
</template>
