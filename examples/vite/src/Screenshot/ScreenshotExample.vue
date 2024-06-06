<script lang="ts" setup>
import { Panel, VueFlow, useVueFlow } from '@vue-flow/core'
import type { Edge, Node } from '@vue-flow/core'
import { useScreenshot } from './useScreenshot'

const { vueFlowRef } = useVueFlow()
const { capture } = useScreenshot()

const nodes = ref<Node[]>([
  { id: '1', type: 'input', label: 'Node 1', position: { x: 250, y: 5 } },
  { id: '2', label: 'Node 2', position: { x: 100, y: 100 } },
  { id: '3', label: 'Node 3', position: { x: 400, y: 100 } },
  { id: '4', label: 'Node 4', position: { x: 400, y: 200 } },
])

const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
])

function doScreenshot() {
  if (!vueFlowRef.value) {
    console.warn('VueFlow element not found')
    return
  }

  capture(vueFlowRef.value, { shouldDownload: true })
}
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" fit-view-on-init style="background: white">
    <Panel position="top-center">
      <button @click="doScreenshot">Screenshot</button>
    </Panel>
  </VueFlow>
</template>
