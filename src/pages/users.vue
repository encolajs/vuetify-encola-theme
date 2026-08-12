<script setup lang="ts">
import { computed, ref } from 'vue'
import { Pencil, Plus, Search, Trash2 } from '@lucide/vue'
import EFormField from '@/components/EFormField.vue'

interface User {
  id: number
  name: string
  email: string
  role: 'Admin' | 'Member' | 'Viewer'
  active: boolean
}

const users = ref<User[]>([
  { id: 1, name: 'Lindsay Walton', email: 'lindsay@example.com', role: 'Admin', active: true },
  { id: 2, name: 'Courtney Henry', email: 'courtney@example.com', role: 'Member', active: true },
  { id: 3, name: 'Tom Cook', email: 'tom@example.com', role: 'Member', active: false },
  { id: 4, name: 'Whitney Francis', email: 'whitney@example.com', role: 'Viewer', active: true },
  { id: 5, name: 'Leonard Krasner', email: 'leonard@example.com', role: 'Member', active: true },
  { id: 6, name: 'Floyd Miles', email: 'floyd@example.com', role: 'Viewer', active: false },
])

const search = ref('')
const dialog = ref(false)
const deleteDialog = ref(false)
const editing = ref<User | null>(null)
const target = ref<User | null>(null)

const form = ref<{ name: string; email: string; role: User['role']; active: boolean }>({
  name: '',
  email: '',
  role: 'Member',
  active: true,
})
const formErrors = ref<{ name?: string; email?: string }>({})

const headers = [
  { title: 'User', key: 'name' },
  { title: 'Role', key: 'role' },
  { title: 'Status', key: 'active' },
  { title: '', key: 'actions', sortable: false, align: 'end' as const },
]

const initials = (name: string) =>
  name.split(' ').map((n) => n[0]).join('').toUpperCase()

function openCreate() {
  editing.value = null
  form.value = { name: '', email: '', role: 'Member', active: true }
  formErrors.value = {}
  dialog.value = true
}

function openEdit(user: User) {
  editing.value = user
  form.value = { name: user.name, email: user.email, role: user.role, active: user.active }
  formErrors.value = {}
  dialog.value = true
}

function save() {
  formErrors.value = {}
  if (!form.value.name.trim()) formErrors.value.name = 'Name is required.'
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.value.email))
    formErrors.value.email = 'Please enter a valid email address.'
  if (Object.keys(formErrors.value).length) return

  if (editing.value) {
    Object.assign(editing.value, form.value)
  } else {
    users.value.push({
      id: Math.max(...users.value.map((u) => u.id)) + 1,
      ...form.value,
    })
  }
  dialog.value = false
}

function confirmDelete(user: User) {
  target.value = user
  deleteDialog.value = true
}

function remove() {
  users.value = users.value.filter((u) => u.id !== target.value?.id)
  deleteDialog.value = false
}

const activeCount = computed(() => users.value.filter((u) => u.active).length)
</script>

<template>
  <div class="d-flex flex-column ga-6">
    <div class="d-flex align-center justify-space-between flex-wrap ga-3">
      <div>
        <h1 class="text-headline-medium">Users</h1>
        <p class="text-body-medium mt-1" style="opacity: 0.7">
          {{ users.length }} members, {{ activeCount }} active.
        </p>
      </div>
      <VBtn color="primary" :prepend-icon="Plus" @click="openCreate">Add user</VBtn>
    </div>

    <VCard>
      <VCardText>
        <VTextField
          v-model="search"
          placeholder="Search users…"
          style="max-width: 280px"
          clearable
        >
          <template #prepend-inner>
            <VIcon :icon="Search" size="16" />
          </template>
        </VTextField>
      </VCardText>

      <VDataTable :headers="headers" :items="users" :search="search" hover>
        <template #item.name="{ item }">
          <div class="d-flex align-center ga-3 py-2">
            <VAvatar color="surface-accented" size="32">
              <span class="text-label-small">{{ initials(item.name) }}</span>
            </VAvatar>
            <div>
              <div class="text-label-large">{{ item.name }}</div>
              <div class="text-body-small" style="opacity: 0.6">{{ item.email }}</div>
            </div>
          </div>
        </template>
        <template #item.role="{ item }">
          <VChip :color="item.role === 'Admin' ? 'primary' : undefined">
            {{ item.role }}
          </VChip>
        </template>
        <template #item.active="{ item }">
          <VChip :color="item.active ? 'primary' : undefined">
            {{ item.active ? 'Active' : 'Inactive' }}
          </VChip>
        </template>
        <template #item.actions="{ item }">
          <div class="d-flex justify-end ga-1">
            <VBtn variant="text" icon size="small" aria-label="Edit user" @click="openEdit(item)">
              <VIcon :icon="Pencil" size="16" />
            </VBtn>
            <VBtn variant="text" icon size="small" color="error" aria-label="Delete user" @click="confirmDelete(item)">
              <VIcon :icon="Trash2" size="16" />
            </VBtn>
          </div>
        </template>
      </VDataTable>
    </VCard>

    <!-- create / edit -->
    <VDialog v-model="dialog" max-width="440">
      <VCard>
        <VCardItem>
          <VCardTitle>{{ editing ? 'Edit user' : 'Add user' }}</VCardTitle>
          <VCardSubtitle>
            {{ editing ? 'Update the member details.' : 'Invite a new member to the team.' }}
          </VCardSubtitle>
        </VCardItem>
        <VCardText>
          <form class="d-flex flex-column ga-4" @submit.prevent="save">
            <EFormField label="Full name" required :error="formErrors.name">
              <VTextField v-model="form.name" placeholder="Jane Cooper" />
            </EFormField>
            <EFormField label="Email" required :error="formErrors.email">
              <VTextField v-model="form.email" placeholder="jane@example.com" type="email" />
            </EFormField>
            <EFormField label="Role">
              <VSelect v-model="form.role" :items="['Admin', 'Member', 'Viewer']" />
            </EFormField>
            <VSwitch v-model="form.active" label="Active" />
          </form>
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn variant="text" @click="dialog = false">Cancel</VBtn>
          <VBtn color="primary" @click="save">{{ editing ? 'Save changes' : 'Add user' }}</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- delete confirm -->
    <VDialog v-model="deleteDialog" max-width="400">
      <VCard>
        <VCardItem>
          <VCardTitle>Remove {{ target?.name }}?</VCardTitle>
          <VCardSubtitle>This action cannot be undone.</VCardSubtitle>
        </VCardItem>
        <VCardText>
          The user will lose access to all projects immediately.
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn variant="text" @click="deleteDialog = false">Cancel</VBtn>
          <VBtn color="error" @click="remove">Remove user</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>
