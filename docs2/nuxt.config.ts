import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

process.env.NUXT_INLINE_STYLES = 'true'

export default defineNuxtConfig({
  extends: '@nuxt-themes/docus',
  components: [
    {
      prefix: '',
      path: resolve('./components'),
      global: true
    },
  ]
})
