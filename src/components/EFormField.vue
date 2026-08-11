<script setup lang="ts">
// Static label/help/error rendered above the field, Nuxt UI style.
// Replaces Vuetify's structural floating label: never pass `label`
// to a field component — wrap it in EFormField and use `placeholder`.
import { computed, ref } from 'vue'

const props = defineProps<{
  label?: string
  help?: string
  error?: string | string[]
  required?: boolean
  for?: string
}>()

const root = ref<HTMLElement>()

const errorMessage = computed(() =>
  Array.isArray(props.error) ? props.error[0] : props.error,
)

// The label has no `for` unless provided; clicking it focuses the
// first focusable control in the slot instead.
function focusField() {
  if (props.for) return
  root.value
    ?.querySelector<HTMLElement>('input, textarea, select, [tabindex]')
    ?.focus()
}
</script>

<template>
  <div
    ref="root"
    class="e-form-field"
    :class="{ 'e-form-field--error': !!errorMessage }"
  >
    <label
      v-if="label"
      class="e-form-field__label"
      :for="props.for"
      @click="focusField"
    >
      {{ label
      }}<span v-if="required" class="e-form-field__required" aria-hidden="true">
        *</span
      >
    </label>
    <slot />
    <p v-if="errorMessage" class="e-form-field__error">{{ errorMessage }}</p>
    <p v-else-if="help" class="e-form-field__help">{{ help }}</p>
  </div>
</template>
