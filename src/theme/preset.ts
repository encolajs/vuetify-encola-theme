// =============================================================
// Layers 2–3 — createVuetify options: defaults, aliases, themes.
// Colors follow the Tailwind slate/indigo scales (flat, no Material).
// =============================================================
import type { VuetifyOptions } from 'vuetify'
import type { ThemeDefinition } from 'vuetify'
import { VBtn } from 'vuetify/components/VBtn'
import { aliases as iconAliases, lucide } from './icons'

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

export const light: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#ffffff',
    'on-background': '#334155', // slate-700 — never pure black
    surface: '#ffffff',
    'on-surface': '#334155',
    'surface-muted': '#f8fafc', // slate-50
    'surface-elevated': '#f1f5f9', // slate-100
    'surface-accented': '#e2e8f0', // slate-200
    'surface-variant': '#f1f5f9',
    'on-surface-variant': '#475569', // slate-600
    ring: '#cbd5e1', // slate-300 — input/outline hairlines

    primary: '#6366f1', // indigo-500 — oklch(0.585 0.233 277.12)
    'on-primary': '#ffffff',
    'primary-hover': '#4f46e5', // indigo-600
    secondary: '#64748b', // slate-500
    'on-secondary': '#ffffff',
    neutral: '#0f172a', // slate-900 — "inverted" solid buttons
    'on-neutral': '#ffffff',
    'neutral-hover': '#1e293b',

    success: '#22c55e',
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
    'border-color': '#e2e8f0', // slate-200 hairlines
  },
}

export const dark: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#0f172a', // slate-900
    'on-background': '#e2e8f0', // slate-200
    surface: '#0f172a',
    'on-surface': '#e2e8f0',
    'surface-muted': '#1e293b', // slate-800
    'surface-elevated': '#1e293b',
    'surface-accented': '#334155', // slate-700
    'surface-variant': '#1e293b',
    'on-surface-variant': '#cbd5e1',
    ring: '#334155',

    primary: '#818cf8', // indigo-400
    'on-primary': '#1e1b4b', // indigo-950
    'primary-hover': '#6366f1',
    secondary: '#94a3b8', // slate-400
    'on-secondary': '#0f172a',
    neutral: '#ffffff',
    'on-neutral': '#0f172a',
    'neutral-hover': '#e2e8f0',

    success: '#4ade80',
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
    'border-color': '#1e293b', // slate-800 hairlines
  },
}

export const encolaOptions: VuetifyOptions = {
  // Nuxt-UI-like button taxonomy. Pages use these, never raw variants.
  aliases: {
    EBtn: VBtn, // solid
    EBtnSoft: VBtn, // translucent tint of its color
    EBtnOutline: VBtn, // hairline ring, neutral text
    EBtnGhost: VBtn, // borderless, hover tint
    EBtnLink: VBtn, // looks like a link
  },
  defaults: {
    global: {
      ripple: false,
    },
    VBtn: { variant: 'flat' },
    EBtn: { variant: 'flat', color: 'primary' },
    EBtnSoft: { variant: 'tonal', color: 'primary' },
    EBtnOutline: { variant: 'outlined' },
    EBtnGhost: { variant: 'text' },
    EBtnLink: { variant: 'plain', color: 'primary' },

    VCard: { flat: true },
    VToolbar: { flat: true },
    VAppBar: { flat: true },

    VTextField: { variant: 'outlined', hideDetails: 'auto' },
    VTextarea: { variant: 'outlined', hideDetails: 'auto' },
    VSelect: { variant: 'outlined', hideDetails: 'auto' },
    VCombobox: { variant: 'outlined', hideDetails: 'auto' },
    VAutocomplete: { variant: 'outlined', hideDetails: 'auto' },
    VFileInput: { variant: 'outlined', hideDetails: 'auto' },

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
    VMenu: { offset: 6 },
    VTooltip: { location: 'top' },
    VExpansionPanel: { elevation: 0 },

    VProgressLinear: { color: 'primary', rounded: true, height: 4 },
    VProgressCircular: { color: 'primary', size: 24, width: 3 },
  },
  theme: {
    defaultTheme: 'light',
    variations: false,
    themes: { light, dark },
  },
  icons: {
    defaultSet: 'lucide',
    aliases: iconAliases,
    sets: { lucide },
  },
}
