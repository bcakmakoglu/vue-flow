<script setup>
import { Handle, NodeResizer, Position } from '@vue-flow/core'

defineProps(['data'])
</script>

<template>
  <NodeResizer min-width="100" min-height="30" />

  <Handle type="target" :position="Position.Left" />
  <div style="padding: 10px">{{ data.label }}</div>
  <Handle type="source" :position="Position.Right" />
</template>
