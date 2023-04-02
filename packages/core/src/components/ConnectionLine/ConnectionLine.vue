<script lang="ts" setup>
import type { GraphNode } from '../../types'
import { ConnectionLineType, ConnectionMode, Position } from '../../types'
import { getMarkerId } from '../../utils/graph'

const { sourceNode } = defineProps<{ sourceNode: GraphNode }>()

const {
  connectionMode,
  connectionStartHandle,
  connectionEndHandle,
  connectionPosition,
  connectionLineType,
  connectionLineStyle,
  connectionLineOptions,
  connectionStatus,
  viewport,
  findNode,
} = $(useVueFlow())

const oppositePosition = {
  [Position.Left]: Position.Right,
  [Position.Right]: Position.Left,
  [Position.Top]: Position.Bottom,
  [Position.Bottom]: Position.Top,
}

const connectionLineComponent = inject(Slots)?.['connection-line']

const handleId = $computed(() => connectionStartHandle!.handleId)

const type = computed(() => connectionStartHandle!.type)

const targetNode = $computed(() => (connectionEndHandle?.handleId && findNode(connectionEndHandle.nodeId)) || null)

const sourceHandle = $computed(
  () =>
    (connectionMode === ConnectionMode.Strict
      ? sourceNode.handleBounds[type.value]?.find((d) => d.id === handleId)
      : [...(sourceNode.handleBounds.source || []), ...(sourceNode.handleBounds.target || [])]?.find((d) => d.id === handleId)) ||
    sourceNode.handleBounds[type.value ?? 'source']?.[0],
)

const targetHandle = $computed(() => {
  return (
    (targetNode &&
      connectionEndHandle?.handleId &&
      ((connectionMode === ConnectionMode.Strict
        ? targetNode.handleBounds[type.value === 'source' ? 'target' : 'source']?.find(
            (d) => d.id === connectionEndHandle?.handleId,
          )
        : [...(targetNode.handleBounds.source || []), ...(targetNode.handleBounds.target || [])]?.find(
            (d) => d.id === connectionEndHandle?.handleId,
          )) ||
        targetNode.handleBounds[type.value ?? 'target']?.[0])) ||
    null
  )
})

const fromPosition = computed(() => sourceHandle?.position)

const fromXY = computed(() => {
  if (sourceHandle) {
    return getHandlePosition(
      fromPosition.value || Position.Top,
      { ...sourceNode.dimensions, ...sourceNode.computedPosition },
      sourceHandle,
    )
  }

  return {
    x: sourceNode.dimensions.width / 2,
    y: sourceNode.dimensions.height / 2,
  }
})

const targetPosition = computed(() => (fromPosition.value ? oppositePosition[fromPosition.value] : undefined))

// todo: rename corresponding props
const toX = $computed(() => (connectionPosition.x - viewport.x) / viewport.zoom)
const toY = $computed(() => (connectionPosition.y - viewport.y) / viewport.zoom)

const dAttr = computed(() => {
  let path

  const pathParams = {
    sourceX: fromXY.value.x,
    sourceY: fromXY.value.y,
    sourcePosition: fromPosition.value,
    targetX: toX,
    targetY: toY,
    targetPosition: targetPosition.value,
  }

  const type = connectionLineType ?? connectionLineOptions.type

  switch (type) {
    case ConnectionLineType.Bezier:
      ;[path] = getBezierPath(pathParams)
      break
    case ConnectionLineType.Step:
      ;[path] = getSmoothStepPath({
        ...pathParams,
        borderRadius: 0,
      })
      break
    case ConnectionLineType.SmoothStep:
      ;[path] = getSmoothStepPath(pathParams)
      break
    case ConnectionLineType.SimpleBezier:
      ;[path] = getSimpleBezierPath(pathParams)
      break
    case ConnectionLineType.Straight:
      ;[path] = getStraightPath(pathParams)
      break
    default:
      ;[path] = getBezierPath(pathParams)
      break
  }

  return path
})
</script>

<script lang="ts">
export default {
  name: 'ConnectionLine',
  compatConfig: { MODE: 3 },
}
</script>

<template>
  <g class="vue-flow__connection">
    <component
      :is="connectionLineComponent"
      v-if="connectionLineComponent"
      v-bind="{
        sourceX: fromXY.x,
        sourceY: fromXY.y,
        sourcePosition: sourceHandle?.position,
        targetX: toX,
        targetY: toY,
        targetPosition,
        sourceNode,
        sourceHandle,
        targetNode,
        targetHandle,
        markerEnd: `url(#${getMarkerId(connectionLineOptions.markerEnd)})`,
        markerStart: `url(#${getMarkerId(connectionLineOptions.markerStart)})`,
        connectionStatus,
      }"
    />

    <path
      v-else
      :d="dAttr"
      class="vue-flow__connection-path"
      :class="[connectionLineOptions.class, connectionStatus]"
      :style="connectionLineStyle || connectionLineOptions.style || {}"
      :marker-end="`url(#${getMarkerId(connectionLineOptions.markerEnd)})`"
      :marker-start="`url(#${getMarkerId(connectionLineOptions.markerStart)})`"
    />
  </g>
</template>
