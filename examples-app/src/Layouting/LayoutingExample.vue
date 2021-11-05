<script lang="ts" setup>
import dagre from 'dagre'
import {
  Flow,
  Controls,
  addEdge,
  ConnectionMode,
  Connection,
  Edge,
  Elements,
  isNode,
  NodeExtent,
  Position,
  removeElements,
} from '@braks/vue-flow'
import initialElements from './initial-elements'

const dagreGraph = new dagre.graphlib.Graph()
dagreGraph.setDefaultEdgeLabel(() => ({}))

const nodeExtent: NodeExtent = [
  [0, 0],
  [1000, 1000],
]

const elements = ref<Elements>(initialElements)
const onConnect = (params: Connection | Edge) => (elements.value = addEdge({ ...params, animated: true }, elements.value))
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))

// todo changing elements not properly updating flowchart...
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
    <Flow
      :elements="elements"
      :node-extent="nodeExtent"
      :connection-mode="ConnectionMode.Loose"
      @connect="onConnect"
      @clements-remove="onElementsRemove"
      @load="() => onLayout('TB')"
    >
      <Controls />
    </Flow>
    <div class="controls">
      <button class="button" :style="{ marginRight: 10 }" @click="() => onLayout('TB')">vertical layout</button>
      <button class="button" @click="() => onLayout('LR')">horizontal layout</button>
    </div>
  </div>
</template>
<style>
.layoutflow {
  flex-grow: 1;
  position: relative;
}

.layoutflow .controls {
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 10;
}

.controls button {
  margin-left: 10px;
}
</style>
