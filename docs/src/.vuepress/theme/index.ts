import { resolve } from 'path'
import { defaultTheme, SidebarConfigArray, Theme } from 'vuepress'
import { path } from '@vuepress/utils'
import { useVueFlow } from '@braks/vue-flow'
import { readdirSync, statSync } from 'fs'

const { vueFlowVersion } = useVueFlow()

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const typedocSidebarEntries = (): SidebarConfigArray => {
  const filePath = resolve(__dirname, '../../typedocs')

  const docsModules = readdirSync(filePath).filter((name) => statSync(`${filePath}/${name}`).isDirectory())

  const sidebarItems = docsModules.map((module) => {
    let children = readdirSync(`${filePath}/${module}/`).map(entry => `/typedocs/${module}/${entry}`)

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
      children: [
        ...sidebarItems,
      ],
    }
  ]
}

export default {
  name: 'vuepress-theme-local',
  extends: defaultTheme({
    repo: 'bcakmakoglu/vue-flow',
    docsDir: 'docs/src/',
    docsBranch: 'master',
    lastUpdated: true,
    contributors: true,
    darkMode: true,
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
              children: ['/guide/vue-flow/config', '/guide/vue-flow/state', '/guide/vue-flow/slots'],
            },
            '/guide/node',
            '/guide/edge',
            '/guide/composables',
            {
              text: 'Utilities',
              children: [
                '/guide/utils/graph',
                '/guide/utils/instance',
                '/guide/utils/edge',
              ]
            },
            {
              text: 'Components',
              children: [
                '/guide/components/background',
                '/guide/components/minimap',
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
            '/examples/custom-node',
            '/examples/edges',
            '/examples/nesting',
            '/examples/connectionline',
            '/examples/updatable-edge',
            '/examples/update-node',
            '/examples/validation',
            '/examples/save',
            '/examples/dnd',
            '/examples/empty',
            '/examples/hidden',
            '/examples/interaction',
            '/examples/multi',
            '/examples/horizontal',
            '/examples/teleport',
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
