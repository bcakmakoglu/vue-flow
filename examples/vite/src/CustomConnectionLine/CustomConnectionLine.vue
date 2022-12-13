<script lang="ts" setup>
import type { Elements } from '@vue-flow/core'
import { VueFlow } from '@vue-flow/core'
import { Background, BackgroundVariant } from '@vue-flow/background'
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
