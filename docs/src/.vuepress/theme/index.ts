import { resolve } from 'path'
import { readdirSync, statSync } from 'fs'
import type { SidebarConfigArray, Theme } from 'vuepress'
import { defaultTheme } from 'vuepress'
import { path } from '@vuepress/utils'
import { useVueFlow } from '@braks/vue-flow'

const { vueFlowVersion } = useVueFlow()

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const typedocSidebarEntries = (): SidebarConfigArray => {
  const filePath = resolve(__dirname, '../../typedocs')

  const docsModules = readdirSync(filePath).filter((name) => statSync(`${filePath}/${name}`).isDirectory())

  const sidebarItems = docsModules.map((module) => {
    let children = readdirSync(`${filePath}/${module}/`).map((entry) => `/typedocs/${module}/${entry}`)

    if (module === 'variables') {
      children = children.filter((child) => {
        return child.includes('default')
      })
    }

    return { text: capitalize(module), children }
  })

  return [
    {
      text: 'Modules',
      link: '/typedocs/',
      children: [...sidebarItems],
    },
  ]
}

export default {
  name: 'vuepress-theme-local',
  extends: defaultTheme({
    docsDir: 'docs/src/',
    docsBranch: 'master',
    lastUpdated: true,
    contributors: true,
    colorMode: 'auto',
    colorModeSwitch: true,
    logo: '/favicons/android-chrome-512x512.png',
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          children: [
            '/guide/',
            '/guide/getting-started',
            '/guide/theming',
            {
              text: 'Vue Flow',
              children: [
                '/guide/vue-flow/config',
                '/guide/vue-flow/state',
                {
                  text: 'Actions',
                  link: '/typedocs/interfaces/Actions.html',
                },
                {
                  text: 'Getters',
                  link: '/typedocs/interfaces/Getters.html',
                },
                {
                  text: 'Events',
                  link: '/typedocs/interfaces/FlowEvents.html',
                },
                '/guide/vue-flow/slots',
              ],
            },
            '/guide/node',
            '/guide/edge',
            '/guide/composables',
            {
              text: 'Utilities',
              children: ['/guide/utils/graph', '/guide/utils/instance', '/guide/utils/edge'],
            },
            {
              text: 'Components',
              children: [
                '/guide/components/background',
                '/guide/components/minimap',
                '/guide/components/minimap-node',
                '/guide/components/controls',
                '/guide/components/control-button',
              ],
            },
          ],
        },
      ],
      '/examples/': [
        {
          text: 'Examples',
          children: [
            '/examples/',
            {
              text: 'Nodes',
              children: ['/examples/nodes/', '/examples/nodes/update-node', '/examples/nodes/nesting'],
            },
            {
              text: 'Edges',
              children: [
                '/examples/edges/',
                '/examples/edges/updatable-edge',
                '/examples/edges/connection-line',
                '/examples/edges/validation',
              ],
            },
            '/examples/save',
            '/examples/dnd',
            '/examples/empty',
            '/examples/hidden',
            '/examples/horizontal',
            '/examples/interaction',
            '/examples/teleport',
            '/examples/multi',
            '/examples/pinia',
            '/examples/stress',
          ],
        },
      ],
      '/typedocs/': typedocSidebarEntries(),
    },
    navbar: [
      { text: `v${vueFlowVersion.value}`, link: '/' },
      { text: 'Guide', link: '/guide/', activeMatch: '^/guide/' },
      {
        text: 'Examples',
        link: '/examples/',
        activeMatch: '^/examples/',
      },
      {
        text: 'TypeDocs',
        link: '/typedocs/',
        activeMatch: '^/typedocs/',
      },
    ],
  }),
  layouts: {
    Layout: resolve(__dirname, 'layouts/default.vue'),
  },
  clientConfigFile: path.resolve(__dirname, './clientAppEnhance.ts'),
} as Theme
