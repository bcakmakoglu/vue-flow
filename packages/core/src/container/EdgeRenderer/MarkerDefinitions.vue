<script lang="ts" setup>
import { computed } from 'vue'
import type { EdgeMarkerType, MarkerProps, MarkerType } from '../../types/edge'
import { useVueFlow } from '../../composables'
import { getMarkerId } from '../../utils'
import MarkerSymbols from './MarkerSymbols.vue'

const { id: vueFlowId, edges, connectionLineOptions, defaultMarkerColor: defaultColor } = useVueFlow()

const markers = computed(() => {
  const ids: string[] = []
  const markers: MarkerProps[] = []

  const createMarkers = (marker?: EdgeMarkerType) => {
    if (marker) {
      const markerId = getMarkerId(marker, vueFlowId)
      if (!ids.includes(markerId)) {
        if (typeof marker === 'object') {
          markers.push({ ...marker, id: markerId, color: marker.color || defaultColor.value })
        } else {
          markers.push({ id: markerId, color: defaultColor.value, type: marker as MarkerType })
        }

        ids.push(markerId)
      }
    }
  }

  for (const marker of [connectionLineOptions.value.markerEnd, connectionLineOptions.value.markerStart]) {
    createMarkers(marker)
  }

  edges.value.reduce<MarkerProps[]>((markers, edge) => {
    for (const marker of [edge.markerStart, edge.markerEnd]) {
      createMarkers(marker)
    }

    return markers.sort((a, b) => a.id.localeCompare(b.id))
  }, markers)

  return markers
})
</script>

<script lang="ts">
export default {
  name: 'MarkerDefinitions',
  compatConfig: { MODE: 3 },
}
</script>

<template>
  <defs>
    <MarkerSymbols
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
