<script lang="ts" setup>
import { Draggable, DraggableEventListener } from '@braks/revue-draggable'
import { useVueFlow } from '../../composables'
import { getRectOfNodes } from '../../utils'

const { id, store } = useVueFlow()
const selectedNodesBBox = getRectOfNodes(store.getSelectedNodes)
const innerStyle = {
  width: `${selectedNodesBBox.width}px`,
  height: `${selectedNodesBBox.height}px`,
  top: `${selectedNodesBBox.y}px`,
  left: `${selectedNodesBBox.x}px`,
}
store.selectedNodesBbox = selectedNodesBBox
const onStart: DraggableEventListener = ({ event }) =>
  store.hooks.selectionDragStart.trigger({ event, nodes: store.getSelectedNodes })
const onDrag: DraggableEventListener = ({ event, data: { deltaX, deltaY } }) => {
  store.hooks.selectionDrag.trigger({ event, nodes: store.getSelectedNodes })
  store.updateNodePosition({ diff: { x: deltaX, y: deltaY }, dragging: true })
}
const onStop: DraggableEventListener = ({ event }) => {
  store.hooks.selectionDragStop.trigger({ event, nodes: store.getSelectedNodes })
  store.getSelectedNodes.forEach((node) => (node.dragging = false))
}
const onContextMenu = (event: MouseEvent) => store.hooks.selectionContextMenu.trigger({ event, nodes: store.getSelectedNodes })

const scale = controlledComputed(
  () => store.transform[2],
  () => store.transform[2],
)
</script>
<script lang="ts">
export default {
  name: 'NodesSelection',
}
</script>
<template>
  <div class="vue-flow__nodesselection vue-flow__container">
    <Draggable
      :grid="store.snapToGrid ? store.snapGrid : undefined"
      :enable-user-select-hack="false"
      :scale="scale"
      @start="onStart"
      @move="onDrag"
      @stop="onStop"
    >
      <div
        :key="`vue-flow-nodesselection-rect-${id}`"
        class="vue-flow__nodesselection-rect"
        :style="innerStyle"
        @contextmenu="onContextMenu"
      />
    </Draggable>
  </div>
</template>
