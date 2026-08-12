# Installation

Encola supports two installation paths: starting from this starter, or
dropping the theme into an existing Vuetify (or soon-to-be-Vuetify) app.

## Path A — use the starter

```bash
pnpm install
pnpm run dev     # dev server with example pages
pnpm run build   # production build
pnpm run lint
```

Delete the example pages you don't need (`src/pages/`, routes in
`src/router/index.ts`, entries in `src/encola/components/AppSidebar.vue`).
The theme itself lives entirely in `src/encola/` — leave that folder alone
so future theme updates are a wholesale folder replacement.

## Path B — existing app

### 1. Dependencies

```bash
pnpm add vuetify @lucide/vue @fontsource-variable/inter
pnpm add -D vite-plugin-vuetify sass-embedded
```

Versions this theme is developed against: `vuetify ^4.1`, `vue ^3.5`,
`vite ^7+`.

### 2. Copy the theme folder

Copy `src/encola/` into your `src/`. All internal imports are relative, so
it works with or without the `@` alias.

### 3. Vite config

vite-plugin-vuetify must compile Vuetify's SASS through the theme's
settings file — this is what applies the radius scale, typography and
component dimensions:

```ts
// vite.config.ts
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
  plugins: [
    vue(),
    vuetify({ styles: { configFile: 'src/encola/settings.scss' } }),
  ],
})
```

### 4. Create Vuetify with the blueprint

```ts
// plugins/vuetify.ts (or wherever you call createVuetify)
import { createVuetify } from 'vuetify'
import { encola } from '@/encola'

export default createVuetify({
  blueprint: encola({
    primary: '#6366f1',   // any 6-digit hex
    surface: 'slate',     // slate | gray | zinc | neutral | stone | olive | mist
  }),
  // your own defaults/theme/icons here — deep-merged on top, they win
})
```

Vuetify merges your options **over** the blueprint
(`mergeDeep(blueprint, options)`), so overriding any default is safe.

If you have no options of your own, `createEncolaVuetify()` is a shortcut
for the call above.

> Importing anything from `@/encola` has side effects on purpose: it loads
> `vuetify/styles`, the Inter variable font and the theme's `overrides.css`.

### 5. Optional pieces

Everything below is opt-in — unused files tree-shake to nothing:

- `EFormField` (`@/encola/components/EFormField.vue`) — static labels;
  effectively required for forms, see [conventions](conventions.md).
- `AppSidebar` + `useSidebar` — collapsible app-shell sidebar.
- `ThemeCustomizer` + `useCustomizer` — live theme preview drawer.
- `useContentWidth` — compact/wide main-content switch (pairs with the
  `.e-content--*` / `.e-page-narrow` classes in `overrides.css`).

## Upgrading the theme

Your code should never live inside `src/encola/`. To upgrade, replace the
folder with the new version and re-run your visual QA (the kitchen-sink
page, if you kept it).
