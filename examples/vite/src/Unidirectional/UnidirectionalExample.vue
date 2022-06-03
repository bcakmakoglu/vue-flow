<script lang="ts" setup>
import type { Elements, Node } from '../../packages/vue-flow'
import { ConnectionLineType, ConnectionMode, MarkerType, VueFlow, useZoomPanHelper } from '../../packages/vue-flow'
import CustomNode from './CustomNode.vue'

const initialElements: Elements = [
  {
    id: '00',
    type: 'custom',
    position: { x: 300, y: 250 },
  },
  {
    id: '01',
    type: 'custom',
    position: { x: 100, y: 50 },
  },
  {
    id: '02',
    type: 'custom',
    position: { x: 500, y: 50 },
  },
  {
    id: '03',
    type: 'custom',
    position: { x: 500, y: 500 },
  },
  {
    id: '04',
    type: 'custom',
    position: { x: 100, y: 500 },
  },
  {
    id: '10',
    type: 'custom',
    position: { x: 300, y: 5 },
  },
  {
    id: '20',
    type: 'custom',
    position: { x: 600, y: 250 },
  },
  {
    id: '30',
    type: 'custom',
    position: { x: 300, y: 600 },
  },
  {
    id: '40',
    type: 'custom',
    position: { x: 5, y: 250 },
  },
  {
    id: 'e0-1a',
    source: '00',
    target: '01',
    sourceHandle: 'left',
    targetHandle: 'bottom',
    type: 'step',
    markerEnd: MarkerType.Arrow,
  },
  {
    id: 'e0-1b',
    source: '00',
    target: '01',
    sourceHandle: 'top',
    targetHandle: 'right',
    type: 'step',
    markerEnd: MarkerType.Arrow,
  },
  {
    id: 'e0-2a',
    source: '00',
    target: '02',
    sourceHandle: 'top',
    targetHandle: 'left',
    type: 'step',
    markerEnd: MarkerType.Arrow,
  },
  {
    id: 'e0-2b',
    source: '00',
    target: '02',
    sourceHandle: 'right',
    targetHandle: 'bottom',
    type: 'step',
    markerEnd: MarkerType.Arrow,
  },
  {
    id: 'e0-3a',
    source: '00',
    target: '03',
    sourceHandle: 'right',
    targetHandle: 'top',
    type: 'step',
    markerEnd: MarkerType.Arrow,
  },
  {
    id: 'e0-3b',
    source: '00',
    target: '03',
    sourceHandle: 'bottom',
    targetHandle: 'left',
    type: 'step',
    markerEnd: MarkerType.Arrow,
  },
  {
    id: 'e0-4a',
    source: '00',
    target: '04',
    sourceHandle: 'bottom',
    targetHandle: 'right',
    type: 'step',
    markerEnd: MarkerType.Arrow,
  },
  {
    id: 'e0-4b',
    source: '00',
    target: '04',
    sourceHandle: 'left',
    targetHandle: 'top',
    type: 'step',
    markerEnd: MarkerType.Arrow,
  },
  {
    id: 'e0-10',
    source: '00',
    target: '10',
    sourceHandle: 'top',
    targetHandle: 'bottom',
    type: 'step',
    markerEnd: MarkerType.Arrow,
  },
  {
    id: 'e0-20',
    source: '00',
    target: '20',
    sourceHandle: 'right',
    targetHandle: 'left',
    type: 'step',
    markerEnd: MarkerType.Arrow,
  },
  {
    id: 'e0-30',
    source: '00',
    target: '30',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'step',
    markerEnd: MarkerType.Arrow,
  },
  {
    id: 'e0-40',
    source: '00',
    target: '40',
    sourceHandle: 'left',
    targetHandle: 'right',
    type: 'step',
    markerEnd: MarkerType.Arrow,
  },
]

let id = 4
const getId = () => `${id++}`

const elements = ref(initialElements)
const { project } = useZoomPanHelper()

const onPaneClick = (evt: MouseEvent) =>
  (elements.value = elements.value.concat({
    id: getId(),
    position: project({ x: evt.clientX, y: evt.clientY - 40 }),
    type: 'custom',
  } as Node))
</script>

<template>
  <VueFlow
    v-model="elements"
    :connection-line-type="ConnectionLineType.SmoothStep"
    :connection-mode="ConnectionMode.Loose"
    @pane-click="onPaneClick"
    @pane-ready="({ fitView }) => fitView()"
  >
    <template #node-custom="props">
      <CustomNode v-bind="props" />
    </template>
  </VueFlow>
</template>
