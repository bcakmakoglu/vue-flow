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
          path: '../../../node_modules/@vue-flow/additional-components/dist/',
          pkgName: 'vue-flow-additional-components.mjs',
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
