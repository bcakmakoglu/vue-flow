<script lang="ts" setup>
import type { GraphNode } from '@vue-flow/core'
import { getStraightPath } from '@vue-flow/core'
import { computed } from 'vue'

import { getEdgeParams } from './utils'

const props = defineProps<{ id: string; sourceNode: GraphNode; targetNode: GraphNode; markerEnd: string; style: any }>()

const edgeParams = computed(() => getEdgeParams(props.sourceNode, props.targetNode))

const edgePath = computed(() =>
  getStraightPath({
    sourceX: edgeParams.value.sx,
    sourceY: edgeParams.value.sy,
    targetX: edgeParams.value.tx,
    targetY: edgeParams.value.ty,
  }),
)
</script>

<template>
  <path :id="id" class="vue-flow__edge-path" :d="edgePath[0]" :marker-end="markerEnd" :style="style" />
</template>
