<script lang="ts" setup>
import { Handle, Position } from '@vue-flow/core'
import { NodeResizer } from '@vue-flow/node-resizer'

defineProps(['label', 'selected'])
</script>

<template>
  <NodeResizer color="#ff0071" :is-visible="selected" :min-width="100" :min-height="30" />

  <Handle type="target" :position="Position.Left" />
  <div style="padding: 10px">{{ label }}</div>
  <Handle type="source" :position="Position.Right" />
</template>
