import { resolve } from 'path'
import { Theme } from 'vuepress'

export default {
  name: 'vuepress-theme-local',
  extends: '@vuepress/theme-default',
  layouts: {
    Layout: resolve(__dirname, 'layouts/default.vue'),
  },
} as Theme
