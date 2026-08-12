# vuetify-encola-theme — Plan

## What this is

A **downloadable Vuetify theme/template** (distributed as a zip/repo, like the themes on store.vuetifyjs.com — Materio, Spike, etc.) that makes Vuetify look like Nuxt UI instead of Material Design: flat, compact, hairline borders, slate neutrals, no shadows, no ripple, static labels. The download is a complete Vite + Vue 3 + Vuetify 4 starter project containing the theme core **plus a full set of example pages** (auth, forms, dashboard, tables, etc.) that buyers copy from.

Why: "Material lock-in" is the most recurring Vuetify complaint (8+ years of HN threads, GitHub issues like vuetifyjs/vuetify#2290, every "is Vuetify right for you" article). The niche is empty — no npm package or store theme departs from Material — while the official store proves $59–69 pricing for Vuetify themes.

## Feasibility (research summary, verified against vuetify@4.1.8 source)

**~85% of the Nuxt UI look is achievable without forking Vuetify components**, via four stacked layers:

1. **SASS configuration** (`@use 'vuetify/settings' with (...)` via vite-plugin-vuetify `styles.configFile`):
   - `$border-radius-root` + `$rounded` map → ~6px radii
   - `$typography` map → remove Material letter-spacing, smaller sizes
   - `$shadow-key` / `$shadow-ambient` elevation maps → flatten/replace
   - Per-component vars (90 files): `$button-height` 36→32px, `$field-control-height` 56→36px, `$field-border-radius`, `$field-border-width`, `$button-text-transform`, etc.
2. **`defaults` config**: `global: { ripple: false, elevation: 0 }`, `VTextField: { variant: 'outlined' }`, `VBtn: { variant: 'flat' }`, density; **`aliases`** to build a Nuxt-UI-like taxonomy (solid/soft/ghost buttons as aliased components with class defaults).
3. **Runtime theme**: colors (`--v-theme-*`), custom variables incl. `--v-font-body` (fonts are runtime-switchable in v4), zeroed Material hover/focus opacities.
4. **Unlayered override CSS**: Vuetify 4 puts all its CSS in cascade layers, so plain unlayered CSS wins with **zero specificity fights** (no `!important`). Used for focus rings, hover background swaps, ring-instead-of-shadow cards.

Icons: Vuetify 4 ships a **lucide** iconset (Nuxt UI's icon set) — direct swap.

**The irreducible ~15% (handled by convention + small wrappers):**
- Floating labels are structural in `VField` → convention: never pass `label`; use `placeholder` + a shipped `EFormField` wrapper (static label/help/error above the field, Nuxt UI style).
- Variant taxonomy is fixed (`flat/tonal/outlined/text/plain`) → aliases approximate `solid/soft/subtle/ghost`.
- Hover/press overlay tints and the VBtn focus ring need per-component override CSS.
- APIs stay Vuetify-shaped (`elevation`, `density` props exist even when flattened) — fine for a template product.

**Strategic timing note:** Vuetify's own de-materialization play is Vuetify0 (headless, v1.0 July 2026) + future "Vuetify Paper" design systems. That targets *future* apps; the ~700k-weekly-download Vuetify 3/4 installed base is the window for this product. Don't use "Nuxt UI" in the product name/marketing in a way implying affiliation — position as "flat / Tailwind-style theme for Vuetify".

## Design language target values (from Nuxt UI v4)

- **Colors**: primary green-500 (green-400 in dark), neutral slate; surface steps bg/muted/elevated/accented (white/50/100/200 light, 900/800/800/700 dark); body text neutral-700 light / neutral-200 dark (never pure black).
- **Radii**: base 0.25rem; buttons/inputs ~6px (`rounded-md`), cards ~8px (`rounded-lg`). No pills.
- **Depth**: no box-shadows; cards use a 1px inset ring (neutral-200 light / neutral-800 dark) + background steps.
- **Type**: Inter (or system sans), buttons text-sm `font-medium` (never bold/uppercase), inputs text-base, zero letter-spacing.
- **Density**: compact — buttons ~32px, inputs ~36px, card padding 16–24px.
- **Focus**: `focus-visible` only; primary-colored ring + 3px translucent primary outline. No underline focus, no overlay.
- **States**: hover = opacity/background-token shifts, `transition-colors` only. No ripple, no bounce.
- **Forms**: static external labels above fields, outlined-style inputs with hairline rings.

## Deliverable structure

```
vuetify-encola-theme/
├── CLAUDE.md
├── PLAN.md
├── package.json               # Vite + Vue 3 + Vuetify 4 + vue-router
├── vite.config.ts             # vite-plugin-vuetify with styles.configFile
├── src/
│   ├── theme/
│   │   ├── settings.scss      # SASS overrides (layer 1)
│   │   ├── preset.ts          # createVuetify options: defaults, aliases, theme, lucide icons (layers 2–3)
│   │   ├── overrides.css      # unlayered CSS: focus rings, hovers, card rings (layer 4)
│   │   └── index.ts           # single import for consumers
│   ├── components/
│   │   ├── EFormField.vue     # static label/help/error wrapper (replaces floating labels)
│   │   └── ...                # other small wrappers only where structurally required
│   ├── layouts/               # default (sidebar app shell), blank (auth/error pages)
│   ├── pages/                 # example pages (see below)
│   └── main.ts
└── docs/                      # usage guide: install, conventions, customizing colors
```

## Example pages (the actual product surface)

Match what store themes ship. Each page is a copy-paste-ready recipe built ONLY with the themed Vuetify components + conventions:

- **Auth**: login, register, forgot password, two-factor / verify code (blank layout, centered card)
- **Dashboard**: stat tiles, chart placeholders, recent-activity table, quick actions
- **Forms**: form layouts (stacked, two-column), all input types showcase, validation states, multi-step wizard
- **Tables**: VDataTable with toolbar/search/filters/pagination, row actions, empty state
- **Users/CRUD**: list + detail/edit drawer or dialog
- **Account/Settings**: profile, password, notifications tabs
- **Misc**: pricing page, FAQ/accordion, empty states, 404 / 500 error pages
- **Component kitchen sink**: every themed component in light + dark — this is also the QA page

## Phases

### Phase 1 — Theme core (proof of concept)
Scaffold the Vite project; build `settings.scss`, `preset.ts`, `overrides.css`, `EFormField.vue`; kitchen-sink page. Verify side-by-side against ui.nuxt.com demos in light and dark. **Go/no-go checkpoint on visual fidelity.** (~2–4 focused days.)

### Phase 2 — Example pages
Layouts (app shell with Nuxt-UI-style sidebar/topbar, blank layout), then pages in the order above — auth and forms first (highest scrutiny for the "not Material" claim), dashboard/tables next (long tail: VDataTable/VDatePicker internals need individual CSS attention).

### Phase 3 — Packaging & distribution
Docs (install, conventions, changing primary/neutral colors), demo deployment, zip packaging, license text. **Decided:** paid only, $49 / lifetime updates / per non-SaaS End Product; SaaS End Products $399.

Total estimate: 3–6 weeks to a sellable v1.

## Verification

- `npm run dev` → kitchen-sink page compared side-by-side with Nuxt UI's live component demos, light AND dark.
- Keyboard-tab through every form page — focus states are where Material leaks through most.
- Grep check: no `label` prop on field components, no `!important` in project CSS, no elevation/ripple usage in pages.
- Build (`npm run build`) and confirm bundle drops from disabling `$utilities`/`$color-pack` if Tailwind utilities are bundled alongside.
