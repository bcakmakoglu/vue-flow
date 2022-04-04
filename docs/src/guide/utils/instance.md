# Instance

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
