<script lang="ts" setup>
import { useVueFlow } from '../../composables'
import type { SelectionRect as Rect } from '../../types'
import { getConnectedEdges, getNodesInside } from '../../utils'
import SelectionRect from './SelectionRect.vue'
import { getMousePosition } from './utils'

const { userSelectionActive, nodesSelectionActive, getNodes, getEdges, viewport, addSelectedElements } = useVueFlow()

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

  userSelectionActive.value = false
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

  userSelectionActive.value = true
  nodesSelectionActive.value = true
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

  const selectedNodes = getNodesInside(getNodes.value, rect, viewport.value)
  const selectedEdges = getConnectedEdges(selectedNodes, getEdges.value)

  rect = nextUserSelectRect

  addSelectedElements([...selectedNodes, ...selectedEdges])

  prevNodes = selectedNodes.length
  prevEdges = selectedEdges.length
}

const onMouseUp = () => {
  rect = initialRect()

  nodesSelectionActive.value = prevNodes > 0
  userSelectionActive.value = false
}

const onMouseLeave = () => {
  nodesSelectionActive.value = prevNodes > 0

  reset()
}

onBeforeUnmount(reset)
</script>

<script lang="ts">
export default {
  name: 'UserSelection',
}
</script>

<template>
  <div
    class="vue-flow__selectionpane vue-flow__container"
    @mousedown="onMouseDown"
    @mousemove="onMouseMove"
    @click="onMouseUp"
    @mouseup="onMouseUp"
    @mouseleave="onMouseLeave"
  >
    <SelectionRect v-if="rect.draw" :width="rect.width" :height="rect.height" :x="rect.x" :y="rect.y" />
  </div>
</template>
