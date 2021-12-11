<script lang="ts" setup>
import { Draggable, DraggableEventListener } from '@braks/revue-draggable'
import { useStore } from '../../composables'
import { getRectOfNodes } from '../../utils'
import { GraphNode } from '../../types'

interface Props {
  nodes: GraphNode[]
}
const store = useStore()
const props = defineProps<Props>()
const selectedNodesBBox = getRectOfNodes(props.nodes)
const innerStyle = {
  width: `${selectedNodesBBox.width}px`,
  height: `${selectedNodesBBox.height}px`,
  top: `${selectedNodesBBox.y}px`,
  left: `${selectedNodesBBox.x}px`,
}
const onStart: DraggableEventListener = ({ event }) => store.hooks.selectionDragStart.trigger({ event, nodes: props.nodes })
const onDrag: DraggableEventListener = ({ event, data: { deltaX, deltaY } }) => {
  store.hooks.selectionDrag.trigger({ event, nodes: props.nodes })
  store.updateNodePosition({ diff: { x: deltaX, y: deltaY }, dragging: true })
}
const onStop: DraggableEventListener = ({ event }) => {
  store.hooks.selectionDragStop.trigger({ event, nodes: props.nodes })
  props.nodes.forEach((node) => (node.dragging = false))
}
const onContextMenu = (event: MouseEvent) => store.hooks.selectionContextMenu.trigger({ event, nodes: props.nodes })

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
        :key="`vue-flow-nodesselection-rect-${store.id}`"
        class="vue-flow__nodesselection-rect"
        :style="innerStyle"
        @contextmenu="onContextMenu"
      />
    </Draggable>
  </div>
</template>
