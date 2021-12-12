<script lang="ts" setup>
import { EdgeChange, NodeChange } from '../../types'
import { useVueFlow, useKeyPress } from '../../composables'
import { getConnectedEdges } from '../../utils'
import NodesSelection from '../../components/NodesSelection/NodesSelection.vue'
import UserSelection from '../../components/UserSelection/UserSelection.vue'

const { store } = useVueFlow()

const onClick = (event: MouseEvent) => {
  store.hooks.paneClick.trigger(event)
  store.nodesSelectionActive = false
  store.resetSelectedElements()
}

const onContextMenu = (event: MouseEvent) => store.hooks.paneContextMenu.trigger(event)

const onWheel = (event: WheelEvent) => store.hooks.paneScroll.trigger(event)

onMounted(() => {
  useKeyPress(store.deleteKeyCode, (keyPressed) => {
    const selectedNodes = store.getSelectedNodes
    const selectedEdges = store.getSelectedEdges
    if (keyPressed && (selectedNodes || selectedEdges)) {
      const connectedEdges = (selectedNodes && getConnectedEdges(selectedNodes, store.edges)) ?? []

      const nodeChanges: NodeChange[] = selectedNodes.map((n) => ({ id: n.id, type: 'remove' }))
      const edgeChanges: EdgeChange[] = [...selectedEdges, ...connectedEdges].map((e) => ({
        id: e.id,
        type: 'remove',
      }))

      store.hooks.nodesChange.trigger(nodeChanges)
      store.hooks.edgesChange.trigger(edgeChanges)
      store.nodesSelectionActive = false
      store.resetSelectedElements()
    }
  })

  useKeyPress(store.multiSelectionKeyCode, (keyPressed) => {
    store.multiSelectionActive = keyPressed
  })

  useKeyPress(store.selectionKeyCode, (keyPressed) => {
    store.selectionActive =
      store.selectionActive === true && keyPressed ? true : keyPressed && (store.selectionActive || store.elementsSelectable)
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
  <UserSelection v-if="store.selectionActive" :key="`user-selection-${store.id}`" />
  <NodesSelection
    v-if="store.selectedNodes.length && !store.selectionActive && store.nodesSelectionActive"
    :key="`nodes-selction-${store.id}`"
    :nodes="store.selectedNodes"
  />
  <div
    :key="`flow-pane-${store.id}`"
    class="vue-flow__pane vue-flow__container"
    @click="onClick"
    @contextmenu="onContextMenu"
    @wheel="onWheel"
  />
</template>
