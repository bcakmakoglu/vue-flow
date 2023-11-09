import { resolve } from 'node:path'
import { withConfig } from '@tooling/vite-config'

export default withConfig({
  optimizeDeps: {
    exclude: ['vue-demi'],
  },
  build: {
    lib: {
      formats: ['es', 'cjs', 'iife'],
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'vue-flow-background',
      name: 'VueFlowBackground',
    },
  },
})
