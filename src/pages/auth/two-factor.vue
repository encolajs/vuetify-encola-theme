<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowLeft } from '@lucide/vue'

const code = ref('')
const verified = ref(false)
const complete = computed(() => code.value.length === 6)

function submit() {
  verified.value = complete.value
}
</script>

<template>
  <VCard width="400" class="ma-4">
    <VCardText class="pa-8">
      <div class="text-center mb-6">
        <div class="text-title-large">
          <span class="text-primary">●</span> Encola
        </div>
        <h1 class="text-headline-small mt-4">Two-factor authentication</h1>
        <p class="text-body-medium mt-1" style="opacity: 0.7">
          Enter the 6-digit code from your authenticator app.
        </p>
      </div>

      <VAlert v-if="verified" type="success" class="mb-4" text="Code verified! (demo only)" />

      <form class="d-flex flex-column ga-4" @submit.prevent="submit">
        <VOtpInput v-model="code" length="6" variant="outlined" class="pa-0" />

        <EBtn type="submit" block :disabled="!complete">Verify</EBtn>

        <p class="text-body-medium text-center" style="opacity: 0.7">
          Didn't get a code?
          <a href="#" class="text-primary" @click.prevent>Resend</a>
        </p>

        <EBtnGhost :prepend-icon="ArrowLeft" block to="/auth/login">
          Back to sign in
        </EBtnGhost>
      </form>
    </VCardText>
  </VCard>
</template>
