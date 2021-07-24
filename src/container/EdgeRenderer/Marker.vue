<template>
  <marker
    :id="id"
    class="revue-flow__arrowhead"
    markerWidth="12.5"
    markerHeight="12.5"
    viewBox="-10 -10 20 20"
    orient="auto"
    refX="0"
    refY="0"
  >
    <slot></slot>
  </marker>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface MarkerProps {
  id: string;
}

export default defineComponent({
  props: {
    id: {
      type: String as PropType<MarkerProps['id']>,
      required: true
    }
  }
});
</script>
