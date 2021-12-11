<script lang="ts" setup>
import { FlowElement } from '../../types'
import { useStore, useKeyPress } from '../../composables'
import { getConnectedEdges } from '../../utils'
import NodesSelection from '../../components/NodesSelection/NodesSelection.vue'
import UserSelection from '../../components/UserSelection/UserSelection.vue'

const store = useStore()

const onClick = (event: MouseEvent) => {
  store.hooks.paneClick.trigger(event)
  store.nodesSelectionActive = false
  store.resetSelectedElements()
}

const onContextMenu = (event: MouseEvent) => store.hooks.paneContextMenu.trigger(event)

const onWheel = (event: WheelEvent) => store.hooks.paneScroll.trigger(event)

onMounted(() => {
  useKeyPress(store.deleteKeyCode, (keyPressed) => {
    if (keyPressed && (store.selectedNodes || store.selectedEdges)) {
      const connectedEdges = (store.selectedNodes && getConnectedEdges(store.selectedNodes, store.getEdges)) ?? []
      const elementsToRemove = [...(store.selectedNodes ?? []), ...(store.selectedEdges ?? []), ...connectedEdges].reduce(
        (res, item) => res.set(item.id, item),
        new Map<string, FlowElement>(),
      )

      store.hooks.elementsRemove.trigger(Array.from(elementsToRemove.values()))
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
