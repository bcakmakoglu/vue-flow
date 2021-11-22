<script lang="ts" setup>
import { Edge, ElementId, FlowElement, FlowElements, KeyCode } from '../../types'
import { useStore, useKeyPress } from '../../composables'
import { getConnectedEdges, isGraphNode } from '../../utils'
import NodesSelection from '../../components/NodesSelection/NodesSelection.vue'
import UserSelection from '../../components/UserSelection/UserSelection.vue'

interface SelectionPaneProps {
  edges: Edge[]
  selectedElements: FlowElements
  selectionKeyCode?: KeyCode
  deleteKeyCode?: KeyCode
  multiSelectionKeyCode?: KeyCode
  elementsSelectable?: boolean
  nodesSelectionActive?: boolean
  selectionActive?: boolean
}
const props = withDefaults(defineProps<SelectionPaneProps>(), {
  selectionKeyCode: 'Shift',
  deleteKeyCode: 'Backspace',
  multiSelectionKeyCode: 'Meta',
  elementsSelectable: true,
})

const store = useStore()

const onClick = (event: MouseEvent) => {
  store.hooks.paneClick.trigger(event)
  store.unsetNodesSelection()
  store.resetSelectedElements()
}

const onContextMenu = (event: MouseEvent) => store.hooks.paneContextMenu.trigger(event)

const onWheel = (event: WheelEvent) => store.hooks.paneScroll.trigger(event)

const userSelection = ref(false)

onMounted(() => {
  useKeyPress(props.deleteKeyCode, (keyPressed) => {
    if (keyPressed && props.selectedElements) {
      const selectedNodes = props.selectedElements.filter(isGraphNode)
      const connectedEdges = getConnectedEdges(selectedNodes, props.edges)
      const elementsToRemove = [...props.selectedElements, ...connectedEdges].reduce(
        (res, item) => res.set(item.id, item),
        new Map<ElementId, FlowElement>(),
      )

      store.hooks.elementsRemove.trigger(Array.from(elementsToRemove.values()))
      store.unsetNodesSelection()
      store.resetSelectedElements()
    }
  })

  useKeyPress(props.multiSelectionKeyCode, (keyPressed) => {
    store.multiSelectionActive = keyPressed
  })

  useKeyPress(props.selectionKeyCode, (keyPressed) => {
    userSelection.value = keyPressed && (props.selectionActive || props.elementsSelectable)
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
  <UserSelection v-if="userSelection" id="user-selection" :key="`user-selection-${store.$id}`" />
  <NodesSelection v-if="props.nodesSelectionActive" id="nodes-selection" :key="`nodes-selction-${store.$id}`" />
  <div :key="`flow-pane-${store.$id}`" class="vue-flow__pane" @click="onClick" @contextmenu="onContextMenu" @wheel="onWheel" />
</template>
