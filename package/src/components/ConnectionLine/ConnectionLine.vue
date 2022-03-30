<script lang="ts" setup>
import { getBezierPath, getSmoothStepPath } from '../Edges/utils'
import { ConnectionLineType, GraphNode, HandleElement, Position } from '../../types'
import { useVueFlow } from '../../composables'
import { Slots } from '../../context'

interface ConnectionLineProps {
  sourceNode: GraphNode
}
const props = defineProps<ConnectionLineProps>()
const { store } = useVueFlow()

const slots = inject(Slots)?.['connection-line']
const hasSlot = slots?.({})

const sourceHandle =
  store.connectionHandleId && store.connectionHandleType
    ? props.sourceNode.handleBounds[store.connectionHandleType]?.find((d: HandleElement) => d.id === store.connectionHandleId)
    : store.connectionHandleType && props.sourceNode.handleBounds[store.connectionHandleType ?? 'source']?.[0]
const sourceHandleX = sourceHandle ? sourceHandle.x + sourceHandle.width / 2 : props.sourceNode.dimensions.width / 2
const sourceHandleY = sourceHandle ? sourceHandle.y + sourceHandle.height / 2 : props.sourceNode.dimensions.height
const sourceX = props.sourceNode.computedPosition.x + sourceHandleX
const sourceY = props.sourceNode.computedPosition.y + sourceHandleY

const isRightOrLeft = sourceHandle?.position === Position.Left || sourceHandle?.position === Position.Right
const targetPosition = isRightOrLeft ? Position.Left : Position.Top

const targetX = computed(() => (store.connectionPosition.x - store.transform[0]) / store.transform[2])
const targetY = computed(() => (store.connectionPosition.y - store.transform[1]) / store.transform[2])

const dAttr = computed(() => {
  let path = `M${sourceX},${sourceY} ${targetX.value},${targetY.value}`
  switch (store.connectionLineType) {
    case ConnectionLineType.Bezier:
      path = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition: sourceHandle?.position,
        targetX: targetX.value,
        targetY: targetY.value,
        targetPosition,
      })
      break
    case ConnectionLineType.Step:
      path = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition: sourceHandle?.position,
        targetX: targetX.value,
        targetY: targetY.value,
        targetPosition,
        borderRadius: 0,
      })
      break
    case ConnectionLineType.SmoothStep:
      path = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition: sourceHandle?.position,
        targetX: targetX.value,
        targetY: targetY.value,
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
        connectionLineType: store.connectionLineType,
        connectionLineStyle: store.connectionLineStyle,
        nodes: store.getNodes,
        sourceNode: props.sourceNode,
        sourceHandle,
      }"
    />
    <path v-else :d="dAttr" class="vue-flow__connection-path" :style="store.connectionLineStyle || {}" />
  </g>
</template>
