import { resolve } from 'node:path'
import { readdirSync, statSync } from 'node:fs'
import type { DefaultTheme, HeadConfig } from 'vitepress'
import { defineConfigWithTheme } from 'vitepress'
import WindiCSS from 'vite-plugin-windicss'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { useVueFlow } from '@vue-flow/core'
import llmstxt from 'vitepress-plugin-llms'
import head from './head'
import { copyVueFlowPlugin, files } from './plugins'

const { vueFlowVersion } = useVueFlow()

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function typedocSidebarEntries() {
  const filePath = resolve(__dirname, '../typedocs')

  const docsModules = readdirSync(filePath).filter((name) => statSync(`${filePath}/${name}`).isDirectory())

  return docsModules.map((module) => {
    let children = readdirSync(`${filePath}/${module}/`).map<DefaultTheme.SidebarItem>((entry) => ({
      text: entry.replace('.md', ''),
      link: `/typedocs/${module}/${entry.replace('.md', '')}`,
    }))

    if (module === 'variables') {
      children = children.filter((child) => {
        return child.link?.includes('default')
      })
    }

    return { text: capitalize(module), collapsed: false, items: children } as DefaultTheme.SidebarItem
  })
}

function changelogSidebarEntries(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'CHANGELOG',
      collapsed: true,
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
  dir: 'ltr',
  lang: 'en-US',
  head: head as HeadConfig[],

  outDir: resolve(__dirname, '../../dist'),

  vite: {
    define: {
      // eslint-disable-next-line n/prefer-global/process
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
        defaultClass: 'inline-block align-middle',
      }),
      llmstxt(),
    ],
  },

  sitemap: {
    hostname: 'https://vueflow.dev',
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
    algolia: {
      appId: 'F7BJNSM4M5',
      // eslint-disable-next-line n/prefer-global/process
      apiKey: process.env.ALGOLIA_API_KEY!,
      indexName: 'vueflow',
    },
    nav: [
      { text: `v${vueFlowVersion}`, link: '/changelog/', activeMatch: '^/changelog' },
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
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/guide/' },
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Theming', link: '/guide/theming' },
            { text: 'Nodes', link: '/guide/node' },
            { text: 'Edges', link: '/guide/edge' },
            { text: 'Handles', link: '/guide/handle' },
            { text: 'Composables', link: '/guide/composables' },
            { text: 'Controlled Flow', link: '/guide/controlled-flow' },
          ],
        },
        {
          text: 'Vue Flow',
          collapsed: false,
          items: [
            { text: 'Configuration', link: '/guide/vue-flow/config' },
            { text: 'State', link: '/guide/vue-flow/state' },
            {
              text: 'Events',
              link: '/guide/vue-flow/events',
            },
            {
              text: 'Actions',
              link: '/typedocs/interfaces/Actions.html',
            },
            {
              text: 'Getters',
              link: '/typedocs/interfaces/Getters.html',
            },
            { text: 'Slots', link: '/guide/vue-flow/slots' },
          ],
        },
        {
          text: 'Utilities',
          collapsed: false,
          items: [
            { text: 'Graph', link: '/guide/utils/graph' },
            { text: 'Viewport', link: '/guide/utils/instance' },
            { text: 'Edges', link: '/guide/utils/edge' },
          ],
        },
        {
          text: 'Components',
          collapsed: false,
          items: [
            { text: 'Background', link: '/guide/components/background' },
            { text: 'MiniMap', link: '/guide/components/minimap' },
            { text: 'MiniMapNode', link: '/guide/components/minimap-node' },
            { text: 'Controls', link: '/guide/components/controls' },
            { text: 'Control Button', link: '/guide/components/control-button' },
            { text: 'Node Toolbar', link: '/guide/components/node-toolbar' },
            { text: 'Node Resizer', link: '/guide/components/node-resizer' },
          ],
        },
        {
          text: 'Troubleshooting',
          link: '/guide/troubleshooting',
        },
      ],
      '/examples/': [
        {
          text: 'General',
          collapsed: false,
          items: [
            { text: 'Basic', link: '/examples/' },
            { text: 'Drag & Drop', link: '/examples/dnd' },
            { text: 'Interactions', link: '/examples/interaction' },
            { text: 'Save & Restore', link: '/examples/save' },
            { text: 'Math Operation Flow', link: '/examples/math' },
            { text: 'Screenshot', link: '/examples/screenshot' },
            { text: 'Confirm Delete', link: '/examples/confirm' },
            { text: 'Hidden', link: '/examples/hidden' },
            { text: 'Multiple Flows', link: '/examples/multi' },
            { text: 'Pinia Store', link: '/examples/pinia' },
            { text: 'Viewport Transition', link: '/examples/transition' },
            { text: 'Teleport Nodes', link: '/examples/teleport' },
            { text: 'Stress Test', link: '/examples/stress' },
          ],
        },
        {
          text: 'Layout',
          collapsed: false,
          items: [
            { text: 'Simple Layout', link: '/examples/layout/simple' },
            { text: 'Animation & Layout', link: '/examples/layout/animated' },
          ],
        },
        {
          text: 'Nodes',
          collapsed: false,
          items: [
            { text: 'Custom Node', link: '/examples/nodes/' },
            { text: 'Update Node', link: '/examples/nodes/update-node' },
            { text: 'Intersections', link: '/examples/nodes/intersection' },
            { text: 'Nested Nodes', link: '/examples/nodes/nesting' },
            { text: 'Node Resizer', link: '/examples/nodes/node-resizer' },
            { text: 'Node Toolbar', link: '/examples/nodes/node-toolbar' },
          ],
        },
        {
          text: 'Edges',
          collapsed: false,
          items: [
            { text: 'Edges', link: '/examples/edges/' },
            { text: 'Updatable Edge', link: '/examples/edges/updatable-edge' },
            { text: 'Custom Connection Line', link: '/examples/edges/connection-line' },
            { text: 'Connection Validation', link: '/examples/edges/validation' },
            { text: 'Edge Markers', link: '/examples/edges/markers' },
            { text: 'Connection Radius', link: '/examples/edges/connection-radius' },
            { text: 'Loopback Edge', link: '/examples/edges/loopback' },
          ],
        },
      ],
      '/typedocs/': typedocSidebarEntries(),
      '/changelog/': changelogSidebarEntries(),
    },
  },
})
