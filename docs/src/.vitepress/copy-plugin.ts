import { existsSync, readFileSync } from 'fs'
import { resolve } from 'path'
import type { Plugin } from 'vite'

export function copyVueFlowPlugin(): Plugin {
  return {
    name: 'copy-vue-flow',
    generateBundle() {
      const filePath = resolve(__dirname, '../../node_modules/@braks/vue-flow/dist/vue-flow.mjs')
      if (!existsSync(filePath)) {
        throw new Error(`@braks/vue-flow/dist/vue-flow.mjs not built. ` + `Run "pnpm -w build" first.`)
      }

      this.emitFile({
        type: 'asset',
        fileName: 'vue-flow.mjs',
        source: readFileSync(filePath, 'utf-8'),
      })
    },
  }
}
