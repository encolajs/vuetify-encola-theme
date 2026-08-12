// Single import for consumers.
//
// The theme is a Vuetify blueprint — drop it into your own plugin file
// and your options win over the theme's:
//
//   import { createVuetify } from 'vuetify'
//   import { encola } from '@/theme'
//
//   export default createVuetify({
//     blueprint: encola({ primary: '#e11d48', surface: 'zinc' }),
//     defaults: { /* your tweaks */ },
//   })
//
// Or use the shortcut when you have no options of your own:
//
//   app.use(createEncolaVuetify())
import 'vuetify/styles'
import '@fontsource-variable/inter'
import './overrides.css'

import { createVuetify } from 'vuetify'
import type { VuetifyOptions } from 'vuetify'
import { buildThemes, encolaOptions } from './preset'
import type { EncolaColorOptions } from './preset'

export { buildThemes }
export type { EncolaColorOptions }
export { palettes, derivePrimary } from './palettes'
export type { PaletteName } from './palettes'
export { useContentWidth } from './useContentWidth'
export type { ContentWidth } from './useContentWidth'

/** The Encola theme as a Vuetify blueprint. */
export function encola(colors: EncolaColorOptions = {}): VuetifyOptions {
  return encolaOptions(colors)
}

/** Shortcut: a ready-to-use Vuetify instance on the Encola blueprint. */
export function createEncolaVuetify(extra: VuetifyOptions = {}) {
  return createVuetify({ blueprint: encola(), ...extra })
}
