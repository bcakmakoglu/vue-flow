<script setup>
import { ref } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'

/**
 * You can either use `getIntersectingNodes` to check if a given node intersects with others
 * or `isNodeIntersecting` to check if a node is intersecting with a given area
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { onNodeDrag, getIntersectingNodes, isNodeIntersecting, getNodes, updateNode } = useVueFlow()

const nodes = ref([
  { id: '1', label: 'Node 1', position: { x: 0, y: 0 } },
  { id: '2', label: 'Node 2', position: { x: 400, y: 400 } },
  { id: '3', label: 'Node 3', position: { x: 400, y: 0 } },
  { id: '4', label: 'Node 4', position: { x: 0, y: 400 } },
  { id: '5', style: { borderColor: 'red' }, label: 'Drag me over another node', position: { x: 200, y: 200 } },
])

onNodeDrag(({ intersections }) => {
  const intersectionIds = intersections.map((intersection) => intersection.id)

  for (const node of getNodes.value) {
    const isIntersecting = intersectionIds.includes(node.id)

    updateNode(node.id, { class: isIntersecting ? 'intersecting' : '' })
  }
})
</script>

<template>
  <VueFlow :nodes="nodes" fit-view-on-init />
</template>
