<script setup>
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { reactive } from 'vue'

const defaultLabel = '-'
const { onPaneReady, getNode } = useVueFlow({
  nodes: [
    { id: '1', label: defaultLabel, position: { x: 100, y: 100 } },
    { id: '2', label: 'Node 2', position: { x: 100, y: 200 } },
  ],
  edges: [{ id: 'e1-2', source: '1', target: '2' }],
})

const opts = reactive({
  bg: '#eeeeee',
  label: 'Node 1',
  hidden: false,
})

const updateNode = () => {
  const node = getNode.value('1')
  node.label = opts.label.trim() !== '' ? opts.label : defaultLabel
  node.style = { backgroundColor: opts.bg }
  node.hidden = opts.hidden
}

onPaneReady(({ fitView }) => {
  fitView()
  updateNode()
})
</script>

<template>
  <VueFlow>
    <div class="updatenode__controls">
      <label>label:</label>
      <input v-model="opts.label" @input="updateNode" />

      <label class="updatenode__bglabel">background:</label>
      <input v-model="opts.bg" type="color" @input="updateNode" />

      <div class="updatenode__checkboxwrapper">
        <label>hidden:</label>
        <input v-model="opts.hidden" type="checkbox" @change="updateNode" />
      </div>
    </div>
  </VueFlow>
</template>
