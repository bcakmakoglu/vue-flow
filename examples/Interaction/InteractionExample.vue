<script lang="ts" setup>
import { VueFlow, MiniMap, Controls, useVueFlow, useWindow } from '~/index'

const window: any = useWindow()
const isWindows = window.navigator.oscpu.includes('Windows')

const {
  nodesDraggable,
  nodesConnectable,
  elementsSelectable,
  zoomOnScroll,
  zoomOnDoubleClick,
  zoomOnPinch,
  panOnScroll,
  panOnScrollMode,
  paneMovable,
  onConnect,
  onNodeDragStart,
  onNodeDragStop,
  onPaneClick,
  onPaneScroll,
  onPaneContextMenu,
  onMoveEnd,
  addEdges,
} = useVueFlow({
  modelValue: [
    { id: '1', type: 'input', label: 'Node 1', position: { x: 250, y: 5 } },
    { id: '2', label: 'Node 2', position: { x: 100, y: 100 } },
    { id: '3', label: 'Node 3', position: { x: 400, y: 100 } },
    { id: '4', label: 'Node 4', position: { x: 400, y: 200 } },
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e1-3', source: '1', target: '3' },
  ],
})

const captureZoomClick = ref(false)
const captureZoomScroll = ref(false)

onConnect((params) => addEdges([params]))
onNodeDragStart((e) => console.log('drag start', e))
onNodeDragStop((e) => console.log('drag stop', e))
onPaneClick((event) => captureZoomClick.value && console.log('pane click', event))
onPaneScroll((event) => captureZoomScroll.value && console.log('pane scroll', event))
onPaneContextMenu((event) => captureZoomClick && console.log('pane ctx menu', event))
onMoveEnd((flowTransform) => console.log('move end', flowTransform))
</script>
<template>
  <VueFlow>
    <MiniMap />
    <Controls />

    <div :style="{ position: 'absolute', left: 10, top: 10, zIndex: 4 }">
      <div>
        <label for="draggable">
          nodesDraggable
          <input id="draggable" v-model="nodesDraggable" type="checkbox" class="vue-flow__draggable" />
        </label>
      </div>
      <div>
        <label for="connectable">
          nodesConnectable
          <input id="connectable" v-model="nodesConnectable" type="checkbox" class="vue-flow__connectable" />
        </label>
      </div>
      <div>
        <label for="selectable">
          elementsSelectable
          <input id="selectable" v-model="elementsSelectable" type="checkbox" class="vue-flow__selectable" />
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
          paneMovable
          <input id="panemoveable" v-model="paneMovable" type="checkbox" class="vue-flow__panemoveable" />
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
    </div>
  </VueFlow>
</template>
