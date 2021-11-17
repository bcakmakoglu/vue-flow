<script lang="ts" setup>
import { ArrowHeadType, EdgeProps, ElementId, Position } from '../../types'
import EdgeText from './EdgeText.vue'
import { getMarkerEnd, getBezierPath } from './utils'

interface StraightEdgeProps extends EdgeProps {
  id: ElementId
  source: ElementId
  target: ElementId
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  selected?: boolean
  animated?: boolean
  sourcePosition: Position
  targetPosition: Position
  label?:
    | string
    | {
        component: any
        props?: any
      }
  labelStyle?: any
  labelShowBg?: boolean
  labelBgStyle?: any
  labelBgPadding?: [number, number]
  labelBgBorderRadius?: number
  style?: any
  arrowHeadType?: ArrowHeadType
  markerEndId?: string
  data?: any
  sourceHandleId?: ElementId | null
  targetHandleId?: ElementId | null
}

const props = withDefaults(defineProps<StraightEdgeProps>(), {
  selected: false,
  sourcePosition: Position.Bottom,
  targetPosition: Position.Top,
  label: () => '',
  labelStyle: () => ({}),
  labelShowBg: true,
  labelBgStyle: () => ({}),
})

const centerY = computed(() => {
  const yOffset = Math.abs(props.targetY - props.sourceY) / 2
  return props.targetY < props.sourceY ? props.targetY + yOffset : props.targetY - yOffset
})
const centerX = computed(() => {
  const xOffset = Math.abs(props.targetX - props.sourceX) / 2
  return props.targetX < props.sourceX ? props.targetX + xOffset : props.targetX - xOffset
})

const path = computed(() => {
  if (props.sourceX && props.sourceY)
    return getBezierPath({
      ...props,
    })
  else return ''
})

const markerEnd = computed(() => getMarkerEnd(props.arrowHeadType, props.markerEndId))
</script>
<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>
<template>
  <path :style="props.style" class="vue-flow__edge-path" :d="path" :marker-end="markerEnd" />
  <EdgeText
    v-if="props.label"
    :x="centerX"
    :y="centerY"
    :label="props.label"
    :label-style="props.labelStyle"
    :label-show-bg="props.labelShowBg"
    :label-bg-style="props.labelBgStyle"
    :label-bg-padding="props.labelBgPadding"
    :label-bg-border-radius="props.labelBgBorderRadius"
  />
</template>
