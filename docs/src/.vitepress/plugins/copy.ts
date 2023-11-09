import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { Plugin } from 'vite'

function getPkgPath(pkgName: string, fileName) {
  return resolve(__dirname, `../../../node_modules/@vue-flow/${pkgName}/dist/${fileName}`)
}

function getPublicPath(fileName: string) {
  return resolve(__dirname, `../../public/${fileName}`)
}

function copyFiles(emit: any) {
  ;['core', 'background', 'controls', 'minimap', 'node-resizer', 'node-toolbar'].forEach((name) => {
    const fileName = `vue-flow-${name}.mjs`

    const filePath = resolve(__dirname, getPkgPath(name, fileName))

    console.log(filePath)

    if (!existsSync(filePath)) {
      throw new Error(`${name} not built. ` + `Run "pnpm -w build" first.`)
    }

    emit({
      type: 'asset',
      fileName,
      filePath,
      source: readFileSync(filePath, 'utf-8'),
    })

    console.log(`Copied ${filePath} to ${getPublicPath(fileName)}`)
  })

  console.log('Copied vue-flow files')
}
export function copyVueFlowPlugin(): Plugin {
  return {
    name: 'copy-vue-flow',
    buildStart() {
      // use fs to copy files
      copyFiles((file: any) => {
        // remove existing files
        if (existsSync(getPublicPath(file.fileName))) {
          writeFileSync(getPublicPath(file.fileName), '')
        }

        writeFileSync(getPublicPath(file.fileName), file.source)
      })
    },
    watchChange() {
      // use fs to copy files
      copyFiles((file: any) => {
        // remove existing files
        if (existsSync(getPublicPath(file.fileName))) {
          writeFileSync(getPublicPath(file.fileName), '')
        }

        writeFileSync(getPublicPath(file.fileName), file.source)
      })
    },
    generateBundle() {
      copyFiles((file: any) => this.emitFile(file))
    },
  }
}
