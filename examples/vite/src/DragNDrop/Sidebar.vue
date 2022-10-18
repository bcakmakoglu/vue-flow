<script lang="ts" setup>
import { useDragNDrop } from '@vue-flow/plugin-drag-n-drop'

const { handleDragStart } = useDragNDrop()
</script>

<template>
  <aside>
    <div class="description">You can drag these nodes to the pane on the left.</div>
    <div class="vue-flow__node-input" :draggable="true" @dragstart="handleDragStart($event, 'input')">Input Node</div>
    <div class="vue-flow__node-default" :draggable="true" @dragstart="handleDragStart($event, 'default')">Default Node</div>
    <div class="vue-flow__node-output" :draggable="true" @dragstart="handleDragStart($event, 'output')">Output Node</div>
  </aside>
</template>
