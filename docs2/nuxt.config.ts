import { createResolver } from '@nuxt/kit'
import Icons from 'unplugin-icons/vite'
import { meta } from './meta'

const { resolve } = createResolver(import.meta.url)

// eslint-disable-next-line turbo/no-undeclared-env-vars
process.env.NUXT_INLINE_STYLES = 'true'

export default defineNuxtConfig({
  extends: '@nuxt-themes/docus',
  components: [
    {
      prefix: '',
      path: resolve('./components'),
      global: true,
    },
  ],

  modules: ['nuxt-windicss', '@vueuse/nuxt'],

  vite: {
    plugins: [
      Icons({
        compiler: 'vue3',
      }),
    ],
  },

  css: ['@/assets/css/main.css'],

  app: {
    head: {
      title: meta.title,
      meta: [
        {
          name: 'description',
          content: meta.description,
        },
        {
          name: 'keywords',
          content: meta.keywords,
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        { hid: 'og:title', name: 'og:title', content: meta.title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: meta.description,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `http://${meta.img}`,
        },
        {
          hid: 'og:image:secure_url',
          property: 'og:image:secure_url',
          content: `https://${meta.img}`,
        },
        {
          hid: 'og:image:type',
          property: 'og:image:type',
          content: 'image/png',
        },
        {
          hid: 'og:image:width',
          property: 'og:image:width',
          content: '2428',
        },
        {
          hid: 'og:image:height',
          property: 'og:image:height',
          content: '1280',
        },
        { hid: 'og:url', property: 'og:url', content: meta.url },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          content: meta.url,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: meta.title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: meta.description,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: meta.img,
        },
      ],
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicons/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicons/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicons/android-chrome-192x192.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicons/android-chrome-512x512.png' },
        { rel: 'manifest', href: '/favicons/site.webmanifest' },
        { rel: 'shortcut icon', href: '/favicons/favicon.ico' },
      ],
    },
  },
})
