import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  alias: {
    vue: resolve('./node_modules/vue'),
  },
  resolve: {
    dedupe: ['vue'],
    preserveSymlinks: false,
  },
  build: {
    emptyOutDir: true,
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'],
      dts: 'src/auto-imports.d.ts',
    }),
    WindiCSS(),
  ],
})
