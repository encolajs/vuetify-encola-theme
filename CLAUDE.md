# vuetify-encola-theme

A **downloadable Vuetify theme/template** that makes Vuetify 4 look like Nuxt UI instead of Material Design. Sold/distributed as a complete starter project (like themes on store.vuetifyjs.com): theme core + example pages (auth, dashboard, forms, tables, settings, errors, etc.). See `PLAN.md` for the full research findings and roadmap.

## Tech stack

- Vue 3 + Vite + TypeScript
- Vuetify 4 (NOT forked — restyled via config only)
- vite-plugin-vuetify with `styles: { configFile: 'src/theme/settings.scss' }`
- lucide icons (Vuetify's built-in `lucide` iconset)
- vue-router for example pages
- pnpm for faster development & builds

## Architecture — the four theming layers

All restyling flows through exactly four places. Never restyle anywhere else.

1. `src/theme/settings.scss` — SASS variable overrides (`@use 'vuetify/settings' with (...)`): radius scale, typography map, elevation/shadow maps, component dimensions (`$button-height`, `$field-control-height`, ...).
2. `src/theme/preset.ts` — `createVuetify` options: `defaults` (ripple off, flat variants, density), `aliases` (solid/soft/ghost button taxonomy), `theme` (colors + custom `--v-*` variables incl. fonts), `icons` (lucide).
3. `src/theme/overrides.css` — **unlayered** CSS for what SASS/defaults can't reach: focus rings, hover background swaps, card ring-instead-of-shadow. Vuetify 4 puts all its CSS in `@layer`, so unlayered CSS always wins — `!important` is never needed and never allowed.
4. `src/components/E*.vue` — minimal wrapper components, only where Vuetify's DOM is structurally Material (currently `EFormField.vue` for static labels).

## Design language (target: Nuxt UI v4 look)

- Flat and compact. **No box-shadows** — 1px neutral rings + surface background steps convey depth.
- Primary: green-500 (green-400 in dark). Neutrals: slate. Body text neutral-700/200, never pure black.
- Radii: buttons/inputs ~6px, cards ~8px. Buttons ~32px, inputs ~36px tall.
- Type: text-sm `font-medium` buttons, no uppercase, zero letter-spacing.
- Focus: `focus-visible` only — primary ring + translucent primary outline. Hover: color/opacity shifts with `transition-colors`.
- Dark mode is first-class: every page/component must be checked in both themes.

## Hard conventions (Material leaks if violated)

- **Never pass `label` to field components** (VTextField, VSelect, ...). The floating-label animation is structural and cannot be styled away. Always wrap fields in `EFormField` (static label/help/error above the field) and use `placeholder` on the input.
- **Never use `elevation`, `ripple`, or shadow utility classes** in example pages. The preset disables them globally; don't re-enable locally.
- **No `!important`** in any CSS. If an override doesn't stick, the CSS is incorrectly inside a layer — fix that instead.
- Buttons use the aliased taxonomy from `preset.ts` (solid/soft/ghost equivalents), not raw Material variants like `tonal`/`elevated`.
- Example pages must use only themed Vuetify components + the `E*` wrappers — no one-off page-scoped styling hacks, since buyers copy pages verbatim. If a page needs a style fix, fix it in the four theme layers so every page benefits.

## Example pages

Live in `src/pages/`, using `src/layouts/default.vue` (app shell) or `src/layouts/blank.vue` (auth/errors). Planned set: auth (login/register/forgot/2FA), dashboard, form layouts + wizard, data tables, users CRUD, account settings, pricing, FAQ, 404/500, and a component kitchen-sink page (`src/pages/kitchen-sink.vue`) — the kitchen sink doubles as the visual QA surface.

## Commands

- `pnpm run dev` — dev server with example pages
- `pnpm run build` — production build
- `pnpm run lint` — lint

## Verification workflow

After any theme-layer change: open the kitchen-sink page in light AND dark and compare against Nuxt UI's live demos (ui.nuxt.com). Tab through forms with the keyboard — focus states are where Material leaks through most. Before release: grep pages for `label=`, `elevation`, `ripple`, `!important` (all should be absent).

## Implementation flow

Work in small, incremental changes and commit after each one. For example if you add presentation pages create one commit for each page with message like "Invoices datatable page". If you found multiple issues, fix one and commit, fix another and commit and so on.

## Positioning note

Do not use "Nuxt UI" in the package name or marketing in a way implying affiliation — describe the aesthetic ("flat, Tailwind-style theme for Vuetify"), not the brand.
