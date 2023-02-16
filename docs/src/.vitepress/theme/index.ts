import type { Theme } from 'vitepress'
import VueAnimXyz from '@animxyz/vue3'
import DefaultTheme from 'vitepress/theme'
import { inject } from '@vercel/analytics'
import Layout from './layouts/default.vue'
import 'virtual:windi.css'
import '@animxyz/core'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import '@vue-flow/controls/dist/style.css'
import '@vue-flow/minimap/dist/style.css'
import './../../assets/index.css'

const CustomTheme = {
  ...DefaultTheme,
  Layout,
  enhanceApp: ({ app }) => {
    app.use(VueAnimXyz)
    inject()
  },
} as Theme

export default CustomTheme
