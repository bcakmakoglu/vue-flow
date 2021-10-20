<script lang="ts" setup>
import { DraggableEventListener } from '@braks/revue-draggable'
import { Node } from '~/types'
import { isNode } from '~/utils/graph'
import { useHooks, useStore } from '~/composables'

interface NodesSelectionProps {
  onSelectionDragStart?: (event: MouseEvent, nodes: Node[]) => void
  onSelectionDrag?: (event: MouseEvent, nodes: Node[]) => void
  onSelectionDragStop?: (event: MouseEvent, nodes: Node[]) => void
  onSelectionContextMenu?: (event: MouseEvent, nodes: Node[]) => void
}

const props = defineProps<NodesSelectionProps>()

const store = useStore()
const hooks = useHooks()

const selectedNodes = computed(() =>
  store.selectedElements
    ? store.selectedElements.filter(isNode).map((selectedNode) => {
        const matchingNode = store.nodes.find((node) => node.id === selectedNode.id)

        return {
          ...matchingNode,
          position: matchingNode?.__rf.position,
        } as Node
      })
    : [],
)

const innerStyle = {
  width: `${store.selectedNodesBbox.width}px`,
  height: `${store.selectedNodesBbox.height}px`,
  top: `${store.selectedNodesBbox.y}px`,
  left: `${store.selectedNodesBbox.x}px`,
}

const onStart: DraggableEventListener = ({ event }) => {
  hooks.selectionDragStart.trigger({ event, nodes: selectedNodes.value })
}

const onDrag: DraggableEventListener = ({ event, data }) => {
  hooks.selectionDrag.trigger({ event, nodes: selectedNodes.value })

  store.updateNodePosDiff({
    diff: {
      x: data.deltaX,
      y: data.deltaY,
    },
    isDragging: true,
  })
}

const onStop: DraggableEventListener = ({ event }) => {
  store.updateNodePosDiff({
    isDragging: false,
  })

  hooks.selectionDragStop.trigger({ event, nodes: selectedNodes.value })
}

const onContextMenu = (event: MouseEvent) => {
  const selectedNodes = store.selectedElements
    ? store.selectedElements.filter(isNode).map((selectedNode) => store.nodes.find((node) => node.id === selectedNode.id))
    : []

  if (selectedNodes) hooks.selectionContextMenu.trigger({ event, nodes: selectedNodes as Node[] })
}
</script>
<template>
  <div
    class="vue-flow__nodesselection"
    :style="{
      transform: `translate(${store.transform[0]}px,${store.transform[1]}px) scale(${store.transform[2]})`,
    }"
  >
    <Draggable
      :scale="store.transform[2]"
      :grid="store.snapToGrid ? store.snapGrid : undefined"
      :enable-user-select-hack="false"
      @start="onStart"
      @move="onDrag"
      @stop="onStop"
    >
      <div class="vue-flow__nodesselection-rect" :style="innerStyle" @contextmenu="onContextMenu" />
    </Draggable>
  </div>
</template>
