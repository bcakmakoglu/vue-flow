<script lang="ts" setup>
import { useVueFlow } from '../../composables'
import { SelectionRect as Rect } from '../../types'
import { getConnectedEdges, getNodesInside } from '../../utils'
import SelectionRect from './SelectionRect.vue'
import { getMousePosition } from './utils'

const { store } = useVueFlow()
const el = templateRef('user-selection', null)

const prevNodes = ref(0)
const prevEdges = ref(0)
const initialRect = () => ({
  width: 0,
  height: 0,
  startX: 0,
  startY: 0,
  x: 0,
  y: 0,
  draw: false,
})
const rect = ref<Rect>(initialRect())

const reset = () => {
  rect.value = initialRect()
  store.userSelectionActive = false
  prevNodes.value = 0
  prevEdges.value = 0
}
const onMouseDown = (event: MouseEvent) => {
  const mousePos = getMousePosition(event)
  if (!mousePos) return

  rect.value = {
    width: 0,
    height: 0,
    startX: mousePos.x,
    startY: mousePos.y,
    x: mousePos.x,
    y: mousePos.y,
    draw: true,
  }
  store.userSelectionActive = true
  store.nodesSelectionActive = false
}

const onMouseMove = (event: MouseEvent) => {
  if (!store.userSelectionActive) return
  const mousePos = getMousePosition(event)
  if (!mousePos) return

  const startX = rect.value.startX
  const startY = rect.value.startY

  const nextUserSelectRect: Rect = {
    ...rect.value,
    x: mousePos.x < startX ? mousePos.x : rect.value.x,
    y: mousePos.y < startY ? mousePos.y : rect.value.y,
    width: Math.abs(mousePos.x - startX),
    height: Math.abs(mousePos.y - startY),
  }
  const selectedNodes = getNodesInside(store.getNodes, rect.value, store.transform)
  const selectedEdges = getConnectedEdges(selectedNodes, store.getEdges)
  rect.value = nextUserSelectRect
  store.addSelectedNodes(selectedNodes)
  store.addSelectedEdges(selectedEdges)
  prevNodes.value = selectedNodes.length
  prevEdges.value = selectedEdges.length
}

const onMouseUp = () => {
  store.nodesSelectionActive = prevNodes.value > 0
  reset()
}

const onMouseLeave = () => {
  store.nodesSelectionActive = false
  reset()
}

useEventListener(el, 'mousedown', onMouseDown)
useEventListener(el, 'mousemove', onMouseMove)
useEventListener(el, 'click', onMouseUp)
useEventListener(el, 'mouseup', onMouseUp)
useEventListener(el, 'mouseleave', onMouseLeave)
</script>
<script lang="ts">
export default {
  name: 'UserSelection',
}
</script>
<template>
  <div ref="user-selection" class="vue-flow__selectionpane vue-flow__container">
    <SelectionRect v-if="rect.draw" :width="rect.width" :height="rect.height" :x="rect.x" :y="rect.y" />
  </div>
</template>
