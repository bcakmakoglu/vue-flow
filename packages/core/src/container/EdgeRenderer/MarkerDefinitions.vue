<script lang="ts" setup>
import { computed } from 'vue'
import type { MarkerType } from '@xyflow/system'
import { getMarkerId } from '@xyflow/system'
import type { EdgeMarkerType, MarkerProps } from '../../types'
import { useVueFlow } from '../../composables'
import MarkerSymbols from './MarkerSymbols.vue'

const { id: vueFlowId, edges, connectionLineOptions, defaultMarkerColor: defaultColor } = useVueFlow()

function generateMarkerProps(marker: EdgeMarkerType | undefined, existingIds: string[]): MarkerProps | false {
  if (marker) {
    const markerId = getMarkerId(marker, vueFlowId)

    if (!existingIds.includes(markerId)) {
      if (typeof marker === 'object') {
        return { ...marker, id: markerId, color: marker.color || defaultColor.value }
      } else {
        return { id: markerId, color: defaultColor.value, type: marker as MarkerType }
      }
    }
  }

  return false
}

const markers = computed(() => {
  const ids: string[] = []
  const markers: MarkerProps[] = []

  ;[connectionLineOptions.value.markerEnd, connectionLineOptions.value.markerStart].forEach((markerDefinition) => {
    const markerProps = generateMarkerProps(markerDefinition, ids)

    if (markerProps) {
      markers.push(markerProps)
      ids.push(markerProps.id)
    }
  })

  edges.value.reduce<MarkerProps[]>((markers, edge) => {
    ;[edge.markerStart, edge.markerEnd].forEach((markerDefinition) => {
      const markerProps = generateMarkerProps(markerDefinition, ids)

      if (markerProps) {
        markers.push(markerProps)
        ids.push(markerProps.id)
      }
    })

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
