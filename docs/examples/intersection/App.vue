<script setup>
import { ref } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'

/**
 * You can either use `getIntersectingNodes` to check if a given node intersects with others
 * or `isNodeIntersecting` to check if a node is intersecting with a given area
 */
const { onNodeDrag, getIntersectingNodes, isNodeIntersecting: __, updateNode } = useVueFlow()

const nodes = ref([
  {
    id: '1',
    data: { label: 'Node 1' },
    position: { x: 0, y: 0 },
  },
  {
    id: '2',
    data: { label: 'Node 2' },
    position: { x: 400, y: 400 },
  },
  {
    id: '3',
    data: { label: 'Node 3' },
    position: { x: 400, y: 0 },
  },
  {
    id: '4',
    data: { label: 'Node 4' },
    position: { x: 0, y: 400 },
  },
  {
    id: '5',
    style: { borderColor: 'red' },
    data: { label: 'Drag me  over another node' },
    position: { x: 200, y: 200 },
  },
])

onNodeDrag(({ node }) => {
  const intersectionIds = getIntersectingNodes(node).map((intersection) => intersection.id)

  for (const node of nodes.value) {
    const isIntersecting = intersectionIds.includes(node.id)

    updateNode(node.id, { class: isIntersecting ? 'intersecting' : '' })
  }
})
</script>

<template>
  <VueFlow :nodes="nodes" fit-view-on-init />
</template>
