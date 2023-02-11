<script lang="ts" setup>
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

const sourceHandle = $computed(
  () =>
    (connectionMode === ConnectionMode.Strict
      ? sourceNode.handleBounds[type.value]?.find((d) => d.id === handleId)
      : [...(sourceNode.handleBounds.source || []), ...(sourceNode.handleBounds.target || [])]?.find((d) => d.id === handleId)) ||
    sourceNode.handleBounds[type.value ?? 'source']?.[0],
)

const sourceHandleX = $computed(() => (sourceHandle ? sourceHandle.x + sourceHandle.width / 2 : sourceNode.dimensions.width / 2))
const sourceHandleY = $computed(() => (sourceHandle ? sourceHandle.y + sourceHandle.height / 2 : sourceNode.dimensions.height))

const sourceX = $computed(() => sourceNode.computedPosition.x + sourceHandleX)
const sourceY = $computed(() => sourceNode.computedPosition.y + sourceHandleY)

const fromPosition = computed(() => sourceHandle?.position)
const targetPosition = computed(() => (fromPosition.value ? oppositePosition[fromPosition.value] : undefined))

const targetX = $computed(() => (connectionPosition.x - viewport.x) / viewport.zoom)
const targetY = $computed(() => (connectionPosition.y - viewport.y) / viewport.zoom)

const dAttr = computed(() => {
  let path = `M${sourceX},${sourceY} ${targetX},${targetY}`

  const pathParams = {
    sourceX,
    sourceY,
    sourcePosition: fromPosition.value,
    targetX,
    targetY,
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
}
</script>

<template>
  <g class="vue-flow__connection">
    <component
      :is="connectionLineComponent"
      v-if="connectionLineComponent"
      v-bind="{
        sourceX,
        sourceY,
        sourcePosition: sourceHandle?.position,
        targetX,
        targetY,
        targetPosition,
        sourceNode,
        sourceHandle,
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
