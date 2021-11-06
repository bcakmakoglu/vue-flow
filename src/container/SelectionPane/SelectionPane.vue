<script lang="ts" setup>
import { ElementId, FlowElement, KeyCode } from '~/types'
import NodesSelection from '~/components/NodesSelection/NodesSelection.vue'
import UserSelection from '~/components/UserSelection/UserSelection.vue'
import { getConnectedEdges, isNode } from '~/utils'
import { useHooks, useStore, useKeyPress } from '~/composables'

interface SelectionPaneProps {
  selectionKeyCode?: KeyCode
  deleteKeyCode?: KeyCode
  multiSelectionKeyCode?: KeyCode
}
const props = withDefaults(defineProps<SelectionPaneProps>(), {
  selectionKeyCode: 'Shift',
  deleteKeyCode: 'Backspace',
  multiSelectionKeyCode: 'Meta',
})

const store = useStore()
const hooks = useHooks()

const onClick = (event: MouseEvent) => {
  hooks.paneClick.trigger(event)
  store.unsetNodesSelection()
  store.resetSelectedElements()
}

const onContextMenu = (event: MouseEvent) => hooks.paneContextMenu.trigger(event)

const onWheel = (event: WheelEvent) => hooks.paneScroll.trigger(event)

const selectionKeyPresed = ref(false)

onMounted(() => {
  useKeyPress(props.deleteKeyCode, (keyPressed) => {
    if (keyPressed && store.selectedElements) {
      const selectedNodes = store.selectedElements.filter(isNode)
      const connectedEdges = getConnectedEdges(selectedNodes, store.edges)
      const elementsToRemove = [...store.selectedElements, ...connectedEdges].reduce(
        (res, item) => res.set(item.id, item),
        new Map<ElementId, FlowElement>(),
      )

      hooks.elementsRemove.trigger(Array.from(elementsToRemove.values()))
      store.unsetNodesSelection()
      store.resetSelectedElements()
    }
  })

  useKeyPress(props.multiSelectionKeyCode, (keyPressed) => (store.multiSelectionActive = keyPressed))

  useKeyPress(props.selectionKeyCode, (keyPressed) => (selectionKeyPresed.value = keyPressed))
})
</script>
<template>
  <slot></slot>
  <UserSelection v-if="selectionKeyPresed && (store.selectionActive || store.elementsSelectable)" id="user-selection" />
  <NodesSelection v-if="store.nodesSelectionActive" id="nodes-selection" />
  <div class="vue-flow__pane" @click="onClick" @contextmenu="onContextMenu" @wheel="onWheel" />
</template>
