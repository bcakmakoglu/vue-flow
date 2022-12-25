<script lang="ts" setup>
import UserSelection from '../../components/UserSelection/UserSelection.vue'
import NodesSelection from '../../components/NodesSelection/NodesSelection.vue'
import { SelectionMode } from '../../types'
import { getMousePosition } from './utils'

const { isSelecting } = defineProps<{ isSelecting: boolean }>()

const {
  id,
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
  selectionMode,
} = useVueFlow()

const container = ref<HTMLDivElement | null>(null)

const prevSelectedNodesCount = ref(0)

const prevSelectedEdgesCount = ref(0)

const containerBounds = ref<DOMRect>()

const hasActiveSelection = computed(() => elementsSelectable.value && (isSelecting || userSelectionActive.value))

const resetUserSelection = () => {
  userSelectionActive.value = false
  userSelectionRect.value = null

  prevSelectedNodesCount.value = 0
  prevSelectedEdgesCount.value = 0
}

function onClick(event: MouseEvent) {
  if (event.target !== container.value || hasActiveSelection.value) return

  console.log('click')

  emits.paneClick(event)

  removeSelectedElements()

  nodesSelectionActive.value = false
}

function onContextMenu(event: MouseEvent) {
  if (event.target !== container.value) return

  if (Array.isArray(panOnDrag.value) && panOnDrag.value?.includes(2)) {
    event.preventDefault()
    return
  }

  emits.paneContextMenu(event)
}

function onWheel(event: WheelEvent) {
  if (event.target !== container.value) return

  emits.paneScroll(event)
}

function onMouseDown(event: MouseEvent) {
  containerBounds.value = vueFlowRef.value!.getBoundingClientRect()

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

function onMouseMove(event: MouseEvent) {
  if (!isSelecting || !containerBounds.value || !userSelectionRect.value) return
  if (!hasActiveSelection.value) return emits.paneMouseMove(event)

  if (!userSelectionActive.value) userSelectionActive.value = true
  if (nodesSelectionActive.value) nodesSelectionActive.value = false

  const mousePos = getMousePosition(event, containerBounds.value)
  const startX = userSelectionRect.value.startX ?? 0
  const startY = userSelectionRect.value.startY ?? 0

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
  )

  const selectedEdges = getConnectedEdges(selectedNodes, getEdges.value)

  prevSelectedNodesCount.value = selectedNodes.length
  prevSelectedEdgesCount.value = selectedEdges.length

  userSelectionRect.value = nextUserSelectRect

  addSelectedElements([...selectedNodes, ...selectedEdges])
}

function onMouseUp(event: MouseEvent) {
  if (!hasActiveSelection.value) return

  // We only want to trigger click functions when in selection mode if
  // the user did not move the mouse.
  if (!userSelectionActive.value && userSelectionRect.value && event.target === container.value) {
    onClick(event)
  }

  nodesSelectionActive.value = prevSelectedNodesCount.value > 0

  resetUserSelection()

  emits.selectionEnd(event)
}

function onMouseLeave(event: MouseEvent) {
  console.log('mouseleave')
  if (!hasActiveSelection.value) return emits.paneMouseLeave(event)

  if (userSelectionActive.value) {
    nodesSelectionActive.value = prevSelectedNodesCount.value > 0
    emits.selectionEnd?.(event)
  }

  resetUserSelection()
}

function onMouseEnter(event: MouseEvent) {
  if (hasActiveSelection.value) return

  emits.paneMouseEnter(event)
}
</script>

<script lang="ts">
export default {
  name: 'Pane',
}
</script>

<template>
  <div
    ref="container"
    :key="`pane-${id}`"
    class="vue-flow__pane vue-flow__container"
    :class="[{ selection: isSelecting }]"
    @click="onClick"
    @contextmenu="onContextMenu"
    @wheel="onWheel"
    @mouseenter="onMouseEnter"
    @mousedown="onMouseDown"
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"
    @mouseleave="onMouseLeave"
  >
    <slot />
    <UserSelection v-if="userSelectionActive && userSelectionRect" />
    <NodesSelection v-if="nodesSelectionActive" />
  </div>
</template>
