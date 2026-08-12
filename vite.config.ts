import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    // dev-only: floating Vue DevTools panel in the browser (no extension needed)
    vueDevTools(),
    vue(),
    vuetify({
      styles: { configFile: 'src/theme/settings.scss' },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
