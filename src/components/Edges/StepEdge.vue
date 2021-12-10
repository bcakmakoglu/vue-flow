<script lang="ts" setup>
import { CSSProperties } from 'vue'
import { ArrowHeadType, EdgeProps, Position } from '../../types'
import SmoothStepEdge from './SmoothStepEdge.vue'

interface StepEdgeProps extends EdgeProps {
  id: string
  source: string
  target: string
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  selected?: boolean
  animated?: boolean
  sourcePosition: Position
  targetPosition: Position
  label?: string
  labelStyle?: CSSProperties
  labelShowBg?: boolean
  labelBgStyle?: CSSProperties
  labelBgPadding?: [number, number]
  labelBgBorderRadius?: number
  arrowHeadType?: ArrowHeadType
  markerEndId?: string
  sourceHandleId?: string
  targetHandleId?: string
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
