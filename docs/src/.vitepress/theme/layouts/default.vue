<script setup>
import { watch } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

const { Layout: ParentLayout } = DefaultTheme

const route = useRoute()

onMounted(async () => {
  if (!import.meta.env.DEV) {
    const { webVitals } = await import('../../plugins/vercel-web-vitals-api')
    webVitals({ analyticsId: '__ANALYTICS_ID__', debug: false })
  }
})

watch(
  route,
  (nextRoute) => {
    if (nextRoute.path.includes('/examples')) {
      document.body.className = 'examples'
    } else {
      document.body.className = ''
    }
  },
  { immediate: true, deep: true },
)
</script>

<template>
  <ParentLayout></ParentLayout>
</template>
