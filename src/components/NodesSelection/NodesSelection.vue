<script lang="ts" setup>
import { Draggable, DraggableEventListener } from '@braks/revue-draggable'
import { useStore } from '../../composables'
import { FlowElements, GraphNode } from '../../types'
import { getRectOfNodes, isGraphNode } from '../../utils'

interface NodesSelectionProps {
  selectedElements: FlowElements
}

const store = useStore()

const props = defineProps<NodesSelectionProps>()
const selectedNodes: GraphNode[] = props.selectedElements ? props.selectedElements.filter(isGraphNode) : []

const selectedNodesBBox = getRectOfNodes(selectedNodes)

const innerStyle = {
  width: `${selectedNodesBBox.width}px`,
  height: `${selectedNodesBBox.height}px`,
  top: `${selectedNodesBBox.y}px`,
  left: `${selectedNodesBBox.x}px`,
}

const onStart: DraggableEventListener = ({ event }) => {
  const nodes = selectedNodes
  store.hooks.selectionDragStart.trigger({ event, nodes })
}

const onDrag: DraggableEventListener = ({ event, data }) => {
  const nodes = selectedNodes
  store.hooks.selectionDrag.trigger({ event, nodes })
  store.updateNodePosDiff({
    diff: {
      x: data.deltaX,
      y: data.deltaY,
    },
    isDragging: true,
  })
}

const onStop: DraggableEventListener = ({ event }) => {
  const nodes = selectedNodes
  store.hooks.selectionDragStop.trigger({ event, nodes })
  store.updateNodePosDiff({
    isDragging: false,
  })
}

const onContextMenu = (event: MouseEvent) => {
  const nodes = selectedNodes
  store.hooks.selectionContextMenu.trigger({ event, nodes })
}

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
