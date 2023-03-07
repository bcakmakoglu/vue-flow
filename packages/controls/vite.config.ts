import { resolve } from 'node:path'
import { withConfig } from '@tooling/vite-config'
import svgLoader from 'vite-svg-loader'

export default withConfig({
  build: {
    lib: {
      formats: ['es', 'cjs', 'iife'],
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'vue-flow-controls',
      name: 'VueFlowControls',
    },
  },
  plugins: [svgLoader() as any],
})
