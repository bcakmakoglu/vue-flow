<script lang="ts" setup>
import type { ConnectionLineProps } from '@vue-flow/core'
import { BaseEdge, getStraightPath } from '@vue-flow/core'
import { computed } from 'vue'

const props = defineProps<ConnectionLineProps>()

const edgePath = computed(() =>
  getStraightPath({
    ...props,
    sourceX: props.sourceX - props.sourceNode.dimensions.width / 2,
  }),
)
</script>

<template>
  <g>
    <BaseEdge
      :style="{
        strokeWidth: 3,
        stroke: 'black',
      }"
      :path="edgePath[0]"
    />
    <circle :cx="targetX" :cy="targetY" fill="black" :r="3" stroke="black" :stroke-width="1.5" />
  </g>
</template>
