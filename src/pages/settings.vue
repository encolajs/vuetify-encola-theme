<script setup lang="ts">
import { ref } from 'vue'
import EFormField from '@/components/EFormField.vue'

const tab = ref('profile')
const saved = ref(false)

const profile = ref({
  name: 'Florin Miu',
  email: 'florin@example.com',
  username: 'florin',
  bio: '',
})

const notifications = ref({
  comments: true,
  mentions: true,
  followers: false,
  digest: true,
  marketing: false,
})

function save() {
  saved.value = true
  setTimeout(() => (saved.value = false), 2500)
}
</script>

<template>
  <div class="d-flex flex-column ga-6 e-page-narrow">
    <div>
      <h1 class="text-headline-medium">Settings</h1>
      <p class="text-body-medium mt-1" style="opacity: 0.7">
        Manage your account settings and preferences.
      </p>
    </div>

    <VAlert v-if="saved" type="success" text="Settings saved. (demo only)" />

    <VTabs v-model="tab">
      <VTab value="profile">Profile</VTab>
      <VTab value="password">Password</VTab>
      <VTab value="notifications">Notifications</VTab>
    </VTabs>

    <VTabsWindow v-model="tab">
      <!-- Profile -->
      <VTabsWindowItem value="profile">
        <VCard>
          <VCardItem>
            <VCardTitle>Profile</VCardTitle>
            <VCardSubtitle>This information is displayed publicly.</VCardSubtitle>
          </VCardItem>
          <VCardText>
            <form class="d-flex flex-column ga-4" @submit.prevent="save">
              <div class="d-flex align-center ga-4">
                <VAvatar color="surface-accented" size="56">
                  <span class="text-title-medium">FM</span>
                </VAvatar>
                <div class="d-flex ga-2">
                  <VBtn variant="outlined" size="small">Change avatar</VBtn>
                  <VBtn variant="text" size="small" color="error">Remove</VBtn>
                </div>
              </div>
              <VRow dense>
                <VCol cols="12" md="6">
                  <EFormField label="Full name" required>
                    <VTextField v-model="profile.name" placeholder="Jane Cooper" />
                  </EFormField>
                </VCol>
                <VCol cols="12" md="6">
                  <EFormField label="Username" help="encola.dev/@username">
                    <VTextField v-model="profile.username" placeholder="jane" />
                  </EFormField>
                </VCol>
                <VCol cols="12">
                  <EFormField label="Email" required>
                    <VTextField v-model="profile.email" placeholder="you@example.com" type="email" />
                  </EFormField>
                </VCol>
                <VCol cols="12">
                  <EFormField label="Bio" help="A short description for your profile.">
                    <VTextarea v-model="profile.bio" placeholder="Tell us about yourself" rows="3" />
                  </EFormField>
                </VCol>
              </VRow>
              <div class="d-flex justify-end">
                <VBtn color="primary" type="submit">Save changes</VBtn>
              </div>
            </form>
          </VCardText>
        </VCard>
      </VTabsWindowItem>

      <!-- Password -->
      <VTabsWindowItem value="password">
        <VCard>
          <VCardItem>
            <VCardTitle>Change password</VCardTitle>
            <VCardSubtitle>Use a long, random password you don't reuse.</VCardSubtitle>
          </VCardItem>
          <VCardText>
            <form class="d-flex flex-column ga-4" style="max-width: 420px" @submit.prevent="save">
              <EFormField label="Current password" required>
                <VTextField placeholder="••••••••" type="password" autocomplete="current-password" />
              </EFormField>
              <EFormField label="New password" required help="At least 8 characters.">
                <VTextField placeholder="••••••••" type="password" autocomplete="new-password" />
              </EFormField>
              <EFormField label="Confirm new password" required>
                <VTextField placeholder="••••••••" type="password" autocomplete="new-password" />
              </EFormField>
              <div class="d-flex justify-end">
                <VBtn color="primary" type="submit">Update password</VBtn>
              </div>
            </form>
          </VCardText>
        </VCard>
      </VTabsWindowItem>

      <!-- Notifications -->
      <VTabsWindowItem value="notifications">
        <VCard>
          <VCardItem>
            <VCardTitle>Notifications</VCardTitle>
            <VCardSubtitle>Choose what you want to hear about.</VCardSubtitle>
          </VCardItem>
          <VCardText>
            <form class="d-flex flex-column ga-1" @submit.prevent="save">
              <VSwitch v-model="notifications.comments" label="Comments on your posts" />
              <VSwitch v-model="notifications.mentions" label="Mentions" />
              <VSwitch v-model="notifications.followers" label="New followers" />
              <VDivider class="my-3" />
              <VSwitch v-model="notifications.digest" label="Weekly digest email" />
              <VSwitch v-model="notifications.marketing" label="Product news and offers" />
              <div class="d-flex justify-end mt-4">
                <VBtn color="primary" type="submit">Save preferences</VBtn>
              </div>
            </form>
          </VCardText>
        </VCard>
      </VTabsWindowItem>
    </VTabsWindow>
  </div>
</template>
