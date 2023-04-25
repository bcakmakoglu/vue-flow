<script setup>
import { watch } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { webVitals } from '../../plugins/vercel-web-vitals-api'

const { Layout: ParentLayout } = DefaultTheme

const route = useRoute()

onMounted(() => {
  webVitals({ analyticsId: '__ANALYTICS_ID__', debug: false })
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

<style>
.page-footer {
  @apply py-4 text-center;
}
</style>
