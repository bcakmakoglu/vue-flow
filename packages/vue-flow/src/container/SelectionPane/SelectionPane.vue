<script lang="ts" setup>
import type { GraphNode } from '../../types'
import { useKeyPress, useVueFlow } from '../../composables'
import { NodesSelection, UserSelection } from '../../components'

const {
  id,
  edges,
  deleteKeyCode,
  selectionKeyCode,
  multiSelectionKeyCode,
  emits,
  nodesSelectionActive,
  userSelectionActive,
  elementsSelectable,
  removeSelectedElements,
  setState,
  getSelectedEdges,
  getSelectedNodes,
  getNodes,
  removeNodes,
  removeEdges,
} = $(useVueFlow())

const onClick = (event: MouseEvent) => {
  emits.paneClick(event)
  setState({
    nodesSelectionActive: false,
  })
  removeSelectedElements()
}

const onContextMenu = (event: MouseEvent) => emits.paneContextMenu(event)

const onWheel = (event: WheelEvent) => emits.paneScroll(event)

const onMouseEnter = (event: MouseEvent) => emits.paneMouseEnter(event)

const onMouseLeave = (event: MouseEvent) => emits.paneMouseLeave(event)

const onMouseMove = (event: MouseEvent) => emits.paneMouseMove(event)

useKeyPress(deleteKeyCode, (keyPressed) => {
  if (!keyPressed) return

  const nodesToRemove = getNodes.reduce<GraphNode[]>((res, node) => {
    if (!node.selected && node.parentNode && res.find((n) => n.id === node.parentNode)) {
      res.push(node)
    } else if (node.selected) {
      res.push(node)
    }

    return res
  }, [])

  const selectedEdges = edges.filter((e) => e.selected)

  if (nodesToRemove || selectedEdges) {
    if (selectedEdges.length > 0) {
      removeEdges(selectedEdges)
    }

    if (nodesToRemove.length > 0) {
      removeNodes(nodesToRemove)
    }

    setState({
      nodesSelectionActive: false,
    })

    removeSelectedElements()
  }
})

useKeyPress(multiSelectionKeyCode, (keyPressed) => {
  setState({
    multiSelectionActive: keyPressed,
  })
})

const selectionKeyPressed = useKeyPress(selectionKeyCode, (keyPressed) => {
  if (userSelectionActive && keyPressed) return

  setState({
    userSelectionActive: keyPressed && elementsSelectable,
  })
})
</script>

<script lang="ts">
export default {
  name: 'SelectionPane',
  inheritAttrs: false,
}
</script>

<template>
  <UserSelection v-if="selectionKeyPressed" :key="`user-selection-${id}`" />
  <NodesSelection v-if="nodesSelectionActive" :key="`nodes-selection-${id}`" />
  <div
    :key="`pane-${id}`"
    class="vue-flow__pane vue-flow__container"
    @click="onClick"
    @contextmenu="onContextMenu"
    @wheel="onWheel"
    @mouseenter="onMouseEnter"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  />
</template>
