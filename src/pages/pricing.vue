<script setup lang="ts">
import { ref } from 'vue'
import { Check } from '@lucide/vue'

const yearly = ref(true)

const plans = [
  {
    name: 'Startup',
    monthly: 19,
    yearly: 15,
    description: 'For small teams getting started.',
    features: ['Up to 10 seats', '5 GB storage', 'Community support', 'Basic analytics'],
    highlighted: false,
  },
  {
    name: 'Business',
    monthly: 49,
    yearly: 39,
    description: 'For growing teams that need more.',
    features: [
      'Up to 50 seats',
      '100 GB storage',
      'Priority support',
      'Advanced analytics',
      'Custom roles',
      'Audit log',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    monthly: 99,
    yearly: 79,
    description: 'For organizations with advanced needs.',
    features: [
      'Unlimited seats',
      'Unlimited storage',
      'Dedicated support',
      'SAML SSO',
      'Custom contracts',
      'SLA 99.99%',
    ],
    highlighted: false,
  },
]
</script>

<template>
  <div class="d-flex flex-column ga-8">
    <div class="text-center mx-auto" style="max-width: 560px">
      <h1 class="text-headline-medium">Simple, transparent pricing</h1>
      <p class="text-body-medium mt-2" style="opacity: 0.7">
        Start free, upgrade when you grow. All plans include a 14-day trial —
        no credit card required.
      </p>
      <div class="d-flex align-center justify-center ga-3 mt-4">
        <span class="text-body-medium" :style="{ opacity: yearly ? 0.5 : 1 }">Monthly</span>
        <VSwitch v-model="yearly" hide-details density="compact" aria-label="Bill yearly" />
        <span class="text-body-medium" :style="{ opacity: yearly ? 1 : 0.5 }">
          Yearly <VChip color="primary" size="x-small" class="ml-1">-20%</VChip>
        </span>
      </div>
    </div>

    <VRow class="justify-center">
      <VCol v-for="plan in plans" :key="plan.name" cols="12" md="4" style="max-width: 360px">
        <VCard
          class="h-100 d-flex flex-column"
          :color="plan.highlighted ? 'surface-muted' : undefined"
        >
          <VCardItem>
            <div class="d-flex align-center justify-space-between">
              <VCardTitle>{{ plan.name }}</VCardTitle>
              <VChip v-if="plan.highlighted" color="primary">Most popular</VChip>
            </div>
            <VCardSubtitle>{{ plan.description }}</VCardSubtitle>
          </VCardItem>
          <VCardText class="flex-grow-1 d-flex flex-column">
            <div class="d-flex align-baseline ga-1">
              <span class="text-headline-large">${{ yearly ? plan.yearly : plan.monthly }}</span>
              <span class="text-body-small" style="opacity: 0.6">/ user / month</span>
            </div>
            <p v-if="yearly" class="text-body-small mt-1" style="opacity: 0.6">
              Billed annually
            </p>
            <VDivider class="my-4" />
            <ul class="d-flex flex-column ga-2" style="list-style: none; padding: 0">
              <li v-for="feature in plan.features" :key="feature" class="d-flex align-center ga-2">
                <VIcon :icon="Check" size="16" color="primary" />
                <span class="text-body-medium">{{ feature }}</span>
              </li>
            </ul>
            <div class="mt-auto pt-6">
              <EBtn v-if="plan.highlighted" block>Get started</EBtn>
              <EBtnOutline v-else block>Get started</EBtnOutline>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <p class="text-center text-body-small" style="opacity: 0.6">
      Need something custom? <a href="#" class="text-primary">Contact sales</a>.
    </p>
  </div>
</template>
