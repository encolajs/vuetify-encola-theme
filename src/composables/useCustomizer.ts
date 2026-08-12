// Theme customizer state + live preview. Mutates the running Vuetify theme
// (colors/variables are reactive) and injects a small unlayered <style> tag
// for the radius, which is compiled statically in settings.scss. The drawer
// shows how to make each change permanent in the theme source files.
import { computed, ref, watch } from 'vue'
import { useTheme } from 'vuetify'

// Tailwind neutral scales (v4 values, converted from oklch)
export const palettes = {
  slate: { 50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cad5e2', 400: '#90a1b9', 500: '#62748e', 600: '#45556c', 700: '#314158', 800: '#1d293d', 900: '#0f172b', 950: '#020618' },
  gray: { 50: '#f9fafb', 100: '#f3f4f6', 200: '#e5e7eb', 300: '#d1d5dc', 400: '#99a1af', 500: '#6a7282', 600: '#4a5565', 700: '#364153', 800: '#1e2939', 900: '#101828', 950: '#030712' },
  zinc: { 50: '#fafafa', 100: '#f4f4f5', 200: '#e4e4e7', 300: '#d4d4d8', 400: '#9f9fa9', 500: '#71717b', 600: '#52525c', 700: '#3f3f46', 800: '#27272a', 900: '#18181b', 950: '#09090b' },
  neutral: { 50: '#fafafa', 100: '#f5f5f5', 200: '#e5e5e5', 300: '#d4d4d4', 400: '#a1a1a1', 500: '#737373', 600: '#525252', 700: '#404040', 800: '#262626', 900: '#171717', 950: '#0a0a0a' },
  stone: { 50: '#fafaf9', 100: '#f5f5f4', 200: '#e7e5e4', 300: '#d6d3d1', 400: '#a6a09b', 500: '#79716b', 600: '#57534d', 700: '#44403b', 800: '#292524', 900: '#1c1917', 950: '#0c0a09' },
  olive: { 50: '#fbfbf9', 100: '#f4f4f0', 200: '#e8e8e3', 300: '#d8d8d0', 400: '#abab9c', 500: '#7c7c67', 600: '#5b5b4b', 700: '#474739', 800: '#2b2b22', 900: '#1d1d16', 950: '#0c0c09' },
  mist: { 50: '#f9fbfb', 100: '#f1f3f3', 200: '#e3e7e8', 300: '#d0d6d8', 400: '#9ca8ab', 500: '#67787c', 600: '#4b585b', 700: '#394447', 800: '#22292b', 900: '#161b1d', 950: '#090b0c' },
} as const

export type PaletteName = keyof typeof palettes

const HEX_RE = /^#[0-9a-f]{6}$/i

// ---- color math ------------------------------------------------
function mix(hex: string, withHex: string, weight: number): string {
  const a = hex.slice(1).match(/../g)!.map((c) => parseInt(c, 16))
  const b = withHex.slice(1).match(/../g)!.map((c) => parseInt(c, 16))
  return (
    '#' +
    a.map((v, i) => Math.round(v + (b[i] - v) * weight).toString(16).padStart(2, '0')).join('')
  )
}

function luminance(hex: string): number {
  const [r, g, b] = hex.slice(1).match(/../g)!.map((c) => {
    const v = parseInt(c, 16) / 255
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

// Derived brand shades: dark mode gets an auto-lightened primary,
// mirroring the indigo-500 (light) / indigo-400 (dark) pairing.
export function derivePrimary(hex: string) {
  return {
    light: {
      primary: hex,
      hover: mix(hex, '#000000', 0.15),
      on: luminance(hex) > 0.55 ? mix(hex, '#000000', 0.85) : '#ffffff',
    },
    dark: {
      primary: mix(hex, '#ffffff', 0.25),
      hover: mix(hex, '#ffffff', 0.1),
      on: mix(hex, '#000000', 0.75),
    },
  }
}

// ---- shared state ----------------------------------------------
const DEFAULTS = {
  primary: '#6366f1',
  surface: 'slate' as PaletteName,
  radius: 4,
  contentWidth: 'compact' as 'compact' | 'wide',
}

const open = ref(false)
const primary = ref(DEFAULTS.primary)
const surface = ref<PaletteName>(DEFAULTS.surface)
const radius = ref(DEFAULTS.radius)
const contentWidth = ref<typeof DEFAULTS.contentWidth>(DEFAULTS.contentWidth)

let initialized = false

export function useCustomizer() {
  const theme = useTheme()

  const primaryValid = computed(() => HEX_RE.test(primary.value))

  if (!initialized) {
    initialized = true

    function applyPrimary(hex: string) {
      if (!HEX_RE.test(hex)) return
      const d = derivePrimary(hex)
      for (const t of Object.values(theme.themes.value)) {
        const shades = t.dark ? d.dark : d.light
        t.colors.primary = shades.primary
        t.colors['primary-hover'] = shades.hover
        t.colors['on-primary'] = shades.on
      }
    }

    function applySurface(name: PaletteName) {
      const p = palettes[name]
      for (const t of Object.values(theme.themes.value)) {
        if (t.dark) {
          Object.assign(t.colors, {
            background: p[900],
            'on-background': p[200],
            surface: p[900],
            'on-surface': p[200],
            'surface-muted': p[800],
            'surface-elevated': p[800],
            'surface-accented': p[700],
            'surface-variant': p[800],
            'on-surface-variant': p[300],
            ring: p[700],
            secondary: p[400],
            'on-secondary': p[900],
            neutral: '#ffffff',
            'on-neutral': p[900],
            'neutral-hover': p[200],
          })
          t.variables['border-color'] = p[800]
        } else {
          Object.assign(t.colors, {
            background: '#ffffff',
            'on-background': p[700],
            surface: '#ffffff',
            'on-surface': p[700],
            'surface-muted': p[50],
            'surface-elevated': p[100],
            'surface-accented': p[200],
            'surface-variant': p[100],
            'on-surface-variant': p[600],
            ring: p[300],
            secondary: p[500],
            'on-secondary': '#ffffff',
            neutral: p[900],
            'on-neutral': '#ffffff',
            'neutral-hover': p[800],
          })
          t.variables['border-color'] = p[200]
        }
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

    watch(primary, applyPrimary)
    watch(surface, applySurface)
    watch(radius, (px) => applyRadius(Number(px) || 0))
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
