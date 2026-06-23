<script setup>
import { watch } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

const { Layout: ParentLayout } = DefaultTheme

const route = useRoute()

onMounted(async () => {
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
  <ParentLayout />
</template>
