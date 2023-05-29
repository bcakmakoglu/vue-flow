<script lang="ts" setup>
import type { GraphNode, Position } from '@vue-flow/core'
import { getBezierPath } from '@vue-flow/core'
import { getEdgeParams } from './floating-edge-utils'

interface FloatingConnectionLineProps {
  targetX: number
  targetY: number
  sourcePosition: Position
  targetPosition: Position
  sourceNode: GraphNode
}

const props = defineProps<FloatingConnectionLineProps>()

const targetNode = computed(() => {
  return {
    id: 'connection-target',
    computedPosition: { x: props.targetX, y: props.targetY },
    dimensions: { width: 1, height: 1 },
  } as GraphNode
})

const edgeParams = computed(() => getEdgeParams(props.sourceNode, targetNode.value))

const edgePath = computed(() =>
  getBezierPath({
    sourceX: edgeParams.value.sx,
    sourceY: edgeParams.value.sy,
    ...props,
  }),
)
</script>

<template>
  <g>
    <path fill="none" stroke="#222" :stroke-width="1.5" class="animated" :d="edgePath[0]" />
    <circle :cx="targetX" :cy="targetY" fill="#fff" :r="3" stroke="#222" :stroke-width="1.5" />
  </g>
</template>
