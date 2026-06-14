<script setup lang="ts">
import { VueFlowProvider } from '@vue-flow/core';
import Flow from './Flow.vue';
</script>

<template>
  <!-- `Flow` calls `useVueFlow()` and renders `<VueFlow>`, so it needs a `<VueFlowProvider>` ancestor to share one store. -->
  <VueFlowProvider>
    <Flow />
  </VueFlowProvider>
</template>
