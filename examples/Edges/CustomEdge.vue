<script lang="ts" setup>
import { ArrowHeadType, ElementId, getBezierPath, getMarkerEnd, Position, EdgeProps } from '~/index'

interface CustomEdgeProps<T = any> extends EdgeProps<T> {
  source: ElementId
  target: ElementId
  sourceHandleId?: ElementId
  targetHandleId?: ElementId
  id: ElementId
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  sourcePosition: Position
  targetPosition: Position
  arrowHeadType?: ArrowHeadType
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
const markerEnd = computed(() => getMarkerEnd(props.arrowHeadType, props.markerEndId))
</script>
<template>
  <path :id="props.id" class="revue-flow__edge-path" :d="edgePath" :marker-end="markerEnd" />
  <text>
    <textPath :href="`#${props.id}`" :style="{ fontSize: '12px' }" startOffset="50%" text-anchor="middle">
      {{ props.data.text }}
    </textPath>
  </text>
</template>
