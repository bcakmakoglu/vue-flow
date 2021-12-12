<script lang="ts" setup>
import { useVueFlow } from '../../composables'
import type { MarkerProps } from '../../types/edge'
import { getMarkerId } from '../../utils'
import Marker from './Marker.vue'

interface MarkerDefinitionsProps {
  defaultColor: string
}

const props = withDefaults(defineProps<MarkerDefinitionsProps>(), {
  defaultColor: '',
})
const { store } = useVueFlow()

const markers = computed(() => {
  const ids: string[] = []

  return store.edges.reduce<MarkerProps[]>((markers, edge) => {
    ;[edge.markerStart, edge.markerEnd].forEach((marker) => {
      if (marker && typeof marker === 'object') {
        const markerId = getMarkerId(marker)
        if (!ids.includes(markerId)) {
          markers.push({ id: markerId, color: marker.color || props.defaultColor, ...marker })
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
