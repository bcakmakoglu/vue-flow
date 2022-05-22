<script lang="ts" setup>
import type { Connection, Edge, Elements, FlowInstance } from '@braks/vue-flow'
import { Background, VueFlow, addEdge } from '@braks/vue-flow'
import initialElements from './elements'
import { PathFindingEdge, PerfectArrow } from '~/index'

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
    <VueFlow
      v-model="elements"
      :default-edge-options="{ type: 'perfectArrow' }"
      class="vue-flow-basic-example"
      @connect="onConnect"
      @pane-ready="onLoad"
    >
      <template #edge-pathFinding="props">
        <PathFindingEdge v-bind="props" />
      </template>
      <template #edge-perfectArrow="props">
        <PerfectArrow v-bind="props" />
      </template>

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
}
</style>
