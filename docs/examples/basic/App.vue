<script setup>
import { VueFlowProvider } from '@vue-flow/core';
import Flow from './Flow.vue';
</script>

<template>
  <!--
    `useVueFlow()` resolves the store from the nearest `<VueFlow>` / `<VueFlowProvider>` ancestor.
    `Flow` both calls `useVueFlow()` and renders its own `<VueFlow>`, so it needs a provider *above* it —
    wrap it in `<VueFlowProvider>` (the same store is then shared by the composable and the flow).
  -->
  <VueFlowProvider>
    <Flow />
  </VueFlowProvider>
</template>
