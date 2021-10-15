<script lang="ts" setup>
import { inject } from 'vue'
import { RevueFlowHooks } from '~/hooks/RevueFlowHooks'
import useKeyPress from '~/hooks/useKeyPress'
import { KeyCode } from '~/types'
import useGlobalKeyHandler from '~/hooks/useGlobalKeyHandler'

const props = withDefaults(
  defineProps<{
    selectionKeyCode: KeyCode
    deleteKeyCode: KeyCode
    multiSelectionKeyCode: KeyCode
  }>(),
  {
    selectionKeyCode: 'Shift',
    deleteKeyCode: 'Backspace',
    multiSelectionKeyCode: 'Meta',
  },
)
const hooks = inject<RevueFlowHooks>('hooks')!
const keyPressed = useKeyPress(props.selectionKeyCode)
const nodeSelectionActive = ref(false)
const selectedElements = ref([])

const onClick = (event: MouseEvent) => {
  hooks.paneClick.trigger(event)
  nodeSelectionActive.value = false
  selectedElements.value = []
}

const onContextMenu = (event: MouseEvent) => hooks.paneContextMenu.trigger(event)

const onWheel = (event: WheelEvent) => hooks.paneScroll.trigger(event)

useGlobalKeyHandler({
  onElementsRemove: hooks.elementsRemove.trigger,
  deleteKeyCode: props.deleteKeyCode,
  multiSelectionKeyCode: props.multiSelectionKeyCode,
})
</script>
<template>
  <slot></slot>
  <div v-if="keyPressed" id="user-selection">User Selection</div>
  <div v-if="nodeSelectionActive" id="nodes-selection">Nodes Selection</div>
  <div class="revue-flow__pane" @click="onClick" @contextmenu="onContextMenu" @wheel="onWheel" />
</template>
