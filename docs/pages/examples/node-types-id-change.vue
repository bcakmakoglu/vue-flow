<script lang="ts" setup>
import { CSSProperties } from 'vue'
import Flow, { Elements, Position, NodeType, Connection, Edge, addEdge } from '@braks/vue-flow'
import NodeA from '../../components/NodeA.vue'
import NodeB from '../../components/NodeB.vue'

const initialElements: Elements = [
  {
    id: '1',
    sourcePosition: Position.Right,
    type: 'input',
    data: { label: 'Input' },
    position: { x: 0, y: 80 },
  },
  {
    id: '2',
    type: 'a',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: { label: 'A Node' },
    position: { x: 250, y: 0 },
  },
]

const buttonStyle: CSSProperties = { position: 'absolute', right: 10, top: 30, zIndex: 4 }

const nodeStyles: CSSProperties = { padding: '10px 15px', border: '1px solid #ddd' }
type NodeTypesObject = {
  [key: string]: Record<string, NodeType>
}

const nodeTypesObjects: NodeTypesObject = {
  a: {
    a: NodeA as NodeType,
  },
  b: {
    b: NodeB as NodeType,
  },
}

const elements = ref(initialElements)
const nodeTypesId = ref('a')
const changeType = () => {
  const id = nodeTypesId.value === 'a' ? 'b' : 'a'
  elements.value[1].type = id
  nodeTypesId.value = id
}
const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value))
</script>
<template>
  <Flow :elements="elements" :node-types="nodeTypesObjects[nodeTypesId]" :node-types-id="nodeTypesId" @connect="onConnect">
    <template #node-a>
      <NodeA :node-styles="nodeStyles" />
    </template>
    <template #node-b>
      <NodeB :node-styles="nodeStyles" />
    </template>
    <button class="button mt-2" :style="buttonStyle" @click="changeType">change type</button>
  </Flow>
</template>
