<script lang="ts" setup>
import { ref, toRef, watch } from 'vue'
import UserSelection from '../../components/UserSelection/UserSelection.vue'
import NodesSelection from '../../components/NodesSelection/NodesSelection.vue'
import { type GraphNode, SelectionMode } from '../../types'
import { useKeyPress, useVueFlow } from '../../composables'
import { getConnectedEdges, getNodesInside } from '../../utils'
import { getMousePosition } from './utils'

const { isSelecting, selectionKeyPressed } = defineProps<{ isSelecting: boolean; selectionKeyPressed: boolean }>()

const {
  vueFlowRef,
  getNodes,
  getEdges,
  viewport,
  emits,
  userSelectionActive,
  removeSelectedElements,
  panOnDrag,
  userSelectionRect,
  elementsSelectable,
  nodesSelectionActive,
  addSelectedElements,
  getSelectedEdges,
  getSelectedNodes,
  removeNodes,
  removeEdges,
  selectionMode,
  deleteKeyCode,
  multiSelectionKeyCode,
  multiSelectionActive,
} = useVueFlow()

const container = ref<HTMLDivElement | null>(null)

const prevSelectedNodesCount = ref(0)

const prevSelectedEdgesCount = ref(0)

const containerBounds = ref<DOMRect>()

const hasActiveSelection = toRef(() => elementsSelectable.value && (isSelecting || userSelectionActive.value))

// Used to prevent click events when the user lets go of the selectionKey during a selection
const selectionInProgress = ref(false)

const deleteKeyPressed = useKeyPress(deleteKeyCode, { actInsideInputWithModifier: false })

const multiSelectKeyPressed = useKeyPress(multiSelectionKeyCode)

watch(deleteKeyPressed, (isKeyPressed) => {
  if (!isKeyPressed) {
    return
  }

  const nodesToRemove: GraphNode[] = []
  for (const node of getNodes.value) {
    if (!node.selected && node.parentNode && nodesToRemove.some((n) => n.id === node.parentNode)) {
      nodesToRemove.push(node)
    } else if (node.selected) {
      nodesToRemove.push(node)
    }
  }

  if (nodesToRemove || getSelectedEdges.value) {
    if (getSelectedEdges.value.length > 0) {
      removeEdges(getSelectedEdges.value)
    }

    if (nodesToRemove.length > 0) {
      removeNodes(nodesToRemove)
    }

    nodesSelectionActive.value = false

    removeSelectedElements()
  }
})

watch(multiSelectKeyPressed, (isKeyPressed) => {
  multiSelectionActive.value = isKeyPressed
})

function resetUserSelection() {
  userSelectionActive.value = false
  userSelectionRect.value = null

  prevSelectedNodesCount.value = 0
  prevSelectedEdgesCount.value = 0
}

function onClick(event: MouseEvent) {
  if (selectionInProgress.value || event.target !== container.value || hasActiveSelection.value) {
    selectionInProgress.value = false
    return
  }

  emits.paneClick(event)

  removeSelectedElements()

  nodesSelectionActive.value = false
}

function onContextMenu(event: MouseEvent) {
  if (event.target !== container.value) {
    return
  }

  if (Array.isArray(panOnDrag.value) && panOnDrag.value?.includes(2)) {
    event.preventDefault()
    return
  }

  emits.paneContextMenu(event)
}

function onWheel(event: WheelEvent) {
  if (event.target !== container.value) {
    return
  }

  emits.paneScroll(event)
}

function onPointerDown(event: PointerEvent) {
  containerBounds.value = vueFlowRef.value?.getBoundingClientRect()
  container.value?.setPointerCapture(event.pointerId)

  if (
    !hasActiveSelection.value ||
    !elementsSelectable ||
    !isSelecting ||
    event.button !== 0 ||
    event.target !== container.value ||
    !containerBounds.value
  ) {
    return
  }

  const { x, y } = getMousePosition(event, containerBounds.value)

  removeSelectedElements()

  userSelectionRect.value = {
    width: 0,
    height: 0,
    startX: x,
    startY: y,
    x,
    y,
  }

  userSelectionActive.value = true

  emits.selectionStart(event)
}

function onPointerMove(event: PointerEvent) {
  if (!hasActiveSelection.value) {
    return emits.paneMouseMove(event)
  }

  if (!containerBounds.value || !userSelectionRect.value) {
    return
  }

  selectionInProgress.value = true

  const mousePos = getMousePosition(event, containerBounds.value)
  const { startX = 0, startY = 0 } = userSelectionRect.value

  const nextUserSelectRect = {
    ...userSelectionRect.value,
    x: mousePos.x < startX ? mousePos.x : startX,
    y: mousePos.y < startY ? mousePos.y : startY,
    width: Math.abs(mousePos.x - startX),
    height: Math.abs(mousePos.y - startY),
  }

  const selectedNodes = getNodesInside(
    getNodes.value,
    userSelectionRect.value,
    viewport.value,
    selectionMode.value === SelectionMode.Partial,
    true,
  )

  const selectedEdges = getConnectedEdges(selectedNodes, getEdges.value)

  prevSelectedNodesCount.value = selectedNodes.length
  prevSelectedEdgesCount.value = selectedEdges.length

  userSelectionRect.value = nextUserSelectRect

  addSelectedElements([...selectedNodes, ...selectedEdges])
}

function onPointerUp(event: PointerEvent) {
  if (!hasActiveSelection.value || event.button !== 0) {
    return
  }

  container.value?.releasePointerCapture(event.pointerId)

  // We only want to trigger click functions when in selection mode if
  // the user did not move the mouse.
  if (!userSelectionActive.value && userSelectionRect.value && event.target === container.value) {
    onClick(event)
  }

  nodesSelectionActive.value = prevSelectedNodesCount.value > 0

  resetUserSelection()

  emits.selectionEnd(event)

  // If the user kept holding the selectionKey during the selection,
  // we need to reset the selectionInProgress, so the next click event is not prevented
  if (selectionKeyPressed) {
    selectionInProgress.value = false
  }
}

function onPointerEnter(event: PointerEvent) {
  if (hasActiveSelection.value) {
    return
  }

  emits.paneMouseEnter(event)
}
</script>

<script lang="ts">
export default {
  name: 'Pane',
  compatConfig: { MODE: 3 },
}
</script>

<template>
  <div
    ref="container"
    class="vue-flow__pane vue-flow__container"
    :class="{ selection: isSelecting }"
    @click="onClick"
    @contextmenu="onContextMenu"
    @wheel.passive="onWheel"
    @pointerenter="onPointerEnter"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
  >
    <slot />
    <UserSelection v-if="userSelectionActive && userSelectionRect" :user-selection-rect="userSelectionRect" />
    <NodesSelection v-if="nodesSelectionActive && getSelectedNodes.length" />
  </div>
</template>
