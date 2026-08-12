<script setup lang="ts">
// Every Vuetify input component, themed. Static labels via EFormField.
import { ref } from 'vue'
import { Mail, Search } from '@lucide/vue'
import EFormField from '@/components/EFormField.vue'

const password = ref('secret123')
const number = ref(2)
const select = ref<string | null>(null)
const multiSelect = ref<string[]>(['Design'])
const autocomplete = ref<string | null>(null)
const tags = ref<string[]>(['vuetify', 'theme'])
const date = ref<Date | null>(null)
const color = ref('#6366f1')
const otp = ref('')
const checkbox = ref(true)
const indeterminate = ref(true)
const radio = ref('email')
const switchOn = ref(true)
const slider = ref(40)
const range = ref([20, 60])
const rating = ref(4)

const departments = ['Engineering', 'Design', 'Marketing', 'Sales', 'Support']
</script>

<template>
  <div class="d-flex flex-column ga-10">
    <div>
      <h1 class="text-headline-medium">Form fields</h1>
      <p class="text-body-medium mt-1" style="opacity: 0.7">
        Every input component Vuetify ships, restyled. Labels are static via
        EFormField; fields take placeholders.
      </p>
    </div>

    <!-- Text inputs -->
    <section>
      <h2 class="text-title-large mb-4">Text inputs</h2>
      <VRow dense>
        <VCol cols="12" md="6">
          <EFormField label="Basic">
            <VTextField placeholder="Jane Cooper" />
          </EFormField>
        </VCol>
        <VCol cols="12" md="6">
          <EFormField label="With icon">
            <VTextField placeholder="you@example.com" type="email">
              <template #prepend-inner>
                <VIcon :icon="Mail" size="16" />
              </template>
            </VTextField>
          </EFormField>
        </VCol>
        <VCol cols="12" md="6">
          <EFormField label="Clearable">
            <VTextField placeholder="Search…" clearable>
              <template #prepend-inner>
                <VIcon :icon="Search" size="16" />
              </template>
            </VTextField>
          </EFormField>
        </VCol>
        <VCol cols="12" md="6">
          <EFormField label="Password">
            <VTextField v-model="password" type="password" autocomplete="new-password" />
          </EFormField>
        </VCol>
        <VCol cols="12" md="6">
          <EFormField label="With suffix">
            <VTextField placeholder="0.00" suffix="EUR" />
          </EFormField>
        </VCol>
        <VCol cols="12" md="6">
          <EFormField label="Disabled">
            <VTextField placeholder="Not editable" disabled />
          </EFormField>
        </VCol>
        <VCol cols="12" md="6">
          <EFormField label="Error state" error="This username is already taken.">
            <VTextField model-value="jane" />
          </EFormField>
        </VCol>
        <VCol cols="12" md="6">
          <EFormField label="Number input" help="VNumberInput with stepper controls.">
            <VNumberInput v-model="number" :min="0" :max="10" />
          </EFormField>
        </VCol>
        <VCol cols="12">
          <EFormField label="Textarea" help="Fixed rows; use auto-grow for chat-style inputs.">
            <VTextarea placeholder="Tell us about the project…" rows="3" />
          </EFormField>
        </VCol>
      </VRow>
    </section>

    <!-- Selects -->
    <section>
      <h2 class="text-title-large mb-4">Selects & autocomplete</h2>
      <VRow dense>
        <VCol cols="12" md="6">
          <EFormField label="Select">
            <VSelect v-model="select" :items="departments" placeholder="Select a department" />
          </EFormField>
        </VCol>
        <VCol cols="12" md="6">
          <EFormField label="Multiple with chips">
            <VSelect
              v-model="multiSelect"
              :items="departments"
              placeholder="Select departments"
              multiple
              chips
              closable-chips
            />
          </EFormField>
        </VCol>
        <VCol cols="12" md="6">
          <EFormField label="Autocomplete" help="Type to filter the list.">
            <VAutocomplete v-model="autocomplete" :items="departments" placeholder="Search departments…" />
          </EFormField>
        </VCol>
        <VCol cols="12" md="6">
          <EFormField label="Combobox (free tags)" help="Accepts values outside the list.">
            <VCombobox v-model="tags" :items="['vuetify', 'vue', 'theme']" multiple chips closable-chips placeholder="Add a tag…" />
          </EFormField>
        </VCol>
      </VRow>
    </section>

    <!-- Date, color, files -->
    <section>
      <h2 class="text-title-large mb-4">Date, color & files</h2>
      <VRow dense>
        <VCol cols="12" md="6">
          <EFormField label="Date">
            <VDateInput v-model="date" placeholder="Pick a date" />
          </EFormField>
        </VCol>
        <VCol cols="12" md="6">
          <EFormField label="Color">
            <VColorInput v-model="color" />
          </EFormField>
        </VCol>
        <VCol cols="12" md="6">
          <EFormField label="File input">
            <VFileInput placeholder="Choose files" multiple chips prepend-icon="" prepend-inner-icon="$file" />
          </EFormField>
        </VCol>
        <VCol cols="12" md="6">
          <EFormField label="One-time code">
            <VOtpInput v-model="otp" length="6" class="pa-0" />
          </EFormField>
        </VCol>
        <VCol cols="12">
          <EFormField label="File upload (drop zone)">
            <VFileUpload density="compact" title="Drag and drop a file here" />
          </EFormField>
        </VCol>
      </VRow>
    </section>

    <!-- Toggles -->
    <section>
      <h2 class="text-title-large mb-4">Checkboxes, radios & switches</h2>
      <VRow dense>
        <VCol cols="12" md="4">
          <VCheckbox v-model="checkbox" label="Checked" />
          <VCheckbox v-model="indeterminate" indeterminate label="Indeterminate" />
          <VCheckbox label="Disabled" disabled />
        </VCol>
        <VCol cols="12" md="4">
          <EFormField label="Notify me via">
            <VRadioGroup v-model="radio">
              <VRadio label="Email" value="email" />
              <VRadio label="SMS" value="sms" />
              <VRadio label="Push notification" value="push" />
            </VRadioGroup>
          </EFormField>
        </VCol>
        <VCol cols="12" md="4">
          <VSwitch v-model="switchOn" label="Public profile" />
          <VSwitch label="Disabled" disabled />
        </VCol>
      </VRow>
    </section>

    <!-- Sliders & rating -->
    <section>
      <h2 class="text-title-large mb-4">Sliders & rating</h2>
      <VRow dense>
        <VCol cols="12" md="6">
          <EFormField label="Slider">
            <VSlider v-model="slider" thumb-label />
          </EFormField>
        </VCol>
        <VCol cols="12" md="6">
          <EFormField label="Range slider">
            <VRangeSlider v-model="range" thumb-label />
          </EFormField>
        </VCol>
        <VCol cols="12" md="6">
          <EFormField label="Rating">
            <VRating v-model="rating" color="warning" half-increments hover density="compact" />
          </EFormField>
        </VCol>
      </VRow>
    </section>
  </div>
</template>
