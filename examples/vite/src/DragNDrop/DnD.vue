<script lang="ts" setup>
import type { Connection, Node, VueFlowStore } from '@vue-flow/core'
import { VueFlow } from '@vue-flow/core'
import Sidebar from './Sidebar.vue'

let id = 0
function getId() {
  return `dndnode_${id++}`
}

const nodes = ref<Node[]>([
  {
    id: '1',
    type: 'input',
    data: { label: 'input node' },
    position: { x: 250, y: 5 },
  },
])

const flow = ref<VueFlowStore>()

function onDragOver(event: DragEvent) {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
}

function onConnect(connection: Connection) {
  flow.value?.addEdges([connection])
}

function onDrop(event: DragEvent) {
  const type = event.dataTransfer?.getData('application/vueflow')

  const flowbounds = flow.value!.vueFlowRef.value!.getBoundingClientRect()

  const position = flow.value!.project({
    x: event.clientX - flowbounds.left,
    y: event.clientY - flowbounds.top,
  })

  flow.value?.addNodes({
    id: getId(),
    type,
    position,
    data: { label: `${type} node` },
  })
}
</script>

<template>
  <div class="dndflow" @drop="onDrop">
    <VueFlow ref="flow" v-model:nodes="nodes" @connect="onConnect" @dragover="onDragOver" />
    <Sidebar />
  </div>
</template>

<style>
@import 'dnd.css';
</style>
