import { resolve } from 'node:path'
import { withConfig } from '@tooling/vite-config'

export default withConfig({
  build: {
    lib: {
      formats: ['es', 'cjs', 'iife'],
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'vue-flow-pathfinding-edge',
      name: 'VueFlowPathfindingEdge',
    },
  },
})
