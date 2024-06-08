<script lang="ts" setup>
import sdk from '@stackblitz/sdk'

const el = ref<HTMLDivElement>()

onMounted(() => {
  sdk.embedProjectId(el.value!, 'vitejs-vite-wnam9z', {
    forceEmbedLayout: true,
    openFile: 'src/App.vue',
    height: 750,
  })
})
</script>

<template>
  <div ref="el" class="outline-none"></div>
</template>
