<script setup lang="ts">
// Right-hand drawer with live theme controls. Every change previews
// instantly; the instructions below show how to make it permanent.
import { computed } from 'vue'
import { RotateCcw, X } from '@lucide/vue'
import EFormField from '@/components/EFormField.vue'
import { derivePrimary, palettes, useCustomizer } from '@/composables/useCustomizer'
import type { PaletteName } from '@/composables/useCustomizer'

const { open, primary, primaryValid, surface, radius, contentWidth, reset } =
  useCustomizer()

const paletteNames = Object.keys(palettes) as PaletteName[]

// VSelect's #item slot passes a ListItem wrapper at runtime but types it
// as the raw value; accept both shapes.
function paletteSwatch(item: unknown): string {
  const name = (
    typeof item === 'object' && item !== null && 'raw' in item
      ? (item as { raw: PaletteName }).raw
      : item
  ) as PaletteName
  return palettes[name][500]
}

const rem = (px: number) => `${px / 16}rem`.replace('.0rem', 'rem')

const primarySnippet = computed(() => {
  if (!primaryValid.value) return ''
  const d = derivePrimary(primary.value)
  return `// src/theme/preset.ts
export const light = { colors: {
  primary: '${d.light.primary}',
  'primary-hover': '${d.light.hover}',
  'on-primary': '${d.light.on}',
} }
export const dark = { colors: {
  primary: '${d.dark.primary}',
  'primary-hover': '${d.dark.hover}',
  'on-primary': '${d.dark.on}',
} }`
})

const surfaceSnippet = computed(() => {
  const p = palettes[surface.value]
  return `// src/theme/preset.ts — swap the neutral scale
// light                      // dark
'surface-muted': '${p[50]}',   //   '${p[800]}'
'surface-elevated': '${p[100]}', //   '${p[800]}'
'surface-accented': '${p[200]}', //   '${p[700]}'
ring: '${p[300]}',             //   '${p[700]}'
'on-surface': '${p[700]}',     //   '${p[200]}'
background/surface: '#ffffff', //   '${p[900]}'
variables: { 'border-color': '${p[200]}' } // '${p[800]}'`
})

const radiusSnippet = computed(() => {
  const px = Number(radius.value) || 0
  return `// src/theme/settings.scss
$border-radius-root: ${rem(px)},
$rounded: ('lg': ${rem(px * 2)}, 'xl': ${rem(px * 3)}),
$card-border-radius: ${rem(px * 2)},
$button-icon-border-radius: ${rem(px)},

/* src/theme/overrides.css — floating surfaces */
border-radius: ${rem(px * 2)}; /* menus, dialogs */`
})

const widthSnippet = computed(
  () => `<!-- src/layouts/default.vue -->
<div class="pa-6 mx-auto"
  style="max-width: ${contentWidth.value === 'compact' ? '1200px' : 'none'}">`,
)
</script>

<template>
  <VNavigationDrawer
    v-model="open"
    location="end"
    temporary
    :scrim="false"
    width="360"
    class="e-customizer"
  >
    <div class="d-flex align-center justify-space-between px-4" style="height: 56px">
      <span class="text-title-small">Customize theme</span>
      <div class="d-flex ga-1">
        <EBtnGhost icon size="small" aria-label="Reset to defaults" @click="reset">
          <VIcon :icon="RotateCcw" size="16" />
        </EBtnGhost>
        <EBtnGhost icon size="small" aria-label="Close" @click="open = false">
          <VIcon :icon="X" size="16" />
        </EBtnGhost>
      </div>
    </div>
    <VDivider />

    <div class="pa-4 d-flex flex-column ga-4">
      <EFormField
        label="Primary color"
        :error="primaryValid ? undefined : 'Enter a 6-digit hex value, e.g. #6366f1.'"
      >
        <VTextField v-model="primary" placeholder="#6366f1" maxlength="7">
          <template #prepend-inner>
            <span
              class="e-customizer__swatch"
              :style="{ background: primaryValid ? primary : 'transparent' }"
            />
          </template>
        </VTextField>
      </EFormField>

      <EFormField label="Surface color" help="Tailwind neutral scales.">
        <VSelect v-model="surface" :items="paletteNames">
          <template #item="{ props: itemProps, item }">
            <VListItem v-bind="itemProps">
              <template #prepend>
                <span
                  class="e-customizer__swatch"
                  :style="{ background: paletteSwatch(item) }"
                />
              </template>
            </VListItem>
          </template>
        </VSelect>
      </EFormField>

      <EFormField label="Border radius" help="Buttons and inputs; cards scale 2x.">
        <VTextField v-model.number="radius" type="number" min="0" max="24" suffix="px" />
      </EFormField>

      <EFormField label="Content width">
        <VRadioGroup v-model="contentWidth">
          <VRadio label="Compact — content capped at 1200px" value="compact" />
          <VRadio label="Wide — content fills the whole area" value="wide" />
        </VRadioGroup>
      </EFormField>

      <VDivider />

      <div>
        <div class="text-title-small mb-2">Make it permanent</div>
        <p class="text-body-small mb-3" style="opacity: 0.7">
          The preview only patches the running theme. Apply the values below
          in the theme source files, then restart the dev server.
        </p>

        <div class="d-flex flex-column ga-3">
          <div v-if="primarySnippet">
            <div class="text-label-medium mb-1">1. Primary color</div>
            <pre class="e-customizer__code">{{ primarySnippet }}</pre>
          </div>
          <div>
            <div class="text-label-medium mb-1">2. Surface scale ({{ surface }})</div>
            <pre class="e-customizer__code">{{ surfaceSnippet }}</pre>
          </div>
          <div>
            <div class="text-label-medium mb-1">3. Border radius</div>
            <pre class="e-customizer__code">{{ radiusSnippet }}</pre>
          </div>
          <div>
            <div class="text-label-medium mb-1">4. Content width</div>
            <pre class="e-customizer__code">{{ widthSnippet }}</pre>
          </div>
        </div>
      </div>
    </div>
  </VNavigationDrawer>
</template>
