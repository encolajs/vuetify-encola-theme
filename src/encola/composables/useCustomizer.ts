// Theme customizer state + live preview. Mutates the running Vuetify theme
// (colors/variables are reactive) using the same buildThemes() the blueprint
// uses, and injects a small unlayered <style> tag for the radius, which is
// compiled statically in settings.scss. The drawer shows how to make each
// change permanent.
import { computed, effectScope, ref, watch } from 'vue'
import type { EffectScope } from 'vue'
import { useTheme } from 'vuetify'
import { buildThemes } from '../preset'
import { useContentWidth } from './useContentWidth'
import type { PaletteName } from '../palettes'

const HEX_RE = /^#[0-9a-f]{6}$/i

const DEFAULTS = {
  primary: '#6366f1',
  surface: 'slate' as PaletteName,
  radius: 4,
  contentWidth: 'compact' as const,
}

const open = ref(false)
const primary = ref(DEFAULTS.primary)
const surface = ref<PaletteName>(DEFAULTS.surface)
const radius = ref(DEFAULTS.radius)

// Watchers live in a detached effect scope so they survive the unmount/HMR
// of whichever component happened to call useCustomizer() first.
let scope: EffectScope | null = null

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    scope?.stop()
    scope = null
  })
}

export function useCustomizer() {
  const theme = useTheme()
  const { contentWidth } = useContentWidth()

  const primaryValid = computed(() => HEX_RE.test(primary.value))

  if (!scope) {
    scope = effectScope(true)

    // Recompute both theme definitions from the blueprint's own generator
    // and patch them into the running (reactive) themes.
    function applyColors() {
      const built = buildThemes({
        primary: HEX_RE.test(primary.value) ? primary.value : undefined,
        surface: surface.value,
      })
      for (const [name, t] of Object.entries(theme.themes.value)) {
        const def = t.dark ? built.dark : built.light
        Object.assign(t.colors, def.colors)
        Object.assign(t.variables, def.variables)
        void name
      }
    }

    // Radius is compiled statically from settings.scss, so the live preview
    // injects an unlayered style tag (appended last -> wins) covering the
    // visible surfaces. The permanent change is $border-radius-root.
    function applyRadius(px: number) {
      let el = document.getElementById('e-customizer-radius') as HTMLStyleElement | null
      if (!el) {
        el = document.createElement('style')
        el.id = 'e-customizer-radius'
        document.head.appendChild(el)
      }
      el.textContent = `
.v-btn, .v-field, .v-chip--label, .v-list-item, .v-alert, .v-tooltip > .v-overlay__content { border-radius: ${px}px; }
.v-card, .v-expansion-panels, .v-menu > .v-overlay__content, .v-dialog > .v-overlay__content > .v-card { border-radius: ${px * 2}px; }
`
    }

    scope.run(() => {
      watch([primary, surface], applyColors)
      watch(radius, (px) => applyRadius(Number(px) || 0))
    })
  }

  function reset() {
    primary.value = DEFAULTS.primary
    surface.value = DEFAULTS.surface
    radius.value = DEFAULTS.radius
    contentWidth.value = DEFAULTS.contentWidth
    document.getElementById('e-customizer-radius')?.remove()
  }

  return { open, primary, primaryValid, surface, radius, contentWidth, reset }
}
