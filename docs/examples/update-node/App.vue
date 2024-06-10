<script setup>
import { ref } from 'vue'
import { Panel, VueFlow, useVueFlow } from '@vue-flow/core'

const { updateNode } = useVueFlow()

const bgColor = ref('#eeeeee')

const label = ref('Node 1')

const nodes = ref([
  {
    id: '1',
    data: { label: label.value },
    style: { backgroundColor: bgColor.value },
    position: { x: 100, y: 100 },
  },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
])

const edges = ref([{ id: 'e1-2', source: '1', target: '2' }])

function handleUpdate() {
  updateNode('1', { data: { label: label.value }, style: { backgroundColor: bgColor.value } })
}
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" fit-view-on-init>
    <Panel position="top-right">
      <div class="field">
        <label for="label">Label:</label>
        <input id="label" v-model="label" @input="handleUpdate" />
      </div>

      <div class="field">
        <label for="bgColor">Background color:</label>
        <input id="bgColor" v-model="bgColor" type="color" @input="handleUpdate" />
      </div>
    </Panel>
  </VueFlow>
</template>
