<script setup lang="ts">
import { ref } from 'vue'
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bell,
  ChevronRight,
  Copy,
  Home,
  Pencil,
  Search,
  Settings,
  Share2,
  Trash2,
  User,
} from '@lucide/vue'

const tab = ref('overview')
const iconTab = ref('inbox')
const align = ref('left')
const period = ref('week')
const filters = ref(['active'])
const page = ref(3)

const breadcrumbs = [
  { title: 'Home', href: '#' },
  { title: 'Projects', href: '#' },
  { title: 'Encola theme' },
]
</script>

<template>
  <div class="d-flex flex-column ga-10">
    <div>
      <h1 class="text-headline-medium">Navigation</h1>
      <p class="text-body-medium mt-1" style="opacity: 0.7">
        Tabs, toolbars, breadcrumbs, menus and friends.
      </p>
    </div>

    <!-- Tabs -->
    <section>
      <h2 class="text-title-large mb-4">Tabs</h2>
      <VTabs v-model="tab">
        <VTab value="overview">Overview</VTab>
        <VTab value="activity">Activity</VTab>
        <VTab value="settings">Settings</VTab>
      </VTabs>
      <p class="text-body-medium mt-3" style="opacity: 0.7">
        The underline bar is part of the component — no divider needed.
      </p>

      <VTabs v-model="iconTab" class="mt-6">
        <VTab value="inbox">
          <VIcon :icon="Bell" size="16" class="mr-2" />
          Inbox
          <VBadge color="primary" content="3" inline class="ml-2" />
        </VTab>
        <VTab value="profile">
          <VIcon :icon="User" size="16" class="mr-2" />
          Profile
        </VTab>
        <VTab value="settings">
          <VIcon :icon="Settings" size="16" class="mr-2" />
          Settings
        </VTab>
      </VTabs>
    </section>

    <!-- Toolbar -->
    <section>
      <h2 class="text-title-large mb-4">Toolbar</h2>
      <VCard>
        <VToolbar density="comfortable" color="surface">
          <VToolbarTitle class="text-title-small">Team members</VToolbarTitle>
          <VSpacer />
          <VTextField
            placeholder="Search…"
            style="max-width: 220px"
            class="mr-2"
          >
            <template #prepend-inner>
              <VIcon :icon="Search" size="16" />
            </template>
          </VTextField>
          <VBtn color="primary">Invite</VBtn>
        </VToolbar>
        <VDivider />
        <VCardText class="text-body-medium" style="opacity: 0.7">
          Toolbars sit flush on cards and page headers — flat, hairline
          separated, no elevation.
        </VCardText>
      </VCard>
    </section>

    <!-- Breadcrumbs -->
    <section>
      <h2 class="text-title-large mb-4">Breadcrumbs</h2>
      <VBreadcrumbs :items="breadcrumbs" class="pa-0">
        <template #divider>
          <VIcon :icon="ChevronRight" size="14" style="opacity: 0.5" />
        </template>
      </VBreadcrumbs>
      <VBreadcrumbs :items="breadcrumbs" class="pa-0 mt-2">
        <template #prepend>
          <VIcon :icon="Home" size="14" class="mr-1" />
        </template>
        <template #divider>
          <span style="opacity: 0.4">/</span>
        </template>
      </VBreadcrumbs>
    </section>

    <!-- Menus -->
    <section>
      <h2 class="text-title-large mb-4">Menus</h2>
      <div class="d-flex flex-wrap ga-2">
        <VMenu>
          <template #activator="{ props: menuProps }">
            <VBtn variant="outlined" append-icon="$dropdown" v-bind="menuProps">
              Actions
            </VBtn>
          </template>
          <VList min-width="180">
            <VListItem title="Edit">
              <template #prepend><VIcon :icon="Pencil" size="16" /></template>
            </VListItem>
            <VListItem title="Duplicate">
              <template #prepend><VIcon :icon="Copy" size="16" /></template>
            </VListItem>
            <VListItem title="Share">
              <template #prepend><VIcon :icon="Share2" size="16" /></template>
            </VListItem>
            <VDivider class="my-1" />
            <VListItem base-color="error" title="Delete">
              <template #prepend><VIcon :icon="Trash2" size="16" /></template>
            </VListItem>
          </VList>
        </VMenu>

        <VMenu>
          <template #activator="{ props: menuProps }">
            <VBtn variant="outlined" append-icon="$dropdown" v-bind="menuProps">
              With submenu
            </VBtn>
          </template>
          <VList min-width="180">
            <VListItem title="Rename" />
            <VListItem title="Move to…" />
            <VMenu location="end" open-on-hover submenu>
              <template #activator="{ props: subProps }">
                <VListItem title="Export as" append-icon="$next" v-bind="subProps" />
              </template>
              <VList min-width="140">
                <VListItem title="PDF" />
                <VListItem title="CSV" />
                <VListItem title="Markdown" />
              </VList>
            </VMenu>
          </VList>
        </VMenu>
      </div>
    </section>

    <!-- Button toggles -->
    <section>
      <h2 class="text-title-large mb-4">Button toggles</h2>
      <div class="d-flex flex-wrap ga-6 align-center">
        <VBtnToggle v-model="align" mandatory density="comfortable" variant="outlined" divided>
          <VBtn value="left" icon aria-label="Align left">
            <VIcon :icon="AlignLeft" size="16" />
          </VBtn>
          <VBtn value="center" icon aria-label="Align center">
            <VIcon :icon="AlignCenter" size="16" />
          </VBtn>
          <VBtn value="right" icon aria-label="Align right">
            <VIcon :icon="AlignRight" size="16" />
          </VBtn>
        </VBtnToggle>

        <VBtnToggle v-model="period" mandatory density="comfortable" variant="outlined" divided>
          <VBtn value="day">Day</VBtn>
          <VBtn value="week">Week</VBtn>
          <VBtn value="month">Month</VBtn>
        </VBtnToggle>
      </div>
    </section>

    <!-- Chip group -->
    <section>
      <h2 class="text-title-large mb-4">Chip group (filters)</h2>
      <VChipGroup v-model="filters" multiple selected-class="text-primary">
        <VChip filter value="active">Active</VChip>
        <VChip filter value="archived">Archived</VChip>
        <VChip filter value="draft">Draft</VChip>
        <VChip filter value="shared">Shared with me</VChip>
      </VChipGroup>
    </section>

    <!-- Pagination -->
    <section>
      <h2 class="text-title-large mb-4">Pagination</h2>
      <VPagination v-model="page" :length="12" :total-visible="7" class="d-inline-flex" />
    </section>
  </div>
</template>
