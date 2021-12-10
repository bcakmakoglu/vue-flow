<script lang="ts" setup>
import { CSSProperties } from 'vue'
import { getBezierPath, getSmoothStepPath } from '../Edges/utils'
import {
  ConnectionLineType,
  HandleElement,
  Position,
  HandleType,
  XYPosition,
  ConnectionMode,
  Transform,
  GraphNode,
} from '../../types'

interface ConnectionLineProps {
  sourceNode: GraphNode
  connectionLineType?: ConnectionLineType
  connectionLineStyle?: CSSProperties
  connectionHandleId?: string
  connectionNodeId?: string
  connectionHandleType?: HandleType
  connectionPosition?: XYPosition
  connectionMode: ConnectionMode
  nodes: GraphNode[]
  transform: Transform
}

const props = withDefaults(defineProps<ConnectionLineProps>(), {
  connectionLineType: ConnectionLineType.Bezier,
  connectionLineStyle: () => ({}),
  connectionPosition: () => ({ x: 0, y: 0 }),
})

const sourceHandle =
  props.connectionHandleId && props.connectionHandleType
    ? props.sourceNode.__vf.handleBounds[props.connectionHandleType]?.find(
        (d: HandleElement) => d.id === props.connectionHandleId,
      )
    : props.connectionHandleType && props.sourceNode.__vf.handleBounds[props.connectionHandleType ?? 'source']?.[0]
const sourceHandleX = sourceHandle ? sourceHandle.x + sourceHandle.width / 2 : (props.sourceNode.__vf.width as number) / 2
const sourceHandleY = sourceHandle ? sourceHandle.y + sourceHandle.height / 2 : props.sourceNode.__vf.height
const sourceX = props.sourceNode.position.x + sourceHandleX
const sourceY = props.sourceNode.position.y + sourceHandleY

const isRightOrLeft = sourceHandle?.position === Position.Left || sourceHandle?.position === Position.Right
const targetPosition = isRightOrLeft ? Position.Left : Position.Top

const targetX = computed(() => (props.connectionPosition.x - props.transform[0]) / props.transform[2])
const targetY = computed(() => (props.connectionPosition.y - props.transform[1]) / props.transform[2])

const dAttr = computed(() => {
  let path = `M${sourceX},${sourceY} ${targetX.value},${targetY.value}`
  switch (props.connectionLineType) {
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
    <slot
      v-bind="{
        sourceX,
        sourceY,
        sourcePosition: sourceHandle?.position,
        targetX,
        targetY,
        targetPosition,
        connectionLineType: props.connectionLineType,
        connectionLineStyle: props.connectionLineStyle,
        nodes: props.nodes,
        sourceNode: props.sourceNode,
        sourceHandle,
      }"
    >
      <path :d="dAttr" class="vue-flow__connection-path" :style="props.connectionLineStyle" />
    </slot>
  </g>
</template>
