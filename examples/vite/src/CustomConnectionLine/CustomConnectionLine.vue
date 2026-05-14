<script lang="ts" setup>
import type { Edge, Node } from '@vue-flow/core'
import { VueFlow } from '@vue-flow/core'
import ConnectionLine from './ConnectionLine.vue'

const nodes = ref<Node[]>([
  {
    id: '1',
    type: 'input',
    data: { label: 'Node 1' },
    position: { x: 250, y: 5 },
  },
])

const edges = ref<Edge[]>([])
</script>

<template>
  <VueFlow v-model:nodes="nodes" v-model:edges="edges">
    <template #connection-line="{ sourceX, sourceY, targetX, targetY }">
      <ConnectionLine :source-x="sourceX" :source-y="sourceY" :target-x="targetX" :target-y="targetY" />
    </template>
  </VueFlow>
</template>
