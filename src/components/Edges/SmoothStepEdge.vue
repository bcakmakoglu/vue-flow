<script lang="ts" setup>
import { CSSProperties } from 'vue'
import { ArrowHeadType, EdgeProps, EdgeTextProps, Position } from '../../types'
import EdgeText from './EdgeText.vue'
import { getCenter, getMarkerEnd, getSmoothStepPath } from './utils'

interface SmoothStepEdgeProps extends EdgeProps {
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
  borderRadius?: number
  sourceHandleId?: string
  targetHandleId?: string
}

const props = withDefaults(defineProps<SmoothStepEdgeProps>(), {
  selected: false,
  sourcePosition: Position.Bottom,
  targetPosition: Position.Top,
  label: '',
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

const attrs = useAttrs() as Record<'style', CSSProperties>
</script>
<script lang="ts">
export default {
  name: 'SmoothStepEdge',
  inheritAttrs: false,
}
</script>
<template>
  <path class="vue-flow__edge-path" :style="attrs.style" :d="path" :marker-end="markerEnd" />
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
