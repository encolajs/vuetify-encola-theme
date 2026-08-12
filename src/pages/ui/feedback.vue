<script setup lang="ts">
import { ref } from 'vue'
import { Bell, FolderOpen, Mail, ShoppingCart } from '@lucide/vue'

const snackbar = ref(false)
const successSnackbar = ref(false)
const progress = ref(65)
</script>

<template>
  <div class="d-flex flex-column ga-10">
    <div>
      <h1 class="text-headline-medium">Feedback</h1>
      <p class="text-body-medium mt-1" style="opacity: 0.7">
        Alerts, badges, progress, skeletons, snackbars and empty states.
      </p>
    </div>

    <!-- Alerts -->
    <section>
      <h2 class="text-title-large mb-4">Alerts</h2>
      <div class="d-flex flex-column ga-3">
        <VAlert
          type="success"
          title="Payment successful"
          text="Your invoice has been paid. A receipt was sent to your email."
        />
        <VAlert
          type="warning"
          title="Storage almost full"
          text="You are using 92% of your storage quota."
          closable
        />
        <VAlert
          type="error"
          title="Deployment failed"
          text="The build exited with a non-zero status code."
        >
          <template #append>
            <VBtn color="error" size="small">Retry</VBtn>
          </template>
        </VAlert>
        <VAlert
          type="info"
          border="start"
          title="Callout with a border"
          text="border=&quot;start&quot; gives alerts a Nuxt-UI-style accent edge."
        />
      </div>
    </section>

    <!-- Badges -->
    <section>
      <h2 class="text-title-large mb-4">Badges</h2>
      <div class="d-flex flex-wrap ga-6 align-center">
        <VBadge content="3" color="primary">
          <VIcon :icon="Bell" size="22" />
        </VBadge>
        <VBadge content="120" max="99" color="error">
          <VIcon :icon="Mail" size="22" />
        </VBadge>
        <VBadge dot color="success">
          <VIcon :icon="ShoppingCart" size="22" />
        </VBadge>
        <VBadge content="2" color="primary" inline>
          <span class="text-body-medium">Inline badge</span>
        </VBadge>
        <VBtn variant="outlined">
          Notifications
          <VBadge content="9" color="error" inline class="ml-1" />
        </VBtn>
      </div>
    </section>

    <!-- Progress linear -->
    <section>
      <h2 class="text-title-large mb-4">Progress — linear</h2>
      <div class="d-flex flex-column ga-4" style="max-width: 480px">
        <VProgressLinear :model-value="progress" />
        <VProgressLinear indeterminate />
        <VProgressLinear :model-value="40" buffer-value="70" color="info" />
        <VProgressLinear :model-value="progress" color="success" height="16">
          <template #default="{ value }">
            <span class="text-label-small">{{ Math.ceil(value) }}%</span>
          </template>
        </VProgressLinear>
      </div>
    </section>

    <!-- Progress circular -->
    <section>
      <h2 class="text-title-large mb-4">Progress — circular</h2>
      <div class="d-flex flex-wrap ga-6 align-center">
        <VProgressCircular indeterminate />
        <VProgressCircular :model-value="progress" size="40" width="4">
          <span class="text-label-small">{{ progress }}</span>
        </VProgressCircular>
        <VProgressCircular :model-value="30" color="warning" size="32" />
        <VProgressCircular indeterminate color="secondary" size="20" width="2" />
      </div>
    </section>

    <!-- Skeletons -->
    <section>
      <h2 class="text-title-large mb-4">Skeleton loaders</h2>
      <VRow dense>
        <VCol cols="12" md="4">
          <VCard>
            <VSkeletonLoader type="list-item-avatar-two-line, list-item-avatar-two-line" />
          </VCard>
        </VCol>
        <VCol cols="12" md="4">
          <VCard>
            <VSkeletonLoader type="image, article" />
          </VCard>
        </VCol>
        <VCol cols="12" md="4">
          <VCard>
            <VSkeletonLoader type="table-row@3" />
          </VCard>
        </VCol>
      </VRow>
    </section>

    <!-- Snackbars -->
    <section>
      <h2 class="text-title-large mb-4">Snackbars</h2>
      <div class="d-flex flex-wrap ga-2">
        <VBtn variant="outlined" @click="snackbar = true">Show snackbar</VBtn>
        <VBtn color="primary" @click="successSnackbar = true">Show success</VBtn>
      </div>
      <VSnackbar v-model="snackbar" :timeout="3000">
        Changes saved to draft.
        <template #actions>
          <VBtn variant="text" @click="snackbar = false">Dismiss</VBtn>
        </template>
      </VSnackbar>
      <VSnackbar v-model="successSnackbar" color="success" :timeout="3000">
        Project published successfully.
      </VSnackbar>
    </section>

    <!-- Empty state -->
    <section>
      <h2 class="text-title-large mb-4">Empty state</h2>
      <VCard>
        <VEmptyState
          :icon="FolderOpen"
          headline="No projects yet"
          text="Create your first project to see it here. Projects group related work together."
        >
          <template #actions>
            <VBtn color="primary">New project</VBtn>
          </template>
        </VEmptyState>
      </VCard>
    </section>
  </div>
</template>
