<script lang="ts" setup>
import { useVueFlow } from '../../composables'
import type { SelectionRect as Rect } from '../../types'
import { getConnectedEdges, getNodesInside } from '../../utils'
import SelectionRect from './SelectionRect.vue'
import { getMousePosition } from './utils'

const { userSelectionActive, setState, getNodes, getEdges, viewport, addSelectedEdges, addSelectedNodes } = $(useVueFlow())
const el = templateRef('user-selection', null)

let prevNodes = $ref(0)
let prevEdges = $ref(0)
const initialRect = () => ({
  width: 0,
  height: 0,
  startX: 0,
  startY: 0,
  x: 0,
  y: 0,
  draw: false,
})

let rect = $ref<Rect>(initialRect())

const reset = () => {
  rect = initialRect()
  prevNodes = 0
  prevEdges = 0

  setState({
    userSelectionActive: false,
  })
}

const onMouseDown = (event: MouseEvent) => {
  const mousePos = getMousePosition(event)
  if (!mousePos) return

  rect = {
    width: 0,
    height: 0,
    startX: mousePos.x,
    startY: mousePos.y,
    x: mousePos.x,
    y: mousePos.y,
    draw: true,
  }

  setState({
    userSelectionActive: true,
    nodesSelectionActive: false,
  })
}

const onMouseMove = (event: MouseEvent) => {
  if (!userSelectionActive || !rect.draw) return

  const mousePos = getMousePosition(event)
  if (!mousePos) return

  const startX = rect.startX
  const startY = rect.startY

  const nextUserSelectRect: Rect = {
    ...rect,
    x: mousePos.x < startX ? mousePos.x : rect.x,
    y: mousePos.y < startY ? mousePos.y : rect.y,
    width: Math.abs(mousePos.x - startX),
    height: Math.abs(mousePos.y - startY),
  }

  const selectedNodes = getNodesInside(getNodes, rect, viewport)
  const selectedEdges = getConnectedEdges(selectedNodes, getEdges)

  rect = nextUserSelectRect

  addSelectedNodes(selectedNodes)
  addSelectedEdges(selectedEdges)

  prevNodes = selectedNodes.length
  prevEdges = selectedEdges.length
}

const onMouseUp = () => {
  rect = initialRect()

  setState({
    nodesSelectionActive: prevNodes > 0,
    userSelectionActive: false,
  })
}

const onMouseLeave = () => {
  setState({
    nodesSelectionActive: prevNodes > 0,
  })

  reset()
}

onMounted(() => {
  useEventListener(el, 'mousedown', onMouseDown)
  useEventListener(el, 'mousemove', onMouseMove)
  useEventListener(el, 'click', onMouseUp)
  useEventListener(el, 'mouseup', onMouseUp)
  useEventListener(el, 'mouseleave', onMouseLeave)
})

onBeforeUnmount(() => {
  reset()
})
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
