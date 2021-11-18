<script lang="ts" setup>
import { useZoomPanHelper, FlowInstance, FlowExportObject, Node } from '~/index'

const flowKey = 'example-flow'
const state = useStorage(flowKey, {
  elements: [],
  position: [NaN, NaN],
  zoom: 1,
} as FlowExportObject)

const getNodeId = () => `randomnode_${+new Date()}`

const { transform } = useZoomPanHelper()

type ControlsProps = {
  flowInstance?: FlowInstance
}

const props = defineProps<ControlsProps>()
const emit = defineEmits(['restore', 'add'])

const onSave = () => {
  if (props.flowInstance) state.value = props.flowInstance.toObject()
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
  emit('add', newNode)
}
</script>
<template>
  <div class="save__controls">
    <button @click="onSave">save</button>
    <button @click="onRestore">restore</button>
    <button @click="onAdd">add node</button>
  </div>
</template>
