<script setup>
import { Handle, Position, useHandleConnections, useNodesData } from '@vue-flow/core'

defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const connections = useHandleConnections({
  type: 'target',
})

const data = useNodesData(() => connections.value[0]?.source)
</script>

<template>
  <Handle type="target" :position="Position.Left" :style="{ backgroundColor: data?.color, filter: 'invert(100%)' }" />
  {{ data?.isGradient ? 'GRADIENT' : data?.color }}
</template>
