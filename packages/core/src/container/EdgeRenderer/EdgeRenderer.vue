<script lang="ts" setup>
import EdgeWrapper from '../../components/Edges/EdgeWrapper'
import ConnectionLine from '../../components/ConnectionLine'
import { useVueFlow } from '../../composables'
import { getEdgeZIndex } from '../../utils'
import MarkerDefinitions from './MarkerDefinitions.vue'

const { getNode, getEdges, elevateEdgesOnSelect } = useVueFlow()
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
    :style="{ zIndex: getEdgeZIndex(edge, getNode, elevateEdgesOnSelect) }"
  >
    <EdgeWrapper :id="edge.id" />
  </svg>

  <ConnectionLine />
</template>
