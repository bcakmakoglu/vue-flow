import { resolve } from 'node:path'
import { readdirSync, statSync } from 'node:fs'
import { capitalize } from 'vue'
import type { DefaultTheme } from 'vitepress'
import { files } from './plugins'

function namespaceToLinkify(namespace: string) {
  return function linkify(...text: string[]) {
    return `/${namespace}/${Array.isArray(text) ? text.join('/') : text}`
  }
}

export function typedocSidebarEntries() {
  const filePath = resolve(__dirname, '../typedocs')

  const docsModules = readdirSync(filePath).filter((name) => statSync(`${filePath}/${name}`).isDirectory())

  const linkify = namespaceToLinkify('typedocs')

  return docsModules.map((module) => {
    let children = readdirSync(`${filePath}/${module}/`).map<DefaultTheme.SidebarItem>((entry) => ({
      text: entry.replace('.md', ''),
      link: linkify(module, entry.replace('.md', '')),
    }))

    if (module === 'variables') {
      children = children.filter((child) => child.link.includes('default'))
    }

    return { text: capitalize(module), collapsed: false, items: children } as DefaultTheme.SidebarItem
  })
}

export function changelogSidebarEntries(): DefaultTheme.SidebarItem[] {
  const linkify = namespaceToLinkify('changelog')

  return [
    {
      text: 'CHANGELOG',
      collapsed: true,
      items: files.map((file) => {
        const name = file.pkgName.replace('.md', '')
        const isCore = name === 'core'

        return {
          text: name
            .split('-')
            .map((s) => capitalize(s))
            .join(' '),
          link: linkify(isCore ? '' : name),
        }
      }),
    },
  ]
}

export function guideSidebarEntries(): DefaultTheme.SidebarItem[] {
  const linkify = namespaceToLinkify('guide')
  const typedocLinkify = namespaceToLinkify('typedocs')

  return [
    {
      text: 'Guide',
      collapsed: false,
      items: [
        { text: 'Introduction', link: linkify() },
        { text: 'Getting Started', link: linkify('getting-started') },
        { text: 'Theming', link: linkify('theming') },
        { text: 'Nodes', link: linkify('nodes') },
        { text: 'Edges', link: linkify('edges') },
        { text: 'Composables', link: linkify('composables') },
      ],
    },
    {
      text: 'Vue Flow',
      collapsed: false,
      items: [
        { text: 'Configuration', link: linkify('vue-flow', 'config') },
        { text: 'State', link: linkify('vue-flow', 'state') },
        {
          text: 'Actions',
          link: typedocLinkify('interfaces', 'Actions.html'),
        },
        {
          text: 'Getters',
          link: typedocLinkify('interfaces', 'Getters.html'),
        },
        {
          text: 'Events',
          link: typedocLinkify('interfaces', 'Events.html'),
        },
        { text: 'Slots', link: linkify('vue-flow', 'slots') },
      ],
    },
    {
      text: 'Utilities',
      collapsed: false,
      items: [
        { text: 'Graph', link: linkify('utils', 'graph') },
        { text: 'Viewport', link: linkify('utils', 'instance') },
        { text: 'Edges', link: linkify('utils', 'edges') },
      ],
    },
    {
      text: 'Components',
      collapsed: false,
      items: [
        { text: 'Background', link: linkify('components', 'background') },
        { text: 'MiniMap', link: linkify('components', 'minimap') },
        { text: 'MiniMapNode', link: linkify('components', 'minimap-node') },
        { text: 'Controls', link: linkify('components', 'controls') },
        { text: 'Control Button', link: linkify('components', 'control-button') },
        { text: 'Node Toolbar', link: linkify('components', 'node-toolbar') },
        { text: 'Node Resizer', link: linkify('components', 'node-resizer') },
      ],
    },
  ]
}

export function examplesSidebarEntries(): DefaultTheme.SidebarItem[] {
  const linkify = namespaceToLinkify('examples')

  return [
    {
      text: 'General Examples',
      collapsed: false,
      items: [
        { text: 'Basic', link: linkify() },
        { text: 'Save & Restore', link: linkify('save') },
        { text: 'Drag & Drop', link: linkify('dnd') },
        { text: 'Empty Flow', link: linkify('empty') },
        { text: 'Hide/Show', link: linkify('hidden') },
        { text: 'Horizontal Flow', link: linkify('horizontal') },
        { text: 'Interactions', link: linkify('interaction') },
        { text: 'Intersection', link: linkify('intersection') },
        { text: 'Teleport', link: linkify('teleport') },
        { text: 'Transition', link: linkify('transition') },
        { text: 'Multiple Flows', link: linkify('multi') },
        { text: 'Pinia', link: linkify('pinia') },
        { text: 'Stress', link: linkify('stress') },
      ],
    },
    {
      text: 'Nodes',
      collapsed: false,
      items: [
        { text: 'Custom Node', link: linkify('nodes') },
        { text: 'Update Node', link: linkify('nodes', 'update-node') },
        { text: 'Nested Nodes', link: linkify('nodes', 'nesting') },
        { text: 'Node Resizer', link: linkify('nodes', 'node-resizer') },
        { text: 'Node Toolbar', link: linkify('nodes', 'node-toolbar') },
      ],
    },
    {
      text: 'Edges',
      collapsed: false,
      items: [
        { text: 'Edges', link: linkify('edges') },
        { text: 'Updatable Edge', link: linkify('edges', 'updatable-edge') },
        { text: 'Custom Connection Line', link: linkify('edges', 'connection-line') },
        { text: 'Connection Validation', link: linkify('edges', 'validation') },
        { text: 'Connection Radius', link: linkify('edges', 'connection-radius') },
      ],
    },
  ]
}
