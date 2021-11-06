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
  XYPosition,
} from '@braks/vue-flow'

const position: XYPosition = { x: 0, y: 0 }

const initialElements: Elements = [
  {
    id: '1',
    type: 'input',
    data: { label: 'input' },
    position,
  },
  {
    id: '2',
    data: { label: 'node 2' },
    position,
  },
  {
    id: '2a',
    data: { label: 'node 2a' },
    position,
  },
  {
    id: '2b',
    data: { label: 'node 2b' },
    position,
  },
  {
    id: '2c',
    data: { label: 'node 2c' },
    position,
  },
  {
    id: '2d',
    data: { label: 'node 2d' },
    position,
  },
  {
    id: '3',
    data: { label: 'node 3' },
    position,
  },
  {
    id: '4',
    data: { label: 'node 4' },
    position,
  },
  {
    id: '5',
    data: { label: 'node 5' },
    position,
  },
  {
    id: '6',
    type: 'output',
    data: { label: 'output' },
    position,
  },
  { id: '7', type: 'output', data: { label: 'output' }, position: { x: 400, y: 450 } },
  { id: 'e12', source: '1', target: '2', type: 'smoothstep', animated: true },
  { id: 'e13', source: '1', target: '3', type: 'smoothstep', animated: true },
  { id: 'e22a', source: '2', target: '2a', type: 'smoothstep', animated: true },
  { id: 'e22b', source: '2', target: '2b', type: 'smoothstep', animated: true },
  { id: 'e22c', source: '2', target: '2c', type: 'smoothstep', animated: true },
  { id: 'e2c2d', source: '2c', target: '2d', type: 'smoothstep', animated: true },

  { id: 'e45', source: '4', target: '5', type: 'smoothstep', animated: true },
  { id: 'e56', source: '5', target: '6', type: 'smoothstep', animated: true },
  { id: 'e57', source: '5', target: '7', type: 'smoothstep', animated: true },
]

const dagreGraph = new dagre.graphlib.Graph()
dagreGraph.setDefaultEdgeLabel(() => ({}))

const nodeExtent: NodeExtent = [
  [0, 0],
  [1000, 1000],
]

const elements = ref<Elements>(initialElements)
const onConnect = (params: Connection | Edge) => (elements.value = addEdge({ ...params, animated: true }, elements.value))
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
