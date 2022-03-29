<script lang="ts" setup>
import { getBezierPath, getMarkerId, Position, EdgeProps } from '@braks/vue-flow'

interface CustomEdgeProps<T = { text: string }> extends EdgeProps<T> {
  source: string
  target: string
  sourceHandleId?: string
  targetHandleId?: string
  id: string
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  sourcePosition: Position
  targetPosition: Position
  markerEnd?: string
  data?: T
}

const props = defineProps<CustomEdgeProps>()
const edgePath = computed(() =>
  getBezierPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    sourcePosition: props.sourcePosition,
    targetX: props.targetX,
    targetY: props.targetY,
    targetPosition: props.targetPosition,
  }),
)

const markerEnd = computed(() => getMarkerId(props.markerEnd))
</script>
<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>
<template>
  <path :id="props.id" class="vue-flow__edge-path" :d="edgePath" :marker-end="markerEnd" />
  <text>
    <textPath :href="`#${props.id}`" :style="{ fontSize: '12px' }" startOffset="50%" text-anchor="middle">
      {{ props.data?.text }}
    </textPath>
  </text>
</template>
