<script lang="ts" setup>
import { Panel, VueFlow, useVueFlow } from '@vue-flow/core'
import useStore from './store'

const store = useStore()

const { onConnect, addEdges } = useVueFlow()

onConnect(addEdges)
</script>

<template>
  <VueFlow v-model="store.elements" fit-view-on-init>
    <Panel position="top-center">
      <button @click="store.updatePosition">update positions</button>
      <button @click="store.toggleClass">toggle class</button>
      <button @click="store.log">log store state</button>
      <button @click="store.reset">reset elements</button>
    </Panel>
  </VueFlow>
</template>

<style scoped>
.vue-flow__panel {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  color: #333;
  font-size: 0.8rem;
  margin: 0.25rem;
  padding: 0.25rem 0.5rem;
}

.vue-flow__panel button {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  color: #333;
  cursor: pointer;
  font-size: 0.8rem;
  margin: 0.25rem;
  padding: 0.25rem 0.5rem;
}

.vue-flow__panel button:hover {
  background-color: #e5e5e5;
}

.vue-flow__panel button:active {
  background-color: #d5d5d5;
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.2);
}
</style>
