import { resolve } from 'node:path'
import { withConfig } from '@tooling/vite-config'
import vueTypes from 'vite-plugin-vue-type-imports'

export default withConfig({
  build: {
    lib: {
      formats: ['es', 'cjs', 'iife'],
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'vue-flow-node-resizer',
      name: 'VueFlowNodeResizer',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', '@vue-flow/core', 'd3-drag', 'd3-selection'],
      output: {
        dir: './dist',
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          'vue': 'Vue',
          '@vue-flow/core': 'VueFlowCore',
          'd3-drag': 'd3Drag',
          'd3-selection': 'd3Selection',
        },
      },
    },
  },
  plugins: [vueTypes() as any],
})
