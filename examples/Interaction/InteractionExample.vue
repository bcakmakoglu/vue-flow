<script lang="ts" setup>
import {
  VueFlow,
  addEdge,
  MiniMap,
  Controls,
  Elements,
  Node,
  FlowElement,
  Connection,
  Edge,
  PanOnScrollMode,
  FlowTransform,
} from '~/index'

const initialElements: Elements = [
  { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
  { id: '3', data: { label: 'Node 3' }, position: { x: 400, y: 100 } },
  { id: '4', data: { label: 'Node 4' }, position: { x: 400, y: 200 } },
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
]

const elements = ref<Elements>(initialElements)

const isSelectable = ref(false)
const isDraggable = ref(false)
const isConnectable = ref(false)
const zoomOnScroll = ref(true)
const zoomOnPinch = ref(false)
const panOnScroll = ref(false)
const panOnScrollMode = ref<PanOnScrollMode>(PanOnScrollMode.Free)
const zoomOnDoubleClick = ref(false)
const paneMoveable = ref(true)
const captureZoomClick = ref(false)
const captureZoomScroll = ref(false)
const captureElementClick = ref(false)

const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value))
const onNodeDragStart = ({ node }) => console.log('drag start', node)
const onNodeDragStop = ({ node }) => console.log('drag stop', node)
const onElementClick = ({ element }) => (captureElementClick.value ? console.log('click', element) : undefined)
const onPaneClick = (event: MouseEvent) => console.log('onPaneClick', event)
const onPaneScroll = (event?: WheelEvent) => console.log('onPaneScroll', event)
const onPaneContextMenu = (event: MouseEvent) => console.log('onPaneContextMenu', event)
const onMoveEnd = (flowTranasform?: FlowTransform) => console.log('onMoveEnd', flowTranasform)
</script>
<template>
  <VueFlow
    v-model="elements"
    :elements-selectable="isSelectable"
    :nodes-connectable="isConnectable"
    :nodes-draggable="isDraggable"
    :zoom-on-scroll="zoomOnScroll"
    :zoom-on-pinch="zoomOnPinch"
    :pan-on-scroll="panOnScroll"
    :pan-on-scroll-mode="panOnScrollMode"
    :zoom-on-double-click="zoomOnDoubleClick"
    :pane-moveable="paneMoveable"
    @connect="onConnect"
    @element-click="onElementClick"
    @node-drag-start="onNodeDragStart"
    @node-drag-stop="onNodeDragStop"
    @pane-click="(e) => (captureZoomClick ? onPaneClick(e) : undefined)"
    @pane-scroll="(e) => (captureZoomScroll ? onPaneScroll(e) : undefined)"
    @pane-context-menu="(e) => (captureZoomClick ? onPaneContextMenu(e) : undefined)"
    @move-end="onMoveEnd"
  >
    <MiniMap />
    <Controls />

    <div :style="{ position: 'absolute', left: 10, top: 10, zIndex: 4 }">
      <div>
        <label for="draggable">
          nodesDraggable
          <input id="draggable" v-model="isDraggable" type="checkbox" class="vue-flow__draggable" />
        </label>
      </div>
      <div>
        <label for="connectable">
          nodesConnectable
          <input id="connectable" v-model="isConnectable" type="checkbox" class="vue-flow__connectable" />
        </label>
      </div>
      <div>
        <label for="selectable">
          elementsSelectable
          <input id="selectable" v-model="isSelectable" type="checkbox" class="vue-flow__selectable" />
        </label>
      </div>
      <div>
        <label for="zoomonscroll">
          zoomOnScroll
          <input id="zoomonscroll" v-model="zoomOnScroll" type="checkbox" class="vue-flow__zoomonscroll" />
        </label>
      </div>
      <div>
        <label for="zoomonpinch">
          zoomOnPinch
          <input id="zoomonpinch" v-model="zoomOnPinch" type="checkbox" class="vue-flow__zoomonpinch" />
        </label>
      </div>
      <div>
        <label for="panonscroll">
          panOnScroll
          <input id="panonscroll" v-model="panOnScroll" type="checkbox" class="vue-flow__panonscroll" />
        </label>
      </div>
      <div>
        <label>
          panOnScrollMode
          <select id="panonscrollmode" v-model="panOnScrollMode" class="vue-flow__panonscrollmode">
            <option value="free">free</option>
            <option value="horizontal">horizontal</option>
            <option value="vertical">vertical</option>
          </select>
        </label>
      </div>
      <div>
        <label for="zoomondbl">
          zoomOnDoubleClick
          <input id="zoomondbl" v-model="zoomOnDoubleClick" type="checkbox" class="vue-flow__zoomondbl" />
        </label>
      </div>
      <div>
        <label for="panemoveable">
          paneMoveable
          <input id="panemoveable" v-model="paneMoveable" type="checkbox" class="vue-flow__panemoveable" />
        </label>
      </div>
      <div>
        <label for="capturezoompaneclick">
          capture onPaneClick
          <input id="capturezoompaneclick" v-model="captureZoomClick" type="checkbox" class="vue-flow__capturezoompaneclick" />
        </label>
      </div>
      <div>
        <label for="capturezoompanescroll">
          capture onPaneScroll
          <input id="capturezoompanescroll" v-model="captureZoomScroll" type="checkbox" class="vue-flow__capturezoompanescroll" />
        </label>
      </div>
      <div>
        <label for="captureelementclick">
          capture onElementClick
          <input id="captureelementclick" v-model="captureElementClick" type="checkbox" class="vue-flow__captureelementclick" />
        </label>
      </div>
    </div>
  </VueFlow>
</template>
