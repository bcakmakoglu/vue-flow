<script lang="ts" setup>
import SelectionRect from './SelectionRect.vue'
import { getMousePosition } from '~/components/UserSelection/utils'
import { useStore } from '~/composables'

const store = useStore()
const el = templateRef('user-selection', null)

const onMouseDown = (event: MouseEvent) => {
  const mousePos = getMousePosition(event)
  if (!mousePos) return

  store.setUserSelection(mousePos)
}

const onMouseMove = (event: MouseEvent) => {
  if (!store.selectionActive) return
  const mousePos = getMousePosition(event)
  if (!mousePos) return

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
</script>
<template>
  <div ref="user-selection" class="revue-flow__selectionpane">
    <SelectionRect
      v-if="store.userSelectionRect.draw"
      :width="store.userSelectionRect.width"
      :height="store.userSelectionRect.height"
      :x="store.userSelectionRect.x"
      :y="store.userSelectionRect.y"
    />
  </div>
</template>
