import { resolve } from 'node:path'
import type { DefaultTheme, HeadConfig } from 'vitepress'
import { defineConfigWithTheme } from 'vitepress'
import WindiCSS from 'vite-plugin-windicss'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { useVueFlow } from '@vue-flow/core'
import head from './head'
import { copyVueFlowPlugin } from './plugins'
import { changelogSidebarEntries, examplesSidebarEntries, guideSidebarEntries, typedocSidebarEntries } from './sidebar'

const { vueFlowVersion } = useVueFlow()

export default defineConfigWithTheme<DefaultTheme.Config>({
  title: 'Vue Flow',
  description: 'Visualize your ideas with Vue Flow, a highly customizable Vue3 Flowchart library.',
  head: head as HeadConfig[],

  outDir: resolve(__dirname, '../../dist'),

  vite: {
    resolve: {
      alias: {
        'vue/server-renderer': resolve(__dirname, '../../../node_modules/@vue/server-renderer'),
      },
    },
    ssr: {
      noExternal: ['@vue/repl'],
    },
    optimizeDeps: {
      exclude: ['@animxyz/vue3'],
    },
    define: {
      __ANALYTICS_ID__: process.env.VERCEL_ANALYTICS_ID,
    },
    plugins: [
      copyVueFlowPlugin(),
      AutoImport({
        imports: ['vue', '@vueuse/core'],
        dts: resolve(__dirname, '../auto-imports.d.ts'),
      }),
      WindiCSS({
        transformCSS: 'pre',
        config: resolve(__dirname, './windi.config.ts'),
      }),
      Components({
        dirs: [resolve(__dirname, './../../components')],
        deep: true,
        // allow to autoload markdown components under `./src/components/`
        extensions: ['vue', 'md'],
        // allow auto-import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: resolve(__dirname, '../components.d.ts'),
        resolvers: [IconsResolver()],
      }),
      Icons({
        compiler: 'vue3',
      }),
    ],
  },

  themeConfig: {
    logo: '/favicons/android-chrome-512x512.png',
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2021-present Burak Cakmakoglu',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/bcakmakoglu/vue-flow' },
      { icon: 'discord', link: 'https://discord.gg/rwt6CBk4b5' },
    ],
    search: {
      provider: 'algolia',
      options: {
        appId: 'F7BJNSM4M5',
        apiKey: process.env.ALGOLIA_API_KEY!,
        indexName: 'vueflow',
      },
    },
    nav: [
      { text: `v${vueFlowVersion.value}`, link: '/changelog/', activeMatch: '^/changelog' },
      { text: 'Guide', link: '/guide/', activeMatch: '^/guide/' },
      {
        text: 'Examples',
        link: '/examples/',
        activeMatch: '^/examples/',
      },
      {
        text: 'Migration',
        link: '/migration/',
        activeMatch: '^/migration/',
      },
      {
        text: 'TypeDocs',
        link: '/typedocs/',
        activeMatch: '^/typedocs/',
      },
    ],
    sidebar: {
      '/guide/': guideSidebarEntries(),
      '/examples/': examplesSidebarEntries(),
      '/typedocs/': typedocSidebarEntries(),
      '/changelog/': changelogSidebarEntries(),
    },
  },
})
