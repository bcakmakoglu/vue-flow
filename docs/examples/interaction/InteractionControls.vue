<script setup>
import { Panel, useVueFlow } from '@vue-flow/core'
import { ref } from 'vue'

const {
  nodesDraggable,
  nodesConnectable,
  elementsSelectable,
  zoomOnScroll,
  zoomOnDoubleClick,
  zoomOnPinch,
  panOnScroll,
  panOnScrollMode,
  panOnDrag,
  onConnect,
  onNodeDragStop,
  onPaneClick,
  onPaneScroll,
  onPaneContextMenu,
  onNodeDragStart,
  onMoveEnd,
  addEdges,
} = useVueFlow()

const captureZoomClick = ref(false)

const captureZoomScroll = ref(false)

onConnect((params) => addEdges(params))

onNodeDragStart((e) => console.log('drag start', e))

onNodeDragStop((e) => console.log('drag stop', e))

onPaneClick((event) => captureZoomClick.value && console.log('pane click', event))

onPaneScroll((event) => captureZoomScroll.value && console.log('pane scroll', event))

onPaneContextMenu((event) => captureZoomClick.value && console.log('pane ctx menu', event))

onMoveEnd((flowTransform) => console.log('move end', flowTransform))
</script>

<template>
  <Panel position="top-right">
    <div>
      <label class="label" for="draggable">
        nodesDraggable
        <input id="draggable" v-model="nodesDraggable" type="checkbox" class="vue-flow__draggable" />
      </label>
    </div>
    <div>
      <label class="label" for="connectable">
        nodesConnectable
        <input id="connectable" v-model="nodesConnectable" type="checkbox" class="vue-flow__connectable" />
      </label>
    </div>
    <div>
      <label class="label" for="selectable">
        elementsSelectable
        <input id="selectable" v-model="elementsSelectable" type="checkbox" class="vue-flow__selectable" />
      </label>
    </div>
    <div>
      <label class="label" for="zoomonscroll">
        zoomOnScroll
        <input id="zoomonscroll" v-model="zoomOnScroll" type="checkbox" class="vue-flow__zoomonscroll" />
      </label>
    </div>
    <div>
      <label class="label" for="zoomonpinch">
        zoomOnPinch
        <input id="zoomonpinch" v-model="zoomOnPinch" type="checkbox" class="vue-flow__zoomonpinch" />
      </label>
    </div>
    <div>
      <label class="label" for="panonscroll">
        panOnScroll
        <input id="panonscroll" v-model="panOnScroll" type="checkbox" class="vue-flow__panonscroll" />
      </label>
    </div>
    <div>
      <label class="label">
        panOnScrollMode
        <select id="panonscrollmode" v-model="panOnScrollMode" class="vue-flow__panonscrollmode">
          <option value="free">free</option>
          <option value="horizontal">horizontal</option>
          <option value="vertical">vertical</option>
        </select>
      </label>
    </div>
    <div>
      <label class="label" for="zoomondbl">
        zoomOnDoubleClick
        <input id="zoomondbl" v-model="zoomOnDoubleClick" type="checkbox" class="vue-flow__zoomondbl" />
      </label>
    </div>
    <div>
      <label class="label" for="panemoveable">
        paneMovable
        <input id="panemoveable" v-model="panOnDrag" type="checkbox" class="vue-flow__panemoveable" />
      </label>
    </div>
    <div>
      <label class="label" for="capturezoompaneclick">
        capture onPaneClick
        <input id="capturezoompaneclick" v-model="captureZoomClick" type="checkbox" class="vue-flow__capturezoompaneclick" />
      </label>
    </div>
    <div>
      <label class="label" for="capturezoompanescroll">
        capture onPaneScroll
        <input id="capturezoompanescroll" v-model="captureZoomScroll" type="checkbox" class="vue-flow__capturezoompanescroll" />
      </label>
    </div>
  </Panel>
</template>
