<script lang="ts" setup>
const onDragStart = (event: DragEvent, nodeType: string) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/vueflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }
}
</script>
<template>
  <aside class="md:(w-[30%] max-w-[200px])">
    <div class="mb-6">You can drag these nodes to the pane on the left.</div>
    <div
      class="droppable-node vue-flow__node-input"
      :draggable="true"
      @dragstart="(event: DragEvent) => onDragStart(event, 'input')"
    >
      Input Node
    </div>
    <div
      class="droppable-node vue-flow__node-default"
      :draggable="true"
      @dragstart="(event: DragEvent) => onDragStart(event, 'default')"
    >
      Default Node
    </div>
    <div
      class="droppable-node vue-flow__node-output"
      :draggable="true"
      @dragstart="(event: DragEvent) => onDragStart(event, 'output')"
    >
      Output Node
    </div>
  </aside>
</template>
<style scoped>
aside {
  border-right: 1px solid #eee;
  padding: 15px 10px;
  font-size: 12px;
  background: #fcfcfc;
}

.droppable-node {
  @apply mb-6;
  cursor: grab;
}
</style>
