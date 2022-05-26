<script setup>
import { VueFlow, useVueFlow } from '@braks/vue-flow'
import { reactive, ref } from 'vue'
import Sidebar from './Sidebar.vue'

const elements = ref([
  {
    id: '1',
    label: 'Click to teleport',
    position: { x: 125, y: 0 },
  },
  {
    id: '2',
    label: 'Click to teleport',
    position: { x: 250, y: 100 },
  },
  {
    id: '3',
    label: 'Click to teleport',
    position: { x: 0, y: 100 },
  },
  {
    id: 'e1-2',
    source: '1',
    target: '2',
  },
])

const { onNodeClick } = useVueFlow()

const lastPositions = {}

onNodeClick(({ node, connectedEdges }) => {
  /**
   * specify a selector to teleport to
   * beware that teleports only work after viewpane is ready
   *
   * teleported elements still behave like they're at their position before,
   * i.e. if they emit events, they will still emit them up their regular tree
   */
  const target = node.teleport ? null : '#port'

  // teleport to target or disable teleport
  node.teleport = target

  // hide connected edges when teleporting
  connectedEdges.forEach((edge) => (edge.hidden = !!target))

  if (!target) {
    // apply last position (so the transformation gets applied)
    node.position = lastPositions[node.id]
  } else {
    // save last position
    lastPositions[node.id] = Object.assign({}, { ...node.position })

    // remove current position (so the transformation gets removed)
    node.position = { x: 0, y: 0 }
  }
})
</script>

<template>
  <div class="teleportflow">
    <VueFlow v-model="elements" :fit-view-on-init="true" />
    <Sidebar />
  </div>
</template>
