<script setup lang="ts">
import { computed, ref } from 'vue'
import { Download, EllipsisVertical, Plus, Search } from '@lucide/vue'

type Status = 'paid' | 'pending' | 'overdue' | 'draft'

interface Invoice {
  id: string
  customer: string
  email: string
  amount: number
  status: Status
  date: string
}

const search = ref('')
const statusFilter = ref<Status | null>(null)

const headers = [
  { title: 'Invoice', key: 'id' },
  { title: 'Customer', key: 'customer' },
  { title: 'Status', key: 'status' },
  { title: 'Date', key: 'date' },
  { title: 'Amount', key: 'amount', align: 'end' as const },
  { title: '', key: 'actions', sortable: false, align: 'end' as const },
]

const invoices: Invoice[] = [
  { id: 'INV-1042', customer: 'Olivia Martin', email: 'olivia@acme.com', amount: 1999, status: 'paid', date: '2026-07-28' },
  { id: 'INV-1041', customer: 'Jackson Lee', email: 'jackson@wave.io', amount: 39, status: 'paid', date: '2026-07-27' },
  { id: 'INV-1040', customer: 'Isabella Nguyen', email: 'isabella@nova.dev', amount: 299, status: 'pending', date: '2026-07-25' },
  { id: 'INV-1039', customer: 'William Kim', email: 'will@arc.com', amount: 99, status: 'overdue', date: '2026-07-20' },
  { id: 'INV-1038', customer: 'Sofia Davis', email: 'sofia@pulse.app', amount: 39, status: 'paid', date: '2026-07-18' },
  { id: 'INV-1037', customer: 'Ethan Brown', email: 'ethan@forge.co', amount: 499, status: 'draft', date: '2026-07-16' },
  { id: 'INV-1036', customer: 'Mia Wilson', email: 'mia@orbit.gg', amount: 149, status: 'pending', date: '2026-07-12' },
  { id: 'INV-1035', customer: 'Lucas Moore', email: 'lucas@spark.dev', amount: 89, status: 'paid', date: '2026-07-10' },
  { id: 'INV-1034', customer: 'Amelia Taylor', email: 'amelia@drift.so', amount: 259, status: 'overdue', date: '2026-07-05' },
  { id: 'INV-1033', customer: 'Noah Anderson', email: 'noah@bolt.sh', amount: 79, status: 'paid', date: '2026-07-02' },
  { id: 'INV-1032', customer: 'Emma Thomas', email: 'emma@lume.app', amount: 189, status: 'paid', date: '2026-06-28' },
  { id: 'INV-1031', customer: 'Liam Jackson', email: 'liam@zeno.dev', amount: 349, status: 'pending', date: '2026-06-24' },
]

const statusColor: Record<Status, string | undefined> = {
  paid: 'primary',
  pending: 'warning',
  overdue: 'error',
  draft: undefined,
}

const filtered = computed(() =>
  statusFilter.value
    ? invoices.filter((i) => i.status === statusFilter.value)
    : invoices,
)

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
</script>

<template>
  <div class="d-flex flex-column ga-6">
    <div class="d-flex align-center justify-space-between flex-wrap ga-3">
      <div>
        <h1 class="text-headline-medium">Invoices</h1>
        <p class="text-body-medium mt-1" style="opacity: 0.7">
          A list of all invoices including customer, status and amount.
        </p>
      </div>
      <div class="d-flex ga-2">
        <EBtnOutline :prepend-icon="Download">Export</EBtnOutline>
        <EBtn :prepend-icon="Plus">New invoice</EBtn>
      </div>
    </div>

    <VCard>
      <VCardText class="d-flex flex-wrap ga-3 align-center">
        <VTextField
          v-model="search"
          placeholder="Search invoices…"
          style="max-width: 280px"
          clearable
        >
          <template #prepend-inner>
            <VIcon :icon="Search" size="16" />
          </template>
        </VTextField>
        <VSelect
          v-model="statusFilter"
          :items="[
            { title: 'All statuses', value: null },
            { title: 'Paid', value: 'paid' },
            { title: 'Pending', value: 'pending' },
            { title: 'Overdue', value: 'overdue' },
            { title: 'Draft', value: 'draft' },
          ]"
          placeholder="Status"
          style="max-width: 180px"
        />
      </VCardText>

      <VDataTable
        :headers="headers"
        :items="filtered"
        :search="search"
        :items-per-page="10"
        hover
      >
        <template #item.id="{ item }">
          <span class="text-label-large">{{ item.id }}</span>
        </template>
        <template #item.customer="{ item }">
          <div>{{ item.customer }}</div>
          <div class="text-body-small" style="opacity: 0.6">{{ item.email }}</div>
        </template>
        <template #item.status="{ item }">
          <VChip :color="statusColor[item.status]" class="text-capitalize">
            {{ item.status }}
          </VChip>
        </template>
        <template #item.amount="{ item }">
          {{ currency.format(item.amount) }}
        </template>
        <template #item.actions>
          <VMenu>
            <template #activator="{ props: menuProps }">
              <EBtnGhost icon size="small" aria-label="Row actions" v-bind="menuProps">
                <VIcon :icon="EllipsisVertical" size="16" />
              </EBtnGhost>
            </template>
            <VList min-width="160">
              <VListItem title="View" />
              <VListItem title="Download PDF" />
              <VListItem title="Send reminder" />
              <VListItem base-color="error" title="Void invoice" />
            </VList>
          </VMenu>
        </template>
        <template #no-data>
          <div class="text-center py-10">
            <div class="text-title-medium">No invoices found</div>
            <p class="text-body-medium mt-1" style="opacity: 0.7">
              Try adjusting your search or filters.
            </p>
          </div>
        </template>
      </VDataTable>
    </VCard>
  </div>
</template>
