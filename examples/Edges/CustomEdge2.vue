<script lang="ts" setup>
import { getBezierPath, getMarkerEnd } from '~/components/Edges/utils'
import { ArrowHeadType, EdgeProps, ElementId, getEdgeCenter, Position, EdgeText } from '~/index'

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
const center = computed(() =>
  getEdgeCenter({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    targetX: props.targetX,
    targetY: props.targetY,
  }),
)
</script>
<template>
  <path :id="props.id" class="revue-flow__edge-path" :d="edgePath" :marker-end="markerEnd" />
  <EdgeText
    :x="center[0]"
    :y="center[1]"
    :label="props.data?.text"
    :label-style="{ fill: 'white' }"
    :label-show-bg="true"
    :label-bg-style="{ fill: 'red' }"
    :label-bg-padding="[2, 4]"
    :label-bg-border-radius="2"
    @click="() => console.log(props.data)"
  />
</template>
