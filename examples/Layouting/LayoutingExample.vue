<script lang="ts" setup>
import dagre from 'dagre'
import initialElements from './initial-elements'
import './layouting.css'

import {
  VueFlow,
  Controls,
  addEdge,
  ConnectionMode,
  Connection,
  Edge,
  Elements,
  isNode,
  CoordinateExtent,
  Position,
  removeElements,
} from '~/index'

const dagreGraph = new dagre.graphlib.Graph()
dagreGraph.setDefaultEdgeLabel(() => ({}))

const nodeExtent: CoordinateExtent = [
  [0, -100],
  [1000, 500],
]

const elements = ref<Elements>(initialElements)
const onConnect = (params: Connection) => (elements.value = addEdge({ ...params, animated: true }, elements.value))
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))

const onLayout = (direction: string) => {
  const isHorizontal = direction === 'LR'
  dagreGraph.setGraph({ rankdir: direction })

  elements.value.forEach((el) => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, { width: 150, height: 50 })
    } else {
      dagreGraph.setEdge(el.source, el.target)
    }
  })

  dagre.layout(dagreGraph)

  elements.value = elements.value.map((el) => {
    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id)
      el.targetPosition = isHorizontal ? Position.Left : Position.Top
      el.sourcePosition = isHorizontal ? Position.Right : Position.Bottom
      el.position = { x: nodeWithPosition.x, y: nodeWithPosition.y }
    }

    return el
  })
  console.log(elements.value)
}
</script>
<template>
  <div class="layoutflow">
    <VueFlow
      v-model="elements"
      :node-extent="nodeExtent"
      :connection-mode="ConnectionMode.Loose"
      @connect="onConnect"
      @clements-remove="onElementsRemove"
      @load="() => onLayout('TB')"
    >
      <Controls />
    </VueFlow>
    <div class="controls">
      <button :style="{ marginRight: 10 }" @click="() => onLayout('TB')">vertical layout</button>
      <button @click="() => onLayout('LR')">horizontal layout</button>
    </div>
  </div>
</template>
