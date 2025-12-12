import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  resolve: {
    dedupe: ['vue'],
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', '@vueuse/core'],
      dts: resolve('src/auto-imports.d.ts'),
    }),
  ],
  server: {
    watch: {
      ignored: ['!**/node_modules/@vue-flow/**/*'],
    },
  },
  optimizeDeps: {
    exclude: ['@vue-flow/core', '@vue-flow/minimap'],
  },
})
