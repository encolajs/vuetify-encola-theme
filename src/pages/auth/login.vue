<script setup lang="ts">
import { ref } from 'vue'
import { Mail } from '@lucide/vue'
import EFormField from '@/components/EFormField.vue'

const email = ref('')
const password = ref('')
const remember = ref(false)
const submitted = ref(false)
const errors = ref<{ email?: string; password?: string }>({})

function submit() {
  errors.value = {}
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value))
    errors.value.email = 'Please enter a valid email address.'
  if (password.value.length < 8)
    errors.value.password = 'Password must be at least 8 characters.'
  submitted.value = Object.keys(errors.value).length === 0
}
</script>

<template>
  <VCard width="400" class="ma-4">
    <VCardText class="pa-8">
      <div class="text-center mb-6">
        <div class="text-title-large">
          <span class="text-primary">●</span> Encola
        </div>
        <h1 class="text-headline-small mt-4">Welcome back</h1>
        <p class="text-body-medium mt-1" style="opacity: 0.7">
          Don't have an account?
          <RouterLink to="/auth/register" class="text-primary">Sign up</RouterLink>
        </p>
      </div>

      <VAlert v-if="submitted" type="success" class="mb-4" text="Signed in! (demo only)" />

      <form class="d-flex flex-column ga-4" @submit.prevent="submit">
        <EFormField label="Email" required :error="errors.email">
          <VTextField v-model="email" placeholder="you@example.com" type="email" autocomplete="email">
            <template #prepend-inner>
              <VIcon :icon="Mail" size="16" />
            </template>
          </VTextField>
        </EFormField>

        <EFormField label="Password" required :error="errors.password">
          <VTextField v-model="password" placeholder="••••••••" type="password" autocomplete="current-password" />
        </EFormField>

        <div class="d-flex align-center justify-space-between">
          <VCheckbox v-model="remember" label="Remember me" density="compact" />
          <RouterLink to="/auth/forgot-password" class="text-body-medium text-primary">
            Forgot password?
          </RouterLink>
        </div>

        <VBtn color="primary" type="submit" block>Sign in</VBtn>
      </form>
    </VCardText>
  </VCard>
</template>
