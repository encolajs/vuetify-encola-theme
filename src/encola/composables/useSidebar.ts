// Shared sidebar state: collapsed rail on desktop (persisted), temporary
// drawer on mobile. Module-level refs so the header toggle and the sidebar
// component stay in sync.
import { computed, ref } from 'vue'
import { useDisplay } from 'vuetify'

const STORAGE_KEY = 'encola-sidebar-collapsed'

const collapsed = ref(
  typeof localStorage !== 'undefined' &&
    localStorage.getItem(STORAGE_KEY) === 'true',
)
const mobileOpen = ref(false)

export function useSidebar() {
  const display = useDisplay()
  const isMobile = computed(() => display.mobile.value)
  const rail = computed(() => !isMobile.value && collapsed.value)

  function toggle() {
    if (isMobile.value) {
      mobileOpen.value = !mobileOpen.value
    } else {
      collapsed.value = !collapsed.value
      localStorage.setItem(STORAGE_KEY, String(collapsed.value))
    }
  }

  return { collapsed, mobileOpen, isMobile, rail, toggle }
}
