<script lang="ts" setup>
import { Draggable, DraggableEventListener } from '@braks/revue-draggable'
import { useStore } from '../../composables'
import { FlowElements } from '../../types'
import { getRectOfNodes } from '../../utils'

interface NodesSelectionProps {
  selectedElements: FlowElements
}

const store = useStore()

const props = defineProps<NodesSelectionProps>()
const selectedNodesBBox = getRectOfNodes(store.getSelectedNodes)
const innerStyle = {
  width: `${selectedNodesBBox.width}px`,
  height: `${selectedNodesBBox.height}px`,
  top: `${selectedNodesBBox.y}px`,
  left: `${selectedNodesBBox.x}px`,
}
const onStart: DraggableEventListener = ({ event }) =>
  store.hooks.selectionDragStart.trigger({ event, nodes: store.getSelectedNodes })
const onDrag: DraggableEventListener = ({ event, data }) => {
  store.hooks.selectionDrag.trigger({ event, nodes: store.getSelectedNodes })
  store.getSelectedNodes.forEach((node) => {
    node.position = {
      x: node.position.x + data.deltaX,
      y: node.position.y + data.deltaY,
    }
    node.__vf.isDragging = true
  })
}
const onStop: DraggableEventListener = ({ event }) => {
  store.hooks.selectionDragStop.trigger({ event, nodes: store.getSelectedNodes })
  store.getSelectedNodes.forEach((node) => (node.__vf.isDragging = false))
}
const onContextMenu = (event: MouseEvent) => store.hooks.selectionContextMenu.trigger({ event, nodes: store.getSelectedNodes })

const transform = computed(() => `translate(${store.transform[0]}px,${store.transform[1]}px) scale(${store.transform[2]})`)
</script>
<script lang="ts">
export default {
  name: 'NodesSelection',
}
</script>
<template>
  <div class="vue-flow__nodesselection" :style="{ transform }">
    <Draggable
      :grid="store.snapToGrid ? store.snapGrid : undefined"
      :enable-user-select-hack="false"
      :scale="store.transform[2]"
      @start="onStart"
      @move="onDrag"
      @stop="onStop"
    >
      <div
        :key="`vue-flow-nodesselection-rect-${store.$id}`"
        class="vue-flow__nodesselection-rect"
        :style="innerStyle"
        @contextmenu="onContextMenu"
      />
    </Draggable>
  </div>
</template>
