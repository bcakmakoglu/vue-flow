<script lang="ts" setup>
import { CSSProperties } from 'vue'
import { getElements } from './utils'
import Flow, {
  removeElements,
  addEdge,
  MiniMap,
  isNode,
  Controls,
  Background,
  OnLoadParams,
  Elements,
  Connection,
  Edge,
} from '~/index'

const buttonWrapperStyles: CSSProperties = { position: 'absolute', right: 10, top: 10, zIndex: 4 }

const onLoad = (flowInstance: OnLoadParams) => {
  flowInstance.fitView()
  console.log(flowInstance.getElements())
}

const initialElements: Elements = getElements(30, 30)
const elements = ref(initialElements)

const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value))
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
const updatePos = () => {
  elements.value = elements.value.map((el) => {
    if (isNode(el)) {
      return {
        ...el,
        position: {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        },
      }
    }

    return el
  })
}

const updateElements = () => {
  const grid = Math.ceil(Math.random() * 10)
  elements.value = getElements(grid, grid)
}
</script>
<template>
  <Flow :elements="elements" @load="onLoad" @elementsRemove="onElementsRemove" @connect="onConnect">
    <MiniMap />
    <Controls />
    <Background />

    <div :style="buttonWrapperStyles">
      <button style="margin-right: 5px" @click="updatePos">change pos</button>
      <button @click="updateElements">update elements</button>
    </div>
  </Flow>
</template>
