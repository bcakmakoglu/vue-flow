<script lang="ts" setup>
import { Handle, Position } from '@vue-flow/core'
import { NodeResizer } from '@vue-flow/node-resizer'
import '@vue-flow/node-resizer/dist/style.css'

defineProps(['label'])
</script>

<template>
  <NodeResizer :keep-aspect-ratio="2" min-width="100" min-height="30" />

  <Handle type="target" :position="Position.Left" />
  <div style="padding: 10px">{{ label }}</div>
  <Handle type="source" :position="Position.Right" />
</template>
