<script lang="ts" setup>
import type { EdgeProps, Position } from '@vue-flow/core'
import { getBezierPath } from '@vue-flow/core'

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
  markerEnd: string
  data: {
    text?: string
    color?: 'red' | 'green' | 'blue'
  }
}

const props = defineProps<CustomEdgeProps>()

const edgePath = computed(() =>
  getBezierPath({
    ...props,
  }),
)
</script>

<script lang="ts">
export default {
  name: 'CustomEdge',
  inheritAttrs: false,
}
</script>

<template>
  <path
    :id="props.id"
    class="vue-flow__edge-path"
    :style="{ stroke: props.data?.color }"
    :d="edgePath[0]"
    :marker-end="props.markerEnd"
  />
  <text>
    <textPath :href="`#${props.id}`" :style="{ fontSize: '1.25rem', fill: 'white' }" startOffset="50%" text-anchor="middle">
      {{ props.data?.text }}
    </textPath>
  </text>
</template>
