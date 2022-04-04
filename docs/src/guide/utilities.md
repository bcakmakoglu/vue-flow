# Utilities

Vue Flow comes with built-in utilities to control the zoom-pane, state and more.

## Graph Utilities

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

### [getOutgoers](https://types.vueflow.dev/modules.html#getOutgoers)

- Details:

  Returns all target elements of a node.

### [getIncomers](https://types.vueflow.dev/modules.html#getIncomers)

- Details:

  Returns all source elements of a node.

### [getConnectedEdges](https://types.vueflow.dev/modules.html#getConnectedEdges)

- Details:

  Returns all connected edges of a node.

### [getTransformForBounds](https://types.vueflow.dev/modules.html#getTransformForBounds)

- Details:

  Returns a transformation for the zoom pane according to input bounds.

### [getRectOfNodes](https://types.vueflow.dev/modules.html#getRectOfNodes)

- Details:

  Returns a rect of node elements.

  Useful when you need to know the boundaries of a set of nodes.

### [getNodesInside](https://types.vueflow.dev/modules.html#getNodesInside)

- Details:

  Returns node elements that are inside a specified rect.

### [getMarkerId](https://types.vueflow.dev/modules.html#getMarkerId)

- Details:

  Returns a marker id for a marker definition.

## Instance

The Vue Flow instance provides easy access to zoom-pan-helper functions.
It can be accessed either directly from the state using `useVueFlow` or
you can receive the instance with a `onPaneReady` event handler.


<CodeGroup>
  <CodeGroupItem title="Composition API" active>

```vue:no-line-numbers
<script setup>
import { VueFlow, useVueFlow } from '@braks/vue-flow'

const { onPaneReady, instance } = useVueFlow()

// event handler
onPaneReady((instance) => instance.fitView())

onMounted(() => {
  // or directly try to access the instance
  instance.value?.fitView()
})
</script>
```

  </CodeGroupItem>


  <CodeGroupItem title="Options API">

```vue:no-line-numbers
<script>
import { VueFlow } from '@braks/vue-flow'

export default defineComponent({
  components: { VueFlow },
  data() {
    return {
      instance: null,
    }
  },
  methods: {
    onPaneReady(vueFlowInstance) {
      vueFlowInstance.fitView()
      this.instance = vueFlowInstance
    }
  }
})
</script>
<template>
  <VueFlow @pane-ready="onPaneReady" />
</template>
```
  </CodeGroupItem>
</CodeGroup>

### [project](https://types.vueflow.dev/modules.html#Project)

- Details:

  Transforms pixel coordinates to the internal VueFlow coordinate system. 

  This can be used when you drag nodes (from a sidebar for example) and need the internal position on the pane.

- Example:

```ts:no-line-numbers
vueFlowInstance.project({ x: 100, y: 100 })
```

### [fitView](https://types.vueflow.dev/modules.html#FitView)

- Details:

  Fits the view port so that all nodes are visible. 

  Padding is 0.1 and includeHiddenNodes is false by default.

- Example:

```ts:no-line-numbers
vueFlowInstance.fitView({ padding: 0.25, includeHiddenNodes: true })
```

### [fitBounds](https://types.vueflow.dev/modules.html#FitBounds)

- Details:

  Fits the view port according to the bounds' rect input.

- Example:

```ts:no-line-numbers
vueFlowInstance.fitBounds(getRectOfNodes(nodes.value))
```

### [setTransform](https://types.vueflow.dev/modules.html#SetTransform)

- Details:

  Sets position and zoom of the pane.

- Example:

```ts:no-line-numbers
vueFlowInstance.setTransform({ x: 100, y: 100, zoom: 1.5 })
```

### [getTransform](https://types.vueflow.dev/modules.html#GetTransform)

- Details:

  Gets position and zoom of the pane.

### [zoomIn](https://types.vueflow.dev/modules.html#ZoomInOut)

- Details:

  Zooms in.


### [zoomOut](https://types.vueflow.dev/modules.html#ZoomInOut)

- Details:

  Zooms out.

### [zoomTo](https://types.vueflow.dev/modules.html#ZoomTo)

- Details:

  Zooms to specific level.

### getElements

- Details:

  Returns currently stored elements (nodes + edges).

### getNodes

- Details:

  Returns currently stored nodes.

### getEdges

- Details:

  Returns currently stored edges.

### toObject

- Details:

  Returns elements, position and zoom of the current flow state.

- Example:

```ts:no-line-numbers
toObject = (): {
  elements: FlowElements,
  position: [x, y],
  zoom: scale,
}
```
