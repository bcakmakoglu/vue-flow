import VueAnimXyz from '@animxyz/vue3'
import { inject } from '@vercel/analytics'
import 'virtual:windi.css'
import '@animxyz/core'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import '@vue-flow/controls/dist/style.css'
import '@vue-flow/minimap/dist/style.css'

import Theme from 'vitepress/theme'
import Layout from './layouts/default.vue'
import './style.css'

export default {
  extends: Theme,
  Layout,
  enhanceApp({ app }) {
    app.use(VueAnimXyz)

    inject()
  },
} as typeof Theme
