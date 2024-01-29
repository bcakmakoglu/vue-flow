import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { Plugin } from 'vite'

type Emit = (file: { type: 'asset'; fileName: string; filePath: string; source: string }) => void

function getPkgPath(pkgName: string, fileName: string) {
  return resolve(__dirname, `../../../node_modules/@vue-flow/${pkgName}/dist/${fileName}`)
}

function getPublicPath(fileName: string) {
  return resolve(__dirname, `../../public/${fileName}`)
}

function copyFiles(emit: Emit) {
  ;['core', 'background', 'controls', 'minimap', 'node-resizer', 'node-toolbar'].forEach((name) => {
    const fileName = `vue-flow-${name}.mjs`

    const filePath = resolve(__dirname, getPkgPath(name, fileName))

    if (!existsSync(filePath)) {
      throw new Error(`${name} not built. ` + `Run "pnpm -w build" first.`)
    }

    emit({
      type: 'asset',
      fileName,
      filePath,
      source: readFileSync(filePath, 'utf-8'),
    })

    console.log(`Copied ${fileName} to /public/${fileName}`)
  })
}
export function copyVueFlowPlugin(): Plugin {
  return {
    name: 'copy-vue-flow',
    buildStart() {
      // use fs to copy files
      copyFiles((file) => {
        // remove existing files
        if (existsSync(getPublicPath(file.fileName))) {
          writeFileSync(getPublicPath(file.fileName), '')
        }

        writeFileSync(getPublicPath(file.fileName), file.source)
      })
    },
    generateBundle() {
      copyFiles((file) => this.emitFile(file))
    },
  }
}
