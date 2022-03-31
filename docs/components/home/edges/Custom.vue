<script lang="ts" setup>
import { computed } from 'vue'
import { MarkerType, getBezierPath, Position, EdgeProps } from '@braks/vue-flow'

interface CustomEdgeProps extends EdgeProps {
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
  markerEnd?: MarkerType
  data?: {
    text?: string
    color?: 'red' | 'green' | 'blue'
  }
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
</script>
<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>
<template>
  <path
    :id="props.id"
    class="vue-flow__edge-path"
    :style="{ stroke: props.data?.color }"
    :d="edgePath"
    :marker-end="props.markerEnd"
  />
  <text>
    <textPath
      :href="`#${props.id}`"
      :style="{ fontSize: '1.25rem', fill: 'white' }"
      startOffset="50%"
      text-anchor="middle"
    >
      {{ props.data?.text }}
    </textPath>
  </text>
</template>
