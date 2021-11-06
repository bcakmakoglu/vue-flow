import { resolve } from 'path'
import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  meta: {
    title: 'Vue Flow',
    description: 'Vue Flow Documentation',
  },
  router: {
    base: '/',
  },
  vite: {
    alias: {
      dagre: resolve('./node_modules/dagre'),
      vue: resolve('./node_modules/vue'),
    },
    resolve: {
      dedupe: ['vue'],
      preserveSymlinks: false,
    },
  },
  buildModules: ['nuxt-windicss'],
})
