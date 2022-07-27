import type { Theme } from 'vitepress'
import VueAnimXyz from '@animxyz/vue3'
import DefaultTheme from 'vitepress/theme'

const CustomTheme = {
  ...DefaultTheme,
  enhanceApp: ({ app }) => {
    app.use(VueAnimXyz)
  },
} as Theme

export default CustomTheme
