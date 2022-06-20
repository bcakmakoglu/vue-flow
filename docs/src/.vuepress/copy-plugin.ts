import { Plugin } from 'vite'
import { existsSync, readFileSync } from 'fs'
import { resolve } from 'path'

export function copyVueFlowPlugin(): Plugin {
  return {
    name: 'copy-vue-flow',
    generateBundle() {
      const filePath = resolve(
        __dirname,
        '../../node_modules/@vue-flow/renderer/dist/vue-flow.es.js'
      )
      if (!existsSync(filePath)) {
        throw new Error(
          `@vue-flow/renderer/dist/vue-flow.es.js not built. ` +
          `Run "pnpm -w build" first.`
        )
      }

      this.emitFile({
        type: 'asset',
        fileName: 'vue-flow.es.js',
        source: readFileSync(filePath, 'utf-8'),
      })
    }
  }
}
