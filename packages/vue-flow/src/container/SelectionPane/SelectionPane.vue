<script lang="ts" setup>
import type { EdgeChange, NodeChange } from '../../types'
import { useKeyPress, useVueFlow } from '../../composables'
import { getConnectedEdges } from '../../utils'
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
  resetSelectedElements,
  setState,
  getSelectedEdges,
  getSelectedNodes,
} = $(useVueFlow())

const onClick = (event: MouseEvent) => {
  emits.paneClick(event)
  setState({
    nodesSelectionActive: false,
  })
  resetSelectedElements()
}

const onContextMenu = (event: MouseEvent) => emits.paneContextMenu(event)

const onWheel = (event: WheelEvent) => emits.paneScroll(event)

useKeyPress($$(deleteKeyCode), (keyPressed) => {
  const selectedNodes = getSelectedNodes
  const selectedEdges = getSelectedEdges
  if (keyPressed && (selectedNodes || selectedEdges)) {
    const connectedEdges = (selectedNodes && getConnectedEdges(selectedNodes, edges)) ?? []

    const nodeChanges: NodeChange[] = selectedNodes.map((n) => ({ id: n.id, type: 'remove' }))
    const edgeChanges: EdgeChange[] = [...selectedEdges, ...connectedEdges].map((e) => ({
      id: e.id,
      type: 'remove',
    }))

    emits.nodesChange(nodeChanges)
    emits.edgesChange(edgeChanges)

    setState({
      nodesSelectionActive: false,
    })

    resetSelectedElements()
  }
})

useKeyPress($$(multiSelectionKeyCode), (keyPressed) => {
  setState({
    multiSelectionActive: keyPressed,
  })
})

const selectionKeyPressed = useKeyPress($$(selectionKeyCode), (keyPressed) => {
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
  />
</template>
