import { resolve } from 'path'
import { defaultTheme, SidebarConfigArray, Theme } from 'vuepress'
import { path } from '@vuepress/utils'
import { useVueFlow } from '@braks/vue-flow'
import { readdirSync } from 'fs'

const { vueFlowVersion } = useVueFlow()

const typedocSidebarEntries = (): SidebarConfigArray => {
  const filePath = resolve(
    __dirname,
    '../../typedocs'
  )

  const classes = readdirSync(`${filePath}/classes/`).map(entry => `/typedocs/classes/${entry}`)
  const enums = readdirSync(`${filePath}/enums/`).map(entry => `/typedocs/enums/${entry}`)
  const interfaces = readdirSync(`${filePath}/interfaces/`).map(entry => `/typedocs/interfaces/${entry}`)
  const modules = readdirSync(`${filePath}/modules/`).map(entry => `/typedocs/modules/${entry}`)

  return [
    {
      text: 'TypeDocs',
      link: '/typedocs/',
      children: [
        { text: 'Exports', children: ['/typedocs/modules.md'] },
        { text: 'Modules', children: modules },
        { text: 'Classes', children: classes },
        { text: 'Enums', children: enums },
        { text: 'Interfaces', children: interfaces },
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
            '/guide/config',
            '/guide/state',
            '/guide/node',
            '/guide/edge',
            '/guide/composables',
            { text: 'Utilities', children: ['/guide/utils/graph', '/guide/utils/instance', '/guide/utils/edge'] },
            {
              text: 'Additional Components',
              children: ['/guide/components/background', '/guide/components/minimap', '/guide/components/controls'],
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
      { text: `v${vueFlowVersion.value}`, link: '' },
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
