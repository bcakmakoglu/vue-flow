<script lang="ts" setup>
import { CSSProperties } from 'vue'
import { getBezierPath, getSmoothStepPath } from '../Edges/utils'
import { useStore } from '../../composables'
import { ConnectionLineType, HandleElement, GraphNode, Position } from '../../types'

interface ConnectionLineProps {
  sourceNode: GraphNode
  connectionLineType?: ConnectionLineType
  connectionLineStyle?: CSSProperties
}

const props = withDefaults(defineProps<ConnectionLineProps>(), {
  connectionLineType: ConnectionLineType.Bezier,
  connectionLineStyle: () => ({}),
})

const store = useStore()

const sourceHandle =
  store.connectionHandleId && store.connectionHandleType
    ? props.sourceNode.__vf.handleBounds[store.connectionHandleType]?.find(
        (d: HandleElement) => d.id === store.connectionHandleId,
      )
    : store.connectionHandleType && props.sourceNode.__vf.handleBounds[store.connectionHandleType ?? 'source']?.[0]
const sourceHandleX = sourceHandle ? sourceHandle.x + sourceHandle.width / 2 : (props.sourceNode.__vf?.width as number) / 2
const sourceHandleY = sourceHandle ? sourceHandle.y + sourceHandle.height / 2 : props.sourceNode.__vf?.height
const sourceX = props.sourceNode.__vf?.position?.x + sourceHandleX
const sourceY = props.sourceNode.__vf?.position?.y + sourceHandleY

const isRightOrLeft = sourceHandle?.position === Position.Left || sourceHandle?.position === Position.Right
const targetPosition = isRightOrLeft ? Position.Left : Position.Top

const targetX = computed(() => (store.connectionPosition.x - store.transform[0]) / store.transform[2])
const targetY = computed(() => (store.connectionPosition.y - store.transform[1]) / store.transform[2])

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
      }"
    >
      <path :d="dAttr" class="vue-flow__connection-path" :style="props.connectionLineStyle" />
    </slot>
  </g>
</template>
