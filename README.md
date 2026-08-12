# Encola — a flat, Tailwind-style theme for Vuetify

Encola makes Vuetify 4 look like a modern flat UI kit instead of Material
Design: hairline borders, slate neutrals, compact 32px controls, static
labels, no shadows, no ripple — while staying 100% standard Vuetify.
Nothing is forked; everything is configuration.

- **Every Vuetify component themed** — verified in light and dark on the
  built-in showcase pages.
- **Drop-in** — the entire theme lives in one folder (`src/encola/`) with
  relative internal imports. Copy it into an existing app or start from
  this starter.
- **Your options win** — the theme is a [Vuetify blueprint](https://vuetifyjs.com/en/features/blueprints/);
  everything you pass to `createVuetify` deep-merges on top of it.
- **Customizable at a glance** — pick a primary color and one of 7 Tailwind
  neutral scales; preview live with the built-in theme customizer.

## Quick start (this starter)

```bash
pnpm install
pnpm run dev
```

## Install into an existing app

1. Install the dependencies:

   ```bash
   pnpm add vuetify @lucide/vue @fontsource-variable/inter
   pnpm add -D vite-plugin-vuetify sass-embedded
   ```

2. Copy `src/encola/` into your `src/`.

3. Point vite-plugin-vuetify at the theme's SASS settings in `vite.config.ts`:

   ```ts
   import vuetify from 'vite-plugin-vuetify'

   export default defineConfig({
     plugins: [
       vue(),
       vuetify({ styles: { configFile: 'src/encola/settings.scss' } }),
     ],
   })
   ```

4. Use the blueprint where you create Vuetify:

   ```ts
   import { createVuetify } from 'vuetify'
   import { encola } from '@/encola'

   export default createVuetify({
     blueprint: encola({ primary: '#6366f1', surface: 'slate' }),
     // your own options here — they win over the blueprint
   })
   ```

   Importing from `@/encola` also pulls in Vuetify's base styles, the Inter
   font and the theme's override CSS.

That's it. Your existing Vuetify components pick up the new look. The one
convention to adopt: wrap fields in `EFormField` instead of passing `label`
(see [docs/conventions.md](docs/conventions.md)).

## What's included

- `src/encola/` — the theme: SASS settings, blueprint (defaults + generated
  themes), unlayered override CSS, lucide iconset, `EFormField`, app-shell
  components (collapsible sidebar, theme customizer) and composables.
- Example pages — auth (login, register, forgot password, 2FA), dashboard,
  form layouts + wizard, data tables, users CRUD, settings, pricing, FAQ,
  404/500, and four UI showcase pages covering every component.

## Documentation

- [Installation](docs/installation.md)
- [Conventions](docs/conventions.md)
- [Customization](docs/customization.md)

## Positioning

Encola is an independent theme for Vuetify. It is not affiliated with
Vuetify, Google Material Design, Tailwind Labs or Nuxt.
