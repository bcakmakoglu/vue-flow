<script lang="ts" setup>
import type { Elements, FlowEvents } from '@braks/vue-flow'
import { Background, Controls, MiniMap, VueFlow, addEdge } from '@braks/vue-flow'
import { ref } from 'vue'
import { ResizeRotateNode } from '../src'
import initialElements from './elements'

const elements = ref<Elements>(initialElements)

const onConnect = (params: FlowEvents['connect']) => (elements.value = addEdge(params, elements.value))
</script>

<template>
  <div style="height: 100%">
    <VueFlow v-model="elements" class="vue-flow-basic-example" fit-view @connect="onConnect">
      <template #node-resize-rotate="props">
        <ResizeRotateNode v-bind="props" />
      </template>

      <Controls />

      <MiniMap />

      <Background variant="lines" color="#aaa" size="1" :gap="10" />
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
  margin: 0;
  font-family: 'JetBrains Mono', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-transform: uppercase;
  color: white;
}
</style>
