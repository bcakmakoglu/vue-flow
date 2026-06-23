<script lang="ts" setup>
import type { Elements } from '@vue-flow/core'
import { VueFlow, useVueFlow } from '@vue-flow/core'

import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'

import NestedFlowNode from './NestedFlowNode.vue'
import { newVueFlowInstanceID } from './NestingFlows'

const id = newVueFlowInstanceID()
const elements = ref<Elements>(
  id < 31
    ? [
        {
          id: 'A',
          type: 'nestedFlow',
          data: {
            label: 'Flow A',
          },
          position: { x: 20, y: 5 },
        },
        {
          id: 'B',
          type: 'nestedFlow',
          data: {
            label: 'Flow B',
          },
          position: { x: 400, y: 20 },
        },
      ]
    : [],
)
const vueFlowInstanceID = `flow-${id}`
const { onConnect, addEdges, viewport, ancestorZoom } = useVueFlow(vueFlowInstanceID)
onConnect(addEdges)
</script>

<template>
  <VueFlow
    :id="vueFlowInstanceID"
    v-model="elements"
    :fit-view-on-init="true"
    :auto-pan-on-connect="false"
    :auto-pan-on-node-drag="false"
    class="vue-flow-basic-example"
  >
    <Background />
    <MiniMap />
    <Controls />
    <template #node-nestedFlow="props">
      <NestedFlowNode :data="props.data" :ancestor-zoom="ancestorZoom * viewport.zoom" />
    </template>
  </VueFlow>
</template>
