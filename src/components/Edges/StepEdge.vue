<script lang="ts" setup>
import { VNode } from 'vue'
import SmoothStepEdge from './SmoothStepEdge.vue'
import { ArrowHeadType, ElementId, Position } from '~/types'

export interface EdgeStepProps<T = any> {
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
  label?: string | VNode
  labelStyle?: any
  labelShowBg?: boolean
  labelBgStyle?: any
  labelBgPadding?: [number, number]
  labelBgBorderRadius?: number
  style?: any
  arrowHeadType?: ArrowHeadType
  markerEndId?: string
  data?: T
  sourceHandleId?: ElementId | null
  targetHandleId?: ElementId | null
}

const props = withDefaults(defineProps<EdgeStepProps>(), {
  selected: false,
  sourcePosition: Position.Bottom,
  targetPosition: Position.Top,
  label: () => '',
  labelStyle: () => ({}),
  labelShowBg: true,
  labelBgStyle: () => ({}),
})
</script>
<template>
  <SmoothStepEdge v-bind="props" :border-radius="0" />
</template>
