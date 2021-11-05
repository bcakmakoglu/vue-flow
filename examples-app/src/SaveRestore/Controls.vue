<script lang="ts" setup>
import localforage from 'localforage'
import { useZoomPanHelper, FlowInstance, FlowExportObject, Node } from '@braks/vue-flow'

localforage.config({
  name: 'vue-flow',
  storeName: 'flows',
})

const flowKey = 'example-flow'

const getNodeId = () => `randomnode_${+new Date()}`

const { transform } = useZoomPanHelper()

type ControlsProps = {
  flowInstance?: FlowInstance
}

const props = defineProps<ControlsProps>()
const emit = defineEmits(['restore', 'add'])

const onSave = () => {
  if (props.flowInstance) {
    const flow = props.flowInstance.toObject()
    localforage.setItem(flowKey, flow)
  }
}

const onRestore = () => {
  const restoreFlow = async () => {
    const flow: FlowExportObject | null = await localforage.getItem(flowKey)

    console.log(flow)
    if (flow) {
      const [x = 0, y = 0] = flow.position
      emit('restore', flow.elements ?? [])
      transform({ x, y, zoom: flow.zoom || 0 })
    }
  }

  restoreFlow()
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
    <button class="button" @click="onSave">save</button>
    <button class="button" @click="onRestore">restore</button>
    <button class="button" @click="onAdd">add node</button>
  </div>
</template>
