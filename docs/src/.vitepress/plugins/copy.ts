import { existsSync, readFileSync } from 'fs'
import { resolve } from 'path'
import type { Plugin } from 'vite'

export function copyVueFlowPlugin(): Plugin {
  return {
    name: 'copy-vue-flow',
    generateBundle() {
      ;[
        { path: '../../../node_modules/@vue-flow/core/dist/', pkgName: 'vue-flow-core.mjs' },
        {
          path: '../../../node_modules/@vue-flow/background/dist/',
          pkgName: 'vue-flow-background.mjs',
        },
        {
          path: '../../../node_modules/@vue-flow/controls/dist/',
          pkgName: 'vue-flow-controls.mjs',
        },
        {
          path: '../../../node_modules/@vue-flow/minimap/dist/',
          pkgName: 'vue-flow-minimap.mjs',
        },
        {
          path: '../../../node_modules/@vue-flow/node-resizer/dist/',
          pkgName: 'vue-flow-node-resizer.mjs',
        },
        {
          path: '../../../node_modules/@vue-flow/node-toolbar/dist/',
          pkgName: 'vue-flow-node-toolbar.mjs',
        },
      ].forEach(({ path, pkgName }) => {
        const filePath = resolve(__dirname, `${path}/${pkgName}`)
        if (!existsSync(filePath)) {
          throw new Error(`${pkgName} not built. ` + `Run "pnpm -w build" first.`)
        }

        ;(this as any).emitFile({
          type: 'asset',
          fileName: pkgName,
          source: readFileSync(filePath, 'utf-8'),
        })

        console.log(`Copied ${filePath} to ${resolve(__dirname, `../../src/public/${pkgName}`)}`)
      })

      console.log('Copied vue-flow files')
    },
  }
}
