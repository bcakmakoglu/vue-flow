<script lang="ts" setup>
import type { Edge, Node } from '@vue-flow/core'
import { Background, Controls, MarkerType, MiniMap, VueFlow, isEdge, isNode, useVueFlow } from '@vue-flow/core'

import FloatingEdge from './FloatingEdge.vue'
import FloatingConnectionLine from './FloatingConnectionLine.vue'
import { createElements } from './floating-edge-utils'

const initialElements = createElements()

const { addEdges, onConnect } = useVueFlow({
  nodes: initialElements.filter(isNode) as Node[],
  edges: initialElements.filter(isEdge) as Edge[],
})

onConnect((params) => addEdges({ ...params, type: 'floating', markerEnd: MarkerType.Arrow }))
</script>

<template>
  <div class="floatingedges">
    <VueFlow fit-view-on-init>
      <Background variant="lines" :gap="24" />

      <MiniMap />

      <Controls />

      <template #connection-line="props">
        <FloatingConnectionLine v-bind="props" />
      </template>

      <template #edge-floating="props">
        <FloatingEdge v-bind="props" />
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
