import { copyFile, existsSync, mkdirSync, readdirSync, statSync } from 'fs'
import { resolve } from 'path'

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

const changelogDirPath = resolve(__dirname, `../../changelog/`)

if (!existsSync(changelogDirPath)) {
  mkdirSync(changelogDirPath)
}

files.forEach(({ path, pkgName }) => {
  const isCore = pkgName === 'core'

  const filePath = resolve(__dirname, `${path}`)

  copyFile(filePath, `${changelogDirPath}/${isCore ? 'index' : pkgName}.md`, () => {})

  console.log(`Copied ${filePath} to ${changelogDirPath}/${isCore ? 'index' : pkgName}.md`)
})
