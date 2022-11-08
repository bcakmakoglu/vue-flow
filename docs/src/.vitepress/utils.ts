import { resolve } from 'path'
import { readdirSync, statSync } from 'fs'
import type { DefaultTheme } from 'vitepress'
import { changelogFiles, pluginFiles } from './plugins'

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const typedocSidebarEntries = (): DefaultTheme.SidebarGroup[] => {
  const filePath = resolve(__dirname, '../typedocs')

  const docsModules = readdirSync(filePath).filter((name) => statSync(`${filePath}/${name}`).isDirectory())

  return docsModules.map((module) => {
    let children = readdirSync(`${filePath}/${module}/`).map<DefaultTheme.SidebarItem>((entry) => ({
      text: entry.replace('.md', ''),
      link: `/typedocs/${module}/${entry.replace('.md', '')}`,
    }))

    if (module === 'variables') {
      children = children.filter((child) => {
        return child.link.includes('default')
      })
    }

    return { text: capitalize(module), collapsible: true, items: children } as DefaultTheme.SidebarGroup
  })
}

export const changelogSidebarEntries = (): DefaultTheme.SidebarGroup[] => {
  return [
    {
      text: 'CHANGELOG',
      collapsible: true,
      items: changelogFiles.map((file) => {
        const name = file.pkgName.replace('.md', '')
        const isCore = name === 'core'

        return {
          text: name
            .split('-')
            .map((s) => capitalize(s))
            .join(' '),
          link: `/changelog/${isCore ? '' : name}`,
        }
      }),
    },
  ]
}

export const pluginSidebarEntries = (): DefaultTheme.SidebarGroup[] => {
  return [
    {
      text: 'Plugins',
      collapsible: true,
      items: pluginFiles.map((file) => {
        const name = file.pkgName.replace('.md', '')

        return {
          text: name
            .split('-')
            .map((s) => capitalize(s))
            .join(' '),
          link: `/plugins/${name}`,
        }
      }),
    },
  ]
}
