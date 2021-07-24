<template>
  <g>
    <path
      class="animated"
      fill="none"
      stroke="#222"
      :stroke-width="1.5"
      :d="`M${sourceX},${sourceY} C ${sourceX} ${targetY} ${sourceX} ${targetY} ${targetX},${targetY}`"
    />
    <circle :cx="targetX" :cy="targetY" fill="#fff" :r="3" stroke="#222" :stroke-width="1.5" />
  </g>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ConnectionLineComponentProps } from '../../src';

export default defineComponent({
  props: {
    sourceX: {
      type: Number as PropType<ConnectionLineComponentProps['sourceX']>,
      required: true
    },
    sourceY: {
      type: Number as PropType<ConnectionLineComponentProps['sourceY']>,
      required: true
    },
    targetX: {
      type: Number as PropType<ConnectionLineComponentProps['targetX']>,
      required: true
    },
    targetY: {
      type: Number as PropType<ConnectionLineComponentProps['targetY']>,
      required: true
    }
  }
});
</script>
