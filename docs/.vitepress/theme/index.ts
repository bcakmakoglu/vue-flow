import { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme'
import Demo from '../components/Demo.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Demo', Demo)
  }
} as Theme
