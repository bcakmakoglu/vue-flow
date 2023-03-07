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
  },
  plugins: [vueTypes() as any],
})
