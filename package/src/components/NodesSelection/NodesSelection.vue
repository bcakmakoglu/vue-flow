<script lang="ts" setup>
import { useDraggableCore } from '@braks/revue-draggable'
import { useVueFlow } from '../../composables'
import { getRectOfNodes } from '../../utils'

const { hooks, setState, viewport, getSelectedNodes, snapToGrid, snapGrid, updateNodePosition, noPanClassName } = $(useVueFlow())

const el = templateRef<HTMLDivElement>('el', null)

const selectedNodesBBox = $computed(() => getRectOfNodes(getSelectedNodes))

const innerStyle = computed(() => ({
  width: `${selectedNodesBBox.width}px`,
  height: `${selectedNodesBBox.height}px`,
  top: `${selectedNodesBBox.y}px`,
  left: `${selectedNodesBBox.x}px`,
}))

const transform = computed(() => `translate(${viewport.x}px,${viewport.y}px) scale(${viewport.zoom})`)

watch($$(selectedNodesBBox), (v) => {
  setState({
    selectedNodesBbox: v,
  })
})

const onContextMenu = (event: MouseEvent) => hooks.selectionContextMenu.trigger({ event, nodes: getSelectedNodes })

const { onDragStart, onDrag, onDragStop, scale } = useDraggableCore(el, {
  grid: snapToGrid ? snapGrid : undefined,
  enableUserSelectHack: false,
  scale: viewport.zoom,
})

onMounted(() => {
  debouncedWatch(
    () => viewport.zoom,
    () => {
      scale.value = viewport.zoom
    },
    { debounce: 5 },
  )
})

onDragStart(({ event }) => hooks.selectionDragStart.trigger({ event, nodes: getSelectedNodes }))

onDrag(({ event, data: { deltaX, deltaY } }) => {
  hooks.selectionDrag.trigger({ event, nodes: getSelectedNodes })
  updateNodePosition({ diff: { x: deltaX, y: deltaY }, dragging: true })
})

onDragStop(({ event }) => {
  hooks.selectionDragStop.trigger({ event, nodes: getSelectedNodes })
  getSelectedNodes.forEach((node) => (node.dragging = false))
})
</script>
<script lang="ts">
export default {
  name: 'NodesSelection',
}
</script>
<template>
  <div class="vue-flow__nodesselection vue-flow__container" :class="noPanClassName" :style="{ transform }">
    <div ref="el" class="vue-flow__nodesselection-rect" :style="innerStyle" @contextmenu="onContextMenu" />
  </div>
</template>
