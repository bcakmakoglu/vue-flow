import { config } from 'dotenv'
import { resolve } from 'path'
import { defineConfig, HeadConfig } from 'vitepress'
import head from './head'

config({ path: resolve(__dirname, '.env') })

export default defineConfig({
  title: 'Vue Flow',
  description: 'Create node based editors!',
  lastUpdated: true,
  srcDir: './src',
  head: head as HeadConfig[],

  themeConfig: {
    repo: 'bcakmakoglu/vue-flow',
    docsDir: 'docs',
    docsBranch: 'master',
    lastUpdated: 'Last Updated',

    algolia: {
      appId: 'YCY25RSLA8',
      apiKey: process.env.ALGOLIA_API_KEY,
      indexName: (process.env.NODE_ENV !== 'production' ? 'dev_' : 'prod_') + 'VUE-FLOW',
    },

    nav: [
      { text: 'Guide', link: '/', activeMatch: '^/$|^/guide/' },
      {
        text: 'Config Reference',
        link: '/config/basics',
        activeMatch: '^/config/',
      },
    ],
  },

  markdown: {
    config(md) {
      return md
    },
  },
})
