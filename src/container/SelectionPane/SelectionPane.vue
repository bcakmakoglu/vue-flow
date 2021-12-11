<script lang="ts" setup>
import { FlowElement } from '../../types'
import { useStore, useKeyPress } from '../../composables'
import { getConnectedEdges } from '../../utils'
import NodesSelection from '../../components/NodesSelection/NodesSelection.vue'
import UserSelection from '../../components/UserSelection/UserSelection.vue'
import NodeRenderer from '../NodeRenderer/NodeRenderer.vue'
import EdgeRenderer from '../EdgeRenderer/EdgeRenderer.vue'

const store = useStore()
const userSelection = ref(false)

const onClick = (event: MouseEvent) => {
  store.hooks.paneClick.trigger(event)
  store.unsetNodesSelection()
  store.resetSelectedElements()
}

const onContextMenu = (event: MouseEvent) => store.hooks.paneContextMenu.trigger(event)

const onWheel = (event: WheelEvent) => store.hooks.paneScroll.trigger(event)

onMounted(() => {
  useKeyPress(store.deleteKeyCode, (keyPressed) => {
    if (keyPressed && store.selectedElements) {
      const connectedEdges = getConnectedEdges(store.getSelectedNodes, store.getEdges)
      const elementsToRemove = [...store.selectedElements, ...connectedEdges].reduce(
        (res, item) => res.set(item.id, item),
        new Map<string, FlowElement>(),
      )

      store.hooks.elementsRemove.trigger(Array.from(elementsToRemove.values()))
      store.unsetNodesSelection()
      store.resetSelectedElements()
    }
  })

  useKeyPress(store.multiSelectionKeyCode, (keyPressed) => {
    store.multiSelectionActive = keyPressed
  })

  useKeyPress(store.selectionKeyCode, (keyPressed) => {
    userSelection.value = keyPressed && (store.selectionActive || store.elementsSelectable)
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
  <NodeRenderer :key="`node-renderer-${store.id}`">
    <template
      v-for="nodeName of Object.keys(store.getNodeTypes)"
      #[`node-${nodeName}`]="nodeProps"
      :key="`node-${nodeName}-${store.id}`"
    >
      <slot :name="`node-${nodeName}`" v-bind="nodeProps" />
    </template>
  </NodeRenderer>
  <EdgeRenderer :key="`edge-renderer-${store.id}`">
    <template
      v-for="edgeName of Object.keys(store.getEdgeTypes)"
      #[`edge-${edgeName}`]="edgeProps"
      :key="`edge-${edgeName}-${store.id}`"
    >
      <slot :name="`edge-${edgeName}`" v-bind="edgeProps" />
    </template>
    <template #custom-connection-line="customConnectionLineProps">
      <slot name="custom-connection-line" v-bind="customConnectionLineProps" />
    </template>
  </EdgeRenderer>
  <UserSelection v-if="userSelection" :key="`user-selection-${store.id}`" />
  <NodesSelection v-if="store.nodesSelectionActive" :key="`nodes-selction-${store.id}`" />
  <div :key="`flow-pane-${store.id}`" class="vue-flow__pane" @click="onClick" @contextmenu="onContextMenu" @wheel="onWheel" />
</template>
