<script lang="ts" setup>
import { MarkerType } from '../../types/edge'
import type { MarkerProps } from '../../types/edge'

const {
  id,
  type,
  width = 12.5,
  height = 12.5,
  markerUnits = 'strokeWidth',
  orient = 'auto-start-reverse',
  strokeWidth = 1,
  color = 'none',
} = defineProps<MarkerProps>()
</script>

<script lang="ts">
export default {
  name: 'MarkerType',
}
</script>

<template>
  <marker
    :id="id"
    class="vue-flow__arrowhead"
    viewBox="-10 -10 20 20"
    refX="0"
    refY="0"
    :markerWidth="`${width}`"
    :markerHeight="`${height}`"
    :markerUnits="markerUnits"
    :orient="orient"
  >
    <polyline
      v-if="type === MarkerType.ArrowClosed"
      :stroke="color"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-width="strokeWidth"
      :fill="color"
      points="-5,-4 0,0 -5,4 -5,-4"
    />
    <polyline
      v-if="type === MarkerType.Arrow"
      :stroke="color"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-width="strokeWidth"
      fill="none"
      points="-5,-4 0,0 -5,4"
    />
  </marker>
</template>
