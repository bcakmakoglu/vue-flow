<script lang="ts" setup>
import type { EdgeProps } from '@vue-flow/core'
import { BaseEdge, getStraightPath } from '@vue-flow/core'
import { computed } from 'vue'

import { getEdgeParams } from './utils'

const props = defineProps<EdgeProps>()

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
  <BaseEdge :id="id" :path="edgePath[0]" :marker-end="markerEnd" :style="style" />
</template>
