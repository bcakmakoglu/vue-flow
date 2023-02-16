import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueTypes from 'vite-plugin-vue-type-imports'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~': resolve('src'),
    },
    dedupe: ['vue'],
    extensions: ['.ts', '.vue'],
  },
  build: {
    emptyOutDir: false,
    lib: {
      formats: ['es', 'cjs', 'iife'],
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'vue-flow-pathfinding-edge',
      name: 'vueFlowPathfindingEdge',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', '@vue-flow/core'],
      output: {
        dir: './dist',
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          'vue': 'Vue',
          '@vue-flow/core': 'VueFlow',
        },
      },
    },
  },
  plugins: [
    vue(),
    vueTypes(),
    AutoImport({
      imports: ['vue'],
      dts: 'src/auto-imports.d.ts',
    }),
  ],
})
