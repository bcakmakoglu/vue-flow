<script lang="ts" setup>
import EdgeWrapper from '../../components/Edges/EdgeWrapper'
import ConnectionLine from '../../components/ConnectionLine/ConnectionLine.vue'
import type { EdgeComponent, EdgeUpdatable, GraphEdge } from '../../types'
import MarkerDefinitions from './MarkerDefinitions.vue'

const slots = inject(Slots)

const {
  connectionStartHandle,
  nodesConnectable,
  edgesUpdatable,
  edgesFocusable,
  elementsSelectable,
  getSelectedNodes,
  findNode,
  getEdges,
  getNodesInitialized,
  getEdgeTypes,
  elevateEdgesOnSelect,
} = $(useVueFlow())

const sourceNode = $(
  controlledComputed(
    () => connectionStartHandle?.nodeId,
    () => {
      if (connectionStartHandle?.nodeId) return findNode(connectionStartHandle.nodeId)

      return false
    },
  ),
)

const connectionLineVisible = $(
  controlledComputed(
    () => connectionStartHandle?.nodeId,
    () =>
      !!(
        sourceNode &&
        (typeof sourceNode.connectable === 'undefined' ? nodesConnectable : sourceNode.connectable) &&
        connectionStartHandle?.nodeId &&
        connectionStartHandle?.type
      ),
  ),
)

const groups = controlledComputed(
  [
    () => getEdges.map((e) => e.zIndex),
    () => (elevateEdgesOnSelect ? [getSelectedNodes.length] : [0]),
    () => (elevateEdgesOnSelect ? getNodesInitialized.map((n) => n.computedPosition.z) : []),
  ],
  () => groupEdgesByZLevel(getEdges, findNode, elevateEdgesOnSelect),
)

onBeforeUnmount(() => {
  stop?.()
})

const selectable = (edgeSelectable?: boolean) => (typeof edgeSelectable === 'undefined' ? elementsSelectable : edgeSelectable)
const updatable = (edgeUpdatable?: EdgeUpdatable) => (typeof edgeUpdatable === 'undefined' ? edgesUpdatable : edgeUpdatable)
const focusable = (edgeFocusable?: boolean) => (typeof edgeFocusable === 'undefined' ? edgesFocusable : edgeFocusable)

function getType(type?: string, template?: GraphEdge['template']) {
  const name = type || 'default'
  let edgeType = template ?? getEdgeTypes[name]
  const instance = getCurrentInstance()

  if (typeof edgeType === 'string') {
    if (instance) {
      const components = Object.keys(instance.appContext.components)
      if (components && components.includes(name)) {
        edgeType = resolveComponent(name, false) as EdgeComponent
      }
    }
  }
  if (edgeType && typeof edgeType !== 'string') return edgeType

  const slot = slots?.[`edge-${name}`]
  if (!slot) {
    warn(`Edge type "${type}" not found and no edge-slot detected. Using fallback type "default".`)
    return false
  }

  return slot
}
</script>

<script lang="ts">
export default {
  name: 'Edges',
}
</script>

<template>
  <template v-for="group of groups" :key="group.level">
    <svg class="vue-flow__edges vue-flow__container" :style="`z-index: ${group.level}`">
      <MarkerDefinitions v-if="group.isMaxLevel" />
      <g>
        <EdgeWrapper
          v-for="edge of group.edges"
          :id="edge.id"
          :key="edge.id"
          :edge="edge"
          :type="getType(edge.type, edge.template)"
          :name="edge.type || 'default'"
          :selectable="selectable(edge.selectable)"
          :updatable="updatable(edge.updatable)"
          :focusable="focusable(edge.focusable)"
        />
      </g>
    </svg>
  </template>

  <svg v-if="connectionLineVisible && !!sourceNode" class="vue-flow__edges vue-flow__connectionline vue-flow__container">
    <ConnectionLine :source-node="sourceNode" />
  </svg>
</template>
