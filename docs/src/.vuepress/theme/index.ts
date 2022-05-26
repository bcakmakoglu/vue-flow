import { resolve } from 'path'
import { Theme } from 'vuepress'
import { path } from '@vuepress/utils'

export default {
  name: 'vuepress-theme-local',
  extends: '@vuepress/theme-default',
  layouts: {
    Layout: resolve(__dirname, 'layouts/default.vue'),
  },
  clientAppEnhanceFiles: path.resolve(__dirname, './clientAppEnhance.ts'),
} as Theme
