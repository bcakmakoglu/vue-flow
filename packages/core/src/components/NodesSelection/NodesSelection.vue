<script lang="ts" setup>
import { useDrag, useVueFlow } from '../../composables'
import { getRectOfNodes } from '../../utils'

const { emits, setState, viewport, getSelectedNodes, snapToGrid, snapGrid, noPanClassName } = $(useVueFlow())

const el = ref()

useDrag({
  el,
  onStart(event, node, nodes) {
    emits.selectionDragStart({ event, node, nodes })
  },
  onDrag(event, node, nodes) {
    emits.selectionDrag({ event, node, nodes })
  },
  onStop(event, node, nodes) {
    emits.selectionDragStop({ event, node, nodes })
  },
})

const selectedNodesBBox = $computed(() => getRectOfNodes(getSelectedNodes))

const innerStyle = computed(() => ({
  width: `${selectedNodesBBox.width}px`,
  height: `${selectedNodesBBox.height}px`,
  top: `${selectedNodesBBox.y}px`,
  left: `${selectedNodesBBox.x}px`,
}))

const onContextMenu = (event: MouseEvent) => emits.selectionContextMenu({ event, nodes: getSelectedNodes })
</script>

<script lang="ts">
export default {
  name: 'NodesSelection',
}
</script>

<template>
  <div
    class="vue-flow__nodesselection vue-flow__container"
    :class="noPanClassName"
    :style="{ transform: `translate(${viewport.x}px,${viewport.y}px) scale(${viewport.zoom})` }"
  >
    <div ref="el" class="vue-flow__nodesselection-rect" :style="innerStyle" @contextmenu="onContextMenu" />
  </div>
</template>
