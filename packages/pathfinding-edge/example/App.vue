<script lang="ts" setup>
import type { Elements } from '@vue-flow/core'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { ref } from 'vue'
import initialElements from './elements'
import { PathFindingEdge, PerfectArrow } from '~/index'

const elements = ref<Elements>(initialElements)

const { addEdges, onConnect } = useVueFlow()

onConnect((params) => addEdges([params]))
</script>

<template>
  <div style="height: 100%">
    <VueFlow
      v-model="elements"
      :default-edge-options="{ type: 'perfectArrow' }"
      :fit-view-on-init="true"
      class="vue-flow-basic-example"
    >
      <template #edge-pathFinding="props">
        <PathFindingEdge v-bind="props" />
      </template>
      <template #edge-perfectArrow="props">
        <PerfectArrow v-bind="props" />
      </template>
    </VueFlow>
  </div>
</template>

<style>
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';

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
