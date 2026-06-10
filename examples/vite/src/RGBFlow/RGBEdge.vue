<script lang="ts" setup>
import { computed } from 'vue'
import type { Edge, EdgeProps } from '@vue-flow/core'
import { getBezierPath } from '@vue-flow/core'
import type { Colors } from './utils'

interface EdgeData extends Record<string, unknown> {
  text?: string
  color?: Colors
}

type RGBEdge = Edge<EdgeData, 'rgb-edge'>

const props = defineProps<EdgeProps<RGBEdge>>()

const edgePath = computed(() => getBezierPath(props))
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <path
    :id="id"
    class="vue-flow__edge-path"
    :style="{ stroke: data?.color, strokeWidth: '3' }"
    :d="edgePath[0]"
    :marker-end="markerEnd"
  />

  <text>
    <textPath :href="`#${id}`" :style="{ fontSize: '1.25rem', fill: 'black' }" startOffset="50%" text-anchor="middle">
      {{ data?.text }}
    </textPath>
  </text>
</template>
