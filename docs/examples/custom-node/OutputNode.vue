<script setup>
import { Handle, Position, useHandleConnections, useNodesData } from '@vue-flow/core'

const connections = useHandleConnections({
  type: 'target',
})

const nodesData = useNodesData(() => connections.value[0]?.source)
</script>

<template>
  <Handle
    type="target"
    :position="Position.Left"
    :style="{ height: '16px', width: '6px', backgroundColor: nodesData.data?.color, filter: 'invert(100%)' }"
  />
  {{ nodesData.data?.isGradient ? 'GRADIENT' : nodesData.data?.color }}
</template>
