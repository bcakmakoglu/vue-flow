import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  meta: {
    title: 'Vue Flow',
    description: 'Vue Flow Documentation',
  },
  router: {
    base: '/',
  },
  buildModules: ['nuxt-windicss'],
})
