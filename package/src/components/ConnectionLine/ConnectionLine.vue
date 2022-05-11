<script lang="ts" setup>
import { getBezierPath, getSmoothStepPath } from '../Edges/utils'
import type { GraphNode, HandleElement, HandleType } from '../../types'
import { ConnectionLineType, Position } from '../../types'
import { useVueFlow } from '../../composables'
import { Slots } from '../../context'

const { sourceNode } = defineProps<{
  sourceNode: GraphNode
}>()

const {
  getNodes,
  connectionHandleId,
  connectionHandleType,
  connectionPosition,
  connectionLineType,
  connectionLineStyle,
  connectionNodeId,
  viewport,
} = $(useVueFlow())

const slots = inject(Slots)?.['connection-line']

const hasSlot = slots?.({})

const sourceHandle =
  connectionHandleId && connectionHandleType
    ? sourceNode.handleBounds[connectionHandleType as HandleType]?.find((d: HandleElement) => d.id === connectionHandleId)
    : connectionHandleType && sourceNode.handleBounds[(connectionHandleType as HandleType) ?? 'source']?.[0]

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
  switch (connectionLineType) {
    case ConnectionLineType.Bezier:
      path = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition: sourceHandle?.position,
        targetX,
        targetY,
        targetPosition,
      })
      break
    case ConnectionLineType.Step:
      path = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition: sourceHandle?.position,
        targetX,
        targetY,
        targetPosition,
        borderRadius: 0,
      })
      break
    case ConnectionLineType.SmoothStep:
      path = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition: sourceHandle?.position,
        targetX,
        targetY,
        targetPosition,
      })
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
        connectionLineType,
        connectionLineStyle,
        nodes: getNodes,
        sourceNode,
        sourceHandle,
      }"
    />
    <path v-else :d="dAttr" class="vue-flow__connection-path" :style="connectionLineStyle || {}" />
  </g>
</template>
