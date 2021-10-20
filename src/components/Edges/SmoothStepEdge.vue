<script lang="ts" setup>
import { VNode } from 'vue'
import EdgeText from './EdgeText.vue'
import { ArrowHeadType, ElementId, Position } from '~/types'
import { getCenter, getMarkerEnd, getSmoothStepPath } from '~/components/Edges/utils'

export interface EdgeSmoothStepProps<T = any> {
  id: ElementId
  source: ElementId
  target: ElementId
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  selected?: boolean
  animated?: boolean
  sourcePosition?: Position
  targetPosition?: Position
  label?:
    | string
    | {
        component: VNode
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
  data?: T
  borderRadius?: number
  sourceHandleId?: ElementId | null
  targetHandleId?: ElementId | null
}

const props = withDefaults(defineProps<EdgeSmoothStepProps>(), {
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
const path = computed(() =>
  getSmoothStepPath({
    ...props,
  }),
)

const markerEnd = computed(() => getMarkerEnd(props.arrowHeadType, props.markerEndId))
</script>
<template>
  <path class="vue-flow__edge-path" :style="props.style" :d="path" :marker-end="markerEnd" />
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
</template>
