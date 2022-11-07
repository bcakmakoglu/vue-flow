import { copyFile, existsSync, mkdirSync, readdirSync, statSync } from 'fs'
import { resolve } from 'path'

interface ChangelogFile {
  path: string
  pkgName: string
}

const skip = ['node_modules', 'dist', 'turbo']

const getAllFiles = function (dirPath: string, needle?: string, arrayOfFiles: ChangelogFile[] = [], pkgName?: string) {
  readdirSync(dirPath).forEach((fileOrDir) => {
    if (skip.includes(fileOrDir)) return

    if (statSync(`${dirPath}/${fileOrDir}`).isDirectory()) {
      getAllFiles(`${dirPath}/${fileOrDir}`, needle, arrayOfFiles, fileOrDir)
    } else {
      if (fileOrDir.includes('CHANGELOG')) {
        arrayOfFiles.push({ path: `${dirPath}/${fileOrDir}`, pkgName })
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
  const filePath = resolve(__dirname, `${path}`)

  copyFile(filePath, `${changelogDirPath}/${pkgName}.md`, () => {})

  console.log(`Copied ${filePath} to ${changelogDirPath}/${pkgName}.md`)
})

copyFile(resolve(__dirname, `../../../../CHANGELOG.md`), `${changelogDirPath}/index.md`, () => {})
console.log(`Copied main CHANGELOG to ${changelogDirPath}/index.md`)
