import { resolve } from 'path'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ['vue', '@vueuse/core'],
      dts: resolve('auto-imports.d.ts'),
    }),
  ],
  optimizeDeps: {
    include: ['@braks/vue-flow'],
  },
})
