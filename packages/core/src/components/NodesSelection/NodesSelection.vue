<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import type { NodeBase } from '@xyflow/system'
import { getRectOfNodes } from '@xyflow/system'
import { useDrag, useUpdateNodePositions, useVueFlow } from '../../composables'
import { arrowKeyDiffs } from '../../utils'

const { emits, viewport, getSelectedNodes, noPanClassName, disableKeyboardA11y, userSelectionActive } = useVueFlow()

const updatePositions = useUpdateNodePositions()

const el = ref<HTMLDivElement | null>(null)

const dragging = useDrag({
  el,
  onStart(args) {
    emits.selectionDragStart(args)
  },
  onDrag(args) {
    emits.selectionDrag(args)
  },
  onStop(args) {
    emits.selectionDragStop(args)
  },
})

onMounted(() => {
  if (!disableKeyboardA11y.value) {
    el.value?.focus({ preventScroll: true })
  }
})

const selectedNodesBBox = computed(() => getRectOfNodes(getSelectedNodes.value as NodeBase[]))

const innerStyle = computed(() => ({
  width: `${selectedNodesBBox.value.width}px`,
  height: `${selectedNodesBBox.value.height}px`,
  top: `${selectedNodesBBox.value.y}px`,
  left: `${selectedNodesBBox.value.x}px`,
}))

function onContextMenu(event: MouseEvent) {
  emits.selectionContextMenu({ event, nodes: getSelectedNodes.value })
}

function onKeyDown(event: KeyboardEvent) {
  if (disableKeyboardA11y) {
    return
  }

  if (arrowKeyDiffs[event.key]) {
    updatePositions(
      {
        x: arrowKeyDiffs[event.key].x,
        y: arrowKeyDiffs[event.key].y,
      },
      event.shiftKey,
    )
  }
}
</script>

<script lang="ts">
export default {
  name: 'NodesSelection',
  compatConfig: { MODE: 3 },
}
</script>

<template>
  <div
    v-if="!userSelectionActive && selectedNodesBBox.width && selectedNodesBBox.height"
    class="vue-flow__nodesselection vue-flow__container"
    :class="noPanClassName"
    :style="{ transform: `translate(${viewport.x}px,${viewport.y}px) scale(${viewport.zoom})` }"
  >
    <div
      ref="el"
      :class="{ dragging }"
      class="vue-flow__nodesselection-rect"
      :style="innerStyle"
      :tabIndex="disableKeyboardA11y ? undefined : -1"
      @contextmenu="onContextMenu"
      @keydown="onKeyDown"
    />
  </div>
</template>
