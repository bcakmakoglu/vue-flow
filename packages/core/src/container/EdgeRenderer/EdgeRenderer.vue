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
  dimensions,
  emits,
} = useVueFlow()

const sourceNode = controlledComputed(
  () => connectionStartHandle.value?.nodeId,
  () => {
    if (connectionStartHandle.value?.nodeId) return findNode(connectionStartHandle.value.nodeId)

    return false
  },
)

const connectionLineVisible = controlledComputed(
  () => connectionStartHandle.value?.nodeId,
  () =>
    !!(
      sourceNode.value &&
      (typeof sourceNode.value.connectable === 'undefined' ? nodesConnectable : sourceNode.value.connectable) &&
      connectionStartHandle.value?.nodeId &&
      connectionStartHandle.value?.type
    ),
)

const groups = controlledComputed(
  [
    () => getEdges.value.map((e) => e.zIndex),
    () => (elevateEdgesOnSelect ? [getSelectedNodes.value.length] : [0]),
    () => (elevateEdgesOnSelect ? getNodesInitialized.value.map((n) => n.computedPosition.z) : []),
  ],
  () => groupEdgesByZLevel(getEdges.value, findNode, elevateEdgesOnSelect.value),
)

function selectable(edgeSelectable?: boolean) {
  return typeof edgeSelectable === 'undefined' ? elementsSelectable.value : edgeSelectable
}
function updatable(edgeUpdatable?: EdgeUpdatable) {
  return typeof edgeUpdatable === 'undefined' ? edgesUpdatable.value : edgeUpdatable
}
function focusable(edgeFocusable?: boolean) {
  return typeof edgeFocusable === 'undefined' ? edgesFocusable.value : edgeFocusable
}

function getType(type?: string, template?: GraphEdge['template']) {
  const name = type || 'default'
  let edgeType = template ?? getEdgeTypes.value[name]
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
    emits.error(new VueFlowError(ErrorCode.EDGE_TYPE_MISSING, edgeType))
    return false
  }

  return slot
}
</script>

<script lang="ts">
export default {
  name: 'Edges',
  compatConfig: { MODE: 3 },
}
</script>

<template>
  <template v-if="dimensions.width && dimensions.height">
    <svg
      v-for="group of groups"
      :key="group.level"
      class="vue-flow__edges vue-flow__container"
      :style="`z-index: ${group.level}`"
    >
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

    <svg
      v-if="connectionLineVisible && sourceNode && connectionStartHandle"
      class="vue-flow__edges vue-flow__connectionline vue-flow__container"
    >
      <ConnectionLine :source-node="sourceNode" :connection-start-handle="connectionStartHandle" />
    </svg>
  </template>
</template>
