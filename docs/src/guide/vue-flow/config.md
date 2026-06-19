# Configuration

This page covers the configuration options available for Vue Flow and how to use and set them.

## Options / Props

Vue Flow allows you to configure zoom, graph and flow behavior.
Configuration can be passed either as props to the `VueFlow` component or
as options to the [`useVueFlow`](/guide/composables#usevueflow) composable.

- Using Component Props

```vue
<!-- Pass configuration as props -->
<template>
  <VueFlow :default-viewport="{ zoom: 0.5 }" :max-zoom="4" :min-zoom="0.1" />
</template>
```


## Updating Config

You can update the configuration at any point, either by having them bound as props or using the state values returned
by `useVueFlow`.

- Using Component Props

```vue{2,5-6,10}
<script setup>
const nodesDraggable = ref(false)

const toggleNodesDraggable = () => {
  // toggle the state
  nodesDraggable.value = !nodesDraggable.value
}
</script>
<template>
  <VueFlow :nodes-draggable="nodesDraggable">...</VueFlow>
</template>
```

- Using State (Composable)

```vue{2,5}
<script setup>
const { nodesDraggable } = useVueFlow()

const toggleNodesDraggable = () => {
  nodesDraggable.value = !nodesDraggable.value
}
</script>
```

## Basic Options

### id (optional)

- Type: `string`

- Details:

  Unique id of Vue Flow.

  It is used for the lookup and injection of the state instance.

### nodes (optional)

- Type: [`Node[]`](/typedocs/type-aliases/Node)

- Details:

  An array of nodes.

  Pass via the `nodes` prop, or use `v-model:nodes` for two-way binding.

- Example:

```vue
<script setup>
import { ref } from 'vue'  
import { VueFlow } from '@vue-flow/core'

const nodes = ref([
  { 
    id: '1', 
    type: 'input',
    position: { x: 250, y: 5 },
    data: { label: 'Node 1' },
  },
  { 
    id: '2', 
    position: { x: 100, y: 100 },
    data: { label: 'Node 2' },
  },
  { 
    id: '3', 
    position: { x: 400, y: 100 },
    data: { label: 'Node 3' },
  },
  { 
    id: '4', 
    type: 'output',
    position: { x: 400, y: 200 },
    data: { label: 'Node 4' },
  },
])
</script>
<template>
  <VueFlow :nodes="nodes" />
</template>
```

### edges (optional)

- Type: [`Edge[]`](/typedocs/type-aliases/Edge)

- Details:

  An array of edges.

  Pass via the `edges` prop, or use `v-model:edges` for two-way binding.

- Example:

```vue
<script setup>
import { VueFlow } from '@vue-flow/core'

const nodes = ref([
  {
    id: '1',
    type: 'input',
    position: { x: 250, y: 5 },
    data: { label: 'Node 1' },
  },
  {
    id: '2',
    position: { x: 100, y: 100 },
    data: { label: 'Node 2' },
  },
  {
    id: '3',
    position: { x: 400, y: 100 },
    data: { label: 'Node 3' },
  },
  {
    id: '4',
    type: 'output',
    position: { x: 400, y: 200 },
    data: { label: 'Node 4' },
  },
])

const edges = ref([
  { 
    id: 'e1->3', 
    source: '1',
    target: '3' 
  },
  { 
    id: 'e1->2', 
    source: '1', 
    target: '2',  
  },
])
</script>
<template>
  <VueFlow :nodes="nodes" :edges="edges" />
</template>
```

### Two-way binding (`v-model`)

- Details:

  For two-way binding, use `v-model:nodes` and `v-model:edges`. The combined `v-model` (the old
  `modelValue` of mixed nodes + edges) was removed in 2.0 — bind nodes and edges separately.

- Example:

```vue
<script setup>
import { ref } from 'vue'  
import { VueFlow } from '@vue-flow/core'

const nodes = ref([
  { id: '1', type: 'input', label: 'Node 1', position: { x: 250, y: 5 } },
  { id: '2', label: 'Node 2', position: { x: 100, y: 100 }, },
  { id: '3', label: 'Node 3', position: { x: 400, y: 100 } },
  { id: '4', type: 'output', label: 'Node 4', position: { x: 400, y: 200 } },
])

const edges = ref([
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e1-2', source: '1', target: '2', animated: true },
])
</script>

<template>
  <VueFlow v-model:nodes="nodes" v-model:edges="edges" />
</template>
```

### node-types (optional)

- Type: [`Record<string, NodeComponent>`](/typedocs/type-aliases/NodeComponent)

- Default: [`DefaultNodeTypes`](/typedocs/type-aliases/DefaultNodeTypes)

- Details:

  An object mapping node-type names to component definitions/name.

- Example:

```vue
<script setup>
import { ref } from 'vue'  
import { VueFlow } from '@vue-flow/core'
import CustomNode from './CustomNode.vue'

const nodeTypes = {
  custom: CustomNode,
}

const nodes = ref([
  { 
    id: '1', 
    type: 'custom',
    position: { x: 250, y: 5 },
    data: { label: 'Node 1' },
  },
  { 
    id: '2', 
    position: { x: 100, y: 100 },
    data: { label: 'Node 2' },
  },
])

const edges = ref([
  { id: 'e1->2', source: '1', target: '2' },
])
</script>
<template>
  <VueFlow :nodes="nodes" :edges="edges" :node-types="nodeTypes" />
</template>
```

### edge-types (optional)

- Type: [`Record<string, EdgeComponent>`](/typedocs/type-aliases/EdgeComponent)

- Default: [`DefaultEdgeTypes`](/typedocs/interfaces/DefaultEdgeTypes)

- Details:

  An object mapping edge-type names to component definitions/name.

- Example:

```vue
<script setup>
import { ref } from 'vue'  
import { VueFlow } from '@vue-flow/core'
import CustomEdge from './CustomEdge.vue'

const edgeTypes = {
  custom: CustomEdge,
}

const nodes = ref([
  {
    id: '1',
    type: 'custom',
    position: { x: 250, y: 5 },
    data: { label: 'Node 1' },
  },
  {
    id: '2',
    position: { x: 100, y: 100 },
    data: { label: 'Node 2' },
  },
])

const edges = ref([
  { 
    id: 'e1->2', 
    type: 'custom',
    source: '1', 
    target: '2' 
  },
])
</script>
<template>
  <VueFlow :nodes="nodes" :edges="edges" :edge-types="edgeTypes" />
</template>
```

### auto-apply-changes (optional)

- Type: `boolean`

- Default: `true`

- Details:

  Enable/disable default state update handlers.

  If you want to have full control of state changes, you can disable the default behavior and apply your own change
  handlers to the state.

  Check the [controlled flow](/guide/controlled-flow) guide for more information.

- Example:

```vue
<template>
  <VueFlow :auto-apply-changes="false" />
</template>
```

### connection-mode (optional)

- Type: [`ConnectionMode`](/typedocs/enumerations/ConnectionMode)

- Default: `ConnectionMode.Strict`

- Details:

  In `strict` mode a source handle only connects to a target handle. Set to `loose` to treat all handles as source handles (allowing connections on target handles as well).

### connection-line-options

- Type: [`ConnectionLineOptions`](/typedocs/interfaces/ConnectionLineOptions)

- Details:

  Options for the connection line.
  
  The options include the connection line type, style and possible marker types (marker-end/marker-start).

### fit-view (optional)

- Type: `boolean`

- Default: `false`

- Details:

  Fit the view to the nodes once they're measured on init.

### fit-view-options (optional)

- Type: `FitViewParams`

- Details:

  Options for the initial `fit-view` (e.g. `padding`, `minZoom`, `maxZoom`, `duration`, `includeHiddenNodes`).

### color-mode (optional)

- Type: `'light' | 'dark' | 'system'`

- Default: `'light'`

- Details:

  Applies the resolved `light`/`dark` class to the flow container. `system` follows the OS
  `prefers-color-scheme` and reacts to changes at runtime. See [Theming](/guide/theming#color-mode).

## Viewport Options

### zoom-activation-key-code (optional)

- Type: `KeyCode`

- Default: `Meta` on macOS, `Control` on other platforms

- Details:

  Define a key which can be used to activate zoom.

  Overwrites zoom-on-scroll or pan-on-scroll behavior as long as the key is pressed.

### zoom-on-scroll (optional)

- Type: `boolean`

- Default: `true`

- Details:

  Whether to allow zooming in and out when scrolling inside the Vue Flow container.

### zoom-on-pinch (optional)

- Type: `boolean`

- Default: `true`

- Details:

  Whether to allow zooming in and out when pinching (touch or trackpad) inside the Vue Flow container.

### zoom-on-double-click (optional)

- Type: `boolean`

- Default: `true`

- Details:

  Whether to allow zooming in and out when double-clicking (or tapping) inside the Vue Flow container.

### pan-on-scroll (optional)

- Type: `boolean`

- Default: `false`

- Details:

  Whether to allow panning inside the Vue Flow container.

  Does not work together with `zoom-on-scroll` but will work together with `zoom-activation-key-code`.

### pan-on-scroll-speed (optional)

- Type: `number`

- Default: `0.5`

### pan-on-scroll-mode (optional)

- Type: [`PanOnScrollMode`](/typedocs/enumerations/PanOnScrollMode)

- Default: `PanOnScrollMode.Free`

- Details:

  Specify on which axis panning is allowed (x, y or both).

### pan-on-drag (optional)

- Old name: `paneMovable`

- Type: `boolean`

- Default: `true`

- Details:

  Whether to allow moving the pane when dragging inside the Vue Flow container.

### prevent-scrolling (optional)

- Type: `boolean`

- Default: `true`

- Details:

  Enable this to prevent vue flow from scrolling inside its container, i.e. allow for the page to scroll.

### no-wheel-class-name (optional)

- Type: `string`

- Default: `nowheel`

- Details:

  Set a class name which prevents elements from triggering wheel-scroll events (thus disabling zoom/pan-scroll behavior
  on the element).

  Useful if you want to allow for scrolling _inside_ a node

### no-pan-class-name (optional)

- Type: `string`

- Default: `nopan`

- Details:

  Set a class name which prevents elements from triggering pan-scroll events.

### min-zoom (optional)

- Type: `number`

- Default: `0.5`

### max-zoom (optional)

- Type: `number`

- Default: `2`

### default-viewport (optional)

- Type: `Viewport`

- Default: `{ zoom: 1, position: { x: 0, y: 0 } }`

- Details:

  The default viewport when the component is mounted. Ignored once the user pans/zooms (uncontrolled).

### viewport (optional)

- Type: `Viewport`

- Details:

  Controlled viewport (`v-model:viewport`). Keeps the flow's transform in sync with the bound value —
  set it to pan/zoom programmatically, and it updates as the user interacts. Use this instead of
  `default-viewport` when you want to own the viewport state.

  ```vue
  <VueFlow v-model:viewport="viewport" />
  ```

### translate-extent (optional)

- Type: [`CoordinateExtent`](/typedocs/type-aliases/CoordinateExtent)

- Default:

```ts
[
  [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
]
```

- Details:

  The area in which the viewport can be moved around.

## Selection Options

### selection-key-code (optional)

- Type: `KeyCode`

- Default: `Shift`

- Details:

  Define a key which can be used to activate the selection rect.

### selection-on-drag (optional)

- Type: `boolean`

- Default: `false`

- Details:

  Draw a selection rect on a plain pane drag, without holding [`selection-key-code`](#selection-key-code).

  Pair it with `:pan-on-drag="false"` (or a non-left button, e.g. `:pan-on-drag="[1, 2]"`) so a left-drag selects instead of panning.

### multi-selection-key-code (optional)

- Type: `KeyCode`

- Default: `Meta` on macOS, `Control` on other platforms

- Details:

  Define a key which can be used to activate multi-selection.

  Multi-selection can be used to select multiple nodes with clicks.

### delete-key-code (optional)

- Type: `KeyCode`

- Default: `Backspace`

- Details:

  Define a key which can be used to activate remove elements from the pane.

## Global Node Options

### nodes-draggable (optional)

- Type: `boolean`

- Default: `true`

- Details:

  Globally enable/disable dragging nodes.

  Can be overwritten by setting `draggable` on a specific node element.

- Example:

```vue
<script setup>
import { ref } from 'vue'
import { VueFlow } from '@vue-flow/core'

const nodesDraggable = ref(false)

const nodes = ref([
  { id: '1', position: { x: 250, y: 5 } },
  { 
    id: '2', 
    // This will overwrite the globally set option of nodes-draggable
    draggable: true, 
    position: { x: 100, y: 100 } 
  },
])
</script>

<template>
  <VueFlow :nodes="nodes" :nodes-draggable="nodesDraggable" />
</template>
```

### nodes-connectable (optional)

- Type: `boolean`

- Default: `true`

- Details:

  Globally enable/disable connecting nodes.

  Can be overwritten by setting `connectable` on a specific node element.

- Example:

```vue
<script setup>
import { ref } from 'vue'
import { VueFlow } from '@vue-flow/core'

const nodesConnectable = ref(false)
  
const nodes = ref([
  { id: '1', position: { x: 250, y: 5 } },
  {
    id: '2',
    // This will overwrite the globally set option of nodes-connectable
    connectable: true,
    position: { x: 100, y: 100 }
  },
])
</script>

<template>
  <VueFlow :nodes="nodes" :nodes-connectable="nodesConnectable" />
</template>
```

### node-extent (optional)

- Type: [`CoordinateExtent`](/typedocs/type-aliases/CoordinateExtent)

- Default:

```ts
[
  [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
]
```

- Details:

  The area in which nodes can be moved around.

  Can be overwritten by setting `extent` on a specific node element.

- Example:

```vue
<script setup>
import { ref } from 'vue'
import { VueFlow } from '@vue-flow/core'

const nodes = ref([
  { id: '1', position: { x: 250, y: 5 } },
  {
    id: '2',
    extent: [[-100, -100], [100, 100]],
    position: { x: 100, y: 100 }
  },
])
</script>

<template>
  <VueFlow :nodes="nodes" />
</template>
```

### select-nodes-on-drag (optional)

- Type: `boolean`

- Default: `true`

### snap-to-grid (optional)

- Type: `boolean`

- Default: `false`

- Details:

  If enabled, nodes will be placed and moved in a grid-like fashion.

### snap-grid (optional)

- Type: [`SnapGrid`](/typedocs/type-aliases/SnapGrid)

- Default: `[15, 15]`

- Details:

  If `snapToGrid` is enabled, nodes will be placed and moved in a grid-like fashion according to the `snapGrid` value.

## Global Edge Options

### edges-reconnectable (optional)

- Type: `EdgeReconnectable`

- Default: `false`

- Details:

  Globally enable/disable reconnecting edges.

  If set to 'source' only the source end is reconnectable

  If set to 'target' only the target end is reconnectable

  If set to 'true' both ends are reconnectable

  Can be overwritten by setting `reconnectable` on a specific edge element.

- Example:

```vue
<script setup>
import { ref } from 'vue'
import { VueFlow } from '@vue-flow/core'

const edgesReconnectable = ref(false)
  
const nodes = ref([
  { id: '1', position: { x: 250, y: 5 } },
  { id: '2', position: { x: 100, y: 100 } },
])
  
const edges = ref([
  { id: 'e1->2', source: '1', target: '2' },
  { 
    id: 'e1->3',
    // Overwrites global edges-updatable config
    reconnectable: true, 
    source: '1', target: '3', 
  },
])
</script>
<template>
  <VueFlow :nodes="nodes" :edges="edges" :edges-reconnectable="edgesReconnectable" />
</template>
```

### default-marker-color (optional)

- Type: `string`

- Default: `#b1b1b7`

- Details:

  The default color value which is used when presenting edge-markers (arrowheads).

### reconnect-radius (optional)

- Type: `number`

- Default: `10`

- Details:

  The radius around an edge anchor within which a reconnect can be triggered.

### connect-on-click (optional)

- Type: `boolean`

- Default: `true`

- Details:

  Allow edges to be created by clicking two handles in a row.

  Useful if you want to enable creating edges on a touch device.

### default-edge-options (optional)

- Type: [`DefaultEdgeOptions`](/typedocs/type-aliases/DefaultEdgeOptions)

- Details:

  Default values when creating a new edge.

  Does not work for the `addEdge` utility!

### auto-connect (optional) (deprecated)

- Type: `boolean` | [`Connector`](/typedocs/type-aliases/Connector)

- Default: `false`

- Details:

  When connection is emitted, automatically create a new edge from params.

  Also accepts a [`Connector`](/typedocs/type-aliases/Connector) which returns an edge-like object or false (if creating
  an edge is not allowed).

  This option can be used as a shorthand for `onConnect((params) => addEdges([params]))`.

#### Examples

##### Boolean value

```vue{2}
<template>
  <VueFlow :auto-connect="true" />
</template>
```

#### [Connector](/typedocs/type-aliases/Connector)

```vue
<script setup>
import { ref } from 'vue'

const nodes = ref([/** ... */])

const edges = ref([/** ... */])

const connector = (params) => {
  if (params.source === params.target) {
    return false
  }
  
  return {
    id: `edge-${params.source}-${params.target}`,
    source: params.source,
    target: params.target,
    label: `Edge ${params.source}-${params.target}`,
    animated: true,
  }
}
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" :auto-connect="connector" />
</template>
```

### elevate-edges-on-select (optional)

- Type: `boolean`

- Default: `false`
 
- Details:

  When enabled, edges will be grouped by z-index and elevated when the nodes they connect to are selected.

  This is useful if you want to show the edges on top of the nodes.

  By default, edges have a z-index of 0.

## Global Element Options

### only-render-visible-elements (optional)

- Type: `boolean`

- Default: `false`

- Details:

  Skip rendering elements that are not visible currently (either hidden or outside the current pane dimensions).

### elements-selectable (optional)

- Type: `boolean`

- Default: `true`

- Details:

  Enable/disable selecting elements.
