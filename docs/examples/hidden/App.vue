<script setup>
import { ref, watch } from 'vue'
import { Background } from '@vue-flow/background'
import { Panel, VueFlow } from '@vue-flow/core'

const nodes = ref([
  { id: '1', type: 'input', label: 'Node 1', position: { x: 250, y: 5 } },
  { id: '2', label: 'Node 2', position: { x: 100, y: 100 } },
  { id: '3', label: 'Node 3', position: { x: 400, y: 100 } },
  { id: '4', label: 'Node 4', position: { x: 400, y: 200 } },
])

const edges = ref([
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e3-4', source: '3', target: '4' },
])

const isHidden = ref(false)

watch(isHidden, () => {
  nodes.value = nodes.value.map((node) => ({ ...node, hidden: isHidden.value }))
  edges.value = edges.value.map((edge) => ({ ...edge, hidden: isHidden.value }))
})
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" fit-view-on-init>
    <Background />

    <Panel position="top-right">
      <div>
        <label for="ishidden">
          hidden
          <input id="ishidden" v-model="isHidden" type="checkbox" />
        </label>
      </div>
    </Panel>
  </VueFlow>
</template>
