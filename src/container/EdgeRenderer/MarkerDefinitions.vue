<script lang="ts" setup>
import Marker from './Marker.vue'

interface MarkerDefinitionsProps {
  color: string
}

const props = withDefaults(defineProps<MarkerDefinitionsProps>(), {
  color: '',
})
</script>
<template>
  <defs>
    <Marker id="revue-flow__arrowclosed">
      <polyline
        :stroke="props.color"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1"
        :fill="props.color"
        points="-5,-4 0,0 -5,4 -5,-4"
      />
    </Marker>
    <Marker id="revue-flow__arrow">
      <polyline
        :stroke="props.color"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        fill="none"
        points="-5,-4 0,0 -5,4"
      />
    </Marker>
  </defs>
</template>
