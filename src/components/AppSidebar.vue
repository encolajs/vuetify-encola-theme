<script setup lang="ts">
// App sidebar: logo, environment picker (sticky top), scrollable main menu,
// help + user menu (sticky bottom). Collapses to an icon rail on desktop
// (state via useSidebar) and becomes a temporary drawer on mobile.
import { ref } from 'vue'
import type { FunctionalComponent } from 'vue'
import { useRoute } from 'vue-router'
import {
  Check,
  ChevronsUpDown,
  CircleHelp,
  CircleUser,
  CreditCard,
  FileText,
  FolderKanban,
  KeyRound,
  Layers,
  LayoutDashboard,
  ListTodo,
  LogIn,
  LogOut,
  NotebookPen,
  Palette,
  ReceiptText,
  Server,
  Settings,
  Users,
} from '@lucide/vue'
import { useSidebar } from '@/composables/useSidebar'

const { isMobile, mobileOpen, rail } = useSidebar()
const route = useRoute()

const environments = [
  'Test environment',
  'Staging environment',
  'Production environment',
]
const environment = ref(environments[0])

interface NavItem {
  title: string
  icon: FunctionalComponent
  to: string
}

interface NavSection {
  title: string
  icon: FunctionalComponent
  to?: string // leaf link
  items?: NavItem[] // group with children
  collapsed?: boolean // children hidden by default
}

const navSections: NavSection[] = [
  { title: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
  {
    title: 'Management',
    icon: FolderKanban,
    items: [
      { title: 'Users', icon: Users, to: '/users' },
      { title: 'Invoices', icon: ReceiptText, to: '/invoices' },
    ],
  },
  {
    title: 'Forms',
    icon: NotebookPen,
    items: [
      { title: 'Form layouts', icon: FileText, to: '/forms' },
      { title: 'Form wizard', icon: ListTodo, to: '/form-wizard' },
    ],
  },
  {
    title: 'Pages',
    icon: Layers,
    collapsed: true,
    items: [
      { title: 'Settings', icon: Settings, to: '/settings' },
      { title: 'Pricing', icon: CreditCard, to: '/pricing' },
      { title: 'FAQ', icon: CircleHelp, to: '/faq' },
      { title: 'Sign in', icon: LogIn, to: '/auth/login' },
      { title: 'Two-factor', icon: KeyRound, to: '/auth/two-factor' },
    ],
  },
  { title: 'Kitchen sink', icon: Palette, to: '/kitchen-sink' },
]

// groups open by default unless marked collapsed; explicit state instead
// of VList's opened model so the flag always wins on first render and the
// state survives rail toggles
const openSections = ref(
  new Set(navSections.filter((s) => s.items && !s.collapsed).map((s) => s.title)),
)

function toggleSection(title: string) {
  const next = new Set(openSections.value)
  if (next.has(title)) next.delete(title)
  else next.add(title)
  openSections.value = next
}

function isSectionActive(section: NavSection) {
  return section.items?.some((item) => route.path.startsWith(item.to)) ?? false
}

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
      <VMenu v-else location="end">
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
        <template v-for="section in navSections" :key="section.title">
          <!-- leaf link -->
          <VListItem
            v-if="section.to"
            v-tooltip="{ text: section.title, location: 'end', disabled: !rail }"
            :to="section.to"
            :title="section.title"
          >
            <template #prepend>
              <VIcon :icon="section.icon" size="18" />
            </template>
          </VListItem>

          <!-- expanded: collapsible group -->
          <template v-else-if="!rail">
            <VListItem
              :title="section.title"
              :aria-expanded="openSections.has(section.title)"
              @click="toggleSection(section.title)"
            >
              <template #prepend>
                <VIcon :icon="section.icon" size="18" />
              </template>
              <template #append>
                <VIcon
                  :icon="openSections.has(section.title) ? '$collapse' : '$expand'"
                  size="16"
                  style="opacity: 0.6"
                />
              </template>
            </VListItem>
            <div v-show="openSections.has(section.title)" class="e-sidebar__group">
              <VListItem
                v-for="item in section.items"
                :key="item.to"
                :to="item.to"
                :title="item.title"
              >
                <template #prepend>
                  <VIcon :icon="item.icon" size="18" />
                </template>
              </VListItem>
            </div>
          </template>

          <!-- rail: section icon opens children as a flyout menu -->
          <VMenu v-else location="end">
            <template #activator="{ props: menuProps }">
              <VListItem
                v-tooltip="{ text: section.title, location: 'end' }"
                :title="section.title"
                :active="isSectionActive(section)"
                v-bind="menuProps"
              >
                <template #prepend>
                  <VIcon :icon="section.icon" size="18" />
                </template>
              </VListItem>
            </template>
            <VList min-width="200">
              <VListSubheader>{{ section.title }}</VListSubheader>
              <VListItem
                v-for="item in section.items"
                :key="item.to"
                :to="item.to"
                :title="item.title"
              >
                <template #prepend>
                  <VIcon :icon="item.icon" size="16" />
                </template>
              </VListItem>
            </VList>
          </VMenu>
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
