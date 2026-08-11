// Single import for consumers: `app.use(createEncolaVuetify())`.
import 'vuetify/styles'
import '@fontsource-variable/inter'
import './overrides.css'

import { createVuetify } from 'vuetify'
import type { VuetifyOptions } from 'vuetify'
import { encolaOptions, light, dark } from './preset'

export { encolaOptions, light, dark }

export function createEncolaVuetify(extra: VuetifyOptions = {}) {
  return createVuetify({ ...encolaOptions, ...extra })
}
