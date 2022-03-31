<script lang="ts" setup>
import { Position } from '../../types'
import type { SmoothStepEdgeProps } from '../../types/edge'
import { getCenter, getSmoothStepPath } from './utils'
import BaseEdge from './BaseEdge.vue'

const props = withDefaults(defineProps<SmoothStepEdgeProps>(), {
  selected: false,
  sourcePosition: 'bottom' as Position,
  targetPosition: 'top' as Position,
  label: '',
  labelStyle: () => ({}),
  labelShowBg: true,
  labelBgStyle: () => ({}),
})

const centered = computed(() =>
  getCenter({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    targetX: props.targetX,
    targetY: props.targetY,
    sourcePosition: props.sourcePosition,
    targetPosition: props.targetPosition,
  }),
)

const path = computed(() => {
  if (props.sourceX && props.sourceY)
    return getSmoothStepPath({
      sourceX: props.sourceX,
      sourceY: props.sourceY,
      targetX: props.targetX,
      targetY: props.targetY,
      sourcePosition: props.sourcePosition,
      targetPosition: props.targetPosition,
      borderRadius: props.borderRadius,
    })
  else return ''
})
</script>
<script lang="ts">
export default {
  name: 'SmoothStepEdge',
  inheritAttrs: false,
}
</script>
<template>
  <BaseEdge
    :path="path"
    :center-x="centered[0]"
    :center-y="centered[1]"
    :label="props.label"
    :label-style="props.labelStyle"
    :label-show-bg="props.labelShowBg"
    :label-bg-style="props.labelBgStyle"
    :label-bg-padding="props.labelBgPadding"
    :label-bg-border-radius="props.labelBgBorderRadius"
    :style="props.style"
    :marker-end="props.markerEnd"
    :marker-start="props.markerStart"
  />
</template>
