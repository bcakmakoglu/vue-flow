<script lang="ts" setup>
import { CSSProperties } from 'vue'
import Flow, {
  NodeType,
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
} from '@braks/vue-flow'
import CustomNode from '../../components/UpdateNodeInternalsCustomNode.vue'

const initialHandleCount = 1

const initialElements: Elements = [
  {
    id: '1',
    type: 'custom',
    data: { label: 'Node 1', handleCount: initialHandleCount, handlePosition: 0 },
    position: { x: 250, y: 5 },
  },
]

const buttonWrapperStyles: CSSProperties = { position: 'absolute', right: '10px', top: '10px', zIndex: 10 }

const nodeTypes: Record<string, NodeType> = {
  custom: CustomNode as NodeType,
}

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
    if (isEdge(el)) {
      return el
    }

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

const updateNodeInternals = () => flowInstance.value?.updateNodeInternals('1')
</script>
<template>
  <Flow :elements="elements" :node-types="nodeTypes" @connect="onConnect" @pane-click="onPaneClick" @load="onLoad">
    <div :style="buttonWrapperStyles">
      <button class="button" @click="toggleHandleCount">toggle handle count</button>
      <button class="button" @click="toggleHandlePosition">toggle handle position</button>
      <button class="button" @click="updateNodeInternals">update node internals</button>
    </div>
  </Flow>
</template>
