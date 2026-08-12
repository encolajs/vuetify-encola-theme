<script setup lang="ts">
// Every themed component in one place. This page doubles as the
// visual QA surface: check it in light AND dark after any theme change.
import { ref } from 'vue'
import { Bell, Mail, Plus, Search, Trash2 } from '@lucide/vue'
import EFormField from '@/components/EFormField.vue'

const dialog = ref(false)
const tab = ref('account')
const page = ref(1)
const checkbox = ref(true)
const radio = ref('first')
const switchOn = ref(true)
const slider = ref(40)
const select = ref<string | null>(null)
const combo = ref<string | null>(null)
const textWithError = ref('not-an-email')

const selectItems = ['Engineering', 'Design', 'Marketing', 'Sales']

const tableRows = [
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay@example.com', role: 'Member' },
  { name: 'Courtney Henry', title: 'Designer', email: 'courtney@example.com', role: 'Admin' },
  { name: 'Tom Cook', title: 'Product Manager', email: 'tom@example.com', role: 'Member' },
  { name: 'Whitney Francis', title: 'Copywriter', email: 'whitney@example.com', role: 'Member' },
]

const breadcrumbs = [
  { title: 'Home', href: '#' },
  { title: 'Components', href: '#' },
  { title: 'Kitchen sink' },
]
</script>

