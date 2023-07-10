<script lang="ts" setup>
import { getCurrentInstance, inject, resolveComponent } from 'vue'
import EdgeWrapper from '../../components/Edges/EdgeWrapper'
import ConnectionLine from '../../components/ConnectionLine'
import type { EdgeComponent, EdgeUpdatable, GraphEdge } from '../../types'
import { Slots } from '../../context'
import { useVueFlow } from '../../composables'
import { ErrorCode, VueFlowError, getEdgeZIndex } from '../../utils'
import MarkerDefinitions from './MarkerDefinitions.vue'

const slots = inject(Slots)

const {
  edgesUpdatable,
  edgesFocusable,
  elementsSelectable,
  findNode,
  getEdges,
  getEdgeTypes,
  elevateEdgesOnSelect,
  dimensions,
  emits,
} = useVueFlow()

const instance = getCurrentInstance()

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

  const slot = slots?.[`edge-${name}`]
  if (slot) {
    return slot
  }

  let edgeType = template ?? getEdgeTypes.value[name]

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

  emits.error(new VueFlowError(ErrorCode.EDGE_TYPE_MISSING, edgeType))

  return false
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
    <svg class="vue-flow__edges vue-flow__container">
      <MarkerDefinitions />
    </svg>

    <svg
      v-for="edge of getEdges"
      :key="edge.id"
      class="vue-flow__edges vue-flow__container"
      :style="{ zIndex: getEdgeZIndex(edge, findNode, elevateEdgesOnSelect) }"
    >
      <EdgeWrapper
        :id="edge.id"
        :edge="edge"
        :type="getType(edge.type, edge.template)"
        :name="edge.type || 'default'"
        :selectable="selectable(edge.selectable)"
        :updatable="updatable(edge.updatable)"
        :focusable="focusable(edge.focusable)"
      />
    </svg>

    <ConnectionLine />
  </template>
</template>
