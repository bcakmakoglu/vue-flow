<script lang="ts" setup>
import { CSSProperties } from 'vue'
import { ArrowHeadType, EdgeProps, ElementId, Position } from '../../types'
import { getCenter, getMarkerEnd, getBezierPath } from './utils'
import EdgeText from './EdgeText.vue'

interface BezierEdgeProps extends EdgeProps {
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
  style?: CSSProperties
  arrowHeadType?: ArrowHeadType
  markerEndId?: string
  data?: any
  sourceHandleId?: ElementId
  targetHandleId?: ElementId
}
const props = withDefaults(defineProps<BezierEdgeProps>(), {
  selected: false,
  sourcePosition: Position.Bottom,
  targetPosition: Position.Top,
  labelStyle: () => ({}),
  labelShowBg: true,
  labelBgStyle: () => ({}),
})

const centered = computed(() =>
  getCenter({
    ...props,
  }),
)
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
  <path class="vue-flow__edge-path" :style="props.style" :d="path" :marker-end="markerEnd" />
  <slot>
    <EdgeText
      v-if="props.label"
      :x="centered[0]"
      :y="centered[1]"
      :label="props.label"
      :label-style="props.labelStyle"
      :label-show-bg="props.labelShowBg"
      :label-bg-style="props.labelBgStyle"
      :label-bg-padding="props.labelBgPadding"
      :label-bg-border-radius="props.labelBgBorderRadius"
    />
  </slot>
</template>
