<script lang="ts" setup>
import { useDraggableCore } from '@braks/revue-draggable'
import { watchDebounced } from '@vueuse/core'
import { useVueFlow } from '../../composables'
import { getRectOfNodes } from '../../utils'

const { store } = useVueFlow()

const el = templateRef<HTMLDivElement>('el', null)

const selectedNodesBBox = computed(() => getRectOfNodes(store.getSelectedNodes))

const innerStyle = computed(() => ({
  width: `${selectedNodesBBox.value.width}px`,
  height: `${selectedNodesBBox.value.height}px`,
  top: `${selectedNodesBBox.value.y}px`,
  left: `${selectedNodesBBox.value.x}px`,
}))

const transform = computed(() => `translate(${store.transform[0]}px,${store.transform[1]}px) scale(${store.transform[2]})`)

watch(selectedNodesBBox, (v) => (store.selectedNodesBbox = v))

const onContextMenu = (event: MouseEvent) => store.hooks.selectionContextMenu.trigger({ event, nodes: store.getSelectedNodes })

const { onDragStart, onDrag, onDragStop, scale } = useDraggableCore(el, {
  grid: store.snapToGrid ? store.snapGrid : undefined,
  enableUserSelectHack: false,
  scale: store.transform[2],
})

onMounted(() => {
  watchDebounced(
    () => store.transform[2],
    () => {
      scale.value = store.transform[2]
    },
    { debounce: 5 },
  )
})

onDragStart(({ event }) => store.hooks.selectionDragStart.trigger({ event, nodes: store.getSelectedNodes }))

onDrag(({ event, data: { deltaX, deltaY } }) => {
  store.hooks.selectionDrag.trigger({ event, nodes: store.getSelectedNodes })
  store.updateNodePosition({ diff: { x: deltaX, y: deltaY }, dragging: true })
})

onDragStop(({ event }) => {
  store.hooks.selectionDragStop.trigger({ event, nodes: store.getSelectedNodes })
  store.getSelectedNodes.forEach((node) => (node.dragging = false))
})
</script>
<script lang="ts">
export default {
  name: 'NodesSelection',
}
</script>
<template>
  <div class="vue-flow__nodesselection vue-flow__container" :class="store.noPanClassName" :style="{ transform }">
    <div ref="el" class="vue-flow__nodesselection-rect" :style="innerStyle" @contextmenu="onContextMenu" />
  </div>
</template>
