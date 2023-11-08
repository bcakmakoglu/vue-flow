import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { Plugin } from 'vite'

function copyFiles(emit: any) {
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

    emit({
      type: 'asset',
      fileName: pkgName,
      filePath,
      source: readFileSync(filePath, 'utf-8'),
    })

    console.log(`Copied ${filePath} to ${resolve(__dirname, `../../public/${pkgName}`)}`)
  })

  console.log('Copied vue-flow files')
}
export function copyVueFlowPlugin(): Plugin {
  return {
    name: 'copy-vue-flow',
    buildStart() {
      // use fs to copy files
      copyFiles((file: any) => {
        writeFileSync(resolve(__dirname, `../../public/${file.fileName}`), file.source)
      })
    },
    watchChange() {
      // use fs to copy files
      copyFiles((file: any) => {
        writeFileSync(resolve(__dirname, `../../public/${file.fileName}`), file.source)
      })
    },
    generateBundle() {
      copyFiles((file: any) => this.emitFile(file))
    },
  }
}
