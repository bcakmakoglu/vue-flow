import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueTypes from 'vite-plugin-vue-type-imports'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    vue(),
    vueTypes(),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ['vue', '@vueuse/core'],
      dts: 'src/auto-imports.d.ts',
    }),
  ],
  optimizeDeps: {
    include: ['@braks/vue-flow'],
  },
})
