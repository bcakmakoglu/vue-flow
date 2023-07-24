import { resolve } from 'node:path'
import { withConfig } from '@tooling/vite-config'

export default withConfig({
  build: {
    lib: {
      formats: ['es', 'cjs', 'iife'],
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'vue-flow-minimap',
      name: 'VueFlowMiniMap',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', '@vue-flow/core', 'd3-zoom', 'd3-selection'],
      output: {
        dir: './dist',
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          'vue': 'Vue',
          '@vue-flow/core': 'VueFlowCore',
          'd3-zoom': 'd3Zoom',
          'd3-selection': 'd3Selection',
        },
      },
    },
  },
})
