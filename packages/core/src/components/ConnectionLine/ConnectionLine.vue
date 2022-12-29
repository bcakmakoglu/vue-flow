<script lang="ts" setup>
import type { GraphNode } from '../../types'
import { ConnectionLineType, ConnectionMode, Position } from '../../types'
import { getMarkerId } from '../../utils/graph'

const { sourceNode } = defineProps<{ sourceNode: GraphNode }>()

const {
  getNodes,
  connectionMode,
  connectionStartHandle,
  connectionPosition,
  connectionLineType,
  connectionLineStyle,
  connectionLineOptions,
  viewport,
} = $(useVueFlow())

const slots = inject(Slots)?.['connection-line']

const hasSlot = slots?.({})

const handleId = connectionStartHandle!.handleId
const type = connectionStartHandle!.type

const sourceHandle =
  (connectionMode === ConnectionMode.Strict
    ? sourceNode.handleBounds[type]?.find((d) => d.id === handleId)
    : [...(sourceNode.handleBounds.source || []), ...(sourceNode.handleBounds.target || [])]?.find((d) => d.id === handleId)) ||
  sourceNode.handleBounds[type ?? 'source']?.[0]

const sourceHandleX = sourceHandle ? sourceHandle.x + sourceHandle.width / 2 : sourceNode.dimensions.width / 2
const sourceHandleY = sourceHandle ? sourceHandle.y + sourceHandle.height / 2 : sourceNode.dimensions.height

const sourceX = sourceNode.computedPosition.x + sourceHandleX
const sourceY = sourceNode.computedPosition.y + sourceHandleY

const isRightOrLeft = sourceHandle?.position === Position.Left || sourceHandle?.position === Position.Right

const targetPosition = isRightOrLeft ? Position.Left : Position.Top

const targetX = $computed(() => (connectionPosition.x - viewport.x) / viewport.zoom)
const targetY = $computed(() => (connectionPosition.y - viewport.y) / viewport.zoom)

const dAttr = computed(() => {
  let path = `M${sourceX},${sourceY} ${targetX},${targetY}`

  const pathParams = {
    sourceX,
    sourceY,
    sourcePosition: sourceHandle?.position,
    targetX,
    targetY,
    targetPosition,
  }

  switch (connectionLineType || connectionLineOptions.type) {
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
      :is="slots"
      v-if="hasSlot"
      v-bind="{
        sourceX,
        sourceY,
        sourcePosition: sourceHandle?.position,
        targetX,
        targetY,
        targetPosition,
        nodes: getNodes,
        sourceNode,
        sourceHandle,
        markerEnd: `url(#${getMarkerId(connectionLineOptions.markerEnd)})`,
        markerStart: `url(#${getMarkerId(connectionLineOptions.markerStart)})`,
      }"
    />

    <path
      v-else
      :d="dAttr"
      class="vue-flow__connection-path"
      :class="connectionLineOptions.class"
      :style="connectionLineStyle || connectionLineOptions.style || {}"
      :marker-end="`url(#${getMarkerId(connectionLineOptions.markerEnd)})`"
      :marker-start="`url(#${getMarkerId(connectionLineOptions.markerStart)})`"
    />
  </g>
</template>
