<script lang="ts" setup>
import { ref } from 'vue'
import type { Elements } from '@vue-flow/core'
import { Position, VueFlow, useVueFlow } from '@vue-flow/core'
import { Background, Controls, MiniMap } from '@vue-flow/additional-components'

const emit = defineEmits(['pane'])

const elements = ref<Elements>([
  {
    id: '1',
    style: { width: '75px' },
    type: 'input',
    sourcePosition: Position.Right,
    label: 'input',
    position: { x: 25, y: 120 },
  },
  {
    id: '2',
    label: 'A',
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    position: { x: 150, y: 25 },
    style: { width: '75px' },
  },
  {
    id: '3',
    label: 'B',
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    position: { x: 250, y: 25 },
    style: { width: '75px' },
  },
  {
    id: '4',
    label: 'C',
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    position: { x: 350, y: 25 },
    style: { width: '75px' },
  },
  {
    id: '5',
    label: 'D',
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    position: { x: 150, y: 220 },
    style: { width: '75px' },
  },
  {
    id: '6',
    label: 'E',
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    position: { x: 250, y: 220 },
    style: { width: '75px' },
  },
  {
    id: '7',
    label: 'F',
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    position: { x: 350, y: 220 },
    style: { width: '75px' },
  },
  {
    id: '8',
    type: 'output',
    label: 'Output',
    targetPosition: Position.Left,
    position: { x: 500, y: 120 },
    style: { width: '75px' },
  },
  { id: 'e1-2', type: 'step', source: '1', target: '2' },
  { id: 'e2-3', type: 'step', source: '2', target: '3' },
  { id: 'e3-4', type: 'step', source: '3', target: '4' },
  { id: 'e4-8', type: 'step', source: '4', target: '8' },
  { id: 'e1-5', type: 'step', source: '1', target: '5', animated: true },
  { id: 'e5-6', type: 'step', source: '5', target: '6', animated: true },
  { id: 'e6-7', type: 'step', source: '6', target: '7', animated: true },
  { id: 'e6-8', type: 'step', source: '7', target: '8', animated: true },
])

const { onPaneReady } = useVueFlow({
  modelValue: elements.value,
  zoomOnScroll: false,
  panOnDrag: false,
  preventScrolling: false,
})

onPaneReady((i) => emit('pane', i))
</script>

<template>
  <div class="w-full h-[300px] md:min-h-[400px] shadow-xl rounded-xl font-mono uppercase overflow-hidden border-2">
    <VueFlow>
      <Controls :show-interactive="false" />
      <MiniMap mask-color="rgba(16, 185, 129, 0.5)" class="transform scale-60 origin-bottom-right opacity-75" />
      <Background variant="lines" pattern-color="#aaa" :gap="46" />
    </VueFlow>
  </div>
  <div class="md:max-w-1/3 flex flex-col gap-12 justify-center <md:pt-12">
    <div class="flex flex-col gap-2 items-center md:items-start">
      <h1>Additional Features</h1>
      <p>
        On top of all the features Vue Flow comes with several components like a Background, Minimap or Controls.

        <br />
        Plus it's built for composition, making the access of the internal state easy as can be!
      </p>
      <a class="docs-button max-w-max" href="/guide/"> Documentation </a>
    </div>
  </div>
</template>
