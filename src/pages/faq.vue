<script setup lang="ts">
import { Mail, MessageCircle } from '@lucide/vue'

const faqs = [
  {
    q: 'What exactly do I get when I buy the theme?',
    a: 'A complete Vite + Vue 3 + Vuetify starter project: the theme core (SASS settings, preset, override CSS), wrapper components, and every example page you see in this demo — ready to copy into your product.',
  },
  {
    q: 'Do I need to fork or patch Vuetify?',
    a: 'No. Everything is configuration: SASS variables, createVuetify defaults, a runtime theme and one small unlayered CSS file. You upgrade Vuetify normally.',
  },
  {
    q: 'Can I change the primary color?',
    a: 'Yes — the palette lives in one place (src/encola/preset.ts). Swap the green scale for any Tailwind-style scale and both light and dark themes update.',
  },
  {
    q: 'Does it work with my existing Vuetify app?',
    a: 'Yes. Install the theme layers and your existing components pick up the new look. The only convention to adopt: static labels above fields instead of the label prop.',
  },
  {
    q: 'Is dark mode included?',
    a: 'Dark mode is first-class. Every component and example page is verified in both themes, and the toggle persists across reloads.',
  },
  {
    q: 'Do you offer refunds?',
    a: 'If the theme does not work as advertised and we cannot fix your issue, we refund within 14 days of purchase.',
  },
]
</script>

<template>
  <div class="d-flex flex-column ga-8 mx-auto e-page-narrow--sm">
    <div class="text-center">
      <h1 class="text-headline-medium">Frequently asked questions</h1>
      <p class="text-body-medium mt-2" style="opacity: 0.7">
        Everything you need to know about the theme. Can't find an answer?
        Reach out below.
      </p>
    </div>

    <VExpansionPanels multiple>
      <VExpansionPanel v-for="faq in faqs" :key="faq.q" :title="faq.q" :text="faq.a" />
    </VExpansionPanels>

    <VRow dense>
      <VCol cols="12" sm="6">
        <VCard class="h-100">
          <VCardText class="text-center py-8">
            <VIcon :icon="MessageCircle" size="24" color="primary" />
            <div class="text-title-medium mt-3">Chat with us</div>
            <p class="text-body-medium mt-1" style="opacity: 0.7">
              Mon–Fri, 9:00–17:00 EET
            </p>
            <VBtn variant="tonal" color="primary" class="mt-4">Start a chat</VBtn>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" sm="6">
        <VCard class="h-100">
          <VCardText class="text-center py-8">
            <VIcon :icon="Mail" size="24" color="primary" />
            <div class="text-title-medium mt-3">Email support</div>
            <p class="text-body-medium mt-1" style="opacity: 0.7">
              We reply within one business day
            </p>
            <VBtn variant="tonal" color="primary" class="mt-4">Send an email</VBtn>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
