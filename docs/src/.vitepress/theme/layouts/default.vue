<script setup>
import { watch } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

const { Layout: ParentLayout } = DefaultTheme

const route = useRoute()

const METICULOUS_SAMPLING_RATE = 0.01

onMounted(async () => {
  const isDev = import.meta.env.DEV

  if (!isDev) {
    const { webVitals } = await import('../../plugins/vercel-web-vitals-api')
    webVitals({ analyticsId: '__ANALYTICS_ID__', debug: false })
  }

  if (!isDev || Math.random() < METICULOUS_SAMPLING_RATE) {
    const { tryLoadAndStartRecorder } = await import('@alwaysmeticulous/recorder-loader')

    // Start the Meticulous recorder before you initialise your app.
    // Note: all errors are caught and logged, so no need to surround with try/catch
    tryLoadAndStartRecorder({
      projectId: '__METICULOUS_PROJECT_ID__',
      isProduction: !isDev,
      maxMsToBlockFor: !isDev ? 250 : undefined, // Optional, abandon waiting to load the Meticulous recorder, if it takes more than 250ms
    })
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
  <ParentLayout></ParentLayout>
</template>
