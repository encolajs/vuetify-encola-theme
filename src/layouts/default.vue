<script setup lang="ts">
// App shell: sidebar navigation + topbar, Nuxt-UI-style dashboard chrome.
import { onMounted, ref } from 'vue'
import { useDisplay, useTheme } from 'vuetify'
import { CircleUser, LogOut, Moon, Palette, Settings, Sun } from '@lucide/vue'

const theme = useTheme()
const display = useDisplay()
const drawer = ref(!display.mobile.value)

const navItems = [{ title: 'Kitchen sink', icon: Palette, to: '/kitchen-sink' }]

const THEME_STORAGE_KEY = 'encola-theme'

function toggleTheme() {
  const next = theme.global.current.value.dark ? 'light' : 'dark'
  theme.global.name.value = next
  localStorage.setItem(THEME_STORAGE_KEY, next)
}

onMounted(() => {
  const saved = localStorage.getItem(THEME_STORAGE_KEY)
  if (saved === 'light' || saved === 'dark') theme.global.name.value = saved
})
</script>

<template>
  <VApp>
    <VNavigationDrawer v-model="drawer" width="260">
      <div class="d-flex align-center px-4" style="height: 56px">
        <span class="text-title-medium">
          <span class="text-primary">●</span> Encola
        </span>
      </div>
      <VList nav>
        <VListItem
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :title="item.title"
        >
          <template #prepend>
            <VIcon :icon="item.icon" size="18" />
          </template>
        </VListItem>
      </VList>
    </VNavigationDrawer>

    <VAppBar height="56">
      <VAppBarNavIcon
        v-if="display.mobile.value"
        icon="$menu"
        @click="drawer = !drawer"
      />
      <VSpacer />
      <VBtn
        icon
        variant="text"
        size="small"
        aria-label="Toggle theme"
        @click="toggleTheme"
      >
        <VIcon :icon="theme.global.current.value.dark ? Sun : Moon" size="18" />
      </VBtn>
      <VMenu>
        <template #activator="{ props: menuProps }">
          <VBtn
            icon
            variant="text"
            size="small"
            aria-label="Account"
            v-bind="menuProps"
          >
            <VIcon :icon="CircleUser" size="18" />
          </VBtn>
        </template>
        <VList min-width="180">
          <VListItem title="Settings">
            <template #prepend>
              <VIcon :icon="Settings" size="16" />
            </template>
          </VListItem>
          <VListItem title="Sign out">
            <template #prepend>
              <VIcon :icon="LogOut" size="16" />
            </template>
          </VListItem>
        </VList>
      </VMenu>
    </VAppBar>

    <VMain>
      <div class="pa-6 mx-auto" style="max-width: 1200px">
        <slot />
      </div>
    </VMain>
  </VApp>
</template>
