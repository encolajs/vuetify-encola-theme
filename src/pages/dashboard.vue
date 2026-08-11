<script setup lang="ts">
import { CreditCard, DollarSign, Download, Plus, Users } from '@lucide/vue'
import type { FunctionalComponent } from 'vue'

interface Stat {
  title: string
  value: string
  change: string
  up: boolean
  icon: FunctionalComponent
}

const stats: Stat[] = [
  { title: 'Total revenue', value: '$45,231', change: '+20.1% from last month', up: true, icon: DollarSign },
  { title: 'Subscriptions', value: '2,350', change: '+180 this week', up: true, icon: Users },
  { title: 'Sales', value: '12,234', change: '+19% from last month', up: true, icon: CreditCard },
  { title: 'Churn', value: '1.2%', change: '-0.3% from last month', up: false, icon: Users },
]

const revenue = [42, 58, 51, 63, 71, 66, 80, 74, 89, 84, 95, 102]

const activity = [
  { user: 'Olivia Martin', action: 'Upgraded to Business', amount: '+$1,999', time: '2 min ago' },
  { user: 'Jackson Lee', action: 'New subscription', amount: '+$39', time: '14 min ago' },
  { user: 'Isabella Nguyen', action: 'New subscription', amount: '+$299', time: '1 h ago' },
  { user: 'William Kim', action: 'Refund issued', amount: '-$99', time: '3 h ago' },
  { user: 'Sofia Davis', action: 'New subscription', amount: '+$39', time: '5 h ago' },
]
</script>

<template>
  <div class="d-flex flex-column ga-6">
    <div class="d-flex align-center justify-space-between flex-wrap ga-3">
      <div>
        <h1 class="text-headline-medium">Dashboard</h1>
        <p class="text-body-medium mt-1" style="opacity: 0.7">
          Overview of your business for the last 30 days.
        </p>
      </div>
      <div class="d-flex ga-2">
        <EBtnOutline :prepend-icon="Download">Export</EBtnOutline>
        <EBtn :prepend-icon="Plus">New invoice</EBtn>
      </div>
    </div>

    <VRow dense>
      <VCol v-for="stat in stats" :key="stat.title" cols="12" sm="6" lg="3">
        <VCard>
          <VCardText>
            <div class="d-flex align-center justify-space-between">
              <span class="text-body-medium" style="opacity: 0.7">{{ stat.title }}</span>
              <VIcon :icon="stat.icon" size="16" style="opacity: 0.5" />
            </div>
            <div class="text-headline-small mt-2">{{ stat.value }}</div>
            <div
              class="text-body-small mt-1"
              :class="stat.up ? 'text-primary' : 'text-error'"
            >
              {{ stat.change }}
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <VRow dense>
      <VCol cols="12" lg="7">
        <VCard>
          <VCardItem>
            <VCardTitle>Revenue</VCardTitle>
            <VCardSubtitle>Monthly recurring revenue, last 12 months</VCardSubtitle>
          </VCardItem>
          <VCardText>
            <VSparkline
              :model-value="revenue"
              color="primary"
              line-width="2"
              smooth="8"
              height="120"
              padding="8"
            />
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" lg="5">
        <VCard class="h-100">
          <VCardItem>
            <VCardTitle>Recent activity</VCardTitle>
            <VCardSubtitle>You made 265 sales this month</VCardSubtitle>
          </VCardItem>
          <VCardText class="pa-0">
            <VList>
              <VListItem v-for="item in activity" :key="item.user + item.time">
                <template #prepend>
                  <VAvatar color="surface-accented" size="28">
                    <span class="text-label-small">
                      {{ item.user.split(' ').map((n) => n[0]).join('') }}
                    </span>
                  </VAvatar>
                </template>
                <VListItemTitle>{{ item.user }}</VListItemTitle>
                <VListItemSubtitle>{{ item.action }} · {{ item.time }}</VListItemSubtitle>
                <template #append>
                  <span
                    class="text-body-medium"
                    :class="item.amount.startsWith('+') ? 'text-primary' : 'text-error'"
                  >
                    {{ item.amount }}
                  </span>
                </template>
              </VListItem>
            </VList>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <VCard>
      <VCardItem>
        <VCardTitle>Quick actions</VCardTitle>
      </VCardItem>
      <VCardText class="d-flex flex-wrap ga-2">
        <EBtnSoft :prepend-icon="Plus">Add customer</EBtnSoft>
        <EBtnSoft :prepend-icon="CreditCard">Create invoice</EBtnSoft>
        <EBtnSoft :prepend-icon="Download">Download report</EBtnSoft>
        <EBtnSoft :prepend-icon="Users">Invite team member</EBtnSoft>
      </VCardText>
    </VCard>
  </div>
</template>
