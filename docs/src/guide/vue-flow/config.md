# Configuration

## Options / Props

Vue Flow allows you to configure zoom, graph and flow behavior.
Configuration can be passed either as props to the `VueFlow` component or
as options to the [`useVueFlow`](/guide/composables#usevueflow) composable.

- Using Component Props

```vue
<!-- Pass configuration as props -->
<template>
  <VueFlow :default-zoom="0.5" :max-zoom="4" :min-zoom="0.1" />
</template>
```

- Using Composable Options

```vue
<script setup>
import { useVueFlow  } from '@vue-flow/core'

useVueFlow({
  defaultZoom: 0.5,
  maxZoom: 4,
  minZoom: 0.1,
})
</script>
```

## Updating Config

You can update the configuration at any point, either by having them bound as props or using the state values returned
by `useVueFlow`.

- Using Component Props

```vue{2,5-6,10}
<script setup>
const defaultZoom = ref(1)

onMounted(() => {
  // change the default zoom value of the state
  defaultZoom.value = 1
})
</script>
<template>
  <VueFlow :default-zoom="defaultZoom" />
</template>
```

- Using State (Composable)

```vue{2,7-8}
<script setup>
const { defaultZoom } = useVueFlow({
  defaultZoom: 0.5,
})

onMounted(() => {
  // change the default zoom value of the state
  defaultZoom.value = 1
})
</script>
```

## Basic Options

### id (optional)

- Type: `string`

- Details:

  Unique id of Vue Flow.

  It is used for the lookup and injection of the state instance.

### modelValue (optional)

- Type: [`Elements`](/typedocs/types/Elements)

- Details:

  An array of elements (nodes + edges).

  Use either the modelValue prop or nodes/edges separately. __Do not mix them!__

- Example:

```vue
<script setup>
import { VueFlow } from '@vue-flow/core'

const elements = ref([
  { id: '1', type: 'input', label: 'Node 1', position: { x: 250, y: 5 } },
  { id: '2', label: 'Node 2', position: { x: 100, y: 100 }, },
  { id: '3', label: 'Node 3', position: { x: 400, y: 100 } },
  { id: '4', type: 'output', label: 'Node 4', position: { x: 400, y: 200 } },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e1-2', source: '1', target: '2', animated: true },
])
</script>
<template>
  <div style="height: 300px">
    <VueFlow v-model="elements" />
  </div>
</template>
```

### nodes (optional)

- Type: [`Node[]`](/typedocs/interfaces/Node)

- Details:

  An array of nodes.

  Use either the modelValue prop or nodes separately. __Do not mix them!__

- Example:

```vue
<script setup>
import { VueFlow } from '@vue-flow/core'

const nodes = ref([
  { id: '1', type: 'input', label: 'Node 1', position: { x: 250, y: 5 } },
  { id: '2', label: 'Node 2', position: { x: 100, y: 100 }, },
  { id: '3', label: 'Node 3', position: { x: 400, y: 100 } },
  { id: '4', type: 'output', label: 'Node 4', position: { x: 400, y: 200 } },
])
</script>
<template>
  <div style="height: 300px">
    <VueFlow :nodes="nodes" />
  </div>
</template>
```

### edges (optional)

- Type: [`Edge[]`](/typedocs/types/Edge)

- Details:

  An array of edges.

  Use either the modelValue prop or edges separately. __Do not mix them!__

- Example:

```vue
<script setup>
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
  <div style="height: 300px">
    <VueFlow :nodes="nodes" :edges="edges" />
  </div>
</template>
```

### node-types (optional)

- Type: [`Record<string, NodeComponent>`](/typedocs/types/NodeComponent)

- Default: [`DefaultNodeTypes`](/typedocs/types/DefaultNodeTypes)

- Details:

  An object mapping node-type names to component definitions/name.

- Example:

```vue
<script setup>
import { VueFlow } from '@vue-flow/core'
import CustomNode from './CustomNode.vue'

const nodeTypes = {
  custom: CustomNode,
}

const nodes = ref([
  { id: '1', type: 'custom', label: 'Node 1', position: { x: 250, y: 5 } },
  { id: '2', label: 'Node 2', position: { x: 100, y: 100 }, },
])

const edges = ref([
  { id: 'e1-2', source: '1', target: '2', animated: true },
])
</script>
<template>
  <div style="height: 300px">
    <VueFlow :nodes="nodes" :edges="edges" :node-types="nodeTypes" />
  </div>
</template>
```

### edge-types (optional)

- Type: [`Record<string, EdgeComponent>`](/typedocs/types/EdgeComponent)

- Default: [`DefaultEdgeTypes`](/typedocs/interfaces/DefaultEdgeTypes)

- Details:

  An object mapping edge-type names to component definitions/name.

- Example:

```vue
<script setup>
import { VueFlow } from '@vue-flow/core'
import CustomEdge from './CustomEdge.vue'

const edgeTypes = {
  custom: CustomEdge,
}

const nodes = ref([
  { id: '1', label: 'Node 1', position: { x: 250, y: 5 } },
  { id: '2', label: 'Node 2', position: { x: 100, y: 100 }, },
])

const edges = ref([
  { id: 'e1-2', type: 'custom', source: '1', target: '2', animated: true },
])
</script>
<template>
  <div style="height: 300px">
    <VueFlow :nodes="nodes" :edges="edges" :edge-types="edgeTypes" />
  </div>
</template>
```

### apply-default (optional)

- Type: `boolean`

- Default: `true`

- Details:

  Enable/disable default state update handlers.

  If you want to have full control of state changes, you can disable the default behavior and apply your own change
  handlers to the state.

- Example:

```vue
<script setup>
import { VueFlow } from '@vue-flow/core'

const nodes = ref([
  { id: '1', label: 'Node 1', position: { x: 250, y: 5 } },
  { id: '2', label: 'Node 2', position: { x: 100, y: 100 }, },
])

const edges = ref([
  { id: 'e1-2', type: 'custom', source: '1', target: '2', animated: true },
])
</script>
<template>
  <div style="height: 300px">
    <VueFlow :nodes="nodes" :edges="edges" :apply-default="false" />
  </div>
</template>
```

### connection-mode (optional)

- Type: [`ConnectionMode`](/typedocs/enums/ConnectionMode)

- Default: `ConnectionMode.Loose`

- Details:

  If set to `loose` all handles are treated as source handles (thus allowing for connections on target handles as well.)

### connection-line-options

- Type: [`ConnectionLineOptions`](/typedocs/interfaces/ConnectionLineOptions)

- Details:

  Options for the connection line.
  
  The options include the connection line type, style and possible marker types (marker-end/marker-start).

### connection-line-type (optional) (deprecated)

- Type: [`ConnectionLineType`](/typedocs/enums/ConnectionLineType)

- Default: `ConnectionLineType.Bezier`

- Details:

  The path to use when drawing a connection-line (`bezier`, `step`, `smoothstep`).

  When using a custom connection line this prop does nothing.

### connection-line-style (optional) (deprecated)

- Type: `CSSProperties` | `null`

- Details:

  Additional styles to add to the default connection-line.

### fit-view-on-init (optional)

- Type: `boolean`

- Default: `false`

- Details:

  Trigger fit view when viewport is mounted.

## Viewport Options

### zoom-activation-key-code (optional)

- Type: `KeyCode`

- Default: `Meta`

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

- Type: [`PanOnScrollMode`](/typedocs/enums/PanOnScrollMode)

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

### default-zoom (optional)

- Type: `number`

- Default: `1`

### default-position (optional)

- Type: `[x: number, y: number]`

- Default: `[0, 0]`

- Details:

  Default viewport position on initial load.

### translate-extent (optional)

- Type: [`CoordinateExtent`](/typedocs/types/CoordinateExtent)

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

### multi-selection-key-code (optional)

- Type: `KeyCode`

- Default: `Meta`

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

```vue{5-6,10}
<script setup>
const elements = ref([
  { id: '1', label: 'Node 1', position: { x: 250, y: 5 } },
  
  // This will overwrite the globally set option of nodes-draggable
  { id: '2', draggable: true, label: 'Node 2', position: { x: 100, y: 100 } },
])
</script>
<template>
  <VueFlow :nodes-draggable="false" />
</template>
```

### nodes-connectable (optional)

- Type: `boolean`

- Default: `true`

- Details:

  Globally enable/disable connecting nodes.

  Can be overwritten by setting `connectable` on a specific node element.

- Example:

```vue{5-6,10}
<script setup>
const elements = ref([
  { id: '1', label: 'Node 1', position: { x: 250, y: 5 } },
  
  // This will overwrite the globally set option of nodes-connectable
  { id: '2', connectable: true, label: 'Node 2', position: { x: 100, y: 100 } },
])
</script>
<template>
  <VueFlow :nodes-connectable="false" />
</template>
```

### nodes-extent (optional)

- Type: [`CoordinateExtent`](/typedocs/types/CoordinateExtent)

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

```vue{5-6}
<script setup>
const elements = ref([
  { id: '1', label: 'Node 1', position: { x: 250, y: 5 } },
  
  // This will overwrite the globally set option of node-extent
  { id: '2', extent: [[-100, -100], [100, 100]], label: 'Node 2', position: { x: 100, y: 100 } },
])
</script>
<template>
  <VueFlow />
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

- Type: [`SnapGrid`](/typedocs/types/SnapGrid)

- Default: `[15, 15]`

- Details:

  If `snapToGrid` is enabled, nodes will be placed and moved in a grid-like fashion according to the `snapGrid` value.

## Global Edge Options

### edges-updatable (optional)

- Type: `EdgeUpdatable`

- Default: `true`

- Details:

  Globally enable/disable updating edges.

  If set to 'source' only source markers are updatable
  
  If set to 'target' only target markers are updatable

  If set to 'true' both source and target markers are updatable

  Can be overwritten by setting `updatable` on a specific edge element.

- Example:

```vue{7-8,12}
<script setup>
const elements = ref([
  { id: '1', label: 'Node 1', position: { x: 250, y: 5 } },
  { id: '2', label: 'Node 2', position: { x: 100, y: 100 } },
  
  { id: 'e1-3', source: '1', target: '3' },
  // Overwrites global edges-updatable config
  { id: 'e1-2', updatable: true, source: '1', target: '2', animated: true },
])
</script>
<template>
  <VueFlow :edges-updatable="false" />
</template>
```

### default-marker-color (optional)

- Type: `string`

- Default: `#b1b1b7`

- Details:

  The default color value which is used when presenting edge-markers (arrowheads).

### edge-updater-radius (optional)

- Type: `number`

- Default: `10`

- Details:

  The radius at which an edge-updater can be triggered.

### connect-on-click (optional)

- Type: `boolean`

- Default: `true`

- Details:

  Allow edges to be created by clicking two handles in a row.

  Useful if you want to enable creating edges on a touch device.

### default-edge-options (optional)

- Type: [`DefaultEdgeOptions`](/typedocs/types/DefaultEdgeOptions)

- Details:

  Default values when creating a new edge.

  Does not work for the `addEdge` utility!

### auto-connect (optional)

- Type: `boolean` | [`Connector`](/typedocs/types/Connector)

- Default: `false`

- Details:

  When connection is emitted, automatically create a new edge from params.

  Also accepts a [`Connector`](/typedocs/types/Connector) which returns an edge-like object or false (if creating
  an edge is not allowed).

  This option can be used as a shorthand for `onConnect((params) => addEdges([params]))`.

#### Examples

##### Boolean value

```vue{2}
<template>
  <VueFlow v-model="elements" auto-connect />
</template>
```

#### [Connector](/typedocs/types/Connector)

```vue{6-18,22}
<script setup>
import { ref } from 'vue'

const elements = ref([/** elements omitted for simplicity */])

const connector = (params) => {
  if (params.source.id === params.target.id) {
    return false
  }
  
  return {
    id: `edge-${params.source.id}-${params.target.id}`,
    source: params.source.id,
    target: params.target.id,
    label: `Edge ${params.source.id}-${params.target.id}`,
    animated: true,
  }
}
</script>

<template>
  <VueFlow v-model="elements" :auto-connect="connector" />
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

  Enable/disable selecting elements. This will also disable pointer-events in general.
