<script setup>
import { Handle, Position } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

defineProps(['data', 'label'])
</script>

<template>
  <NodeToolbar
    style="display: flex; gap: 0.5rem; align-items: center"
    :is-visible="data.toolbarVisible"
    :position="data.toolbarPosition"
  >
    <button>Action1</button>
    <button>Action2</button>
    <button>Action3</button>
  </NodeToolbar>

  <div :style="{ padding: '10px 20px' }">
    {{ label }}
  </div>

  <Handle type="target" :position="Position.Left" />
  <Handle type="source" :position="Position.Right" />
</template>
