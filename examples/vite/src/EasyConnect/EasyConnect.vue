<script lang="ts" setup>
import { ref } from 'vue'
import { Background } from '@vue-flow/background'
import type { Node } from '@vue-flow/core'
import { MarkerType, VueFlow, useVueFlow } from '@vue-flow/core'
import CustomNode from './CustomNode.vue'
import FloatingConnectionLine from './FloatingConnectionLine.vue'
import FloatingEdge from './FloatingEdge.vue'

const { onConnect, addEdges } = useVueFlow()

const defaultEdgeOptions = {
  style: { strokeWidth: 3, stroke: 'black' },
  type: 'floating',
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: 'black',
  },
}

const nodes = ref<Node[]>([
  {
    id: '1',
    type: 'custom',
    position: { x: 0, y: 0 },
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 250, y: 320 },
  },
  {
    id: '3',
    type: 'custom',
    position: { x: 40, y: 300 },
  },
  {
    id: '4',
    type: 'custom',
    position: { x: 300, y: 0 },
  },
])

const edges = ref([])

onConnect(addEdges)
</script>

<template>
  <VueFlow
    v-model:nodes="nodes"
    v-model:edges="edges"
    :elevate-nodes-on-select="false"
    :default-edge-options="defaultEdgeOptions"
    fit-view-on-init
  >
    <Background :gap="8" />

    <template #node-custom="props">
      <CustomNode :id="props.id" />
    </template>

    <template #edge-floating="fProps">
      <FloatingEdge v-bind="fProps" />
    </template>

    <template #connection-line="cProps">
      <FloatingConnectionLine v-bind="cProps" />
    </template>
  </VueFlow>
</template>
