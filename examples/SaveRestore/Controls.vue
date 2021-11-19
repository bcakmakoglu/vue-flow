<script lang="ts" setup>
import { useZoomPanHelper, FlowExportObject, Node, useVueFlow } from '~/index'

const flowKey = 'example-flow'
const state = useStorage(flowKey, {
  elements: [],
  position: [NaN, NaN],
  zoom: 1,
} as FlowExportObject)

const getNodeId = () => `randomnode_${+new Date()}`

const { transform } = useZoomPanHelper()

const flow = useVueFlow()
const emit = defineEmits(['restore', 'add'])

const onSave = () => {
  if (flow.instance) state.value = flow.instance.toObject()
}

const onRestore = () => {
  const flow: FlowExportObject | null = state.value

  if (flow) {
    const [x = 0, y = 0] = flow.position
    emit('restore', flow.elements ?? [])
    transform({ x, y, zoom: flow.zoom || 0 })
  }
}

const onAdd = () => {
  const newNode = {
    id: `random_node-${getNodeId()}`,
    data: { label: 'Added node' },
    position: { x: Math.random() * window.innerWidth - 100, y: Math.random() * window.innerHeight },
  } as Node
  flow.addElements([newNode])
}
</script>
<template>
  <div class="save__controls">
    <button @click="onSave">save</button>
    <button @click="onRestore">restore</button>
    <button @click="onAdd">add node</button>
  </div>
</template>
