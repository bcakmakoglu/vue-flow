<script lang="ts" setup>
import { CSSProperties } from 'vue'
import { useHandle, useVueFlow } from '../../composables'
import { ConnectionMode, EdgeComponent, GraphEdge, Position } from '../../types'
import { connectionExists, getEdgePositions, getHandle, getMarkerId } from '../../utils'
import EdgeAnchor from './EdgeAnchor'

interface EdgeWrapper {
  id: string
  edge: GraphEdge
  selectable?: boolean
  updatable?: boolean
  type: EdgeComponent | Function | Object | false
  name: string
}

const { id, edge, name, selectable, updatable, type } = defineProps<EdgeWrapper>()

const { emits, connectionMode, edgeUpdaterRadius, noPanClassName, setState, getEdges, getEdge, getNode, addSelectedEdges } = $(
  useVueFlow(),
)

let updating = $ref(false)

const sourceNode = $computed(() => getNode(edge.source))
const targetNode = $computed(() => getNode(edge.target))

const { onMouseDown } = useHandle()

const onEdgeClick = (event: MouseEvent) => {
  const data = { event, edge }
  if (selectable) {
    setState({
      nodesSelectionActive: false,
    })

    addSelectedEdges([edge])
  }
  emits.edgeClick(data)
}

const onEdgeContextMenu = (event: MouseEvent) => emits.edgeContextMenu({ event, edge })

const onDoubleClick = (event: MouseEvent) => emits.edgeDoubleClick({ event, edge })

const onEdgeMouseEnter = (event: MouseEvent) => emits.edgeMouseEnter({ event, edge })

const onEdgeMouseMove = (event: MouseEvent) => emits.edgeMouseMove({ event, edge })

const onEdgeMouseLeave = (event: MouseEvent) => emits.edgeMouseLeave({ event, edge })

const onEdgeUpdaterMouseEnter = () => (updating = true)

const onEdgeUpdaterMouseOut = () => (updating = false)

const onEdgeUpdaterSourceMouseDown = (event: MouseEvent) => handleEdgeUpdater(event, true)

const onEdgeUpdaterTargetMouseDown = (event: MouseEvent) => handleEdgeUpdater(event, false)

const handleEdgeUpdater = (event: MouseEvent, isSourceHandle: boolean) => {
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
      if (!connectionExists(edge, getEdges)) emits.edgeUpdate({ edge, connection })
    },
    () => emits.edgeUpdateEnd({ event, edge }),
  )
}

const sourceHandle = $computed(() => {
  if (!sourceNode) return

  let sourceNodeHandles
  if (connectionMode === ConnectionMode.Strict) {
    sourceNodeHandles = sourceNode.handleBounds.source
  } else {
    sourceNodeHandles = sourceNode.handleBounds.source ?? sourceNode.handleBounds.target
  }

  return getHandle(sourceNodeHandles, edge.sourceHandle)
})

const targetHandle = $computed(() => {
  if (!targetNode) return

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
  const stop = watch(
    [
      $$(sourcePosition),
      $$(targetPosition),
      () => sourceNode?.computedPosition,
      () => targetNode?.computedPosition,
      () => sourceNode?.dimensions,
      () => targetNode?.dimensions,
    ],
    () => {
      if (sourceNode && targetNode) {
        const { sourceX, sourceY, targetY, targetX } = getEdgePositions(
          sourceNode,
          sourceHandle,
          sourcePosition,
          targetNode,
          targetHandle,
          targetPosition,
        )

        const storedEdge = getEdge(id)!
        if (storedEdge) {
          if (edge.sourceX !== sourceX) storedEdge.sourceX = sourceX
          if (edge.sourceY !== sourceY) storedEdge.sourceY = sourceY
          if (edge.targetX !== targetX) storedEdge.targetX = targetX
          if (edge.targetY !== targetY) storedEdge.targetY = targetY
        }
      }
    },
    { immediate: true, flush: 'pre' },
  )

  onBeforeUnmount(() => stop())
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
