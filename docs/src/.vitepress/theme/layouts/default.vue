<script setup>
import { SpeedInsights } from '@vercel/speed-insights/vue'
import { watch } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

const { Layout: ParentLayout } = DefaultTheme

const route = useRoute()

onMounted(async () => {
  const isDev = import.meta.env.DEV

  if (!isDev) {
    const { webVitals } = await import('../../plugins/vercel-web-vitals-api')
    webVitals({ analyticsId: '__ANALYTICS_ID__', debug: false })
  }

  watch(
    route,
    (nextRoute) => {
      if (nextRoute.path.includes('/examples')) {
        document.body.className = 'examples'
      } else {
        document.body.className = ''
      }
    },
    { immediate: true },
  )
})
</script>

<template>
  <SpeedInsights />
  <ParentLayout />
</template>
