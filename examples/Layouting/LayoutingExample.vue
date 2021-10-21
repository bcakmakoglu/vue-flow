<script lang="ts" setup>
import dagre from 'dagre'
import initialElements from './initial-elements'
import './layouting.css'

import Flow, { Controls, addEdge, Connection, Edge, Elements, isNode, NodeExtent, Position, removeElements } from '~/index'

const dagreGraph = new dagre.graphlib.Graph()
dagreGraph.setDefaultEdgeLabel(() => ({}))

const nodeExtent: NodeExtent = [
  [0, 0],
  [1000, 1000],
]

const elements = ref<Elements>(initialElements)
const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value))
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
      // we need to pass a slighltiy different position in order to notify react flow about the change
      // @TODO how can we change the position handling so that we dont need this hack?
      el.position = { x: nodeWithPosition.x + Math.random() / 1000, y: nodeWithPosition.y }
    }

    return el
  })
}
</script>
<template>
  <div class="layoutflow">
    <Flow
      :elements="elements"
      :node-extent="nodeExtent"
      @connect="onConnect"
      @clements-remove="onElementsRemove"
      @load="() => onLayout('TB')"
    >
      <Controls />
    </Flow>
    <div class="controls">
      <button :style="{ marginRight: 10 }" @click="() => onLayout('TB')">vertical layout</button>
      <button @click="() => onLayout('LR')">horizontal layout</button>
    </div>
  </div>
</template>
