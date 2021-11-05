<script lang="ts" setup>
import Flow from './Flow.vue'
</script>
<template>
  <div class="vue-flow__example-multiflows flex-1">
    <Flow />
    <Flow />
  </div>
</template>
<style>
.vue-flow__example-multiflows {
  display: flex;
  height: 100%;
}

.vue-flow__example-multiflows .vue-flow {
  width: 100%;
  height: 100%;
}

.vue-flow__example-multiflows .vue-flow:first-child {
  border-right: 2px solid #333;
}
</style>
