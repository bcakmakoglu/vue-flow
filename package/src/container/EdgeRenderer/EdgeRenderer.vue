<script lang="ts" setup>
import EdgeWrapper from '../../components/Edges/EdgeWrapper.vue'
import ConnectionLine from '../../components/ConnectionLine/ConnectionLine.vue'
import { useVueFlow } from '../../composables'
import { groupEdgesByZLevel } from '../../utils'
import MarkerDefinitions from './MarkerDefinitions.vue'

const {
  connectionNodeId,
  nodesConnectable,
  connectionHandleType,
  defaultMarkerColor,
  edgesUpdatable,
  elementsSelectable,
  getNode,
  getEdges,
} = $(useVueFlow())

const sourceNode = $(
  controlledComputed(
    () => connectionNodeId,
    () => {
      if (connectionNodeId) return getNode(connectionNodeId)
      return false
    },
  ),
)

const connectionLineVisible = $(
  controlledComputed(
    () => connectionNodeId,
    () =>
      !!(
        sourceNode &&
        (typeof sourceNode.connectable === 'undefined' ? nodesConnectable : sourceNode.connectable) &&
        connectionNodeId &&
        connectionHandleType
      ),
  ),
)

const getNodeWrapped = (node: string) => getNode(node)!

const groups = computed(() => groupEdgesByZLevel(getEdges, getNodeWrapped))
</script>
<script lang="ts">
export default {
  name: 'Edges',
}
</script>
<template>
  <svg v-for="group of groups" :key="group.level" class="vue-flow__edges vue-flow__container" :style="`z-index: ${group.level}`">
    <MarkerDefinitions v-if="group.isMaxLevel" :default-color="defaultMarkerColor" />
    <g>
      <EdgeWrapper
        v-for="edge of group.edges"
        :id="edge.id"
        :key="edge.id"
        :edge="edge"
        :source-node="getNodeWrapped(edge.source)"
        :target-node="getNodeWrapped(edge.target)"
        :selectable="typeof edge.selectable === 'undefined' ? elementsSelectable : edge.selectable"
        :updatable="typeof edge.updatable === 'undefined' ? edgesUpdatable : edge.updatable"
      />
      <ConnectionLine v-if="connectionLineVisible && !!sourceNode" :source-node="sourceNode" />
    </g>
  </svg>
</template>
