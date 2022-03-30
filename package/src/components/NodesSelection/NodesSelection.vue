<script lang="ts" setup>
import { DraggableCore, DraggableEventListener } from '@braks/revue-draggable'
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
watch(selectedNodesBBox, (v) => (store.selectedNodesBbox = v))
const onStart: DraggableEventListener = ({ event }) =>
  store.hooks.selectionDragStart.trigger({ event, nodes: store.getSelectedNodes })
const onDrag: DraggableEventListener = ({ event, data: { deltaX, deltaY } }) => {
  nextTick(() => {
    store.hooks.selectionDrag.trigger({ event, nodes: store.getSelectedNodes })
    store.updateNodePosition({ diff: { x: deltaX, y: deltaY }, dragging: true })
  })
}
const onStop: DraggableEventListener = ({ event }) => {
  store.hooks.selectionDragStop.trigger({ event, nodes: store.getSelectedNodes })
  store.getSelectedNodes.forEach((node) => (node.dragging = false))
}
const onContextMenu = (event: MouseEvent) => store.hooks.selectionContextMenu.trigger({ event, nodes: store.getSelectedNodes })

const transform = computed(() => `translate(${store.transform[0]}px,${store.transform[1]}px) scale(${store.transform[2]})`)
const scale = controlledComputed(
  () => store.transform[2],
  () => store.transform[2],
)
const scaleDebounced = debouncedRef(scale, 5)

const el = templateRef<HTMLDivElement>('el', null)
onMounted(() => {
  el.value.click()
})
</script>
<script lang="ts">
export default {
  name: 'NodesSelection',
}
</script>
<template>
  <div ref="el" class="vue-flow__nodesselection vue-flow__container" :class="store.noPanClassName" :style="{ transform }">
    <DraggableCore
      :grid="store.snapToGrid ? store.snapGrid : undefined"
      :enable-user-select-hack="false"
      :scale="scaleDebounced"
      @start="onStart"
      @move="onDrag"
      @stop="onStop"
    >
      <div class="vue-flow__nodesselection-rect" :style="innerStyle" @contextmenu="onContextMenu" />
    </DraggableCore>
  </div>
</template>
