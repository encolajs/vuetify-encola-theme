// =============================================================
// Layers 2–3 — the Encola blueprint: defaults + themes, generated
// from a primary color and a Tailwind neutral scale.
// Consumers pass the result as `blueprint` to their own createVuetify
// call; anything they set there wins over the blueprint (Vuetify does
// mergeDeep(blueprint, options)).
// =============================================================
import type { ThemeDefinition, VuetifyOptions } from 'vuetify'
import { derivePrimary, palettes } from './palettes'
import type { PaletteName } from './palettes'
import { aliases as iconAliases, lucide } from './icons'

export interface EncolaColorOptions {
  /** brand color as a 6-digit hex; dark mode gets an auto-lightened variant */
  primary?: string
  /** Tailwind neutral scale for surfaces, borders and text */
  surface?: PaletteName
}

const fontBody =
  "'Inter Variable', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"

// Opacities shared by both themes. Material's overlay system stays in
// place but is tamed to Tailwind-like subtlety; focus overlays are dead
// (focus is a ring, drawn in overrides.css).
const stateVariables = {
  'border-opacity': 1,
  'hover-opacity': 0.04,
  'focus-opacity': 0,
  'selected-opacity': 0.06,
  'activated-opacity': 0.06,
  'pressed-opacity': 0.08,
  'dragged-opacity': 0.08,
  'idle-opacity': 0.04,
  'disabled-opacity': 0.38,
  'high-emphasis-opacity': 1,
  'medium-emphasis-opacity': 0.62,
  'font-body': fontBody,
  'font-heading': fontBody,
}

export function buildThemes({
  primary = '#6366f1', // indigo-500 — oklch(0.585 0.233 277.12)
  surface = 'slate',
}: EncolaColorOptions = {}): { light: ThemeDefinition; dark: ThemeDefinition } {
  const p = palettes[surface]
  const d = derivePrimary(primary)

  const light: ThemeDefinition = {
    dark: false,
    colors: {
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

      primary: d.light.primary,
      'on-primary': d.light.on,
      'primary-hover': d.light.hover,
      secondary: p[500],
      'on-secondary': '#ffffff',
      neutral: p[900], // "inverted" solid buttons
      'on-neutral': '#ffffff',
      'neutral-hover': p[800],

      success: '#22c55e', // green-500
      'on-success': '#ffffff',
      info: '#3b82f6', // blue-500
      'on-info': '#ffffff',
      warning: '#f59e0b', // amber-500
      'on-warning': '#ffffff',
      error: '#ef4444', // red-500
      'on-error': '#ffffff',
      'error-hover': '#dc2626',
    },
    variables: {
      ...stateVariables,
      'border-color': p[200],
    },
  }

  const dark: ThemeDefinition = {
    dark: true,
    colors: {
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

      primary: d.dark.primary,
      'on-primary': d.dark.on,
      'primary-hover': d.dark.hover,
      secondary: p[400],
      'on-secondary': p[900],
      neutral: '#ffffff',
      'on-neutral': p[900],
      'neutral-hover': p[200],

      success: '#4ade80', // green-400
      'on-success': '#052e16',
      info: '#60a5fa', // blue-400
      'on-info': '#172554',
      warning: '#fbbf24', // amber-400
      'on-warning': '#451a03',
      error: '#f87171', // red-400
      'on-error': '#450a0a',
      'error-hover': '#ef4444',
    },
    variables: {
      ...stateVariables,
      'border-color': p[800],
    },
  }

  return { light, dark }
}

export function encolaOptions(colors: EncolaColorOptions = {}): VuetifyOptions {
  return {
    defaults: {
      global: {
        ripple: false,
      },
      // flat is the "solid" look; pages pass color/variant directly:
      // solid = flat + color, soft = tonal, ghost = text, link = plain
      VBtn: { variant: 'flat' },

      VCard: { flat: true },
      VToolbar: { flat: true },
      VAppBar: { flat: true },

      VTextField: { variant: 'outlined', hideDetails: 'auto' },
      VTextarea: { variant: 'outlined', hideDetails: 'auto' },
      VSelect: { variant: 'outlined', hideDetails: 'auto' },
      VCombobox: { variant: 'outlined', hideDetails: 'auto' },
      VAutocomplete: { variant: 'outlined', hideDetails: 'auto' },
      VFileInput: { variant: 'outlined', hideDetails: 'auto' },
      VNumberInput: { variant: 'outlined', hideDetails: 'auto' },
      VDateInput: {
        variant: 'outlined',
        hideDetails: 'auto',
        prependIcon: '',
        prependInnerIcon: '$calendar',
      },
      VColorInput: { variant: 'outlined', hideDetails: 'auto' },
      VOtpInput: { variant: 'outlined' },

      VCheckbox: { color: 'primary', hideDetails: 'auto' },
      VCheckboxBtn: { color: 'primary' },
      VRadioGroup: { color: 'primary', hideDetails: 'auto' },
      VSwitch: { color: 'primary', inset: true, hideDetails: 'auto' },
      VSlider: { color: 'primary', hideDetails: 'auto', thumbSize: 16, trackSize: 4 },
      VRangeSlider: { color: 'primary', hideDetails: 'auto', thumbSize: 16, trackSize: 4 },

      VAlert: { variant: 'tonal', density: 'comfortable' },
      VChip: { label: true, size: 'small' },
      VBadge: { color: 'primary' },
      VTabs: { color: 'primary', density: 'comfortable' },
      VList: { density: 'compact' },
      // stickToTarget keeps menus left-aligned with their activator even
      // near the viewport edge (e.g. in the sidebar), where the default
      // 12px viewportMargin clamp would nudge them inward.
      VMenu: { offset: 6, stickToTarget: true },
      VTooltip: { location: 'top' },
      VExpansionPanel: { elevation: 0 },

      VProgressLinear: { color: 'primary', rounded: true, height: 4 },
      VProgressCircular: { color: 'primary', size: 24, width: 3 },
    },
    theme: {
      defaultTheme: 'light',
      variations: false,
      themes: buildThemes(colors),
    },
    icons: {
      defaultSet: 'lucide',
      aliases: iconAliases,
      sets: { lucide },
    },
  }
}
