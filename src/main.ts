import { createApp } from 'vue'
import type { ThemeDefinition } from 'vuetify'
import App from './App.vue'
import { router } from './router'
import { createEncolaVuetify } from './encola'

// Extra theme approximating stock Material Vuetify (colors + state
// opacities). Used only by the before/after comparison page, scoped there
// via VThemeProvider — not part of the Encola theme.
const material: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#ffffff',
    'on-background': '#000000',
    surface: '#ffffff',
    'on-surface': '#000000',
    'surface-muted': '#f5f5f5',
    'surface-elevated': '#eeeeee',
    'surface-accented': '#e0e0e0',
    'surface-variant': '#424242',
    'on-surface-variant': '#eeeeee',
    ring: '#9e9e9e',
    primary: '#1976d2',
    'on-primary': '#ffffff',
    'primary-hover': '#1565c0',
    secondary: '#424242',
    'on-secondary': '#ffffff',
    neutral: '#212121',
    'on-neutral': '#ffffff',
    'neutral-hover': '#424242',
    success: '#4caf50',
    'on-success': '#ffffff',
    info: '#2196f3',
    'on-info': '#ffffff',
    warning: '#fb8c00',
    'on-warning': '#ffffff',
    error: '#b00020',
    'on-error': '#ffffff',
    'error-hover': '#9b001c',
  },
  variables: {
    'border-color': '#000000',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 0.87,
    'medium-emphasis-opacity': 0.6,
    'disabled-opacity': 0.38,
    'hover-opacity': 0.04,
    'focus-opacity': 0.12,
    'selected-opacity': 0.08,
    'activated-opacity': 0.12,
    'pressed-opacity': 0.12,
    'idle-opacity': 0.04,
    'dragged-opacity': 0.08,
    'font-body': "Roboto, 'Helvetica Neue', sans-serif",
    'font-heading': "Roboto, 'Helvetica Neue', sans-serif",
  },
}

createApp(App)
  .use(router)
  .use(createEncolaVuetify({ theme: { themes: { material } } }))
  .mount('#app')
