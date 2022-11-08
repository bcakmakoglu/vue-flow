import { copyFile, existsSync, mkdirSync, readdirSync, statSync } from 'fs'
import { resolve } from 'path'

interface PluginFile {
  path: string
  pkgName: string
}

const skip = ['node_modules', 'dist', 'turbo']

const getAllFiles = function (dirPath: string, needle?: string, arrayOfFiles: PluginFile[] = [], pkgName?: string) {
  readdirSync(dirPath).forEach((file) => {
    if (skip.includes(file)) return

    if (statSync(`${dirPath}/${file}`).isDirectory()) {
      getAllFiles(`${dirPath}/${file}`, needle, arrayOfFiles, file)
    } else {
      if (file.includes('README')) {
        arrayOfFiles.push({ path: `${dirPath}/${file}`, pkgName })
      }
    }
  })

  return arrayOfFiles
}

export const pluginFiles = getAllFiles(resolve(__dirname, '../../../../packages/plugins'), 'README')

const pluginDirPath = resolve(__dirname, `../../plugins/`)

if (!existsSync(pluginDirPath)) {
  mkdirSync(pluginDirPath)
}

pluginFiles.forEach(({ path, pkgName }) => {
  const filePath = resolve(__dirname, `${path}`)

  copyFile(filePath, `${pluginDirPath}/${pkgName}.md`, () => {})

  console.log(`Copied ${filePath} to ${pluginDirPath}/${pkgName}.md`)
})
