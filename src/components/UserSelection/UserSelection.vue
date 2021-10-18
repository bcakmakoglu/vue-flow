<script lang="ts" setup>
import SelectionRect from './SelectionRect.vue'
import { RevueFlowStore } from '~/types'
import { getMousePosition } from '~/components/UserSelection/utils'

const store = inject<RevueFlowStore>('store')!
const el = templateRef('user-selection', null)

const onMouseDown = (event: MouseEvent) => {
  const mousePos = getMousePosition(event)
  if (!mousePos) {
    return
  }

  store.setUserSelection(mousePos)
}

const onMouseMove = (event: MouseEvent) => {
  if (!store.selectionActive) {
    return
  }
  const mousePos = getMousePosition(event)
  if (!mousePos) {
    return
  }

  store.updateUserSelection(mousePos)
}

const onMouseUp = () => {
  store.unsetUserSelection()
}

const onMouseLeave = () => {
  store.unsetUserSelection()
  store.unsetNodesSelection()
}

useEventListener(el, 'mousedown', onMouseDown)
useEventListener(el, 'mousemove', onMouseMove)
useEventListener(el, 'click', onMouseUp)
useEventListener(el, 'mouseup', onMouseUp)
useEventListener(el, 'mouseleave', onMouseLeave)

const userSelectionRect = computed(() => store.userSelectionRect)
</script>
<template>
  <div ref="user-selection" class="revue-flow__selectionpane">
    <SelectionRect
      v-if="userSelectionRect.draw"
      :width="userSelectionRect.width"
      :height="userSelectionRect.height"
      :x="userSelectionRect.x"
      :y="userSelectionRect.y"
    />
  </div>
</template>
