<script lang="ts" setup>
import type { Connection, Edge, Elements, VueFlowStore } from '@braks/vue-flow'
import { Background, Controls, MiniMap, VueFlow, addEdge } from '@braks/vue-flow'
import { ref } from 'vue'
import { ResizeRotateNode } from '../src'
import initialElements from './elements'

const elements = ref<Elements>(initialElements)

const onConnect = (params: Edge | Connection) => (elements.value = addEdge(params, elements.value))

const extent = ref([
  [0, 0],
  [Infinity, Infinity],
])

const onPaneReady = (store: VueFlowStore) => {
  store.fitView({ minZoom: 1, maxZoom: 1 })

  const bounds = store.vueFlowRef.value.getBoundingClientRect()

  extent.value = [
    [0, 0],
    [bounds.width, bounds.height],
  ]

  store.setTranslateExtent(extent.value)
}
</script>

<template>
  <div style="height: 100%; color: black">
    {{ extent }}
    <VueFlow
      v-model="elements"
      class="vue-flow-basic-example"
      snap-to-grid
      :snap-grid="[10, 10]"
      :prevent-scrolling="false"
      :zoom-on-scroll="false"
      :pan-on-drag="false"
      :translate-extent="extent"
      :node-extent="extent"
      @connect="onConnect"
      @pane-ready="onPaneReady"
    >
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
  height: 1024px;
  width: 100%;
  margin: 0;
  font-family: 'JetBrains Mono', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-transform: uppercase;
  color: white;
}
</style>
