# Graph

## [isEdge](/typedocs/functions/isEdge)

- Details:

  Confirms if an element is an edge.

- Example:

```vue{13}
<script setup>
import { VueFlow, isEdge } from '@vue-flow/core'

const elements = ref([
  { id: '1', position: { x: 250, y: 5 }, },
  { id: '2', position: { x: 100, y: 100 }, },

  { id: 'e1-2', source: '1', target: '2', class: 'light' },
])

const toggleClass = () => {
  elements.value.forEach((el) => {
    if (isEdge(el)) {
      el.class = el.class === 'light' ? 'dark' : 'light'
    }
  })
}
</script>

<template>
  <VueFlow v-model="elements">
    <button @click="toggleClass">Toggle classes</button>
  </VueFlow>
</template>
```

## [isNode](/typedocs/functions/isNode)

- Details:

  Confirms if an element is a node.

- Example:

```vue{13}
<script setup>
import { VueFlow, isNode } from '@vue-flow/core'

const elements = ref([
  { id: '1', label: 'Node 1', position: { x: 250, y: 5 }, class: 'light' },
  { id: '2', label: 'Node 2', position: { x: 100, y: 100 }, class: 'light' },

  { id: 'e1-2', source: '1', target: '2' },
])

const toggleClass = () => {
  elements.value.forEach((el) => {
    if (isNode(el)) {
      el.class = el.class === 'light' ? 'dark' : 'light'
    }
  })
}
</script>

<template>
  <VueFlow v-model="elements">
    <button @click="toggleClass">Toggle classes</button>
  </VueFlow>
</template>
```

## [addEdge](/typedocs/functions/isEdge) (deprecated)

::: warning
In the composition API you should use [`addEdges`](/typedocs/types/AddEdges) of [`useVueFlow`](/guide/composables#usevueflow/)
:::

- Details:

  Adds an edge to the elements array.

- Example:

```vue{12}
<script setup>
import { ref } from 'vue'
import { VueFlow, addEdge } from '@vue-flow/core'

const elements = ref([
  { id: '1', position: { x: 250, y: 5 } },
  { id: '2', position: { x: 100, y: 100 } },

  { id: 'e1-2', source: '1', target: '2' },
])

const onConnect = (params) => {
  addEdge(params, elements.value)
}
</script>
<template>
  <VueFlow v-model="elements" @connect="onConnect" />
</template>
```

## [updateEdge](/typedocs/functions/updateEdge-1) (deprecated)

::: warning
In the composition API you should use [`updateEdge`](/typedocs/types/UpdateEdge) of [`useVueFlow`](/guide/composables#usevueflow/)
:::

- Details:

  Updates an edge to a new source or target node.

- Example:

```vue{12}
<script setup>
import { VueFlow, updateEdge } from '@vue-flow/core'

const elements = ref([
  { id: '1', label: 'Node 1', position: { x: 250, y: 5 } },
  { id: '2', label: 'Node 2', position: { x: 100, y: 100 } },

  { id: 'e1-2', source: '1', target: '2' },
])

const onEdgeUpdate = ({ edge, connection }) => {
  elements.value = updateEdge(edge, connection, elements.value)
}
</script>
<template>
  <VueFlow v-model="elements" @edge-update="onEdgeUpdate" />
</template>
```

## [getOutgoers](/typedocs/functions/getOutgoers)

- Details:

  Returns all target elements of a node.

## [getIncomers](/typedocs/functions/getIncomers)

- Details:

  Returns all source elements of a node.

## [getConnectedEdges](/typedocs/functions/getConnectedEdges)

- Details:

  Returns all connected edges of a node.

## [getTransformForBounds](/typedocs/functions/getTransformForBounds)

- Details:

  Returns a transformation for the viewport according to input bounds.

## [getRectOfNodes](/typedocs/functions/getRectOfNodes)

- Details:

  Returns a rect of node elements.

  Useful when you need to know the boundaries of a set of nodes.

## [getNodesInside](/typedocs/functions/getNodesInside)

- Details:

  Returns node elements that are inside a specified rect.

## [getMarkerId](/typedocs/functions/getMarkerId)

- Details:

  Returns a marker id for a marker definition.
