import { config } from 'dotenv'
import { resolve } from 'path'
import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions, HeadConfig } from 'vuepress'

import WindiCSS from 'vite-plugin-windicss'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import head from './head'

config({ path: resolve(__dirname, '.env') })

export default defineUserConfig<DefaultThemeOptions>({
  title: 'Vue Flow',
  description: 'Visualize your ideas with Vue Flow, a highly customizable Vue3 Flowchart library.',
  head: head as HeadConfig[],

  bundler: '@vuepress/bundler-vite',
  bundlerConfig: {
    viteOptions: {
      plugins: [
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
        }),
        Icons(),
      ],
    },
  },

  plugins: [
    [
      '@vuepress/docsearch',
      {
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: 'YCY25RSLA8',
      },
    ],
  ],

  theme: resolve(__dirname, './theme/index.ts'),

  themeConfig: {
    repo: 'bcakmakoglu/vue-flow',
    docsDir: 'docs',
    docsBranch: 'master',
    lastUpdated: true,
    contributors: true,
    darkMode: true,

    algolia: {
      appId: 'YCY25RSLA8',
      apiKey: process.env.ALGOLIA_API_KEY,
      indexName: (process.env.NODE_ENV !== 'production' ? 'dev_' : 'prod_') + 'VUE-FLOW',
    },

    navbar: [
      { text: 'Guide', link: '/', activeMatch: '^/$|^/guide/' },
      {
        text: 'Examples',
        link: '/examples/',
        activeMatch: '^/examples/',
      },
    ],
  },
})
