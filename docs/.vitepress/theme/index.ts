import { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme'
import 'virtual:windi.css'
import '@braks/vue-flow/dist/style.css'
import '@braks/vue-flow/dist/theme-default.css'
import '../assets/index.css'

export default {
  ...DefaultTheme,
} as Theme
