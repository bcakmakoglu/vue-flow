# Graph

### isEdge

- Details:

  Confirms if an element is an edge.

- Example:

```vue:no-line-numbers{13}
<script setup>
import { VueFlow, isEdge } from '@braks/vue-flow'

const elements = ref([
  { id: '1', label: 'Node 1', position: { x: 250, y: 5 }, },
  { id: '2', label: 'Node 2', position: { x: 100, y: 100 }, },

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
    <button style="position: absolute; top: 10px; right: 10px;" @click="toggleClass">Toggle classes</button>
  </VueFlow>
</template>
```

### isNode

- Details:

  Confirms if an element is a node.

- Example:

```vue:no-line-numbers{13}
<script setup>
import { VueFlow, isNode } from '@braks/vue-flow'

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
    <button style="position: absolute; top: 10px; right: 10px;" @click="toggleClass">Toggle classes</button>
  </VueFlow>
</template>
```

### addEdge

::: warning
When using composition you should access `addEdges` from `useVueFlow`
:::

- Details:

  Confirms if an element is a node.

- Example:

```vue:no-line-numbers{12}
<script setup>
import { VueFlow, addEdge } from '@braks/vue-flow'

const elements = ref([
  { id: '1', label: 'Node 1', position: { x: 250, y: 5 }, class: 'light' },
  { id: '2', label: 'Node 2', position: { x: 100, y: 100 }, class: 'light' },

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

### updateEdge

::: warning
When using composition you should access `updateEdge` from `useVueFlow`
:::

- Details:

  Updates an edge and applies new source/target.

- Example:

```vue:no-line-numbers{12}
<script setup>
import { VueFlow, updateEdge } from '@braks/vue-flow'

const elements = ref([
  { id: '1', label: 'Node 1', position: { x: 250, y: 5 }, class: 'light' },
  { id: '2', label: 'Node 2', position: { x: 100, y: 100 }, class: 'light' },

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

### getOutgoers

- Details:

  Returns all target elements of a node.

### getIncomers

- Details:

  Returns all source elements of a node.

### getConnectedEdges

- Details:

  Returns all connected edges of a node.

### getTransformForBounds

- Details:

  Returns a transformation for the zoom pane according to input bounds.

### getRectOfNodes

- Details:

  Returns a rect of node elements.

  Useful when you need to know the boundaries of a set of nodes.

### getNodesInside

- Details:

  Returns node elements that are inside a specified rect.

### getMarkerId

- Details:

  Returns a marker id for a marker definition.
