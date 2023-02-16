<script lang="ts" setup>
import type { Elements, FlowEvents, VueFlowStore } from '@vue-flow/core'
import { ConnectionMode, VueFlow, useVueFlow } from '@vue-flow/core'
import { Controls } from '@vue-flow/controls'

import '@vue-flow/controls/dist/style.css'

const initialElements: Elements = [
  {
    id: '1',
    type: 'input',
    label: 'Node <strong>A</strong>',
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    label: 'Node <strong>B</strong>',
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    label: 'Node <strong>C</strong>',
    position: { x: 400, y: 100 },
    style: { background: '#D6D5E6', color: '#333', border: '1px solid #222138', width: 180 },
  },
  { id: 'e1-2', source: '1', target: '2', label: 'Updatable target', updatable: 'target' },
]

const { updateEdge } = useVueFlow()

const elements = ref(initialElements)

const onLoad = (flowInstance: VueFlowStore) => flowInstance.fitView()

const onEdgeUpdateStart = ({ edge }: FlowEvents['edgeUpdateStart']) => console.log('start update', edge)

const onEdgeUpdateEnd = ({ edge }: FlowEvents['edgeUpdateEnd']) => console.log('end update', edge)

const onEdgeUpdate = ({ edge, connection }: FlowEvents['edgeUpdate']) => updateEdge(edge, connection)
</script>

<template>
  <VueFlow
    v-model="elements"
    :snap-to-grid="true"
    :connection-mode="ConnectionMode.Loose"
    @pane-ready="onLoad"
    @edge-update="onEdgeUpdate"
    @edge-update-start="onEdgeUpdateStart"
    @edge-update-end="onEdgeUpdateEnd"
  >
    <Controls />
  </VueFlow>
</template>
