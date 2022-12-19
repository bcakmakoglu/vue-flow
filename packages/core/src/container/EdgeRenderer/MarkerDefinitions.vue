<script lang="ts" setup>
import type { EdgeMarkerType, MarkerProps, MarkerType } from '../../types/edge'
import Marker from './Marker.vue'

const { id: vueFlowId, edges, connectionLineOptions, defaultMarkerColor: defaultColor } = $(useVueFlow())

const markers = computed(() => {
  const ids: string[] = []
  const markers: MarkerProps[] = []

  const createMarkers = (marker?: EdgeMarkerType) => {
    if (marker) {
      const markerId = getMarkerId(marker, vueFlowId)
      if (!ids.includes(markerId)) {
        if (typeof marker === 'object') markers.push({ ...marker, id: markerId, color: marker.color || defaultColor })
        else markers.push({ id: markerId, color: defaultColor, type: marker as MarkerType })
        ids.push(markerId)
      }
    }
  }

  ;[connectionLineOptions.markerEnd, connectionLineOptions.markerStart].forEach(createMarkers)

  edges.reduce<MarkerProps[]>((markers, edge) => {
    ;[edge.markerStart, edge.markerEnd].forEach(createMarkers)
    return markers.sort((a, b) => a.id.localeCompare(b.id))
  }, markers)

  return markers
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
