import { inject } from '@vercel/analytics'

// @ts-expect-error - no types
import TwoslashFloatingVue from 'vitepress-plugin-twoslash/client'
import 'virtual:windi.css'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import '@vue-flow/controls/dist/style.css'
import '@vue-flow/minimap/dist/style.css'
import 'vitepress-plugin-twoslash/style.css'

import Theme from 'vitepress/theme'
import Layout from './layouts/default.vue'
import './style.css'

export default {
  extends: Theme,
  Layout,
  enhanceApp({ app }) {
    inject()
    app.use(TwoslashFloatingVue)
  },
} as typeof Theme
