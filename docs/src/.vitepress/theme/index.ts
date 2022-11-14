import type { Theme } from 'vitepress'
import VueAnimXyz from '@animxyz/vue3'
import DefaultTheme from 'vitepress/theme'
import { webVitals } from '../plugins/vercel-web-vitals-api'
import Layout from './layouts/default.vue'
import 'virtual:windi.css'
import '@animxyz/core'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import './../../assets/index.css'

const CustomTheme = {
  ...DefaultTheme,
  Layout,
  enhanceApp: ({ app }) => {
    app.use(VueAnimXyz)
    webVitals({ analyticsId: '__ANALYTICS_ID__', debug: true })
  },
} as Theme

export default CustomTheme
