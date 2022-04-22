<script lang="ts" setup>
import EdgeWrapper from '../../components/Edges/EdgeWrapper.vue'
import ConnectionLine from '../../components/ConnectionLine/ConnectionLine.vue'
import { useVueFlow } from '../../composables'
import { groupEdgesByZLevel } from '../../utils'
import { EdgeComponent, GraphEdge } from '../../types'
import { Slots } from '../../context'
import MarkerDefinitions from './MarkerDefinitions.vue'

const slots = inject(Slots)

const {
  connectionNodeId,
  nodesConnectable,
  connectionHandleType,
  defaultMarkerColor,
  edgesUpdatable,
  elementsSelectable,
  getNode,
  getEdges,
  getEdgeTypes,
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

const getType = $computed(() => (edge: GraphEdge) => {
  const name = edge.type || 'default'
  let edgeType = edge.template ?? getEdgeTypes[name]
  const instance = getCurrentInstance()

  if (typeof edgeType === 'string') {
    if (instance) {
      const components = Object.keys(instance.appContext.components)
      if (components && components.includes(name)) {
        edgeType = resolveComponent(name, false) as EdgeComponent
      }
    }
  }
  if (typeof edgeType !== 'string') return edgeType

  const slot = slots?.[`edge-${name}`]
  if (!slot?.({})) {
    console.warn(`[vueflow]: Edge type "${edge.type}" not found and no edge-slot detected. Using fallback type "default".`)
    return false
  }

  return slot
})
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
        :name="getType(edge) ? edge.type ?? 'default' : 'default'"
        :type="getType(edge)"
        :source-node="getNodeWrapped(edge.source)"
        :target-node="getNodeWrapped(edge.target)"
        :selectable="typeof edge.selectable === 'undefined' ? elementsSelectable : edge.selectable"
        :updatable="typeof edge.updatable === 'undefined' ? edgesUpdatable : edge.updatable"
      />
      <ConnectionLine v-if="connectionLineVisible && !!sourceNode" :source-node="sourceNode" />
    </g>
  </svg>
</template>
