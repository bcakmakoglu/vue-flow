<script lang="ts" setup>
import { getCurrentInstance, inject, resolveComponent } from 'vue'
import { controlledComputed } from '@vueuse/core'
import EdgeWrapper from '../../components/Edges/EdgeWrapper'
import ConnectionLine from '../../components/ConnectionLine'
import type { EdgeComponent, EdgeUpdatable, GraphEdge } from '../../types'
import { Slots } from '../../context'
import { useVueFlow } from '../../composables'
import { ErrorCode, VueFlowError, groupEdgesByZLevel } from '../../utils'
import MarkerDefinitions from './MarkerDefinitions.vue'

const slots = inject(Slots)

const {
  edgesUpdatable,
  edgesFocusable,
  elementsSelectable,
  getSelectedNodes,
  findNode,
  edges,
  getEdges,
  getNodesInitialized,
  getEdgeTypes,
  elevateEdgesOnSelect,
  dimensions,
  emits,
} = useVueFlow()

const groups = controlledComputed(
  [
    () => edges.value.map((e) => e.zIndex),
    () => (elevateEdgesOnSelect.value ? [getSelectedNodes.value.length] : [0]),
    () => (elevateEdgesOnSelect.value ? getNodesInitialized.value.map((n) => n.computedPosition.z) : []),
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
  if (edgeType && typeof edgeType !== 'string') {
    return edgeType
  }

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

    <ConnectionLine />
  </template>
</template>
