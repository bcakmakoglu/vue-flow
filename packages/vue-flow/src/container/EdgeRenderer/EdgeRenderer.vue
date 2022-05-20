<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import EdgeWrapper from '../../components/Edges/Wrapper'
import ConnectionLine from '../../components/ConnectionLine/ConnectionLine.vue'
import { useHandle, useVueFlow } from '../../composables'
import { connectionExists, groupEdgesByZLevel } from '../../utils'
import type { EdgeComponent, GraphEdge } from '../../types'
import { Slots } from '../../context'
import MarkerDefinitions from './MarkerDefinitions.vue'

const slots = inject(Slots)

const {
  emits,
  connectionMode,
  edgeUpdaterRadius,
  onPaneReady,
  connectionNodeId,
  nodesConnectable,
  connectionHandleType,
  defaultMarkerColor,
  edgesUpdatable,
  elementsSelectable,
  getSelectedNodes,
  getNode,
  getNodes,
  getEdges,
  getEdgeTypes,
  setState,
  addSelectedEdges,
  noPanClassName,
} = $(useVueFlow())

const selectable = (s?: boolean) => (typeof s === 'undefined' ? elementsSelectable : s)
const updatable = (u?: boolean) => (typeof u === 'undefined' ? edgesUpdatable : u)

const sourceNode = $(
  controlledComputed($$(connectionNodeId), () => {
    if (connectionNodeId) return getNode(connectionNodeId)
    return false
  }),
)

const connectionLineVisible = $(
  controlledComputed(
    $$(connectionNodeId),
    () =>
      !!(
        sourceNode &&
        (typeof sourceNode.connectable === 'undefined' ? nodesConnectable : sourceNode.connectable) &&
        connectionNodeId &&
        connectionHandleType
      ),
  ),
)

let groups = $ref<ReturnType<typeof groupEdgesByZLevel>>([])

onPaneReady(() => {
  watch(
    [$$(getSelectedNodes), $$(getEdges), $$(getNodes)],
    () => {
      nextTick(() => (groups = groupEdgesByZLevel(getEdges, getNode)))
    },
    {
      flush: 'post',
      immediate: true,
    },
  )
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
    console.warn(`[vueflow]: Edge type "${type}" not found and no edge-slot detected. Using fallback type "default".`)
    return false
  }

  return slot
}

const onEdgeClick = (event: MouseEvent, edge: GraphEdge) => {
  const data = { event, edge }
  if (selectable(edge.selectable)) {
    setState({
      nodesSelectionActive: false,
    })

    addSelectedEdges([edge])
  }
  emits.edgeClick(data)
}

const onEdgeContextMenu = (event: MouseEvent, edge: GraphEdge) => emits.edgeContextMenu({ event, edge })

const onDoubleClick = (event: MouseEvent, edge: GraphEdge) => emits.edgeDoubleClick({ event, edge })

const onEdgeMouseEnter = (event: MouseEvent, edge: GraphEdge) => emits.edgeMouseEnter({ event, edge })

const onEdgeMouseMove = (event: MouseEvent, edge: GraphEdge) => emits.edgeMouseMove({ event, edge })

const onEdgeMouseLeave = (event: MouseEvent, edge: GraphEdge) => emits.edgeMouseLeave({ event, edge })

const onEdgeUpdaterSourceMouseDown = (event: MouseEvent, edge: GraphEdge) => handleEdgeUpdater(event, edge, true)

const onEdgeUpdaterTargetMouseDown = (event: MouseEvent, edge: GraphEdge) => handleEdgeUpdater(event, edge, false)

const { onMouseDown } = useHandle()

const handleEdgeUpdater = (event: MouseEvent, edge: GraphEdge, isSourceHandle: boolean) => {
  const nodeId = isSourceHandle ? edge.target : edge.source
  const handleId = (isSourceHandle ? edge.targetHandle : edge.sourceHandle) ?? ''

  emits.edgeUpdateStart({ event, edge })

  onMouseDown(
    event,
    handleId,
    nodeId,
    isSourceHandle,
    undefined,
    isSourceHandle ? 'target' : 'source',
    (connection) => {
      if (!connectionExists(connection, getEdges)) emits.edgeUpdate({ edge, connection })
    },
    () => emits.edgeUpdateEnd({ event, edge }),
  )
}

const getClass = (edge: GraphEdge) => {
  const extraClass = edge.class instanceof Function ? edge.class(edge) : edge.class
  return [noPanClassName, extraClass]
}

const getStyle = (edge: GraphEdge) => (edge.style instanceof Function ? edge.style(edge) : edge.style) as CSSProperties
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
        :type="getType(edge.type, edge.template)"
        :name="edge.type || 'default'"
        :source="edge.source"
        :target="edge.target"
        :target-handle-id="edge.targetHandle"
        :source-handle-id="edge.sourceHandle"
        :source-node="getNode(edge.source)"
        :target-node="getNode(edge.target)"
        :label="edge.label"
        :data="edge.data"
        :animated="edge.animated"
        :selectable="selectable(edge.selectable)"
        :updatable="updatable(edge.updatable)"
        :label-style="edge.labelStyle"
        :label-show-bg="edge.labelShowBg"
        :label-bg-style="edge.labelBgStyle"
        :label-bg-padding="edge.labelBgPadding"
        :label-bg-border-radius="edge.labelBgBorderRadius"
        :connection-mode="connectionMode"
        :edge-updater-radius="edgeUpdaterRadius"
        :style="getStyle(edge)"
        :class="getClass(edge)"
        @click="(e: MouseEvent) => onEdgeClick(e, edge)"
        @dbl-click="(e: MouseEvent) => onDoubleClick(e, edge)"
        @contextmenu="(e: MouseEvent) => onEdgeContextMenu(e, edge)"
        @mouseenter="(e: MouseEvent) => onEdgeMouseEnter(e, edge)"
        @mousemove="(e: MouseEvent) => onEdgeMouseMove(e, edge)"
        @mouseleave="(e: MouseEvent) => onEdgeMouseLeave(e, edge)"
        @source-mousedown="(e: MouseEvent) => onEdgeUpdaterSourceMouseDown(e, edge)"
        @target-mousedown="(e: MouseEvent) => onEdgeUpdaterTargetMouseDown(e, edge)"
      />
      <ConnectionLine v-if="connectionLineVisible && !!sourceNode" :source-node="sourceNode" />
    </g>
  </svg>
</template>
