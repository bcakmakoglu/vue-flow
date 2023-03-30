<script lang="ts" setup>
// todo: refactor this into a pure ts component to resolve the type force casting
import type { Component } from 'vue'
import type { GraphNode } from '../../types'
import { ConnectionLineType, ConnectionMode, Position } from '../../types'
import { getMarkerId } from '../../utils/graph'

const { sourceNode } = defineProps<{ sourceNode: GraphNode }>()

const {
  connectionMode,
  connectionStartHandle,
  connectionPosition,
  connectionLineType,
  connectionLineStyle,
  connectionLineOptions,
  connectionStatus,
  viewport,
  findNode,
} = useVueFlow()

const oppositePosition = {
  [Position.Left]: Position.Right,
  [Position.Right]: Position.Left,
  [Position.Top]: Position.Bottom,
  [Position.Bottom]: Position.Top,
}

const connectionLineComponent = inject(Slots)?.['connection-line'] as Component | undefined

const handleId = computed(() => connectionStartHandle.value!.handleId)

const type = computed(() => connectionStartHandle.value!.type)

const targetNode = computed(
  () => (connectionStartHandle.value?.result && findNode(connectionStartHandle.value.result.connection.target)) || null,
)

const sourceHandle = computed(
  () =>
    (connectionMode.value === ConnectionMode.Strict
      ? sourceNode.handleBounds[type.value]?.find((d) => d.id === handleId.value)
      : [...(sourceNode.handleBounds.source || []), ...(sourceNode.handleBounds.target || [])]?.find(
          (d) => d.id === handleId.value,
        )) || sourceNode.handleBounds[type.value ?? 'source']?.[0],
)

const targetHandle = computed(() => {
  return (
    (targetNode.value &&
      connectionStartHandle.value?.result?.handleId &&
      ((connectionMode.value === ConnectionMode.Strict
        ? targetNode.value.handleBounds[type.value === 'source' ? 'target' : 'source']?.find(
            (d) => d.id === connectionStartHandle.value?.result?.handleId,
          )
        : [...(targetNode.value.handleBounds.source || []), ...(targetNode.value.handleBounds.target || [])]?.find(
            (d) => d.id === connectionStartHandle.value?.result?.handleId,
          )) ||
        targetNode.value.handleBounds[type.value ?? 'target']?.[0])) ||
    null
  )
})

const fromPosition = computed(() => sourceHandle?.position)

const fromXY = computed(() => {
  if (sourceHandle.value) {
    return getHandlePosition(
      fromPosition.value || Position.Top,
      { ...sourceNode.dimensions, ...sourceNode.computedPosition },
      sourceHandle.value,
    )
  }

  return {
    x: sourceNode.dimensions.width / 2,
    y: sourceNode.dimensions.height / 2,
  }
})

const targetPosition = computed(() => (fromPosition.value ? oppositePosition[fromPosition.value] : undefined))

// todo: rename corresponding props
const toX = computed(() => (connectionPosition.value.x - viewport.value.x) / viewport.value.zoom)
const toY = computed(() => (connectionPosition.value.y - viewport.value.y) / viewport.value.zoom)

const dAttr = computed(() => {
  let path

  const pathParams = {
    sourceX: fromXY.value.x,
    sourceY: fromXY.value.y,
    sourcePosition: fromPosition.value,
    targetX: toX.value,
    targetY: toY.value,
    targetPosition: targetPosition.value,
  }

  const type = connectionLineType.value ?? connectionLineOptions.value.type

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
    <Component
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
