<script setup lang="ts">
// App sidebar: logo, environment picker (sticky top), scrollable main menu,
// help + user menu (sticky bottom). Collapses to an icon rail on desktop
// (state via useSidebar) and becomes a temporary drawer on mobile.
import { ref } from 'vue'
import {
  Check,
  ChevronsUpDown,
  CircleHelp,
  CircleUser,
  CreditCard,
  FileText,
  KeyRound,
  LayoutDashboard,
  ListTodo,
  LogIn,
  LogOut,
  Palette,
  ReceiptText,
  Server,
  Settings,
  Users,
} from '@lucide/vue'
import { useSidebar } from '@/composables/useSidebar'

const { isMobile, mobileOpen, rail } = useSidebar()

const environments = [
  'Test environment',
  'Staging environment',
  'Production environment',
]
const environment = ref(environments[0])

const navSections = [
  {
    items: [{ title: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' }],
  },
  {
    title: 'Management',
    items: [
      { title: 'Users', icon: Users, to: '/users' },
      { title: 'Invoices', icon: ReceiptText, to: '/invoices' },
    ],
  },
  {
    title: 'Forms',
    items: [
      { title: 'Form layouts', icon: FileText, to: '/forms' },
      { title: 'Form wizard', icon: ListTodo, to: '/form-wizard' },
    ],
  },
  {
    title: 'Pages',
    items: [
      { title: 'Settings', icon: Settings, to: '/settings' },
      { title: 'Pricing', icon: CreditCard, to: '/pricing' },
      { title: 'FAQ', icon: CircleHelp, to: '/faq' },
      { title: 'Sign in', icon: LogIn, to: '/auth/login' },
      { title: 'Two-factor', icon: KeyRound, to: '/auth/two-factor' },
    ],
  },
  {
    title: 'Theme',
    items: [{ title: 'Kitchen sink', icon: Palette, to: '/kitchen-sink' }],
  },
]

const user = { name: 'Florin Miu', email: 'florin@example.com', initials: 'FM' }

const userMenu = [
  { title: 'Profile', icon: CircleUser },
  { title: 'Settings', icon: Settings },
  { title: 'Billing', icon: CreditCard },
]
</script>

<template>
  <VNavigationDrawer
    class="e-sidebar"
    :model-value="isMobile ? mobileOpen : true"
    :temporary="isMobile"
    :permanent="!isMobile"
    :rail="rail"
    width="260"
    @update:model-value="(v: boolean) => (mobileOpen = v)"
  >
    <!-- logo: full wordmark expanded, mark only when collapsed -->
    <RouterLink to="/" class="e-sidebar__logo" aria-label="Encola home">
      <svg class="e-sidebar__mark" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
        <rect width="24" height="24" rx="6" fill="rgb(var(--v-theme-primary))" />
        <text
          x="12"
          y="16.5"
          text-anchor="middle"
          font-size="13"
          font-weight="700"
          fill="rgb(var(--v-theme-on-primary))"
        >
          E
        </text>
      </svg>
      <span v-if="!rail" class="e-sidebar__wordmark">Encola</span>
    </RouterLink>

    <!-- above main menu: environment picker -->
    <div class="e-sidebar__top">
      <VSelect
        v-if="!rail"
        v-model="environment"
        :items="environments"
        aria-label="Environment"
      />
      <VMenu v-else>
        <template #activator="{ props: menuProps }">
          <EBtnGhost
            v-tooltip="{ text: environment, location: 'end' }"
            icon
            block
            aria-label="Environment"
            v-bind="menuProps"
          >
            <VIcon :icon="Server" size="18" />
          </EBtnGhost>
        </template>
        <VList min-width="220">
          <VListItem
            v-for="env in environments"
            :key="env"
            :title="env"
            @click="environment = env"
          >
            <template #append>
              <VIcon v-if="environment === env" :icon="Check" size="14" />
            </template>
          </VListItem>
        </VList>
      </VMenu>
    </div>

    <!-- main menu: the only scrollable region -->
    <div class="e-sidebar__menu">
      <VList nav>
        <template v-for="(section, i) in navSections" :key="i">
          <VListSubheader v-if="section.title">
            {{ section.title }}
          </VListSubheader>
          <VListItem
            v-for="item in section.items"
            :key="item.to"
            v-tooltip="{ text: item.title, location: 'end', disabled: !rail }"
            :to="item.to"
            :title="item.title"
          >
            <template #prepend>
              <VIcon :icon="item.icon" size="18" />
            </template>
          </VListItem>
        </template>
      </VList>
    </div>

    <!-- below main menu: help + user menu -->
    <div class="e-sidebar__bottom">
      <VList nav>
        <VListItem
          v-tooltip="{ text: 'Help & support', location: 'end', disabled: !rail }"
          href="#"
          title="Help & support"
        >
          <template #prepend>
            <VIcon :icon="CircleHelp" size="18" />
          </template>
        </VListItem>

        <VMenu location="top">
          <template #activator="{ props: menuProps }">
            <VListItem
              v-tooltip="{ text: user.name, location: 'end', disabled: !rail }"
              :title="user.name"
              :subtitle="user.email"
              aria-label="User menu"
              v-bind="menuProps"
            >
              <template #prepend>
                <VAvatar color="surface-accented" size="24">
                  <span class="text-label-small">{{ user.initials }}</span>
                </VAvatar>
              </template>
              <template #append>
                <VIcon :icon="ChevronsUpDown" size="14" style="opacity: 0.5" />
              </template>
            </VListItem>
          </template>
          <VList min-width="200">
            <VListItem v-for="entry in userMenu" :key="entry.title" :title="entry.title">
              <template #prepend>
                <VIcon :icon="entry.icon" size="16" />
              </template>
            </VListItem>
            <VDivider class="my-1" />
            <VListItem base-color="error" title="Logout">
              <template #prepend>
                <VIcon :icon="LogOut" size="16" />
              </template>
            </VListItem>
          </VList>
        </VMenu>
      </VList>
    </div>
  </VNavigationDrawer>
</template>
