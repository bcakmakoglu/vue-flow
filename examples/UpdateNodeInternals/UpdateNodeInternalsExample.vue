<script lang="ts" setup>
import { CSSProperties } from 'vue'
import CustomNode from './CustomNode.vue'
import {
  VueFlow,
  addEdge,
  useZoomPanHelper,
  Node,
  Elements,
  Connection,
  Edge,
  ElementId,
  Position,
  isEdge,
  FlowInstance,
} from '~/index'

const initialHandleCount = 1

const initialElements: Elements = [
  {
    id: '1',
    type: 'custom',
    data: { label: 'Node 1', handleCount: initialHandleCount, handlePosition: 0 },
    position: { x: 250, y: 5 },
  },
]

const buttonWrapperStyles: CSSProperties = { position: 'absolute', right: 10, top: 10, zIndex: 10 }

let id = 5
const getId = (): ElementId => `${id++}`

const elements = ref<Elements>(initialElements)
const flowInstance = ref<FlowInstance>()
const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value))
const { project } = useZoomPanHelper()

const onPaneClick = (evt: MouseEvent) =>
  (elements.value = elements.value.concat({
    id: getId(),
    position: project({ x: evt.clientX, y: evt.clientY - 40 }),
    data: { label: 'new node' },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
  } as Node))

const toggleHandleCount = () =>
  (elements.value = elements.value.map((el) => {
    if (isEdge(el)) return el
    return { ...el, data: { ...el.data, handleCount: el.data?.handleCount === 1 ? 2 : 1 } }
  }))

const toggleHandlePosition = () =>
  (elements.value = elements.value.map((el) => {
    if (isEdge(el)) return el
    return { ...el, data: { ...el.data, handlePosition: el.data?.handlePosition === 0 ? 1 : 0 } }
  }))

const onLoad = (instance: FlowInstance) => {
  instance.fitView()
  flowInstance.value = instance
}
</script>
<template>
  <VueFlow v-model="elements" :node-types="['custom']" @connect="onConnect" @pane-click="onPaneClick" @load="onLoad">
    <template #node-custom="props">
      <CustomNode v-bind="props" />
    </template>
    <div :style="buttonWrapperStyles">
      <button @click="toggleHandleCount">toggle handle count</button>
      <button @click="toggleHandlePosition">toggle handle position</button>
    </div>
  </VueFlow>
</template>
