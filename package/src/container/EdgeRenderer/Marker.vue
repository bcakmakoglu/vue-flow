<script lang="ts" setup>
import type { MarkerProps } from '../../types/edge'

const props = withDefaults(defineProps<MarkerProps>(), {
  width: 12.5,
  height: 12.5,
  markerUnits: 'strokeWidth',
  orient: 'auto',
  strokeWidth: 1,
  color: 'none',
})
</script>
<script lang="ts">
export default {
  name: 'Marker',
}
</script>
<template>
  <marker
    :id="props.id"
    class="vue-flow__arrowhead"
    viewBox="-10 -10 20 20"
    refX="0"
    refY="0"
    :markerWidth="`${props.width}`"
    :markerHeight="`${props.height}`"
    :markerUnits="props.markerUnits"
    :orient="props.orient"
  >
    <polyline
      v-if="props.type === 'arrowclosed'"
      :stroke="props.color"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-width="props.strokeWidth"
      :fill="props.color"
      points="-5,-4 0,0 -5,4 -5,-4"
    />
    <polyline
      v-if="props.type === 'arrow'"
      :stroke="props.color"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-width="props.strokeWidth"
      fill="none"
      points="-5,-4 0,0 -5,4"
    />
  </marker>
</template>
