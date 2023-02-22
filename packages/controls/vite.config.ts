import { resolve } from 'path'
import { withConfig } from '@vue-flow/vite-config'
import svgLoader from 'vite-svg-loader'

export default withConfig({
  build: {
    lib: {
      formats: ['es', 'cjs', 'iife'],
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'vue-flow-controls',
      name: 'vueFlowControls',
    },
  },
  plugins: [svgLoader() as any],
})
