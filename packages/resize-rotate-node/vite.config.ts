import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import vueTypes from 'vite-plugin-vue-type-imports'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~': resolve('../vue-flow/src'),
    },
    dedupe: ['vue'],
    extensions: ['.ts', '.vue'],
  },
  build: {
    minify: 'esbuild',
    emptyOutDir: false,
    lib: {
      formats: ['es', 'cjs', 'iife'],
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'vueFlowResizeRotateNode',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        dir: './dist',
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    vueTypes(),
    AutoImport({
      imports: ['vue', '@vueuse/core'],
      dts: 'src/auto-imports.d.ts',
    }),
  ],
  optimizeDeps: {
    include: ['vue', '@vueuse/core'],
  },
})
