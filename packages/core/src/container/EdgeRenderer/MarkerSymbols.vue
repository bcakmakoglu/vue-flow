<script lang="ts" setup>
import { computed } from 'vue'
import { MarkerType } from '../../types'
import type { MarkerProps } from '../../types'
import { useCustomMarker } from '../../composables/useCustomMarker'

const {
  id,
  type,
  width = 12.5,
  height = 12.5,
  markerUnits = 'strokeWidth',
  orient = 'auto-start-reverse',
  strokeWidth = 1,
  color = 'none',
  fill = 'none',
} = defineProps<MarkerProps>()

const { getMarkerDefinition } = useCustomMarker();

const baseMarkerTypes = Object.entries(MarkerType).map(([_, value]) => value as string); 

const customMarkerDefinition = computed(() => {
  if(!baseMarkerTypes.includes(type)) {
    return getMarkerDefinition(type).path
  }
});

const refX = computed(() => {
  if(!baseMarkerTypes.includes(type)) {
    return 3
  }

  return 0
})
</script>

<script lang="ts">
export default {
  name: 'MarkerType',
  compatConfig: { MODE: 3 },
}
</script>

<template>
  <marker
    :id="id"
    class="vue-flow__arrowhead"
    viewBox="-10 -10 20 20"
    :refX="refX"
    refY="0"
    :markerWidth="`${width}`"
    :markerHeight="`${height}`"
    :markerUnits="markerUnits"
    :orient="orient"
  >
    <polyline
      v-if="type === MarkerType.ArrowClosed"
      :style="{
        stroke: color,
        fill: color,
        strokeWidth,
      }"
      stroke-linecap="round"
      stroke-linejoin="round"
      points="-5,-4 0,0 -5,4 -5,-4"
    />

    <polyline
      v-if="type === MarkerType.Arrow"
      :style="{
        stroke: color,
        strokeWidth,
      }"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none"
      points="-5,-4 0,0 -5,4"
    />

    <path
      v-else
      :style="{
        stroke: color,
        strokeWidth,
      }"
      stroke-linecap="round"
      stroke-linejoin="round"
      :fill="fill"
      :d="customMarkerDefinition"
    />    
  </marker>
</template>
