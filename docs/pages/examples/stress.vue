<script lang="ts" setup>
import { CSSProperties } from 'vue'
import {
  Flow,
  removeElements,
  addEdge,
  MiniMap,
  isNode,
  Controls,
  Background,
  FlowInstance,
  Elements,
  Connection,
  Edge,
} from '@braks/vue-flow'

function getElements(xElements = 10, yElements = 10): Elements {
  const initialElements = []
  let nodeId = 1
  let recentNodeId = null

  for (let y = 0; y < yElements; y++) {
    for (let x = 0; x < xElements; x++) {
      const position = { x: x * 100, y: y * 50 }
      const data = { label: `Node ${nodeId}` }
      const node = {
        id: nodeId.toString(),
        style: { width: 50, fontSize: 11 },
        data,
        position,
      }
      initialElements.push(node)

      if (recentNodeId && nodeId <= xElements * yElements) {
        initialElements.push({ id: `${x}-${y}`, source: recentNodeId.toString(), target: nodeId.toString() })
      }

      recentNodeId = nodeId
      nodeId++
    }
  }

  return initialElements
}

const onLoad = (flowInstance: FlowInstance) => {
  flowInstance.fitView()
  console.log(flowInstance.getElements())
}

const initialElements: Elements = getElements(10, 10)
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

    <div class="absolute right-[10px] top-[10px] z-4">
      <button class="button" @click="updatePos">change pos</button>
      <button class="button" @click="updateElements">update elements</button>
    </div>
  </Flow>
</template>
