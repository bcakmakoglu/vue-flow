import { resolve } from 'path'
import { readdirSync, statSync } from 'fs'
import type { DefaultTheme, HeadConfig } from 'vitepress'
import { defineConfigWithTheme } from 'vitepress'
import WindiCSS from 'vite-plugin-windicss'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { useVueFlow } from '@vue-flow/core'
import head from './head'
import { copyVueFlowPlugin, files } from './plugins'

const { vueFlowVersion } = useVueFlow()

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const typedocSidebarEntries = (): DefaultTheme.SidebarGroup[] => {
  const filePath = resolve(__dirname, '../typedocs')

  const docsModules = readdirSync(filePath).filter((name) => statSync(`${filePath}/${name}`).isDirectory())

  return docsModules.map((module) => {
    let children = readdirSync(`${filePath}/${module}/`).map<DefaultTheme.SidebarItem>((entry) => ({
      text: entry.replace('.md', ''),
      link: `/typedocs/${module}/${entry.replace('.md', '')}`,
    }))

    if (module === 'variables') {
      children = children.filter((child) => {
        return child.link.includes('default')
      })
    }

    return { text: capitalize(module), collapsible: true, items: children } as DefaultTheme.SidebarGroup
  })
}

const changelogSidebarEntries = (): DefaultTheme.SidebarGroup[] => {
  return [
    {
      text: 'CHANGELOG',
      collapsible: true,
      items: files.map((file) => {
        const name = file.pkgName.replace('.md', '')
        const isCore = name === 'core'

        return {
          text: name
            .split('-')
            .map((s) => capitalize(s))
            .join(' '),
          link: `/changelog/${isCore ? '' : name}`,
        }
      }),
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
      { icon: 'discord', link: 'https://discord.gg/F4v6qE4Fuq' },
    ],
    algolia: {
      appId: 'F7BJNSM4M5',
      apiKey: process.env.ALGOLIA_API_KEY!,
      indexName: 'vueflow',
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
        text: 'Plugins',
        link: '/plugins/',
        activeMatch: '^/plugins/',
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
            { text: 'Configuration', link: '/guide/vue-flow/config' },
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
      '/examples/': [
        {
          text: 'General Examples',
          collapsible: true,
          items: [
            { text: 'Basic', link: '/examples/' },
            { text: 'Save & Restore', link: '/examples/save' },
            { text: 'Drag & Drop', link: '/examples/dnd' },
            { text: 'Empty Flow', link: '/examples/empty' },
            { text: 'Hide/Show', link: '/examples/hidden' },
            { text: 'Horizontal Flow', link: '/examples/horizontal' },
            { text: 'Interactions', link: '/examples/interaction' },
            { text: 'Intersection', link: '/examples/intersection' },
            { text: 'Teleport', link: '/examples/teleport' },
            { text: 'Transition', link: '/examples/transition' },
            { text: 'Multiple Flows', link: '/examples/multi' },
            { text: 'Pinia', link: '/examples/pinia' },
            { text: 'Stress', link: '/examples/stress' },
          ],
        },
        {
          text: 'Nodes',
          collapsible: true,
          items: [
            { text: 'Custom Node', link: '/examples/nodes/' },
            { text: 'Update Node', link: '/examples/nodes/update-node' },
            { text: 'Nested Nodes', link: '/examples/nodes/nesting' },
          ],
        },
        {
          text: 'Edges',
          collapsible: true,
          items: [
            { text: 'Edges', link: '/examples/edges/' },
            { text: 'Updatable Edge', link: '/examples/edges/updatable-edge' },
            { text: 'Custom Connectionline', link: '/examples/edges/connection-line' },
            { text: 'Connection validation', link: '/examples/edges/validation' },
          ],
        },
      ],
      '/typedocs/': typedocSidebarEntries(),
      '/changelog/': changelogSidebarEntries(),
      '/plugins/': [
        {
          text: 'Plugins',
          collapsible: true,
          items: [],
        },
      ],
    },
  },
})
