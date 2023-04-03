<script lang="ts" setup>
import type { GraphNode } from '@vue-flow/core'
import { getStraightPath } from '@vue-flow/core'
import { computed } from '@vue/reactivity'
const props = defineProps<{ sourceNode: GraphNode; sourceX: number; sourceY: number; targetX: number; targetY: number }>()

const edgePath = computed(() =>
  getStraightPath({
    ...props,
    sourceX: props.sourceX - props.sourceNode.dimensions.width / 2,
  }),
)
</script>

<template>
  <g>
    <path
      :style="{
        strokeWidth: 3,
        stroke: 'black',
      }"
      fill="none"
      :d="edgePath[0]"
    />
    <circle :cx="targetX" :cy="targetY" fill="black" :r="3" stroke="black" :stroke-width="1.5" />
  </g>
</template>
