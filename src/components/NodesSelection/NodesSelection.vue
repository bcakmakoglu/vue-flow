<script lang="ts" setup>
import { Draggable, DraggableEventListener } from '@braks/revue-draggable'
import { useHooks, useStore } from '../../composables'
import { Node } from '../../types'
import { getRectOfNodes, isNode } from '../../utils'

const store = useStore()
const hooks = useHooks()

const selectedNodes = store.selectedElements
  ? store.selectedElements.filter(isNode).map((selectedNode) => {
      const matchingNode = store.nodes.find((node) => node.id === selectedNode.id)

      return {
        ...matchingNode,
        position: matchingNode?.__rf?.position,
      } as Node
    })
  : []

const selectedNodesBBox = getRectOfNodes(selectedNodes)

const innerStyle = {
  width: `${selectedNodesBBox.width}px`,
  height: `${selectedNodesBBox.height}px`,
  top: `${selectedNodesBBox.y}px`,
  left: `${selectedNodesBBox.x}px`,
}

const onStart: DraggableEventListener = ({ event }) => {
  const nodes = selectedNodes
  hooks.selectionDragStart.trigger({ event, nodes })
}

const onDrag: DraggableEventListener = ({ event, data }) => {
  const nodes = selectedNodes
  hooks.selectionDrag.trigger({ event, nodes })
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
  hooks.selectionDragStop.trigger({ event, nodes })
  store.updateNodePosDiff({
    isDragging: false,
  })
}

const onContextMenu = (event: MouseEvent) => {
  const nodes = selectedNodes
  hooks.selectionContextMenu.trigger({ event, nodes })
}

const transform = computed(() => store.transform)
</script>
<template>
  <div
    class="vue-flow__nodesselection"
    :style="{
      transform: `translate(${transform[0]}px,${transform[1]}px) scale(${transform[2]})`,
    }"
  >
    <Draggable @start="onStart" @move="onDrag" @stop="onStop">
      <div class="vue-flow__nodesselection-rect" :style="innerStyle" @contextmenu="onContextMenu" />
    </Draggable>
  </div>
</template>
