# Conventions

Encola restyles Vuetify through configuration, so a few Material behaviors
survive as *conventions* rather than hard removals. Follow these and
nothing Material leaks through.

## Fields: static labels via EFormField

Vuetify's `label` prop renders a **floating label** — it's structural
Material and cannot be styled into a static label. Wrap fields instead:

```vue
<EFormField label="Email" required help="We'll never share it." :error="errors.email">
  <VTextField v-model="email" placeholder="you@example.com" />
</EFormField>
```

- `label`, `help`, `error` (string or array — first entry shown),
  `required` (asterisk), `for` (optional; otherwise clicking the label
  focuses the first control in the slot).
- An error tints the field's ring red automatically.
- Horizontal layout: `<EFormField horizontal label-width="10rem" …>` puts
  the label in a fixed-width left column (default 25%); label-less rows
  stay aligned in the field column. `--e-form-field-label-width` can also
  be set once on a form container.

**The `label` prop still works** if you want Material behavior: labeled
fields automatically get taller (3rem) geometry so the float has room.
It's supported, but off-theme — prefer `EFormField`.

## Buttons

Plain `VBtn` with props — no custom components to learn:

| Look | Usage |
| --- | --- |
| solid | `<VBtn color="primary">` (flat is the default variant) |
| soft | `<VBtn variant="tonal" color="primary">` |
| outline | `<VBtn variant="outlined">` |
| ghost | `<VBtn variant="text">` |
| link | `<VBtn variant="plain" color="primary">` |

Never use `variant="elevated"` — it's the one Material variant with no
place in this theme.

## Never re-enable Material

- No `elevation` props, no shadow utility classes — depth comes from 1px
  rings and surface background steps (`surface-muted` / `surface-elevated`
  / `surface-accented`).
- No `ripple` — the preset disables it globally.
- No `!important` in any CSS. Vuetify's CSS lives in `@layer`; the theme's
  `overrides.css` is unlayered and wins by cascade-layer rules. If an
  override doesn't stick, it accidentally ended up inside a layer — fix
  that instead.

## Dimensions are rem

All theme CSS/SCSS uses rem (16px root). Vuetify SASS variables that go
through px arithmetic (density modifiers, size scales) stay px in
`settings.scss` with a comment, and their runtime CSS variables are
re-emitted in rem in `overrides.css` (`--v-btn-height`,
`--v-input-control-height`, the switch and selection-control sizes, list
item heights).

## Icons

The theme ships a lucide iconset built on `@lucide/vue` SVG components —
tree-shakeable, no icon font. Pass components directly:

```vue
<script setup>
import { Search } from '@lucide/vue'
</script>

<template>
  <VBtn :prepend-icon="Search">Search</VBtn>
</template>
```

Vuetify's internal icons (`$close`, `$expand`, sort arrows, …) are aliased
to lucide equivalents automatically.

## Verification workflow

After any theme-layer change, open the kitchen-sink page in light **and**
dark and tab through forms with the keyboard — focus states are where
Material leaks through most. Before release:

```bash
grep -rn 'elevation\|ripple' src/pages/     # should be empty
grep -rn '!important' src/                  # should be empty
grep -rn 'label=' src/pages/                # only the Material demo on the forms page
```
