<script setup>
import sdk from '@stackblitz/sdk'

const el = ref()

onMounted(() => {
  sdk.embedProjectId(el.value, 'vitejs-vite-wyfpsj', {
    height: 750,
    forceEmbedLayout: true,
    openFile: 'src/App.vue',
  })
})
</script>

<template>
  <div ref="el" class="outline-none"></div>
</template>

<style>
.application {
  @apply h-[75vh];
}
</style>
