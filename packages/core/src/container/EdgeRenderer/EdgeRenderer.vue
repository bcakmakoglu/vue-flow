<script lang="ts" setup>
import type { CSSProperties, EffectScope } from 'vue'
import EdgeWrapper from '../../components/Edges/Wrapper'
import ConnectionLine from '../../components/ConnectionLine/ConnectionLine.vue'
import { useVueFlow } from '../../composables'
import { groupEdgesByZLevel, warn } from '../../utils'
import type { EdgeComponent, EdgeUpdatable, GraphEdge } from '../../types'
import { Slots } from '../../context'
import MarkerDefinitions from './MarkerDefinitions.vue'

const slots = inject(Slots)

const {
  emits,
  connectionMode,
  edgeUpdaterRadius,
  onPaneReady,
  connectionStartHandle,
  nodesConnectable,
  edgesUpdatable,
  elementsSelectable,
  getSelectedNodes,
  nodesSelectionActive,
  getNode,
  getNodes,
  getEdges,
  getEdgeTypes,
  addSelectedEdges,
  noPanClassName,
  elevateEdgesOnSelect,
} = $(useVueFlow())

const selectable = (s?: boolean) => (typeof s === 'undefined' ? elementsSelectable : s)

const updatable = (u?: EdgeUpdatable) => (typeof u === 'undefined' ? edgesUpdatable : u)

const sourceNode = $(
  controlledComputed(
    () => connectionStartHandle?.nodeId,
    () => {
      if (connectionStartHandle?.nodeId) return getNode(connectionStartHandle.nodeId)
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

let groups = $ref<ReturnType<typeof groupEdgesByZLevel>>([])

let scope: EffectScope | null = effectScope()

onPaneReady(() => {
  if (!scope) scope = effectScope()

  scope.run(() => {
    watch(
      [$$(getSelectedNodes), $$(getEdges)],
      () => {
        if (elevateEdgesOnSelect) {
          nextTick(() => (groups = groupEdgesByZLevel(getEdges, getNode)))
        } else {
          groups = [
            {
              isMaxLevel: true,
              edges: getEdges,
              level: 0,
            },
          ]
        }
      },
      { immediate: true },
    )
  })
})

onBeforeUnmount(() => {
  scope?.stop()
  scope = null
})

const getType = (type?: string, template?: GraphEdge['template']) => {
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
  if (!slot?.({})) {
    warn(`Edge type "${type}" not found and no edge-slot detected. Using fallback type "default".`)
    return false
  }

  return slot
}

const getClass = (edge: GraphEdge) => {
  const extraClass = edge.class instanceof Function ? edge.class(edge) : edge.class
  return [noPanClassName, extraClass]
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
          :source-node="getNode(edge.source)"
          :target-node="getNode(edge.target)"
          :selectable="selectable(edge.selectable)"
          :updatable="updatable(edge.updatable)"
          :class="getClass(edge)"
        />
      </g>
    </svg>
  </template>

  <svg v-if="connectionLineVisible && !!sourceNode" class="vue-flow__edges vue-flow__connectionline vue-flow__container">
    <ConnectionLine :source-node="sourceNode" />
  </svg>
</template>
