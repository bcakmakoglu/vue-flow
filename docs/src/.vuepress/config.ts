import { config } from 'dotenv'
import { resolve } from 'path'
import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions, HeadConfig } from 'vuepress'

import WindiCSS from 'vite-plugin-windicss'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import head from './head'
import { useVueFlow } from '@braks/vue-flow'
import { copyVueFlowPlugin } from "./copy-plugin";

config({ path: resolve(__dirname, '.env') })

const { vueFlowVersion } = useVueFlow()
export default defineUserConfig<DefaultThemeOptions>({
  title: 'Vue Flow',
  description: 'Visualize your ideas with Vue Flow, a highly customizable Vue3 Flowchart library.',
  head: head as HeadConfig[],

  dest: resolve(__dirname, '../../dist'),
  bundler: '@vuepress/bundler-vite',
  bundlerConfig: {
    viteOptions: {
      optimizeDeps: {
        exclude: ['@animxyz/vue3'],
      },
      plugins: [
        copyVueFlowPlugin(),
        AutoImport({
          imports: ['vue', '@vueuse/core'],
          dts: resolve(__dirname, './auto-imports.d.ts'),
        }),
        WindiCSS({
          transformCSS: 'pre',
          config: resolve(__dirname, './windi.config.ts'),
        }),
        Components({
          dirs: [resolve(__dirname, '../../components')],
          deep: true,
          // allow auto load markdown components under `./src/components/`
          extensions: ['vue', 'md'],
          // allow auto import and register components used in markdown
          include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
          dts: resolve(__dirname, './components.d.ts'),
          resolvers: [IconsResolver()],
        }),
        Icons({
          compiler: 'vue3',
        }),
      ],
    },
  },

  plugins: [
    [
      '@vuepress/docsearch',
      {
        appId: 'F7BJNSM4M5',
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: 'vueflow',
      },
    ],
  ],

  theme: resolve(__dirname, './theme/index.ts'),

  themeConfig: {
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
  },
})
