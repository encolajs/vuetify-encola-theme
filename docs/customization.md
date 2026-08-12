# Customization

The theme customizer (sliders icon in the top bar) previews every option
below live and prints paste-ready snippets.

## Colors — the blueprint

Both themes are generated from two inputs:

```ts
createVuetify({
  blueprint: encola({
    primary: '#e11d48',  // any 6-digit hex
    surface: 'zinc',     // slate | gray | zinc | neutral | stone | olive | mist
  }),
})
```

- **primary** — the hex is used as-is in light mode; dark mode gets an
  auto-lightened variant, hover shades are derived (darken 15% light /
  lighten 10% dark), and `on-primary` flips to dark text for very light
  brand colors.
- **surface** — one of the 7 Tailwind neutral scales (values in
  `src/encola/palettes.ts`). It drives backgrounds, the muted/elevated/
  accented surface steps, borders, rings, body text, `secondary` and the
  inverted `neutral` button color, in both themes.

Anything finer-grained: pass your own `theme` to `createVuetify` — it
deep-merges over the generated themes — or call `buildThemes()` yourself
and adjust the result.

### Semantic colors

`success`, `info`, `warning`, `error` are fixed (green/blue/amber/red 500
in light, 400 in dark) and independent of the primary. Override them via
your own `theme` option if needed.

## Border radius

Radius is compiled SASS — edit `src/encola/settings.scss`:

```scss
$border-radius-root: 0.25rem,            // buttons, inputs, chips, lists
$rounded: ('lg': 0.5rem, 'xl': 0.75rem), // cards use lg
$card-border-radius: 0.5rem,
$button-icon-border-radius: 0.25rem,
```

Floating surfaces (menus, dialogs) have their radius in `overrides.css` —
keep it at 2x the root.

## Typography

- Font: the stack lives in the theme variables (`--v-font-body`,
  `--v-font-heading`) set in `preset.ts` — runtime-switchable. The Inter
  variable font is bundled via `@fontsource-variable/inter`.
- Scale: the `$typography` map in `settings.scss` (Material 3 keys;
  letter-spacing zeroed everywhere).
- Default text size is 0.875rem (14px), set on `body` in `overrides.css`.

## Content width

```ts
import { useContentWidth } from '@/encola'

const { contentWidth } = useContentWidth() // 'compact' | 'wide'
```

The default layout binds the resulting class; `compact` caps content at
1200px (pages can narrow further with `e-page-narrow` / `e-page-narrow--sm`),
`wide` lifts every cap.

## Component defaults

Add your own `defaults` to `createVuetify` — they win over the blueprint:

```ts
createVuetify({
  blueprint: encola(),
  defaults: {
    VBtn: { rounded: 'pill' },       // your call…
    VTextField: { density: 'comfortable' },
  },
})
```

## Dark mode

Both themes ship generated and in sync. Toggle with Vuetify's standard API
(`useTheme().global.name.value = 'dark'`); the starter's layout persists
the choice to localStorage.
