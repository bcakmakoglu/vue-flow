<script lang="ts" setup>
import type { Edge, Elements, Node } from '@vue-flow/core'
import { VueFlow, isEdge, isNode } from '@vue-flow/core'

const initialElements: Elements = [
  { id: '1', data: { label: '-' }, position: { x: 100, y: 100 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
  { id: 'e1-2', source: '1', target: '2' },
]

const nodes = ref<Node[]>(initialElements.filter(isNode))
const edges = ref<Edge[]>(initialElements.filter(isEdge))

const opts = reactive({
  bg: '#eeeeee',
  name: 'Node 1',
  hidden: false,
})

function updateNode() {
  nodes.value.forEach((el) => {
    if (el.id === '1') {
      el.data = { ...el.data, label: opts.name }
      el.style = { backgroundColor: opts.bg }
      el.hidden = opts.hidden
    }
  })
}

onMounted(updateNode)
</script>

<template>
  <VueFlow v-model:nodes="nodes" v-model:edges="edges" :default-zoom="1.5" :min-zoom="0.2" :max-zoom="4">
    <div class="updatenode__controls">
      <label>label:</label>
      <input v-model="opts.name" @input="updateNode" />

      <label class="updatenode__bglabel">background:</label>
      <input v-model="opts.bg" type="color" @input="updateNode" />

      <div class="updatenode__checkboxwrapper">
        <label>hidden:</label>
        <input v-model="opts.hidden" type="checkbox" @change="updateNode" />
      </div>
    </div>
  </VueFlow>
</template>

<style>
@import 'updatenode.css';
</style>
