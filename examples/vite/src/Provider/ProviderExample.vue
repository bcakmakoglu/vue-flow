<script lang="ts" setup>
import type { Elements, VueFlowStore } from '@vue-flow/core'
import { ConnectionMode, VueFlow, useVueFlow } from '@vue-flow/core'
import { Controls } from '@vue-flow/controls'

import '@vue-flow/controls/dist/style.css'

import Sidebar from './Sidebar.vue'

const onLoad = (flowInstance: VueFlowStore) => console.log('flow loaded:', flowInstance)

const initialElements: Elements = [
  { id: '1', type: 'input', label: 'Node 1', position: { x: 250, y: 5 } },
  { id: '2', label: 'Node 2', position: { x: 100, y: 100 } },
  { id: '3', label: 'Node 3', position: { x: 400, y: 100 } },
  { id: '4', label: 'Node 4', position: { x: 400, y: 200 } },
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
]

useVueFlow()
const elements = ref<Elements>(initialElements)
</script>

<template>
  <div class="providerflow">
    <Sidebar />
    <div class="vue-flow-wrapper">
      <VueFlow v-model="elements" :connection-mode="ConnectionMode.Loose" @pane-ready="onLoad">
        <Controls />
      </VueFlow>
    </div>
  </div>
</template>

<style>
@import 'provider.css';
</style>
