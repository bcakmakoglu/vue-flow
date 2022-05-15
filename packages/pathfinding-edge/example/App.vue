<script lang="ts" setup>
import { VueFlow, MiniMap, Controls, Background, Connection, Edge, Elements, FlowInstance, addEdge } from '@braks/vue-flow'
import initialElements from './elements'
import { PathFindingEdge } from '~/index'

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
      <template #edge-pathFinding="props">
        <PathFindingEdge v-bind="props" />
      </template>
      <Controls />
      <MiniMap />
      <Background color="#aaa" :gap="8" />
    </VueFlow>
  </div>
</template>
<style>
@import '../node_modules/@braks/vue-flow/dist/style.css';
@import '../node_modules/@braks/vue-flow/dist/theme-default.css';

html,
body,
#root {
  height: 100%;
  width: 100%;
  font-family: 'JetBrains Mono', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-transform: uppercase;
}
</style>
