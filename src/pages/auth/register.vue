<script setup lang="ts">
import { ref } from 'vue'
import EFormField from '@/components/EFormField.vue'

const name = ref('')
const email = ref('')
const password = ref('')
const terms = ref(false)
const submitted = ref(false)
const errors = ref<{ name?: string; email?: string; password?: string; terms?: string }>({})

function submit() {
  errors.value = {}
  if (!name.value.trim()) errors.value.name = 'Please enter your name.'
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value))
    errors.value.email = 'Please enter a valid email address.'
  if (password.value.length < 8)
    errors.value.password = 'Password must be at least 8 characters.'
  if (!terms.value) errors.value.terms = 'You must accept the terms to continue.'
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
        <h1 class="text-headline-small mt-4">Create an account</h1>
        <p class="text-body-medium mt-1" style="opacity: 0.7">
          Already have an account?
          <RouterLink to="/auth/login" class="text-primary">Sign in</RouterLink>
        </p>
      </div>

      <VAlert v-if="submitted" type="success" class="mb-4" text="Account created! (demo only)" />

      <form class="d-flex flex-column ga-4" @submit.prevent="submit">
        <EFormField label="Full name" required :error="errors.name">
          <VTextField v-model="name" placeholder="Jane Cooper" autocomplete="name" />
        </EFormField>

        <EFormField label="Email" required :error="errors.email">
          <VTextField v-model="email" placeholder="you@example.com" type="email" autocomplete="email" />
        </EFormField>

        <EFormField
          label="Password"
          required
          :error="errors.password"
          help="At least 8 characters."
        >
          <VTextField v-model="password" placeholder="••••••••" type="password" autocomplete="new-password" />
        </EFormField>

        <EFormField :error="errors.terms">
          <VCheckbox v-model="terms" density="compact">
            <template #label>
              <span class="text-body-medium">
                I agree to the
                <a href="#" class="text-primary" @click.stop>terms and conditions</a>
              </span>
            </template>
          </VCheckbox>
        </EFormField>

        <EBtn type="submit" block>Create account</EBtn>
      </form>
    </VCardText>
  </VCard>
</template>
