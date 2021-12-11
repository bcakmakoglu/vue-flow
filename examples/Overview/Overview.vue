<script lang="ts" setup>
import { CSSProperties } from 'vue'
import {
  VueFlow,
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
  isNode,
  Node,
  Elements,
  FlowElement,
  FlowInstance,
  FlowTransform,
  SnapGrid,
  Connection,
  Edge,
  FlowEvents,
  MarkerType,
} from '~/index'

const onNodeDragStart = (e: FlowEvents['nodeDragStart']) => console.log('drag start', e)
const onNodeDrag = (e: FlowEvents['nodeDrag']) => console.log('drag', e)
const onNodeDragStop = (e: FlowEvents['nodeDragStop']) => console.log('drag stop', e)
const onNodeDoubleClick = (e: FlowEvents['nodeDoubleClick']) => console.log('node double click', e)
const onPaneClick = (e: FlowEvents['paneClick']) => console.log('pane click', e)
const onPaneScroll = (e: FlowEvents['paneScroll']) => console.log('pane scroll', e)
const onPaneContextMenu = (e: FlowEvents['paneContextMenu']) => console.log('pane context menu', e)
const onSelectionDrag = (e: FlowEvents['selectionDrag']) => console.log('selection drag', e)
const onSelectionDragStart = (e: FlowEvents['selectionDragStart']) => console.log('selection drag start', e)
const onSelectionDragStop = (e: FlowEvents['selectionDragStop']) => console.log('selection drag stop', e)
const onSelectionContextMenu = (e: FlowEvents['selectionContextMenu']) => console.log('selection context menu', e)
const onElementClick = ({ element }: FlowEvents['elementClick']) =>
  console.log(`${isNode(element) ? 'node' : 'edge'} click:`, element)
const onSelectionChange = (elements: FlowEvents['selectionChange']) => console.log('selection change', elements)
const onLoad = (flowInstance: FlowInstance) => {
  console.log('flow loaded:', flowInstance)
  flowInstance.fitView()
}

const onMoveEnd = (transform?: FlowTransform) => console.log('zoom/move end', transform)
const onEdgeContextMenu = (e: FlowEvents['edgeContextMenu']) => console.log('edge context menu', e)
const onEdgeMouseEnter = (e: FlowEvents['edgeMouseEnter']) => console.log('edge mouse enter', e)
const onEdgeMouseMove = (e: FlowEvents['edgeMouseMove']) => console.log('edge mouse move', e)
const onEdgeMouseLeave = (e: FlowEvents['edgeMouseLeave']) => console.log('edge mouse leave', e)
const onEdgeDoubleClick = (e: FlowEvents['edgeDoubleClick']) => console.log('edge double click', e)

const initialElements: Elements = [
  {
    id: '1',
    type: 'input',
    data: {
      label: 'Welcome to <strong>Vue VueFlow!</strong>',
    },
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    data: {
      label: 'This is a <strong>default node</strong>',
    },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    data: {
      label: 'This one has a <strong>custom style</strong>',
    },
    position: { x: 400, y: 100 },
    style: { background: '#D6D5E6', color: '#333', border: '1px solid #222138', width: 180 },
  },
  {
    id: '4',
    position: { x: 250, y: 200 },
    data: {
      label: `You can find the docs on
          <a href="https://github.com/bcakmakoglu/vue-flow" target="_blank" rel="noopener noreferrer">
            Github
          </a>`,
    },
  },
  {
    id: '5',
    data: {
      label: 'Or check out the other <strong>examples</strong>',
    },
    position: { x: 250, y: 325 },
  },
  {
    id: '6',
    type: 'output',
    data: {
      label: 'An <strong>output node</strong>',
    },
    position: { x: 100, y: 480 },
  },
  { id: '7', type: 'output', data: { label: 'Another output node' }, position: { x: 400, y: 450 } },
  { id: 'e1-2', source: '1', target: '2', label: 'this is an edge label' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e3-4', source: '3', target: '4', animated: true, label: 'animated edge' },
  { id: 'e4-5', source: '4', target: '5', markerEnd: MarkerType.Arrow, label: 'edge with arrow head' },
  { id: 'e5-6', source: '5', target: '6', type: 'smoothstep', label: 'smooth step edge' },
  {
    id: 'e5-7',
    source: '5',
    target: '7',
    type: 'step',
    style: { stroke: '#f6ab6c' },
    label: 'a step edge',
    animated: true,
    labelStyle: { fill: '#f6ab6c', fontWeight: 700 },
  },
]

const connectionLineStyle: CSSProperties = { stroke: '#ddd' }
const snapGrid: SnapGrid = [16, 16]

const nodeStrokeColor = (n: Node): string => {
  if (n.style?.background) return n.style.background as string
  if (n.type === 'input') return '#0041d0'
  if (n.type === 'output') return '#ff0072'
  if (n.type === 'default') return '#1a192b'

  return '#eee'
}

const nodeColor = (n: Node): string => {
  if (n.style?.background) return n.style.background as string

  return '#fff'
}

const elements = ref<Elements>(initialElements)
const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value))
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
</script>
<template>
  <VueFlow
    v-model="elements"
    :connection-line-style="connectionLineStyle"
    :snap-to-grid="true"
    :snap-grid="snapGrid"
    @element-click="onElementClick"
    @elements-remove="onElementsRemove"
    @connect="onConnect"
    @pane-click="onPaneClick"
    @pane-scroll="onPaneScroll"
    @pane-contex-menu="onPaneContextMenu"
    @node-drag-start="onNodeDragStart"
    @node-drag="onNodeDrag"
    @node-drag-stop="onNodeDragStop"
    @node-double-click="onNodeDoubleClick"
    @selection-drag-start="onSelectionDragStart"
    @selection-drag="onSelectionDrag"
    @selection-drag-stop="onSelectionDragStop"
    @selection-context-menu="onSelectionContextMenu"
    @selection-change="onSelectionChange"
    @move-end="onMoveEnd"
    @load="onLoad"
    @edge-update="onEdgeMouseMove"
    @edge-context-menu="onEdgeContextMenu"
    @edge-mouse-enter="onEdgeMouseEnter"
    @edge-mouse-move="onEdgeMouseMove"
    @edge-mouse-leave="onEdgeMouseLeave"
    @edge-double-click="onEdgeDoubleClick"
  >
    <MiniMap :node-stroke-color="nodeStrokeColor" :node-color="nodeColor" :node-border-radius="2" />
    <Controls />
    <Background color="#aaa" :gap="20" />
  </VueFlow>
</template>
