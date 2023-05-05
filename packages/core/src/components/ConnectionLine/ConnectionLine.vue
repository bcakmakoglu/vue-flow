<script lang="ts" setup>
import { computed, inject } from 'vue'
import { toRef } from '@vueuse/core'
import type { GraphNode } from '../../types'
import { ConnectionLineType, ConnectionMode, Position } from '../../types'
import { getHandlePosition, getMarkerId } from '../../utils'
import { useVueFlow } from '../../composables'
import { Slots } from '../../context'
import { getBezierPath, getSimpleBezierPath, getSmoothStepPath, getStraightPath } from '../Edges/utils'

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
} = useVueFlow()

const oppositePosition = {
  [Position.Left]: Position.Right,
  [Position.Right]: Position.Left,
  [Position.Top]: Position.Bottom,
  [Position.Bottom]: Position.Top,
}

const connectionLineComponent = inject(Slots)?.['connection-line']

const startHandleId = connectionStartHandle.value!.handleId

const type = connectionStartHandle.value!.type

const targetNode = computed(() => (connectionEndHandle.value?.handleId && findNode(connectionEndHandle.value.nodeId)) || null)

const sourceHandle = computed(
  () =>
    (connectionMode.value === ConnectionMode.Strict
      ? sourceNode.handleBounds[type]?.find((d) => d.id === startHandleId)
      : [...(sourceNode.handleBounds.source || []), ...(sourceNode.handleBounds.target || [])]?.find(
          (d) => d.id === startHandleId,
        )) || sourceNode.handleBounds[type ?? 'source']?.[0],
)

const targetHandle = computed(() => {
  return (
    (targetNode.value &&
      connectionEndHandle.value?.handleId &&
      ((connectionMode.value === ConnectionMode.Strict
        ? targetNode.value.handleBounds[type === 'source' ? 'target' : 'source']?.find(
            (d) => d.id === connectionEndHandle.value?.handleId,
          )
        : [...(targetNode.value.handleBounds.source || []), ...(targetNode.value.handleBounds.target || [])]?.find(
            (d) => d.id === connectionEndHandle.value?.handleId,
          )) ||
        targetNode.value.handleBounds[type ?? 'target']?.[0])) ||
    null
  )
})

const fromXY = computed(() => {
  if (sourceHandle.value) {
    return getHandlePosition(
      sourceHandle.value?.position || Position.Top,
      { ...sourceNode.dimensions, ...sourceNode.computedPosition },
      sourceHandle.value,
    )
  }

  return {
    x: sourceNode.dimensions.width / 2,
    y: sourceNode.dimensions.height / 2,
  }
})

const targetPosition = toRef(() => (sourceHandle.value?.position ? oppositePosition[sourceHandle.value?.position] : undefined))

// todo: rename corresponding props
const toX = computed(() => (connectionPosition.value.x - viewport.value.x) / viewport.value.zoom)
const toY = computed(() => (connectionPosition.value.y - viewport.value.y) / viewport.value.zoom)

const dAttr = computed(() => {
  let path

  const pathParams = {
    sourceX: fromXY.value.x,
    sourceY: fromXY.value.y,
    sourcePosition: sourceHandle.value?.position,
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
    <component
      :is="connectionLineComponent as any"
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
