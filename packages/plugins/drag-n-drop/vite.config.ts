import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    extensions: ['.ts'],
  },
  build: {
    emptyOutDir: false,
    lib: {
      formats: ['es', 'cjs', 'iife'],
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'vue-flow-plugin-drag-n-drop',
      name: 'vueFlowPluginDragNDrop',
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
  optimizeDeps: {
    include: ['vue', '@vueuse/core'],
  },
})
