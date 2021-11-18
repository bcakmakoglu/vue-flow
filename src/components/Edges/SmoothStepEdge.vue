<script lang="ts" setup>
import { ArrowHeadType, EdgeProps, ElementId, Position } from '../../types'
import EdgeText from './EdgeText.vue'
import { getCenter, getMarkerEnd, getSmoothStepPath } from './utils'

interface SmoothStepEdgeProps extends EdgeProps {
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
  borderRadius?: number
  sourceHandleId?: ElementId | null
  targetHandleId?: ElementId | null
}

const props = withDefaults(defineProps<SmoothStepEdgeProps>(), {
  selected: false,
  sourcePosition: Position.Bottom,
  targetPosition: Position.Top,
  label: () => '',
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
    return getSmoothStepPath({
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
  <slot
    :x="centered[0]"
    :y="centered[1]"
    :label="props.label"
    :label-style="props.labelStyle"
    :label-show-bg="props.labelShowBg"
    :label-bg-style="props.labelBgStyle"
    :label-bg-padding="props.labelBgPadding"
    :label-bg-border-radius="props.labelBgBorderRadius"
  >
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
