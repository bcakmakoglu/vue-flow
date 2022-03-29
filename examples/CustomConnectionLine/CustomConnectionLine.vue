<script lang="ts" setup>
import ConnectionLine from './ConnectionLine.vue'
import { VueFlow, Background, BackgroundVariant, Elements } from '@braks/vue-flow'

const elements = ref<Elements>([
  {
    id: '1',
    type: 'input',
    label: 'Node 1',
    position: { x: 250, y: 5 },
  },
])
</script>
<template>
  <VueFlow v-model="elements">
    <template #connection-line="props">
      <ConnectionLine v-bind="props" />
    </template>
    <Background :variant="BackgroundVariant.Lines" />
  </VueFlow>
</template>
