<script setup lang="ts">
// Before/after: the same UI in stock-Material Vuetify vs Encola.
// The left column runs the "material" theme (registered in main.ts) inside
// a VThemeProvider, plus the .e-before CSS below, which deliberately
// UNDOES the theme for that subtree — shadows, ripple, uppercase buttons,
// floating labels. That CSS is a simulation aid for this page only and is
// not part of the theme; don't copy it.
import { ref } from 'vue'
import EFormField from '@/encola/components/EFormField.vue'

const beforeTab = ref('account')
const afterTab = ref('account')
const beforeAgree = ref(true)
const afterAgree = ref(true)
const beforeNotify = ref(true)
const afterNotify = ref(true)
</script>

<template>
  <div class="d-flex flex-column ga-6">
    <div>
      <h1 class="text-headline-medium">Before / after</h1>
      <p class="text-body-medium mt-1" style="opacity: 0.7">
        The same markup twice: stock Vuetify's Material look on the left,
        Encola on the right. Nothing is forked — the difference is pure
        configuration.
      </p>
    </div>

    <VRow>
      <!-- BEFORE: stock Material (simulated) -->
      <VCol cols="12" lg="6">
        <div class="text-label-large mb-2" style="opacity: 0.6">
          Stock Vuetify (Material)
        </div>
        <VThemeProvider theme="material" with-background class="e-before e-compare-pane pa-6">
          <VCard elevation="2" max-width="420" class="mx-auto">
            <VCardTitle>Create an account</VCardTitle>
            <VCardSubtitle>Start your 14-day free trial</VCardSubtitle>
            <VCardText class="d-flex flex-column ga-2 pt-4">
              <VTextField label="Full name" variant="filled" />
              <VTextField label="Email" variant="filled" type="email" />
              <VTextField label="Password" variant="filled" type="password" />
              <VCheckbox v-model="beforeAgree" label="I agree to the terms and conditions" :ripple="true" />
            </VCardText>
            <VCardActions>
              <VSpacer />
              <VBtn :ripple="true">Cancel</VBtn>
              <VBtn color="primary" variant="elevated" :ripple="true">Sign up</VBtn>
            </VCardActions>
          </VCard>

          <div class="d-flex flex-column ga-4 mx-auto mt-6" style="max-width: 420px">
            <VTabs v-model="beforeTab" color="primary">
              <VTab value="account" :ripple="true">Account</VTab>
              <VTab value="billing" :ripple="true">Billing</VTab>
              <VTab value="team" :ripple="true">Team</VTab>
            </VTabs>
            <div class="d-flex flex-wrap ga-2 align-center">
              <VChip :label="false" color="primary">Primary</VChip>
              <VChip :label="false">Default</VChip>
              <VSwitch v-model="beforeNotify" :inset="false" label="Notifications" class="ml-2" />
            </div>
            <VAlert type="success" variant="flat" text="Your changes have been saved." />
          </div>
        </VThemeProvider>
      </VCol>

      <!-- AFTER: Encola -->
      <VCol cols="12" lg="6">
        <div class="text-label-large mb-2" style="opacity: 0.6">Encola</div>
        <div class="e-compare-pane pa-6">
          <VCard max-width="420" class="mx-auto">
            <VCardItem>
              <VCardTitle>Create an account</VCardTitle>
              <VCardSubtitle>Start your 14-day free trial</VCardSubtitle>
            </VCardItem>
            <VCardText class="d-flex flex-column ga-4">
              <EFormField label="Full name" required>
                <VTextField placeholder="Jane Cooper" />
              </EFormField>
              <EFormField label="Email" required>
                <VTextField placeholder="you@example.com" type="email" />
              </EFormField>
              <EFormField label="Password" required help="At least 8 characters.">
                <VTextField placeholder="••••••••" type="password" />
              </EFormField>
              <VCheckbox v-model="afterAgree" label="I agree to the terms and conditions" />
            </VCardText>
            <VCardActions>
              <VSpacer />
              <VBtn variant="text">Cancel</VBtn>
              <VBtn color="primary">Sign up</VBtn>
            </VCardActions>
          </VCard>

          <div class="d-flex flex-column ga-4 mx-auto mt-6" style="max-width: 420px">
            <VTabs v-model="afterTab">
              <VTab value="account">Account</VTab>
              <VTab value="billing">Billing</VTab>
              <VTab value="team">Team</VTab>
            </VTabs>
            <div class="d-flex flex-wrap ga-2 align-center">
              <VChip color="primary">Primary</VChip>
              <VChip>Default</VChip>
              <VSwitch v-model="afterNotify" label="Notifications" class="ml-2" />
            </div>
            <VAlert type="success" text="Your changes have been saved." />
          </div>
        </div>
      </VCol>
    </VRow>
  </div>
</template>

<style>
/* Comparison-page-only CSS. The .e-before block counter-acts the theme's
   overrides to simulate stock Material for the left column. It is NOT part
   of the theme — never copy it into an app. */
.e-compare-pane {
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 0.5rem;
}

.e-before .v-ripple__container {
  display: block;
}

.e-before .v-btn {
  letter-spacing: 0.0892857143em;
  text-transform: uppercase;
}

.e-before .v-btn--variant-elevated {
  box-shadow:
    0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.e-before .v-card,
.e-before .v-card--variant-elevated,
.e-before .v-card--variant-flat {
  border: none;
  border-radius: 4px;
  box-shadow:
    0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

/* Material's 56px fields and floating-label headroom */
.e-before .v-input {
  --v-input-control-height: 56px;
  --v-input-padding-top: 16px;
}

.e-before .v-selection-control--density-default {
  --v-selection-control-size: 40px;
}

.e-before .v-selection-control__input::before {
  display: block;
}

.e-before .v-checkbox-btn .v-selection-control__input,
.e-before .v-radio .v-selection-control__input {
  justify-content: center;
}

.e-before .v-label {
  opacity: var(--v-medium-emphasis-opacity);
}

.e-before .v-tabs:not(.v-tabs--vertical) {
  border-bottom: none;
}

.e-before .v-tab.v-btn {
  text-transform: uppercase;
  letter-spacing: 0.0892857143em;
}

.e-before .v-chip {
  border-radius: 9999px;
}

.e-before .v-switch .v-switch__track {
  opacity: 0.6;
  background-color: rgb(var(--v-theme-surface-variant));
}

.e-before .v-switch .v-selection-control--dirty .v-switch__track {
  background-color: rgb(var(--v-theme-primary));
  opacity: 0.6;
}

.e-before .v-switch .v-switch__thumb {
  box-shadow:
    0 2px 4px -1px rgba(0, 0, 0, 0.2),
    0 4px 5px 0 rgba(0, 0, 0, 0.14);
}
</style>
