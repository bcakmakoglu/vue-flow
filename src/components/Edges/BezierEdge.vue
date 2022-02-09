<script lang="ts" setup>
import { Position } from '../../types/flow'
import type { EdgeProps } from '../../types/edge'
import { getCenter, getBezierPath } from './utils'
import EdgeText from './EdgeText.vue'

const props = withDefaults(defineProps<EdgeProps>(), {
  selected: false,
  sourcePosition: 'bottom' as Position,
  targetPosition: 'top' as Position,
  labelStyle: () => ({}),
  label: () => '',
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
</script>
<script lang="ts">
export default {
  name: 'BezierEdge',
  inheritAttrs: false,
}
</script>
<template>
  <path
    class="vue-flow__edge-path"
    :style="props.style"
    :d="path"
    :marker-end="props.markerEnd"
    :marker-start="props.markerStart"
  />
  <slot :x="centered[0]" :y="centered[1]" v-bind="props">
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
