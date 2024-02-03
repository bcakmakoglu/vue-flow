<script setup>
import { reactive, ref } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'

const { onPaneReady, findNode, updateNode } = useVueFlow()

const opts = reactive({
  bg: '#eeeeee',
  label: 'Node 1',
  hidden: false,
})

const nodes = ref([
  { id: '1', label: opts.label, style: { backgroundColor: opts.bg }, hidden: opts.hidden, position: { x: 100, y: 100 } },
  { id: '2', label: 'Node 2', position: { x: 100, y: 200 } },
])

const edges = ref([{ id: 'e1-2', source: '1', target: '2' }])

onPaneReady(({ fitView }) => {
  fitView()
})

function handleUpdate() {
  updateNode(nodes.value[0].id, { label: opts.label, style: { backgroundColor: opts.bg }, hidden: opts.hidden })
}
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges">
    <div class="updatenode__controls">
      <label>label:</label>
      <input v-model="opts.label" @input="handleUpdate" />

      <label class="updatenode__bglabel">background:</label>
      <input v-model="opts.bg" type="color" @input="handleUpdate" />

      <div class="updatenode__checkboxwrapper">
        <label>hidden:</label>
        <input v-model="opts.hidden" type="checkbox" @change="handleUpdate" />
      </div>
    </div>
  </VueFlow>
</template>
