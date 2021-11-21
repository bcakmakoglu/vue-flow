<script lang="ts" setup>
import { Component, CSSProperties, DefineComponent } from 'vue'
import { ArrowHeadType, EdgeProps, ElementId, Position } from '../../types'
import SmoothStepEdge from './SmoothStepEdge.vue'

export interface StepEdgeProps extends EdgeProps {
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
        component: Component | DefineComponent
        props?: Record<string, any>
      }
  labelStyle?: CSSProperties
  labelShowBg?: boolean
  labelBgStyle?: CSSProperties
  labelBgPadding?: [number, number]
  labelBgBorderRadius?: number
  arrowHeadType?: ArrowHeadType
  markerEndId?: string
  sourceHandleId?: ElementId | null
  targetHandleId?: ElementId | null
}

const props = withDefaults(defineProps<StepEdgeProps>(), {
  selected: false,
  sourcePosition: Position.Bottom,
  targetPosition: Position.Top,
  label: '',
  labelStyle: () => ({}),
  labelShowBg: true,
  labelBgStyle: () => ({}),
})
const attrs = useAttrs() as Record<'style', CSSProperties>
</script>
<script lang="ts">
export default {
  name: 'StepEdge',
}
</script>
<template>
  <SmoothStepEdge v-bind="{ ...props, ...attrs }" :border-radius="0">
    <slot />
  </SmoothStepEdge>
</template>
