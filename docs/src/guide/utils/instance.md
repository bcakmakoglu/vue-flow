# Viewport Functions

Viewport Functions can be accessed via the [`useVueFlow`](/guide/composables#usevueflow)
utility or with the [`VueFlowStore`](/typedocs/type-aliases/VueFlowStore)
instance provided by [`onPaneReady`](/typedocs/interfaces/FlowEvents#paneready).

- Using Event Hooks (Composable)

```vue
<script setup>
import { VueFlow, useVueFlow } from '@vue-flow/core'

const { onPaneReady } = useVueFlow()

// event handler
onPaneReady((instance) => instance.fitView())
</script>
```

- Using Event Listener 

```vue
<script>
import { VueFlow } from '@vue-flow/core'

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

## [project](/typedocs/type-aliases/Project)

- Details:

  Transforms pixel coordinates to the internal VueFlow coordinate system.

  This can be used when you drag nodes (from a sidebar for example) and need the internal position on the pane.

- Example:

```ts
vueFlowInstance.project({ x: 100, y: 100 })
```

## [fitView](/typedocs/type-aliases/FitView)

- Details:

  Fits the view port so that all nodes are visible.

  Padding is 0.1 and includeHiddenNodes is false by default.

- Example:

```ts
vueFlowInstance.fitView({ padding: 0.25, includeHiddenNodes: true })
```

## [fitBounds](/typedocs/type-aliases/FitBounds)

- Details:

  Fits the view port according to the bounds' rect input.

- Example:

```ts
vueFlowInstance.fitBounds(getRectOfNodes(nodes.value))
```

## [setViewport](/typedocs/type-aliases/SetViewport)

- Details:

  Sets position and zoom of the pane.

- Example:

```ts
vueFlowInstance.setViewport({ x: 100, y: 100, zoom: 1.5 })
```

## [getViewport](/typedocs/type-aliases/GetViewport)

- Details:

  Gets position and zoom of the pane.

## [zoomIn](/typedocs/type-aliases/ZoomInOut)

- Details:

  Zooms in.

## [zoomOut](/typedocs/type-aliases/ZoomInOut)

- Details:

  Zooms out.

## [zoomTo](/typedocs/type-aliases/ZoomTo)

- Details:

  Zooms to specific level.

## [getElements](/typedocs/interfaces/Getters#getelements)

- Details:

  Returns currently stored elements (nodes + edges).

## [getNodes](/typedocs/interfaces/Getters#getnodes)

- Details:

  Returns currently stored nodes.

## [getEdges](/typedocs/interfaces/Getters#getedges)

- Details:

  Returns currently stored edges.

## [toObject](/typedocs/interfaces/Actions#toobject)

- Details:

  Returns elements, position and zoom of the current flow state.

- Example:

```ts
toObject = (): {
  elements: FlowElements,
  position: [x, y],
  zoom: scale,
}
```
