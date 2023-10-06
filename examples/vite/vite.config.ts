import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  resolve: {
    dedupe: ['vue'],
  },
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    svgLoader(),
    AutoImport({
      imports: ['vue', '@vueuse/core', 'vue/macros'],
      dts: resolve('src/auto-imports.d.ts'),
    }),
  ],
  server: {
    watch: {
      ignored: ['!**/node_modules/@vue-flow/core/**'],
    },
  },
  optimizeDeps: {
    exclude: ['@vue-flow/core'],
  },
})
