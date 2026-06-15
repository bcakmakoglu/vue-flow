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
  // 2.0 ships a single `@vue-flow/core` package (node-resizer/node-toolbar/etc. were merged into it).
  // The REPL sandbox loads the runtime AND styles from these local copies (not a CDN), so the
  // playground tracks the in-repo 2.0 build instead of the last published 1.x release.
  const assets = [
    { from: 'vue-flow-core.mjs', to: 'vue-flow-core.mjs' },
    { from: 'style.css', to: 'vue-flow-core.css' },
    { from: 'theme-default.css', to: 'vue-flow-core-theme-default.css' },
  ]

  assets.forEach(({ from, to }) => {
    const filePath = getPkgPath('core', from)

    if (!existsSync(filePath)) {
      throw new Error(`core not built. Run "pnpm -w build" first.`)
    }

    emit({
      type: 'asset',
      fileName: to,
      filePath,
      source: readFileSync(filePath, 'utf-8'),
    })

    console.log(`Copied ${from} to /public/${to}`)
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
