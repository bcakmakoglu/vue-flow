<script lang="ts" setup>
import { useVueFlow } from '../../composables'
import type { MarkerProps, MarkerType } from '../../types/edge'
import { getMarkerId } from '../../utils'
import Marker from './Marker.vue'

const { defaultColor = '' } = defineProps<{
  defaultColor: string
}>()

const { edges } = $(useVueFlow())

const markers = computed(() => {
  const ids: string[] = []

  return edges.reduce<MarkerProps[]>((markers, edge) => {
    ;[edge.markerStart, edge.markerEnd].forEach((marker) => {
      if (marker) {
        const markerId = getMarkerId(marker)
        if (!ids.includes(markerId)) {
          if (typeof marker === 'object') markers.push({ ...marker, id: markerId, color: marker.color || defaultColor })
          else markers.push({ id: markerId, color: defaultColor, type: marker as MarkerType })
          ids.push(markerId)
        }
      }
    })
    return markers.sort((a, b) => a.id.localeCompare(b.id))
  }, [])
})
</script>

<script lang="ts">
export default {
  name: 'MarkerDefinitions',
}
</script>

<template>
  <defs>
    <Marker
      v-for="marker of markers"
      :id="marker.id"
      :key="marker.id"
      :type="marker.type"
      :color="marker.color"
      :width="marker.width"
      :height="marker.height"
      :markerUnits="marker.markerUnits"
      :stroke-width="marker.strokeWidth"
      :orient="marker.orient"
    />
  </defs>
</template>
