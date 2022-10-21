import { copyFile, readdirSync, statSync } from 'fs'
import { resolve } from 'path'
import type { Plugin } from 'vite'

interface ChangelogFile {
  path: string
  pkgName: string
}

const skip = ['node_modules', 'dist', 'turbo']

const getAllFiles = function (dirPath: string, needle?: string, arrayOfFiles: ChangelogFile[] = [], pkgName?: string) {
  readdirSync(dirPath).forEach((file) => {
    if (skip.includes(file)) return

    if (statSync(`${dirPath}/${file}`).isDirectory()) {
      getAllFiles(`${dirPath}/${file}`, needle, arrayOfFiles, file)
    } else {
      if (file.includes('CHANGELOG')) {
        arrayOfFiles.push({ path: `${dirPath}/${file}`, pkgName })
      }
    }
  })

  return arrayOfFiles
}

export const files = getAllFiles(resolve(__dirname, '../../../../packages'), 'CHANGELOG')

export function copyChangelogPlugin(): Plugin {
  return {
    name: 'copy-changelog-files',
    config() {
      files.forEach(({ path, pkgName }) => {
        const isCore = pkgName === 'core'

        const filePath = resolve(__dirname, `${path}`)

        copyFile(filePath, resolve(__dirname, `../../changelog/${isCore ? 'index' : pkgName}.md`), () => {})
      })
    },
  }
}
