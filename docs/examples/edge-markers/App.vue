<script setup>
import { ref } from 'vue'
import { MarkerType, VueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import CustomEdge from './CustomEdge.vue'

const nodes = ref([
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Select me for diamond markers' } },
  { id: '2', position: { x: 0, y: 150 }, data: { label: 'Select me for circle markers' } },
  { id: '3', position: { x: 200, y: 0 }, data: { label: 'Node 3' } },
  { id: '4', position: { x: 200, y: 150 }, data: { label: 'Node 4' } },
  { id: '5', position: { x: 400, y: 0 }, data: { label: 'Node 5' } },
  { id: '6', position: { x: 400, y: 150 }, data: { label: 'Node 6' } },
])

const edges = ref([
  // This edge uses a custom marker defined in CustomMarker.vue
  { id: '1-2', source: '1', target: '2', type: 'custom' },
  {
    id: '3-4',
    source: '3',
    target: '4',
    label: 'Marker Arrow',
    // Use MarkerType enum to set the marker
    markerEnd: MarkerType.Arrow,
    markerStart: MarkerType.Arrow,
  },
  {
    id: '5-6',
    source: '5',
    target: '6',
    label: 'Marker ArrowClosed',
    // EdgeMarker object allows to customize the marker
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#ff0072',
    },
    markerStart: {
      type: MarkerType.ArrowClosed,
      color: '#ff0072',
    },
  },
])
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" fit-view-on-init>
    <template #edge-custom="edgeProps">
      <CustomEdge v-bind="edgeProps" />
    </template>

    <Background />
  </VueFlow>
</template>
