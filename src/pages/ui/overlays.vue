<script setup lang="ts">
import { ref } from 'vue'
import { Link, Mail, MessageSquare, Send } from '@lucide/vue'
import EFormField from '@/encola/components/EFormField.vue'

const confirmDialog = ref(false)
const formDialog = ref(false)
const drawer = ref(false)
const sheet = ref(false)
</script>

<template>
  <div class="d-flex flex-column ga-10">
    <div>
      <h1 class="text-headline-medium">Overlays</h1>
      <p class="text-body-medium mt-1" style="opacity: 0.7">
        Dialogs, drawers, popovers, bottom sheets and tooltips — flat
        surfaces with hairline borders, no elevation.
      </p>
    </div>

    <!-- Dialogs -->
    <section>
      <h2 class="text-title-large mb-4">Dialogs</h2>
      <div class="d-flex flex-wrap ga-2">
        <VBtn color="primary" @click="confirmDialog = true">Confirm dialog</VBtn>
        <VBtn variant="outlined" @click="formDialog = true">Form dialog</VBtn>
      </div>

      <VDialog v-model="confirmDialog" max-width="420">
        <VCard>
          <VCardItem>
            <VCardTitle>Archive this project?</VCardTitle>
            <VCardSubtitle>You can restore it later from the archive.</VCardSubtitle>
          </VCardItem>
          <VCardText>
            Archived projects are hidden from the dashboard but keep all
            their data and members.
          </VCardText>
          <VCardActions>
            <VSpacer />
            <VBtn variant="text" @click="confirmDialog = false">Cancel</VBtn>
            <VBtn variant="flat" color="primary" @click="confirmDialog = false">Archive</VBtn>
          </VCardActions>
        </VCard>
      </VDialog>

      <VDialog v-model="formDialog" max-width="440">
        <VCard>
          <VCardItem>
            <VCardTitle>New project</VCardTitle>
            <VCardSubtitle>Projects group related work together.</VCardSubtitle>
          </VCardItem>
          <VCardText>
            <div class="d-flex flex-column ga-4">
              <EFormField label="Name" required>
                <VTextField placeholder="my-awesome-project" />
              </EFormField>
              <EFormField label="Visibility">
                <VSelect :items="['Private', 'Team', 'Public']" placeholder="Select visibility" />
              </EFormField>
            </div>
          </VCardText>
          <VCardActions>
            <VSpacer />
            <VBtn variant="text" @click="formDialog = false">Cancel</VBtn>
            <VBtn variant="flat" color="primary" @click="formDialog = false">Create</VBtn>
          </VCardActions>
        </VCard>
      </VDialog>
    </section>

    <!-- Drawer -->
    <section>
      <h2 class="text-title-large mb-4">Drawer</h2>
      <VBtn variant="outlined" @click="drawer = true">Open right drawer</VBtn>
      <VNavigationDrawer v-model="drawer" location="end" temporary width="320">
        <div class="d-flex align-center justify-space-between px-4" style="height: 56px">
          <span class="text-title-small">Filter results</span>
          <VBtn variant="text" icon size="small" aria-label="Close" @click="drawer = false">
            <VIcon icon="$close" size="16" />
          </VBtn>
        </div>
        <VDivider />
        <div class="pa-4 d-flex flex-column ga-4">
          <EFormField label="Status">
            <VSelect :items="['Any', 'Active', 'Archived']" placeholder="Any" />
          </EFormField>
          <EFormField label="Owner">
            <VSelect :items="['Anyone', 'Me', 'My team']" placeholder="Anyone" />
          </EFormField>
          <VCheckbox label="Only starred" />
          <VBtn color="primary" block @click="drawer = false">Apply filters</VBtn>
        </div>
      </VNavigationDrawer>
    </section>

    <!-- Bottom sheet -->
    <section>
      <h2 class="text-title-large mb-4">Bottom sheet</h2>
      <VBtn variant="outlined" @click="sheet = true">Share via…</VBtn>
      <VBottomSheet v-model="sheet">
        <VCard>
          <VList>
            <VListSubheader>Share this page</VListSubheader>
            <VListItem title="Copy link" @click="sheet = false">
              <template #prepend><VIcon :icon="Link" size="16" /></template>
            </VListItem>
            <VListItem title="Email" @click="sheet = false">
              <template #prepend><VIcon :icon="Mail" size="16" /></template>
            </VListItem>
            <VListItem title="Message" @click="sheet = false">
              <template #prepend><VIcon :icon="MessageSquare" size="16" /></template>
            </VListItem>
            <VListItem title="Post" @click="sheet = false">
              <template #prepend><VIcon :icon="Send" size="16" /></template>
            </VListItem>
          </VList>
        </VCard>
      </VBottomSheet>
    </section>

    <!-- Popover -->
    <section>
      <h2 class="text-title-large mb-4">Popover</h2>
      <p class="text-body-medium mb-3" style="opacity: 0.7">
        A menu with arbitrary content that stays open while interacting.
      </p>
      <VMenu :close-on-content-click="false" location="bottom start">
        <template #activator="{ props: menuProps }">
          <VBtn variant="outlined" v-bind="menuProps">
            <VAvatar color="surface-accented" size="20" class="mr-2">
              <span class="text-label-small">JD</span>
            </VAvatar>
            Jane Doe
          </VBtn>
        </template>
        <VCard min-width="260">
          <VCardItem>
            <template #prepend>
              <VAvatar color="surface-accented" size="36">
                <span class="text-label-medium">JD</span>
              </VAvatar>
            </template>
            <VCardTitle class="text-title-small">Jane Doe</VCardTitle>
            <VCardSubtitle>jane.doe@domain.com</VCardSubtitle>
          </VCardItem>
          <VDivider />
          <VCardText class="d-flex flex-column ga-2">
            <div class="d-flex justify-space-between text-body-small">
              <span style="opacity: 0.7">Role</span><span>Admin</span>
            </div>
            <div class="d-flex justify-space-between text-body-small">
              <span style="opacity: 0.7">Last active</span><span>2 h ago</span>
            </div>
          </VCardText>
          <VCardActions>
            <VBtn variant="text" size="small" block>View full profile</VBtn>
          </VCardActions>
        </VCard>
      </VMenu>
    </section>

    <!-- Tooltips -->
    <section>
      <h2 class="text-title-large mb-4">Tooltips</h2>
      <div class="d-flex flex-wrap ga-2">
        <VBtn v-tooltip:top="'Tooltip on top'" variant="outlined">Top</VBtn>
        <VBtn v-tooltip:bottom="'Tooltip on bottom'" variant="outlined">Bottom</VBtn>
        <VBtn v-tooltip:start="'Tooltip at start'" variant="outlined">Start</VBtn>
        <VBtn v-tooltip:end="'Tooltip at end'" variant="outlined">End</VBtn>
      </div>
    </section>
  </div>
</template>
