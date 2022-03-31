import { resolve } from 'path'

export default {
  name: 'vuepress-theme-local',
  extends: '@vuepress/theme-default',
  layouts: {
    Layout: resolve(__dirname, 'layouts/default.vue'),
  },
}
