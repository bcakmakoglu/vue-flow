<script lang="ts" setup>
import type { Connection, Edge, Elements, FlowInstance } from '@braks/vue-flow'
import { Background, Controls, MiniMap, VueFlow, addEdge } from '@braks/vue-flow'
import { ResizeRotateNode } from '../src'
import initialElements from './elements'

const elements = ref<Elements>(initialElements)
const rfInstance = ref<FlowInstance | null>(null)
const onConnect = (params: Edge | Connection) => (elements.value = addEdge(params, elements.value))
const onLoad = (flowInstance: FlowInstance) => {
  flowInstance.fitView({ padding: 1 })
  rfInstance.value = flowInstance
}
</script>

<template>
  <div style="height: 100%">
    <VueFlow v-model="elements" class="vue-flow-basic-example" @connect="onConnect" @pane-ready="onLoad">
      <template #node-resize-rotate="props">
        <ResizeRotateNode v-bind="props" />
      </template>
      <Controls />
      <MiniMap />
      <Background color="#aaa" :gap="8" />
    </VueFlow>
  </div>
</template>

<style>
@import '@braks/vue-flow/dist/style.css';
@import '@braks/vue-flow/dist/theme-default.css';

html,
body,
#root {
  height: 100%;
  width: 100%;
  font-family: 'JetBrains Mono', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-transform: uppercase;
  color: white;
}
</style>
