import { config } from 'dotenv'
import { resolve } from 'path'
import { defineUserConfig } from 'vuepress'
import type { HeadConfig } from 'vuepress'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { viteBundler } from '@vuepress/bundler-vite'
import WindiCSS from 'vite-plugin-windicss'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { copyVueFlowPlugin } from './copy-plugin'
import head from './head'
import Theme from './theme'

config({ path: resolve(__dirname, '.env') })

export default defineUserConfig({
  title: 'Vue Flow',
  description: 'Visualize your ideas with Vue Flow, a highly customizable Vue3 Flowchart library.',
  head: head as HeadConfig[],

  dest: resolve(__dirname, '../../dist'),

  bundler: viteBundler({
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
    }
  }),

  plugins: [
    [
      docsearchPlugin({
        appId: 'F7BJNSM4M5',
        apiKey: process.env.ALGOLIA_API_KEY!,
        indexName: 'vueflow',
      })
    ],
  ],

  theme: Theme,
})
