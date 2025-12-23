<script lang="ts" setup>
import EdgeWrapper from '../../components/Edges/EdgeWrapper'
import ConnectionLine from '../../components/ConnectionLine'
import ConnectionEdge from '../../components/ConnectionEdge'
import { useVueFlow } from '../../composables'
import { getEdgeZIndex } from '../../utils'
import MarkerDefinitions from './MarkerDefinitions.vue'

const { findNode, getEdges, elevateEdgesOnSelect, keepEdgeTypeDuringUpdate } = useVueFlow()
console.log('keepEdgeTypeDuringUpdate in EdgeRenderer:', keepEdgeTypeDuringUpdate)
</script>

<script lang="ts">
export default {
  name: 'Edges',
  compatConfig: { MODE: 3 },
}
</script>

<template>
  <MarkerDefinitions />

  <svg
    v-for="edge of getEdges"
    :key="edge.id"
    class="vue-flow__edges vue-flow__container"
    :style="{ zIndex: getEdgeZIndex(edge, findNode, elevateEdgesOnSelect) }"
  >
    <EdgeWrapper :id="edge.id" />
  </svg>

  <ConnectionEdge v-if="keepEdgeTypeDuringUpdate" />
  <ConnectionLine v-else />
</template>
