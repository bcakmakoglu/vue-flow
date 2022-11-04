<script lang="ts" setup>
import { Panel, PanelPosition } from '@vue-flow/additional-components'
import type { Elements } from '@vue-flow/core'
import { VueFlow, useVueFlow } from '@vue-flow/core'

const elements = ref<Elements>([
  { id: '1', type: 'input', label: 'Node 1', position: { x: 250, y: 5 }, class: 'light' },
  { id: '2', label: 'Node 2', position: { x: 100, y: 100 }, class: 'light' },
  { id: '3', label: 'Node 3', position: { x: 400, y: 100 }, class: 'light' },
  { id: '4', label: 'Node 4', position: { x: 400, y: 200 }, class: 'light' },
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
])
const {
  screenshot: { screenshot },
} = useVueFlow({
  defaultZoom: 1.5,
  minZoom: 0.2,
  maxZoom: 4,
  connectOnClick: true,
})
</script>

<template>
  <VueFlow v-model="elements" fit-view-on-init class="vue-flow-basic-example">
    <Panel :position="PanelPosition.TopCenter">
      <button @click="screenshot('png')">Click to save Screenshot</button>
    </Panel>
  </VueFlow>
</template>
