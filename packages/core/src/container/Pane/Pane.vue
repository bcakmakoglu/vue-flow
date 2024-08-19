<script lang="ts" setup>
import { ref, toRef, watch } from 'vue'
import { getEventPosition } from '@xyflow/system'
import UserSelection from '../../components/UserSelection/UserSelection.vue'
import NodesSelection from '../../components/NodesSelection/NodesSelection.vue'
import type { NodeChange } from '../../types'
import { SelectionMode } from '../../types'
import { useKeyPress, useVueFlow } from '../../composables'
import { getNodesInside, getSelectionChanges } from '../../utils'
import { getMousePosition } from './utils'

const { isSelecting, selectionKeyPressed } = defineProps<{ isSelecting: boolean; selectionKeyPressed: boolean }>()

const {
  vueFlowRef,
  nodes,
  viewport,
  emits,
  userSelectionActive,
  removeSelectedElements,
  panOnDrag,
  userSelectionRect,
  elementsSelectable,
  nodesSelectionActive,
  getSelectedEdges,
  getSelectedNodes,
  removeNodes,
  removeEdges,
  selectionMode,
  deleteKeyCode,
  multiSelectionKeyCode,
  multiSelectionActive,
  edgeLookup,
  nodeLookup,
} = useVueFlow()

const container = ref<HTMLDivElement | null>(null)

const prevSelectedNodesCount = ref(0)

const prevSelectedEdgesCount = ref(0)

const containerBounds = ref<DOMRect>()

const edgeIdLookup = ref<Map<string, Set<string>>>(new Map())

const hasActiveSelection = toRef(() => elementsSelectable.value && (isSelecting || userSelectionActive.value))

// Used to prevent click events when the user lets go of the selectionKey during a selection
let selectionInProgress = false
let selectionStarted = false

const deleteKeyPressed = useKeyPress(deleteKeyCode, { actInsideInputWithModifier: false })

const multiSelectKeyPressed = useKeyPress(multiSelectionKeyCode)

watch(deleteKeyPressed, (isKeyPressed) => {
  if (!isKeyPressed) {
    return
  }

  removeNodes(getSelectedNodes.value)

  removeEdges(getSelectedEdges.value)

  nodesSelectionActive.value = false
})

watch(multiSelectKeyPressed, (isKeyPressed) => {
  multiSelectionActive.value = isKeyPressed
})

function wrapHandler(handler: Function, containerRef: HTMLDivElement | null) {
  return (event: MouseEvent) => {
    if (event.target !== containerRef) {
      return
    }

    handler?.(event)
  }
}

function resetUserSelection() {
  userSelectionActive.value = false
  userSelectionRect.value = null

  prevSelectedNodesCount.value = 0
  prevSelectedEdgesCount.value = 0
}

function onClick(event: MouseEvent) {
  if (selectionInProgress) {
    selectionInProgress = false
    return
  }

  emits.paneClick(event)

  removeSelectedElements()

  nodesSelectionActive.value = false
}

function onContextMenu(event: MouseEvent) {
  if (Array.isArray(panOnDrag.value) && panOnDrag.value?.includes(2)) {
    event.preventDefault()
    return
  }

  emits.paneContextMenu(event)
}

function onWheel(event: WheelEvent) {
  emits.paneScroll(event)
}

function onPointerDown(event: PointerEvent) {
  containerBounds.value = vueFlowRef.value?.getBoundingClientRect()

  if (
    !elementsSelectable.value ||
    !isSelecting ||
    event.button !== 0 ||
    event.target !== container.value ||
    !containerBounds.value
  ) {
    return
  }

  ;(event.target as Element)?.setPointerCapture?.(event.pointerId)

  const { x, y } = getMousePosition(event, containerBounds.value)

  selectionStarted = true
  selectionInProgress = false
  edgeIdLookup.value = new Map()

  for (const [id, edge] of edgeLookup.value) {
    edgeIdLookup.value.set(edge.source, edgeIdLookup.value.get(edge.source)?.add(id) || new Set([id]))
    edgeIdLookup.value.set(edge.target, edgeIdLookup.value.get(edge.target)?.add(id) || new Set([id]))
  }

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
  nodesSelectionActive.value = false

  emits.selectionStart(event)
}

