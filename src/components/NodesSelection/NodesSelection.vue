<script lang="ts" setup>
import { Draggable, DraggableEventListener } from '@braks/revue-draggable'
import { useVueFlow } from '../../composables'
import { getRectOfNodes } from '../../utils'

const { id, store } = useVueFlow()
const selectedNodesBBox = computed(() => getRectOfNodes(store.getSelectedNodes))
const innerStyle = computed(() => ({
  width: `${selectedNodesBBox.value.width}px`,
  height: `${selectedNodesBBox.value.height}px`,
  top: `${selectedNodesBBox.value.y}px`,
  left: `${selectedNodesBBox.value.x}px`,
}))
watch(selectedNodesBBox, (v) => nextTick(() => (store.selectedNodesBbox = v)))
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

const transform = computed(() => `translate(${store.transform[0]}px,${store.transform[1]}px) scale(${store.transform[2]})`)
</script>
<script lang="ts">
export default {
  name: 'NodesSelection',
}
</script>
<template>
  <div class="vue-flow__nodesselection vue-flow__container" :style="{ transform }">
    <Draggable
      :grid="store.snapToGrid ? store.snapGrid : undefined"
      :enable-user-select-hack="false"
      :scale="store.transform[2]"
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
