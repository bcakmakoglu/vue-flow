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
      vue: resolve('./node_modules/vue'),
    },
    resolve: {
      dedupe: ['vue'],
      preserveSymlinks: false,
    },
  },
  target: 'server',
  ssr: true,
  buildModules: ['nuxt-windicss'],
})
