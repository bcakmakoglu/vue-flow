<script lang="ts" setup>
import { Position } from '../../types'
import type { EdgeProps } from '../../types/edge'
import BaseEdge from './BaseEdge.vue'

const props = withDefaults(defineProps<EdgeProps>(), {
  selected: false,
  sourcePosition: 'bottom' as Position,
  targetPosition: 'top' as Position,
  label: '',
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

const path = computed(() => `M ${props.sourceX},${props.sourceY}L ${props.targetX},${props.targetY}`)
</script>
<script lang="ts">
export default {
  name: 'StraightEdge',
}
</script>
<template>
  <BaseEdge
    :path="path"
    :center-x="centerX"
    :center-y="centerY"
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
