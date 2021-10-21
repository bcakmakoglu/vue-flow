<script lang="ts" setup>
import { CSSProperties } from 'vue'
import Flow, { addEdge, Connection, Edge, Elements, isEdge, OnLoadParams, Position } from '~/index'

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
    type: 'output',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: { label: 'A Node' },
    position: { x: 250, y: 0 },
  },
  { id: 'e1-2', source: '1', type: 'smoothstep', target: '2', animated: true },
] as Elements

const buttonStyle: CSSProperties = { position: 'absolute', right: 10, top: 30, zIndex: 4 }

const elements = ref<Elements>(initialElements)

const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value))

const onLoad = (reactFlowInstance: OnLoadParams) => reactFlowInstance.fitView()

const changeType = () => {
  elements.value = elements.value.map((el) => {
    if (isEdge(el) || el.type === 'input') return el

    return {
      ...el,
      type: el.type === 'default' ? 'output' : 'default',
    }
  })
}
</script>
<template>
  <Flow :elements="elements" @connect="onConnect" @load="onLoad">
    <button :style="buttonStyle" @click="changeType">change type</button>
  </Flow>
</template>
