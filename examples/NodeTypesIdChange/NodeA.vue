<script lang="ts" setup>
const props = defineProps<{ nodeStyles: Record<string, any> }>()
</script>
<template>
  <div :style="props.nodeStyles">A</div>
</template>
