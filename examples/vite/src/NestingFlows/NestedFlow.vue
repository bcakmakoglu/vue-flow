<script lang="ts" setup>
import { VueFlow, useVueFlow } from '@vue-flow/core'
import type { Elements } from '@vue-flow/core'

import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'

import { newVueFlowInstanceID } from './NestingFlows'

const { ancestorZoom } = defineProps(['ancestorZoom'])

// temporary fix to allow nested VueFlow components to pan
const NestedFlowElement = useTemplateRef('NestedFlowElement')
onUpdated(() => {
  NestedFlowElement.value.vueFlowRef.parentElement?.parentElement?.parentElement?.classList.remove('nopan')
})

const elements = ref<Elements>([
  { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
  { id: '3', data: { label: 'Node 3' }, position: { x: 400, y: 100 } },
  { id: '4', data: { label: 'Node 4' }, position: { x: 400, y: 200 } },
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
])

const vueFlowInstanceID = `flow-${newVueFlowInstanceID()}`
const { onConnect, addEdges } = useVueFlow(vueFlowInstanceID)
onConnect(addEdges)
</script>

<template>
  <VueFlow
    :id="vueFlowInstanceID"
    ref="NestedFlowElement"
    v-model="elements"
    :fit-view-on-init="true"
    :auto-pan-on-connect="false"
    :auto-pan-on-node-drag="false"
    class="vue-flow-basic-example nested-flow"
    :ancestor-zoom="ancestorZoom"
  >
    <Background />
    <MiniMap />
    <Controls />
  </VueFlow>
</template>

<style scoped>
.nested-flow {
  width: 100%;
  height: 100%;
}
</style>