function onPointerMove(event: PointerEvent) {
  if (!containerBounds.value || !userSelectionRect.value) {
    return
  }

  selectionInProgress = true

  const { x: mouseX, y: mouseY } = getEventPosition(event, containerBounds.value)
  const { startX = 0, startY = 0 } = userSelectionRect.value

  const nextUserSelectRect = {
    startX,
    startY,
    x: mouseX < startX ? mouseX : startX,
    y: mouseY < startY ? mouseY : startY,
    width: Math.abs(mouseX - startX),
    height: Math.abs(mouseY - startY),
  }

  const selectedNodes = getNodesInside(
    nodes.value,
    nextUserSelectRect,
    viewport.value,
    selectionMode.value === SelectionMode.Partial,
    true,
  )

  const selectedEdgeIds = new Set<string>()
  const selectedNodeIds = new Set<string>()

  for (const selectedNode of selectedNodes) {
    selectedNodeIds.add(selectedNode.id)

    const edgeIds = edgeIdLookup.value.get(selectedNode.id)

    if (edgeIds) {
      for (const edgeId of edgeIds) {
        selectedEdgeIds.add(edgeId)
      }
    }
  }

  if (prevSelectedNodesCount.value !== selectedNodeIds.size) {
    prevSelectedNodesCount.value = selectedNodeIds.size
    const changes = getSelectionChanges(nodeLookup.value, selectedNodeIds, true) as NodeChange[]
    emits.nodesChange(changes)
  }

  if (prevSelectedEdgesCount.value !== selectedEdgeIds.size) {
    prevSelectedEdgesCount.value = selectedEdgeIds.size
    const changes = getSelectionChanges(edgeLookup.value, selectedEdgeIds)
    emits.edgesChange(changes)
  }

  userSelectionRect.value = nextUserSelectRect
  userSelectionActive.value = true
  nodesSelectionActive.value = false
}

function onPointerUp(event: PointerEvent) {
  if (event.button !== 0 || !selectionStarted) {
    return
  }

  ;(event.target as Element)?.releasePointerCapture(event.pointerId)

  // We only want to trigger click functions when in selection mode if
  // the user did not move the mouse.
  if (!userSelectionActive.value && userSelectionRect.value && event.target === container.value) {
    onClick(event)
  }

  if (prevSelectedNodesCount.value > 0) {
    nodesSelectionActive.value = true
  }

  resetUserSelection()

  emits.selectionEnd(event)

  // If the user kept holding the selectionKey during the selection,
  // we need to reset the selectionInProgress, so the next click event is not prevented
  if (selectionKeyPressed) {
    selectionInProgress = false
  }

  selectionStarted = false
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
    @click="(event) => (hasActiveSelection ? undefined : wrapHandler(onClick, container)(event))"
    @contextmenu="wrapHandler(onContextMenu, container)($event)"
    @wheel.passive="wrapHandler(onWheel, container)($event)"
    @pointerenter="(event) => (hasActiveSelection ? undefined : emits.paneMouseEnter(event))"
    @pointerdown="(event) => (hasActiveSelection ? onPointerDown(event) : emits.paneMouseMove(event))"
    @pointermove="(event) => (hasActiveSelection ? onPointerMove(event) : emits.paneMouseMove(event))"
    @pointerup="(event) => (hasActiveSelection ? onPointerUp(event) : undefined)"
    @pointerleave="emits.paneMouseLeave($event)"
  >
    <slot />
    <UserSelection v-if="userSelectionActive && userSelectionRect" :user-selection-rect="userSelectionRect" />
    <NodesSelection v-if="nodesSelectionActive && getSelectedNodes.length" />
  </div>
</template>
