<script lang="ts" setup>
import { MarkerType, VueFlow, useVueFlow } from '@vue-flow/core'
import { Background, BackgroundVariant } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'

import FloatingEdge from './FloatingEdge.vue'
import FloatingConnectionLine from './FloatingConnectionLine.vue'
import { createElements } from './floating-edge-utils'

const { addEdges, onConnect, onPaneReady, getNodes } = useVueFlow({
  modelValue: createElements(),
})
onPaneReady(({ fitView }) => fitView())
onConnect((params) => addEdges([{ ...params, type: 'floating', markerEnd: MarkerType.Arrow }]))
</script>

<template>
  <div class="floatingedges">
    <VueFlow>
      <Background :variant="BackgroundVariant.Lines" :gap="24" />
      <MiniMap />
      <Controls />

      <template #connection-line="props">
        <FloatingConnectionLine v-bind="props" />
      </template>
      <template #edge-floating="props">
        <FloatingEdge v-bind="props" :nodes="getNodes" />
      </template>
    </VueFlow>
  </div>
</template>

<style>
.floatingedges {
  flex-direction: column;
  display: flex;
  height: 100%;
}

.floatingedges .vue-flow__handle {
  opacity: 0;
}
</style>
