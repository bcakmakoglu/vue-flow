<script lang="ts" setup>
import { useStore } from '../../composables'
import SelectionRect from './SelectionRect.vue'
import { getMousePosition } from './utils'

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

const userSelectionRect = computed(() => store.userSelectionRect)

useEventListener(el, 'mousedown', onMouseDown)
useEventListener(el, 'mousemove', onMouseMove)
useEventListener(el, 'click', onMouseUp)
useEventListener(el, 'mouseup', onMouseUp)
useEventListener(el, 'mouseleave', onMouseLeave)
</script>
<template>
  <div ref="user-selection" class="vue-flow__selectionpane">
    <SelectionRect
      v-if="userSelectionRect.draw"
      :width="userSelectionRect.width"
      :height="userSelectionRect.height"
      :x="userSelectionRect.x"
      :y="userSelectionRect.y"
    />
  </div>
</template>
