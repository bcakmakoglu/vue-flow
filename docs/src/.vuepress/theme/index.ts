import { resolve } from 'path'
import { defaultTheme, Theme } from 'vuepress'
import { path } from '@vuepress/utils'
import { useVueFlow } from '@braks/vue-flow'

const { vueFlowVersion } = useVueFlow()

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
    },
    navbar: [
      { text: `v${vueFlowVersion.value}`, link: '' },
      { text: 'Guide', link: '/guide/', activeMatch: '^/guide/' },
      {
        text: 'Examples',
        link: '/examples/',
        activeMatch: '^/examples/',
      },
      { text: 'TypeDocs', link: 'https://types.vueflow.dev/' },
    ],
  }),
  layouts: {
    Layout: resolve(__dirname, 'layouts/default.vue'),
  },
  clientConfigFile: path.resolve(__dirname, './clientAppEnhance.ts'),
} as Theme
