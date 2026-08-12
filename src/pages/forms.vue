<script setup lang="ts">
// Form layout recipes: stacked, two-column, and inline label styles.
import { ref } from 'vue'
import EFormField from '@/components/EFormField.vue'

const saved = ref(false)

const countries = ['United States', 'United Kingdom', 'Germany', 'France', 'Romania', 'Japan']
const timezones = ['UTC', 'Europe/Bucharest', 'Europe/London', 'America/New_York', 'Asia/Tokyo']
</script>

<template>
  <div class="d-flex flex-column ga-6 e-page-narrow">
    <div>
      <h1 class="text-headline-medium">Form layouts</h1>
      <p class="text-body-medium mt-1" style="opacity: 0.7">
        Copy-paste-ready form recipes: every field uses EFormField + placeholder,
        never a floating label.
      </p>
    </div>

    <VAlert v-if="saved" type="success" text="Changes saved. (demo only)" closable @click:close="saved = false" />

    <!-- Stacked -->
    <VCard>
      <VCardItem>
        <VCardTitle>Stacked layout</VCardTitle>
        <VCardSubtitle>One column, labels above fields</VCardSubtitle>
      </VCardItem>
      <VCardText>
        <form class="d-flex flex-column ga-4" @submit.prevent="saved = true">
          <EFormField label="Project name" required>
            <VTextField placeholder="my-awesome-project" />
          </EFormField>
          <EFormField label="Description" help="A few sentences about what this project does.">
            <VTextarea placeholder="Describe the project…" rows="3" />
          </EFormField>
          <EFormField label="Visibility">
            <VRadioGroup>
              <VRadio label="Public — anyone can see this project" value="public" />
              <VRadio label="Private — only team members" value="private" />
            </VRadioGroup>
          </EFormField>
          <div class="d-flex ga-2 justify-end">
            <VBtn variant="text">Cancel</VBtn>
            <VBtn color="primary" type="submit">Create project</VBtn>
          </div>
        </form>
      </VCardText>
    </VCard>

    <!-- Two-column -->
    <VCard>
      <VCardItem>
        <VCardTitle>Two-column layout</VCardTitle>
        <VCardSubtitle>Related fields side by side</VCardSubtitle>
      </VCardItem>
      <VCardText>
        <form class="d-flex flex-column ga-4" @submit.prevent="saved = true">
          <VRow dense>
            <VCol cols="12" md="6">
              <EFormField label="First name" required>
                <VTextField placeholder="Jane" autocomplete="given-name" />
              </EFormField>
            </VCol>
            <VCol cols="12" md="6">
              <EFormField label="Last name" required>
                <VTextField placeholder="Cooper" autocomplete="family-name" />
              </EFormField>
            </VCol>
            <VCol cols="12" md="6">
              <EFormField label="Country">
                <VSelect :items="countries" placeholder="Select a country" />
              </EFormField>
            </VCol>
            <VCol cols="12" md="6">
              <EFormField label="Timezone">
                <VAutocomplete :items="timezones" placeholder="Search timezones…" />
              </EFormField>
            </VCol>
            <VCol cols="12" md="8">
              <EFormField label="Street address">
                <VTextField placeholder="Str. Exemplu 12" autocomplete="street-address" />
              </EFormField>
            </VCol>
            <VCol cols="12" md="4">
              <EFormField label="Postal code">
                <VTextField placeholder="010101" autocomplete="postal-code" />
              </EFormField>
            </VCol>
          </VRow>
          <div class="d-flex ga-2 justify-end">
            <VBtn variant="text">Cancel</VBtn>
            <VBtn color="primary" type="submit">Save address</VBtn>
          </div>
        </form>
      </VCardText>
    </VCard>

    <!-- Horizontal: label beside the field -->
    <VCard>
      <VCardItem>
        <VCardTitle>Horizontal layout</VCardTitle>
        <VCardSubtitle>Labels in a fixed column on the left</VCardSubtitle>
      </VCardItem>
      <VCardText>
        <form class="d-flex flex-column ga-4" @submit.prevent="saved = true">
          <EFormField horizontal label="Full name" required>
            <VTextField placeholder="Jane Cooper" autocomplete="name" />
          </EFormField>
          <EFormField horizontal label="Email" required help="We'll only use this for receipts.">
            <VTextField placeholder="you@example.com" type="email" autocomplete="email" />
          </EFormField>
          <EFormField horizontal label="Country" label-width="10rem">
            <VSelect :items="countries" placeholder="Select a country" />
          </EFormField>
          <EFormField horizontal>
            <VCheckbox label="Subscribe to the newsletter" />
          </EFormField>
          <div class="d-flex ga-2 justify-end">
            <VBtn color="primary" type="submit">Save contact</VBtn>
          </div>
        </form>
      </VCardText>
    </VCard>

    <!-- Horizontal sections -->
    <VCard>
      <VCardItem>
        <VCardTitle>Sectioned layout</VCardTitle>
        <VCardSubtitle>Section label on the left, fields on the right</VCardSubtitle>
      </VCardItem>
      <VCardText>
        <form class="d-flex flex-column ga-6" @submit.prevent="saved = true">
          <VRow>
            <VCol cols="12" md="4">
              <div class="text-title-small">Notifications</div>
              <p class="text-body-small mt-1" style="opacity: 0.7">
                Choose how you want to hear from us.
              </p>
            </VCol>
            <VCol cols="12" md="8">
              <VCheckbox label="Comments on your posts" />
              <VCheckbox label="Mentions" />
              <VCheckbox label="Weekly digest" />
            </VCol>
          </VRow>
          <VDivider />
          <VRow>
            <VCol cols="12" md="4">
              <div class="text-title-small">Danger zone</div>
              <p class="text-body-small mt-1" style="opacity: 0.7">
                Irreversible actions.
              </p>
            </VCol>
            <VCol cols="12" md="8" class="d-flex ga-2">
              <VBtn variant="outlined" color="error">Deactivate account</VBtn>
              <VBtn color="error">Delete account</VBtn>
            </VCol>
          </VRow>
          <div class="d-flex ga-2 justify-end">
            <VBtn color="primary" type="submit">Save preferences</VBtn>
          </div>
        </form>
      </VCardText>
    </VCard>
  </div>
</template>
