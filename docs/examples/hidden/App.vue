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
      <button type="button" @click="isHidden = !isHidden">
        {{ isHidden ? 'Show' : 'Hide' }}
      </button>
    </Panel>
  </VueFlow>
</template>

<style>
.vue-flow__panel {
  background-color: #2d3748;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 12px;
  font-weight: 600;
}

.vue-flow__panel button {
  background-color: #4a5568;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  padding: 5px 10px;
}
</style>
