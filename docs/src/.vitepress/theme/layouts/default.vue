<script setup>
import DefaultTheme from 'vitepress/theme'
import { webVitals } from '../../plugins/vercel-web-vitals-api'

const { Layout: ParentLayout } = DefaultTheme

onMounted(() => {
  webVitals({ analyticsId: '__ANALYTICS_ID__', debug: false })
})
</script>

<template>
  <ParentLayout></ParentLayout>
</template>

<style>
.page-footer {
  @apply py-4 text-center;
}
</style>
