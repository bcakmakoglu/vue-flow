<script lang="ts" setup>
import { RevueFlowHooks } from '~/hooks/RevueFlowHooks'
import useKeyPress from '~/hooks/useKeyPress'
import { KeyCode, RevueFlowStore } from '~/types'
import useGlobalKeyHandler from '~/hooks/useGlobalKeyHandler'
import NodesSelection from '~/components/NodesSelection/NodesSelection.vue'
import UserSelection from '~/components/UserSelection/UserSelection.vue'

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
const store = inject<RevueFlowStore>('store')!
const hooks = inject<RevueFlowHooks>('hooks')!
const keyPressed = useKeyPress(props.selectionKeyCode)

const onClick = (event: MouseEvent) => {
  hooks.paneClick.trigger(event)
  store.unsetNodesSelection()
  store.resetSelectedElements()
}

const onContextMenu = (event: MouseEvent) => hooks.paneContextMenu.trigger(event)

const onWheel = (event: WheelEvent) => hooks.paneScroll.trigger(event)

useGlobalKeyHandler({
  onElementsRemove: hooks.elementsRemove.trigger,
  deleteKeyCode: props.deleteKeyCode,
  multiSelectionKeyCode: props.multiSelectionKeyCode,
})

const userSelectionVisible = computed(() => keyPressed.value && (store.selectionActive || store.elementsSelectable))
const nodesSelectionVisible = computed(() => store.nodesSelectionActive)
</script>
<template>
  <slot></slot>
  <UserSelection v-if="userSelectionVisible" id="user-selection" />
  <NodesSelection v-if="nodesSelectionVisible" id="nodes-selection" />
  <div class="revue-flow__pane" @click="onClick" @contextmenu="onContextMenu" @wheel="onWheel" />
</template>
