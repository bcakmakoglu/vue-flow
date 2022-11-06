<script setup>
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { ref } from 'vue'
import { initialElements } from './initial-elements.js'

/**
 * You can either use `getIntersectingNodes` to check if a given node intersects with others
 * or `isNodeIntersecting` to check if a node is intersecting with a given area
 */
const { onNodeDrag, getIntersectingNodes, isNodeIntersecting, getNodes } = useVueFlow()

const elements = ref(initialElements)

onNodeDrag(({ intersections }) => {
  const intersectionIds = intersections.map((intersection) => intersection.id)

  getNodes.value.forEach((n) => {
    const isIntersecting = intersectionIds.includes(n.id)
    n.class = isIntersecting ? 'intersecting' : ''
  })
})
</script>

<template>
  <VueFlow v-model="elements" fit-view-on-init :default-zoom="1.5" :min-zoom="0.2" :max-zoom="4" />
</template>
