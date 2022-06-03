<script lang="ts" setup>
import type { Elements } from '@braks/vue-flow'
import { Background, BackgroundVariant, VueFlow } from '@braks/vue-flow'
import ConnectionLine from './ConnectionLine.vue'

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
