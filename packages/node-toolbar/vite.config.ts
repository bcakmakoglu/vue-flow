import { resolve } from 'path'
import { withConfig } from '@vue-flow/vite-config'

export default withConfig({
  build: {
    lib: {
      formats: ['es', 'cjs', 'iife'],
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'vue-flow-node-toolbar',
      name: 'vueFlowNodeToolbar',
    },
  },
})
