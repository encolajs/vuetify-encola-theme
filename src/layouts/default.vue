<script setup lang="ts">
// App shell: full-height sidebar + topbar, Nuxt-UI-style dashboard chrome.
import { onMounted } from 'vue'
import { useTheme } from 'vuetify'
import {
  Menu as MenuIcon,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  SlidersHorizontal,
  Sun,
} from '@lucide/vue'
import AppSidebar from '@/encola/components/AppSidebar.vue'
import ThemeCustomizer from '@/encola/components/ThemeCustomizer.vue'
import { useSidebar } from '@/encola/composables/useSidebar'
import { useCustomizer } from '@/encola/composables/useCustomizer'
import { useContentWidth } from '@/encola/composables/useContentWidth'

const theme = useTheme()
const { isMobile, collapsed, toggle } = useSidebar()
const customizer = useCustomizer()
const { contentClass } = useContentWidth()

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
    <AppSidebar />

    <VAppBar height="56">
      <VBtn
        icon
        variant="text"
        size="small"
        class="ml-2"
        :aria-label="isMobile ? 'Open menu' : collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        @click="toggle"
      >
        <VIcon
          :icon="isMobile ? MenuIcon : collapsed ? PanelLeftOpen : PanelLeftClose"
          size="18"
        />
      </VBtn>
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
      <VBtn
        icon
        variant="text"
        size="small"
        class="mr-2"
        aria-label="Customize theme"
        @click="customizer.open.value = true"
      >
        <VIcon :icon="SlidersHorizontal" size="18" />
      </VBtn>
    </VAppBar>

    <ThemeCustomizer />

    <VMain>
      <div class="pa-6 mx-auto e-content" :class="contentClass">
        <slot />
      </div>
    </VMain>
  </VApp>
</template>
