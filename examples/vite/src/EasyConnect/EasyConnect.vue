<script lang="ts" setup>
import { ref } from 'vue'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import type { Elements } from '@vue-flow/core'
import { MarkerType, VueFlow, useVueFlow } from '@vue-flow/core'
import CustomNode from './CustomNode.vue'
import CustomConnectionLine from './CustomConnectionLine.vue'
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

const elements = ref<Elements>([
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

onConnect((params) => {
  console.log('connecting')

  addEdges([params])
})
</script>

<template>
  <div style="height: 100vh">
    <VueFlow
      v-model="elements"
      :elevate-nodes-on-select="false"
      class="vue-flow-basic-example"
      :default-zoom="1.5"
      :default-edge-options="defaultEdgeOptions"
      :min-zoom="0.2"
      :max-zoom="4"
    >
      <Background pattern-color="#aaa" :gap="8" />

      <MiniMap />

      <Controls />

      <template #node-custom="props">
        <CustomNode :id="props.id" />
      </template>

      <template #edge-floating="fProps">
        <FloatingEdge v-bind="fProps" />
      </template>

      <template #connection-line="cProps">
        <CustomConnectionLine v-bind="cProps" />
      </template>
    </VueFlow>
  </div>
</template>
