<script lang="ts" setup>
import { getBezierPath, getMarkerEnd, Position, EdgeProps } from '~/index'

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
  markerEndId?: string
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
const markerEnd = computed(() => getMarkerEnd(props.markerEnd, props.markerEndId))
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
      {{ props.data.text }}
    </textPath>
  </text>
</template>
