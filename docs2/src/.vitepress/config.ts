import { resolve } from 'path'
import { readdirSync, statSync } from 'fs'
import type { DefaultTheme, HeadConfig } from 'vitepress'
import { defineConfigWithTheme } from 'vitepress'
import WindiCSS from 'vite-plugin-windicss'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { useVueFlow } from '@braks/vue-flow'
import { copyVueFlowPlugin } from './copy-plugin'
import head from './head'

const { vueFlowVersion } = useVueFlow()

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const typedocSidebarEntries = (): DefaultTheme.SidebarGroup[] => {
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
      items: [...sidebarItems],
    },
  ]
}

export default defineConfigWithTheme<DefaultTheme.Config>({
  title: 'Vue Flow',
  description: 'Visualize your ideas with Vue Flow, a highly customizable Vue3 Flowchart library.',
  head: head as HeadConfig[],

  outDir: resolve(__dirname, '../../dist'),

  vite: {
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

  themeConfig: {
    logo: '/favicons/android-chrome-512x512.png',
    nav: [
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
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          collapsible: true,
          items: [
            { text: 'Introduction', link: '/guide/' },
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Theming', link: '/guide/theming' },
            { text: 'Nodes', link: '/guide/node' },
            { text: 'Edges', link: '/guide/edge' },
            { text: 'Composables', link: '/guide/composables' },
          ],
        },
        {
          text: 'Vue Flow',
          collapsible: true,
          items: [
            { text: 'Config / Props', link: '/guide/vue-flow/config' },
            { text: 'State', link: '/guide/vue-flow/state' },
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
            { text: 'Slots', link: '/guide/vue-flow/slots' },
          ],
        },
        {
          text: 'Utilities',
          collapsible: true,
          items: [
            { text: 'Graph', link: '/guide/utils/graph' },
            { text: 'Viewport', link: '/guide/utils/instance' },
            { text: 'Edges', link: '/guide/utils/edge' },
          ],
        },
        {
          text: 'Components',
          collapsible: true,
          items: [
            { text: 'Background', link: '/guide/components/background' },
            { text: 'MiniMap', link: '/guide/components/minimap' },
            { text: 'MiniMapNode', link: '/guide/components/minimap-node' },
            { text: 'Controls', link: '/guide/components/controls' },
            { text: 'Control Button', link: '/guide/components/control-button' },
          ],
        },
      ],
    },
  },
})
