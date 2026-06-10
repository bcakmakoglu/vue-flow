<script lang="ts" setup>
import { Handle, NodeToolbar, Position as PositionEnum } from '@vue-flow/core'
import type { ToolbarNodeData } from './types'

interface Props {
  data: ToolbarNodeData
  label?: string
}

defineProps<Props>()
</script>

<template>
  <NodeToolbar :is-visible="data.toolbarVisible" :position="data.toolbarPosition">
    <button>delete</button>
    <button>copy</button>
    <button>expand</button>
  </NodeToolbar>

  <div :style="{ padding: '10px 20px' }">
    {{ label }}
  </div>

  <Handle type="target" :position="PositionEnum.Left" />
  <Handle type="source" :position="PositionEnum.Right" />
</template>
