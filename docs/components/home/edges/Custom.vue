<script lang="ts" setup>
import type { Edge, EdgeProps } from '@vue-flow/core';
import type { Colors } from '../flows/utils';
import { getBezierPath } from '@vue-flow/core';
import { computed } from 'vue';

export interface EdgeData extends Record<string, unknown> {
  text?: string;
  color?: Colors;
}

export type RGBEdge = Edge<EdgeData, 'rgb-line'>;

const props = defineProps<EdgeProps<RGBEdge>>();

const edgePath = computed(() => getBezierPath(props));
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<template>
  <path
    :id="`${id}-${data?.color}`"
    class="vue-flow__edge-path"
    :style="{ stroke: data?.color, strokeWidth: '3' }"
    :d="edgePath[0]"
    :marker-end="markerEnd"
  />
  <text>
    <textPath
      :href="`#${id}-${data?.color}`"
      :style="{ fontSize: '1.25rem', fill: 'white' }"
      startOffset="50%"
      text-anchor="middle"
    >
      {{ data?.text }}
    </textPath>
  </text>
</template>
