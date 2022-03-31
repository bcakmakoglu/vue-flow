<script lang="ts" setup>
import { Position } from '../../types'
import type { EdgeProps } from '../../types/edge'
import SmoothStepEdge from './SmoothStepEdge.vue'

const props = withDefaults(defineProps<EdgeProps>(), {
  selected: false,
  sourcePosition: 'bottom' as Position,
  targetPosition: 'top' as Position,
  label: '',
  labelStyle: () => ({}),
  labelShowBg: true,
  labelBgStyle: () => ({}),
})
</script>
<script lang="ts">
export default {
  name: 'StepEdge',
  inheritAttrs: false,
}
</script>
<template>
  <SmoothStepEdge v-bind="props" :border-radius="0" />
</template>
