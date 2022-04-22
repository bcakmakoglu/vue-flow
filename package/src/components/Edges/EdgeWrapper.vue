<script lang="ts" setup>
import { CSSProperties } from 'vue'
import { useHandle, useVueFlow } from '../../composables'
import { ConnectionMode, EdgeComponent, GraphEdge, GraphNode, Position } from '../../types'
import { getEdgePositions, getHandle, getMarkerId } from '../../utils'
import EdgeAnchor from './EdgeAnchor'

interface EdgeWrapper {
  id: string
  edge: GraphEdge
  sourceNode: GraphNode
  targetNode: GraphNode
  selectable?: boolean
  updatable?: boolean
  type: EdgeComponent | Function | Object | false
  name: string
}

const { id, edge, name, sourceNode, targetNode, selectable, updatable, type } = defineProps<EdgeWrapper>()

const { hooks, connectionMode, edgeUpdaterRadius, noPanClassName, setState, getEdge, addSelectedEdges } = $(useVueFlow())

let updating = $ref(false)

const { onMouseDown } = useHandle()

const onEdgeClick = (event: MouseEvent) => {
  const data = { event, edge }
  if (selectable) {
    setState({
      nodesSelectionActive: false,
    })

    addSelectedEdges([edge])
  }
  hooks.edgeClick.trigger(data)
}

const onEdgeContextMenu = (event: MouseEvent) => hooks.edgeContextMenu.trigger({ event, edge })

const onDoubleClick = (event: MouseEvent) => hooks.edgeDoubleClick.trigger({ event, edge })

const onEdgeMouseEnter = (event: MouseEvent) => hooks.edgeMouseEnter.trigger({ event, edge })

const onEdgeMouseMove = (event: MouseEvent) => hooks.edgeMouseMove.trigger({ event, edge })

const onEdgeMouseLeave = (event: MouseEvent) => hooks.edgeMouseLeave.trigger({ event, edge })

const onEdgeUpdaterMouseEnter = () => (updating = true)

const onEdgeUpdaterMouseOut = () => (updating = false)

const onEdgeUpdaterSourceMouseDown = (event: MouseEvent) => handleEdgeUpdater(event, true)

const onEdgeUpdaterTargetMouseDown = (event: MouseEvent) => handleEdgeUpdater(event, false)

const handleEdgeUpdater = (event: MouseEvent, isSourceHandle: boolean) => {
  const nodeId = isSourceHandle ? edge.target : edge.source
  const handleId = (isSourceHandle ? edge.targetHandle : edge.sourceHandle) ?? ''

  hooks.edgeUpdateStart.trigger({ event, edge })

  onMouseDown(
    event,
    handleId,
    nodeId,
    isSourceHandle,
    undefined,
    isSourceHandle ? 'target' : 'source',
    (connection) => hooks.edgeUpdate.trigger({ edge, connection }),
    () => hooks.edgeUpdateEnd.trigger({ event, edge }),
  )
}

const sourceHandle = $computed(() => {
  let sourceNodeHandles
  if (connectionMode === ConnectionMode.Strict) {
    sourceNodeHandles = sourceNode.handleBounds.source
  } else {
    sourceNodeHandles = sourceNode.handleBounds.source ?? sourceNode.handleBounds.target
  }

  return getHandle(sourceNodeHandles, edge.sourceHandle)
})

const targetHandle = $computed(() => {
  let targetNodeHandles
  if (connectionMode === ConnectionMode.Strict) {
    targetNodeHandles = targetNode.handleBounds.target
  } else {
    targetNodeHandles = targetNode.handleBounds.target ?? targetNode.handleBounds.source
  }

  return getHandle(targetNodeHandles, edge.targetHandle)
})

const sourcePosition = $(controlledComputed($$(sourceHandle), () => (sourceHandle ? sourceHandle.position : Position.Bottom)))

const targetPosition = $(controlledComputed($$(targetHandle), () => (targetHandle ? targetHandle.position : Position.Top)))

onMounted(() => {
  watch(
    [
      $$(sourcePosition),
      $$(targetPosition),
      () => sourceNode.computedPosition,
      () => targetNode.computedPosition,
      () => sourceNode.dimensions,
      () => targetNode.dimensions,
    ],
    () => {
      const { sourceX, sourceY, targetY, targetX } = getEdgePositions(
        sourceNode,
        sourceHandle,
        sourcePosition,
        targetNode,
        targetHandle,
        targetPosition,
      )

      const storedEdge = getEdge(id)!
      if (edge.sourceX !== sourceX) storedEdge.sourceX = sourceX
      if (edge.sourceY !== sourceY) storedEdge.sourceY = sourceY
      if (edge.targetX !== targetX) storedEdge.targetX = targetX
      if (edge.targetY !== targetY) storedEdge.targetY = targetY
    },
    { immediate: true, flush: 'post' },
  )
})

const getClass = () => {
  const extraClass = edge.class instanceof Function ? edge.class(edge) : edge.class
  return [
    'vue-flow__edge',
    `vue-flow__edge-${name}`,
    noPanClassName,
    {
      selected: edge.selected,
      animated: edge.animated,
      inactive: !selectable,
      updating,
    },
    extraClass,
  ]
}

const getStyle = () => (edge.style instanceof Function ? edge.style(edge) : edge.style) as CSSProperties
</script>
<script lang="ts">
export default {
  name: 'Edge',
  inheritAttrs: false,
}
</script>
<template>
  <g
    :class="getClass()"
    @click="onEdgeClick"
    @dblClick="onDoubleClick"
    @contextmenu="onEdgeContextMenu"
    @mouseenter="onEdgeMouseEnter"
    @mousemove="onEdgeMouseMove"
    @mouseleave="onEdgeMouseLeave"
  >
    <component
      :is="type"
      :id="edge.id"
      :source-node="sourceNode"
      :target-node="targetNode"
      :source="edge.source"
      :target="edge.target"
      :updatable="updatable"
      :selected="edge.selected"
      :animated="edge.animated"
      :label="edge.label"
      :label-style="edge.labelStyle"
      :label-show-bg="edge.labelShowBg"
      :label-bg-style="edge.labelBgStyle"
      :label-bg-padding="edge.labelBgPadding"
      :label-bg-border-radius="edge.labelBgBorderRadius"
      :data="edge.data"
      :style="getStyle()"
      :marker-start="`url(#${getMarkerId(edge.markerStart)})`"
      :marker-end="`url(#${getMarkerId(edge.markerEnd)})`"
      :source-position="sourcePosition"
      :target-position="targetPosition"
      :source-x="edge.sourceX"
      :source-y="edge.sourceY"
      :target-x="edge.targetX"
      :target-y="edge.targetY"
      :source-handle-id="edge.sourceHandle"
      :target-handle-id="edge.targetHandle"
    />
    <template v-if="updatable">
      <g @mousedown="onEdgeUpdaterSourceMouseDown" @mouseenter="onEdgeUpdaterMouseEnter" @mouseout="onEdgeUpdaterMouseOut">
        <EdgeAnchor :position="sourcePosition" :center-x="edge.sourceX" :center-y="edge.sourceY" :radius="edgeUpdaterRadius" />
      </g>
      <g @mousedown="onEdgeUpdaterTargetMouseDown" @mouseenter="onEdgeUpdaterMouseEnter" @mouseout="onEdgeUpdaterMouseOut">
        <EdgeAnchor :position="targetPosition" :center-x="edge.targetX" :center-y="edge.targetY" :radius="edgeUpdaterRadius" />
      </g>
    </template>
  </g>
</template>
