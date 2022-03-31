<script lang="ts" setup>
import { Position } from '../../types/flow'
import type { EdgeProps } from '../../types/edge'
import { getSimpleBezierPath, getSimpleBezierCenter } from './utils'
import BaseEdge from './BaseEdge.vue'

const props = withDefaults(defineProps<EdgeProps>(), {
  selected: false,
  sourcePosition: 'bottom' as Position,
  targetPosition: 'top' as Position,
  labelStyle: () => ({}),
  label: '',
  labelShowBg: true,
  labelBgStyle: () => ({}),
})

const centered = computed(() =>
  getSimpleBezierCenter({
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
    return getSimpleBezierPath({
      sourceX: props.sourceX,
      sourceY: props.sourceY,
      targetX: props.targetX,
      targetY: props.targetY,
      sourcePosition: props.sourcePosition,
      targetPosition: props.targetPosition,
    })
  else return ''
})
</script>
<script lang="ts">
export default {
  name: 'SimpleBezierEdge',
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
