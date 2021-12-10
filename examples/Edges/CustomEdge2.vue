<script lang="ts" setup>
import { getBezierPath, getMarkerEnd } from '~/components/Edges/utils'
import { ArrowHeadType, getEdgeCenter, Position, EdgeText, EdgeProps } from '~/index'

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
  arrowHeadType?: ArrowHeadType
  markerEndId?: string
  data?: {
    text: string
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
const markerEnd = computed(() => getMarkerEnd(props.arrowHeadType, props.markerEndId))
const center = computed(() =>
  getEdgeCenter({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    targetX: props.targetX,
    targetY: props.targetY,
  }),
)
const onClick = () => console.log(props.data)
</script>
<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>
<template>
  <path :id="props.id" class="vue-flow__edge-path" :d="edgePath" :marker-end="markerEnd" />
  <EdgeText
    :x="center[0]"
    :y="center[1]"
    :label="props.data?.text"
    :label-style="{ fill: 'white' }"
    :label-show-bg="true"
    :label-bg-style="{ fill: 'red' }"
    :label-bg-padding="[2, 4]"
    :label-bg-border-radius="2"
    @click="onClick"
  />
</template>
