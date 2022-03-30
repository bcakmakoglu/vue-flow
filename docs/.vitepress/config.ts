import { config } from 'dotenv'
import { resolve } from 'path'
import { defineConfig, HeadConfig } from 'vitepress'
import WindiCSS from 'vite-plugin-windicss'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import svgLoader from 'vite-svg-loader'
import { demoPlugin } from './plugins/demo'
import head from './head'

config({ path: resolve(__dirname, '.env') })

export default defineConfig({
  title: 'Vue Flow',
  lastUpdated: true,
  srcDir: './src',
  head: head as HeadConfig[],

  vite: {
    resolve: {
      alias: {
        '~': resolve('../../package/src'),
      },
    },
    plugins: [
      svgLoader(),
      WindiCSS({
        config: resolve(__dirname, './windi.config.ts'),
      }) as any,
      Components({
        dirs: [resolve(__dirname, './components')],
        deep: true,
        // allow auto load markdown components under `./src/components/`
        extensions: ['vue', 'md'],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: false,
      }),
      Icons({
        // expiremental
        autoInstall: true,
      }),
    ],
  },

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
        text: 'Examples',
        link: '/examples/basic',
        activeMatch: '^/examples/',
      },
    ],
  },

  markdown: {
    config(md) {
      md.use(demoPlugin)
      return md
    },
  },
})
