<template>
  <defs>
    <Marker id="revue-flow__arrowclosed">
      <polyline
        :stroke="color"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1"
        :fill="color"
        points="-5,-4 0,0 -5,4 -5,-4"
      />
    </Marker>
    <Marker id="revue-flow__arrow">
      <polyline
        :stroke="color"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        fill="none"
        points="-5,-4 0,0 -5,4"
      />
    </Marker>
  </defs>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Marker from './Marker.vue';

interface MarkerDefinitionsProps {
  color: string;
}

const MarkerDefinitions = defineComponent({
  name: 'MarkerDefinitions',
  components: { Marker },
  props: {
    color: {
      type: String as PropType<MarkerDefinitionsProps['color']>,
      required: true
    }
  }
});

export default MarkerDefinitions;
</script>
