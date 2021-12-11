<script lang="ts" setup>
import { FlowElement, FlowElements, GraphEdge, KeyCode } from '../../types'
import { useStore, useKeyPress } from '../../composables'
import { getConnectedEdges, isGraphNode } from '../../utils'
import NodesSelection from '../../components/NodesSelection/NodesSelection.vue'
import UserSelection from '../../components/UserSelection/UserSelection.vue'

const store = useStore()

const onClick = (event: MouseEvent) => {
  store.hooks.paneClick.trigger(event)
  store.unsetNodesSelection()
  store.resetSelectedElements()
}

const onContextMenu = (event: MouseEvent) => store.hooks.paneContextMenu.trigger(event)

const onWheel = (event: WheelEvent) => store.hooks.paneScroll.trigger(event)

const userSelection = ref(false)

tryOnMounted(() => {
  useKeyPress(store.deleteKeyCode, (keyPressed) => {
    if (keyPressed && store.selectedElements) {
      const selectedNodes = store.selectedElements.filter(isGraphNode)
      const connectedEdges = getConnectedEdges(selectedNodes, store.getEdges)
      const elementsToRemove = [...store.selectedElements, ...connectedEdges].reduce(
        (res, item) => res.set(item.id, item),
        new Map<string, FlowElement>(),
      )

      store.hooks.elementsRemove.trigger(Array.from(elementsToRemove.values()))
      store.unsetNodesSelection()
      store.resetSelectedElements()
    }
  })

  useKeyPress(store.multiSelectionKeyCode, (keyPressed) => {
    store.multiSelectionActive = keyPressed
  })

  useKeyPress(store.selectionKeyCode, (keyPressed) => {
    userSelection.value = keyPressed && (store.selectionActive || store.elementsSelectable)
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
  <slot></slot>
  <UserSelection v-if="userSelection" :key="`user-selection-${store.id}`" />
  <NodesSelection v-if="store.nodesSelectionActive" :key="`nodes-selction-${store.id}`" />
  <div :key="`flow-pane-${store.id}`" class="vue-flow__pane" @click="onClick" @contextmenu="onContextMenu" @wheel="onWheel" />
</template>
