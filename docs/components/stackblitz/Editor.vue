<script lang="ts" setup>
import sdk from '@stackblitz/sdk'

const ref = templateRef<HTMLDivElement>('el', null)

onMounted(() => {
  sdk.embedProject(ref.value, {
    title: 'Test',
    description: 'This is a test',
    template: 'vue',
    files: {
      '/test.ts': '/test.ts',
    },
  })
})
</script>
<template>
  <div ref="el"></div>
</template>
