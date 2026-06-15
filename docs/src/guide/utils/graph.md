# Graph

## [isEdge](/typedocs/functions/isEdge)

- Details:

  Confirms if an element is an edge.

- Example:

```vue{17}
<script setup>
import { VueFlow, isEdge } from '@vue-flow/core'

const nodes = ref([
  { id: '1', position: { x: 250, y: 5 }, },
  { id: '2', position: { x: 100, y: 100 }, },
])

const edges = ref([
  { id: 'e1-2', source: '1', target: '2', class: 'light' },
])

const toggleClass = () => {
  edges.value = edges.value.map((el) =>
    isEdge(el) ? { ...el, class: el.class === 'light' ? 'dark' : 'light' } : el,
  )
}
</script>

<template>
  <VueFlow v-model:nodes="nodes" v-model:edges="edges">
    <button @click="toggleClass">Toggle classes</button>
  </VueFlow>
</template>
```

## [isNode](/typedocs/functions/isNode)

- Details:

  Confirms if an element is a node.

- Example:

```vue{17}
<script setup>
import { VueFlow, isNode } from '@vue-flow/core'

const nodes = ref([
  { id: '1', label: 'Node 1', position: { x: 250, y: 5 }, class: 'light' },
  { id: '2', label: 'Node 2', position: { x: 100, y: 100 }, class: 'light' },
])

const edges = ref([
  { id: 'e1-2', source: '1', target: '2' },
])

const toggleClass = () => {
  nodes.value = nodes.value.map((el) =>
    isNode(el) ? { ...el, class: el.class === 'light' ? 'dark' : 'light' } : el,
  )
}
</script>

<template>
  <VueFlow v-model:nodes="nodes" v-model:edges="edges">
    <button @click="toggleClass">Toggle classes</button>
  </VueFlow>
</template>
```

## [getOutgoers](/typedocs/variables/getOutgoers)

- Details:

  Returns all target elements of a node.

## [getIncomers](/typedocs/variables/getIncomers)

- Details:

  Returns all source elements of a node.

## [getConnectedEdges](/typedocs/variables/getConnectedEdges)

- Details:

  Returns all connected edges of a node.

## [getViewportForBounds](/typedocs/variables/getViewportForBounds)

- Details:

  Returns a transformation for the viewport according to input bounds.

## [getNodesBounds](/typedocs/variables/getNodesBounds)

- Details:

  Returns a rect of node elements.

  Useful when you need to know the boundaries of a set of nodes.

## [getNodesInside](/typedocs/variables/getNodesInside)

- Details:

  Returns node elements that are inside a specified rect.

## [getMarkerId](/typedocs/functions/getMarkerId)

- Details:

  Returns a marker id for a marker definition.