<template>
  <div class="d-flex flex-column ga-10">
    <div>
      <h1 class="text-headline-medium">Kitchen sink</h1>
      <p class="text-body-medium mt-1" style="opacity: 0.7">
        Every themed component in one place — the visual QA surface. Check in
        light and dark.
      </p>
    </div>

    <!-- Buttons -->
    <section>
      <h2 class="text-title-large mb-4">Buttons</h2>
      <div class="d-flex flex-wrap ga-2 align-center">
        <VBtn color="primary">Solid</VBtn>
        <VBtn variant="tonal" color="primary">Soft</VBtn>
        <VBtn variant="outlined">Outline</VBtn>
        <VBtn variant="text">Ghost</VBtn>
        <VBtn variant="plain" color="primary">Link</VBtn>
        <VBtn color="neutral">Neutral</VBtn>
        <VBtn color="error">Danger</VBtn>
      </div>
      <div class="d-flex flex-wrap ga-2 align-center mt-3">
        <VBtn color="primary" size="small">Small</VBtn>
        <VBtn color="primary">Default</VBtn>
        <VBtn color="primary" size="large">Large</VBtn>
        <VBtn color="primary" :prepend-icon="Plus">With icon</VBtn>
        <VBtn color="primary" :loading="true">Loading</VBtn>
        <VBtn color="primary" disabled>Disabled</VBtn>
        <VBtn variant="text" icon aria-label="Notifications">
          <VIcon :icon="Bell" size="18" />
        </VBtn>
      </div>
    </section>

    <!-- Badges & chips -->
    <section>
      <h2 class="text-title-large mb-4">Chips</h2>
      <div class="d-flex flex-wrap ga-2 align-center">
        <VChip color="primary">Primary</VChip>
        <VChip color="secondary">Secondary</VChip>
        <VChip color="error">Error</VChip>
        <VChip color="warning">Warning</VChip>
        <VChip color="info">Info</VChip>
        <VChip>Neutral</VChip>
        <VChip color="primary" closable>Closable</VChip>
      </div>
    </section>

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
        />
        <VAlert
          type="error"
          title="Deployment failed"
          text="The build exited with a non-zero status code."
          closable
        />
        <VAlert
          type="info"
          title="Heads up"
          text="A new version is available. Refresh to update."
        />
      </div>
    </section>

    <!-- Form fields -->
    <section>
      <h2 class="text-title-large mb-4">Form fields</h2>
      <VRow>
        <VCol cols="12" md="6">
          <div class="d-flex flex-column ga-4">
            <EFormField label="Email" required help="We will never share it.">
              <VTextField placeholder="you@example.com" type="email">
                <template #prepend-inner>
                  <VIcon :icon="Mail" size="16" />
                </template>
              </VTextField>
            </EFormField>
            <EFormField label="Password" required>
              <VTextField placeholder="••••••••" type="password" />
            </EFormField>
            <EFormField label="Work email" :error="'Please enter a valid email address.'">
              <VTextField v-model="textWithError" placeholder="you@company.com" />
            </EFormField>
            <EFormField label="Search">
              <VTextField placeholder="Search…" clearable>
                <template #prepend-inner>
                  <VIcon :icon="Search" size="16" />
                </template>
              </VTextField>
            </EFormField>
          </div>
        </VCol>
        <VCol cols="12" md="6">
          <div class="d-flex flex-column ga-4">
            <EFormField label="Department">
              <VSelect v-model="select" :items="selectItems" placeholder="Select a department" />
            </EFormField>
            <EFormField label="Team (autocomplete)">
              <VAutocomplete v-model="combo" :items="selectItems" placeholder="Type to search…" />
            </EFormField>
            <EFormField label="Bio" help="A short description for your profile.">
              <VTextarea placeholder="Tell us about yourself" rows="3" />
            </EFormField>
            <EFormField label="Attachment">
              <VFileInput placeholder="Choose a file" prepend-icon="" prepend-inner-icon="$file" />
            </EFormField>
          </div>
        </VCol>
      </VRow>
    </section>

    <!-- Selection controls -->
    <section>
      <h2 class="text-title-large mb-4">Selection controls</h2>
      <VRow>
        <VCol cols="12" md="4">
          <VCheckbox v-model="checkbox" label="Email me about product updates" />
          <VCheckbox label="Email me about security alerts" />
          <VCheckbox label="Disabled option" disabled />
        </VCol>
        <VCol cols="12" md="4">
          <VRadioGroup v-model="radio">
            <VRadio label="Startup (up to 10 seats)" value="first" />
            <VRadio label="Business (up to 50 seats)" value="second" />
            <VRadio label="Enterprise (unlimited)" value="third" />
          </VRadioGroup>
        </VCol>
        <VCol cols="12" md="4">
          <VSwitch v-model="switchOn" label="Public profile" />
          <VSwitch label="Two-factor authentication" />
          <div class="mt-4">
            <EFormField label="Volume">
              <VSlider v-model="slider" />
            </EFormField>
          </div>
        </VCol>
      </VRow>
    </section>

    <!-- Cards -->
    <section>
      <h2 class="text-title-large mb-4">Cards</h2>
      <VRow>
        <VCol cols="12" md="4">
          <VCard>
            <VCardItem>
              <VCardTitle>Simple card</VCardTitle>
              <VCardSubtitle>Ring instead of shadow</VCardSubtitle>
            </VCardItem>
            <VCardText>
              Depth comes from a 1px neutral ring and surface background
              steps — no elevation anywhere.
            </VCardText>
            <VCardActions>
              <VBtn variant="text">Cancel</VBtn>
              <VBtn color="primary">Save</VBtn>
            </VCardActions>
          </VCard>
        </VCol>
        <VCol cols="12" md="4">
          <VCard color="surface-muted">
            <VCardItem>
              <VCardTitle>Muted surface</VCardTitle>
              <VCardSubtitle>surface-muted background</VCardSubtitle>
            </VCardItem>
            <VCardText>
              Use surface steps (muted / elevated / accented) to create
              hierarchy between panels.
            </VCardText>
          </VCard>
        </VCol>
        <VCol cols="12" md="4">
          <VCard>
            <VCardItem>
              <VCardTitle>Stat tile</VCardTitle>
            </VCardItem>
            <VCardText>
              <div class="text-headline-medium">$45,231</div>
              <div class="text-body-small mt-1" style="opacity: 0.7">
                +20.1% from last month
              </div>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </section>

    <!-- Tabs -->
    <section>
      <h2 class="text-title-large mb-4">Tabs</h2>
      <VTabs v-model="tab">
        <VTab value="account">Account</VTab>
        <VTab value="password">Password</VTab>
        <VTab value="notifications">Notifications</VTab>
      </VTabs>
      <VTabsWindow v-model="tab" class="mt-4">
        <VTabsWindowItem value="account">
          <p class="text-body-medium">Manage your account details here.</p>
        </VTabsWindowItem>
        <VTabsWindowItem value="password">
          <p class="text-body-medium">Change your password here.</p>
        </VTabsWindowItem>
        <VTabsWindowItem value="notifications">
          <p class="text-body-medium">Choose what you want to hear about.</p>
        </VTabsWindowItem>
      </VTabsWindow>
    </section>

    <!-- Accordion -->
    <section>
      <h2 class="text-title-large mb-4">Accordion</h2>
      <VExpansionPanels>
        <VExpansionPanel
          title="What is Encola?"
          text="A flat, Tailwind-style theme for Vuetify: hairline rings, slate neutrals, no shadows, no ripple."
        />
        <VExpansionPanel
          title="Do I need to fork Vuetify?"
          text="No — everything is configuration: SASS variables, defaults, runtime theme and a small unlayered CSS file."
        />
        <VExpansionPanel
          title="Does dark mode work?"
          text="Dark mode is first-class; every component is checked in both themes."
        />
      </VExpansionPanels>
    </section>

    <!-- Overlays -->
    <section>
      <h2 class="text-title-large mb-4">Menus, dialogs & tooltips</h2>
      <div class="d-flex flex-wrap ga-2 align-center">
        <VMenu>
          <template #activator="{ props: menuProps }">
            <VBtn variant="outlined" v-bind="menuProps" append-icon="$dropdown">
              Options
            </VBtn>
          </template>
          <VList min-width="180">
            <VListItem title="Edit" />
            <VListItem title="Duplicate" />
            <VListItem title="Archive" />
            <VListItem base-color="error" title="Delete">
              <template #prepend>
                <VIcon :icon="Trash2" size="16" />
              </template>
            </VListItem>
          </VList>
        </VMenu>

        <VBtn color="primary" @click="dialog = true">Open dialog</VBtn>
        <VDialog v-model="dialog" max-width="440">
          <VCard>
            <VCardItem>
              <VCardTitle>Delete project</VCardTitle>
              <VCardSubtitle>This action cannot be undone.</VCardSubtitle>
            </VCardItem>
            <VCardText>
              Are you sure you want to delete this project? All of its data
              will be permanently removed.
            </VCardText>
            <VCardActions>
              <VSpacer />
              <VBtn variant="text" @click="dialog = false">Cancel</VBtn>
              <VBtn color="error" @click="dialog = false">Delete</VBtn>
            </VCardActions>
          </VCard>
        </VDialog>

        <VTooltip text="Tooltips are flat too">
          <template #activator="{ props: tipProps }">
            <VBtn variant="text" v-bind="tipProps">Hover me</VBtn>
          </template>
        </VTooltip>
      </div>
    </section>

    <!-- Table -->
    <section>
      <h2 class="text-title-large mb-4">Table</h2>
      <VCard>
        <VTable>
          <thead>
            <tr>
              <th>Name</th>
              <th>Title</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in tableRows" :key="row.email">
              <td>{{ row.name }}</td>
              <td>{{ row.title }}</td>
              <td>{{ row.email }}</td>
              <td>
                <VChip :color="row.role === 'Admin' ? 'primary' : undefined">
                  {{ row.role }}
                </VChip>
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
      <div class="d-flex justify-center mt-4">
        <VPagination v-model="page" :length="5" :total-visible="5" />
      </div>
    </section>

    <!-- Progress & avatars -->
    <section>
      <h2 class="text-title-large mb-4">Progress, avatars & breadcrumbs</h2>
      <div class="d-flex flex-column ga-4" style="max-width: 480px">
        <VProgressLinear :model-value="65" />
        <div class="d-flex ga-4 align-center">
          <VProgressCircular indeterminate />
          <VAvatar color="primary" size="32">
            <span class="text-label-medium">LW</span>
          </VAvatar>
          <VAvatar color="surface-accented" size="32">
            <span class="text-label-medium">TC</span>
          </VAvatar>
          <VBreadcrumbs :items="breadcrumbs" density="compact" class="pa-0" />
        </div>
      </div>
    </section>

    <!-- Typography -->
    <section>
      <h2 class="text-title-large mb-4">Typography</h2>
      <div class="d-flex flex-column ga-2">
        <div class="text-headline-large">Headline large</div>
        <div class="text-headline-medium">Headline medium</div>
        <div class="text-title-large">Title large</div>
        <div class="text-title-medium">Title medium</div>
        <div class="text-body-large">Body large — the quick brown fox jumps over the lazy dog.</div>
        <div class="text-body-medium">Body medium — the quick brown fox jumps over the lazy dog.</div>
        <div class="text-body-small">Body small — the quick brown fox jumps over the lazy dog.</div>
      </div>
    </section>
  </div>
</template>
