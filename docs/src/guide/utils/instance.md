# Viewport Functions

::: warning
The old `FlowInstance` has been removed and all it's functionalities merged into `useVueFlow`.
:::

Viewport Functions can be accessed via the [`useVueFlow`](/guide/composables.html#usevueflow/)
utility or with the [`VueFlowStore`](/typedocs/types/VueFlowStore.html/)
instance provided by [`onPaneReady`](/typedocs/interfaces/FlowEvents.html#paneready/).

<CodeGroup>
  <CodeGroupItem title="Composition API" active>

```vue:no-line-numbers
<script setup>
import { VueFlow, useVueFlow } from '@braks/vue-flow'

const { onPaneReady } = useVueFlow()

// event handler
onPaneReady((instance) => instance.fitView())
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

### [project](/typedocs/types/Project.html/)

- Details:

  Transforms pixel coordinates to the internal VueFlow coordinate system.

  This can be used when you drag nodes (from a sidebar for example) and need the internal position on the pane.

- Example:

```ts:no-line-numbers
vueFlowInstance.project({ x: 100, y: 100 })
```

### [fitView](/typedocs/types/FitView.html/)

- Details:

  Fits the view port so that all nodes are visible.

  Padding is 0.1 and includeHiddenNodes is false by default.

- Example:

```ts:no-line-numbers
vueFlowInstance.fitView({ padding: 0.25, includeHiddenNodes: true })
```

### [fitBounds](/typedocs/types/FitBounds.html/)

- Details:

  Fits the view port according to the bounds' rect input.

- Example:

```ts:no-line-numbers
vueFlowInstance.fitBounds(getRectOfNodes(nodes.value))
```

### [setTransform](/typedocs/types/SetTransform.html/)

- Details:

  Sets position and zoom of the pane.

- Example:

```ts:no-line-numbers
vueFlowInstance.setTransform({ x: 100, y: 100, zoom: 1.5 })
```

### [getTransform](/typedocs/types/GetTransform.html/)

- Details:

  Gets position and zoom of the pane.

### [zoomIn](/typedocs/types/ZoomInOut.html/)

- Details:

  Zooms in.

### [zoomOut](/typedocs/types/ZoomInOut.html/)

- Details:

  Zooms out.

### [zoomTo](/typedocs/types/ZoomTo.html/)

- Details:

  Zooms to specific level.

### [getElements](/typedocs/interfaces/Getters.html#getelements/)

- Details:

  Returns currently stored elements (nodes + edges).

### [getNodes](/typedocs/interfaces/Getters.html#getnodes/)

- Details:

  Returns currently stored nodes.

### [getEdges](/typedocs/interfaces/Getters.html#getedges/)

- Details:

  Returns currently stored edges.

### [toObject](/typedocs/interfaces/Actions.html#toobject/)

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
