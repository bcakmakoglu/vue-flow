# Config (Props)

Vue Flow allows you to configure zoom, graph and flow behavior.
Configuration can be passed either as props to the `VueFlow` component or
as options to the `useVueFlow` composable.

<CodeGroup>
  <CodeGroupItem title="Props" active>

```vue:no-line-numbers
<!-- Pass configuration as props -->
<template>
  <VueFlow :default-zoom="0.5" :max-zoom="4" :min-zoom="0.1" />
</template>
```

  </CodeGroupItem>


  <CodeGroupItem title="Composable">

```vue:no-line-numbers
<script setup>
import { useVueFlow  } from '@braks/vue-flow'

useVueFlow({
  defaultZoom: 0.5,
  maxZoom: 4,
  minZoom: 0.1,
})
</script>
```

  </CodeGroupItem>
</CodeGroup>

## Updating Config

You can update the configuration at any point, either by having them bound as props or using the state values returned by `useVueFlow`.

<CodeGroup>
  <CodeGroupItem title="Props" active>

```vue:no-line-numbers{2,5-6,10}
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

  </CodeGroupItem>


  <CodeGroupItem title="Composable">

```vue:no-line-numbers{2,7-8}
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

  </CodeGroupItem>
</CodeGroup>

## Basic Options

### id <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: `string`

- Details:

  Unique id of Vue Flow.

  It is used for the lookup and injection of the state instance.

### modelValue <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: [`Elements`](/typedocs/types/Elements.html/)

- Details:

  An array of elements (nodes + edges).

  Use either the modelValue prop or nodes/edges separately. __Do not mix them!__

- Example:

```vue:no-line-numbers
<script setup>
import { VueFlow } from '@braks/vue-flow'

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

### nodes <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: [`Node[]`](/typedocs/interfaces/Node.html/)

- Details:

  An array of nodes.

  Use either the modelValue prop or nodes separately. __Do not mix them!__

- Example:

```vue:no-line-numbers
<script setup>
import { VueFlow } from '@braks/vue-flow'

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

### edges <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: [`Edge[]`](/typedocs/interfaces/Edge.html/)

- Details:

  An array of edges.

  Use either the modelValue prop or edges separately. __Do not mix them!__

- Example:

```vue:no-line-numbers
<script setup>
import { VueFlow } from '@braks/vue-flow'

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

### node-types <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: [`Record<string, NodeComponent>`](/typedocs/types/NodeComponent.html/)

- Default: [`DefaultNodeTypes`](/typedocs/types/DefaultNodeTypes.html/)

- Details:

  An object mapping node-type names to component definitions/name.

- Example:

```vue:no-line-numbers
<script setup>
import { VueFlow } from '@braks/vue-flow'
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

### edge-types <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: [`Record<string, EdgeComponent>`](/typedocs/types/EdgeComponent.html)

- Default: [`DefaultEdgeTypes`](/typedocs/types/DefaultEdgeTypes.html)

- Details:

  An object mapping edge-type names to component definitions/name.

- Example:

```vue:no-line-numbers
<script setup>
import { VueFlow } from '@braks/vue-flow'
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

### apply-default <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: `boolean`

- Default: `true`

- Details:

  Enable/disable default state update handlers.

  If you want to have full control of state changes, you can disable the default behavior and apply your own change handlers to the state.

- Example:

```vue:no-line-numbers
<script setup>
import { VueFlow } from '@braks/vue-flow'

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

### connection-mode <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: [`ConnectionMode`](/typedocs/enums/ConnectionMode.html/)

- Default: `ConnectionMode.Loose`

- Details:

  If set to `loose` all handles are treated as source handles (thus allowing for connections on target handles as well.)

### connection-line-type <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: [`ConnectionLineType`](/typedocs/enums/ConnectionLineType.html/)

- Default: `ConnectionLineType.Bezier`

- Details:

  The path to use when drawing a connection-line (`bezier`, `step`, `smoothstep`).
  
  When using a custom connection line this prop does nothing.

### connection-line-style <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: `CSSProperties` | `null`

- Details:

  Additional styles to add to the default connection-line.

### fit-view-on-init <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: `boolean`

- Default: `false`

- Details:

  Trigger fit view when viewport is mounted.

## Viewport Options

### zoom-activation-key-code <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: `KeyCode`

- Default: `Meta`

- Details:

  Define a key which can be used to activate zoom. 

  Overwrites zoom-on-scroll or pan-on-scroll behavior as long as the key is pressed.

### zoom-on-scroll <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: `boolean`

- Default: `true`

- Details:

  Whether to allow zooming in and out when scrolling inside the Vue Flow container.

### zoom-on-pinch <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: `boolean`

- Default: `true`

- Details:

  Whether to allow zooming in and out when pinching (touch or trackpad) inside the Vue Flow container.

### zoom-on-double-click <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: `boolean`

- Default: `true`

- Details:

  Whether to allow zooming in and out when double-clicking (or tapping) inside the Vue Flow container.

### pan-on-scroll <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: `boolean`

- Default: `false`

- Details:

  Whether to allow panning inside the Vue Flow container.

  Does not work together with `zoom-on-scroll` but will work together with `zoom-activation-key-code`.

### pan-on-scroll-speed <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: `number`

- Default: `0.5`

### pan-on-scroll-mode <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: [`PanOnScrollMode`](/typedocs/enums/PanOnScrollMode.html/)

- Default: `PanOnScrollMode.Free`

- Details:

  Specify on which axis panning is allowed (x, y or both).

### pan-on-drag <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" /> 

- Old name: `paneMovable`

- Type: `boolean`

- Default: `true`

- Details:

  Whether to allow moving the pane when dragging inside the Vue Flow container.

### prevent-scrolling <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: `boolean`

- Default: `true`

- Details:

  Enable this to prevent vue flow from scrolling inside its container, i.e. allow for the page to scroll.

### no-wheel-class-name <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: `string`

- Default: `nowheel`

- Details:

  Set a class name which prevents elements from triggering wheel-scroll events (thus disabling zoom/pan-scroll behavior on the element).

  Useful if you want to allow for scrolling _inside_ a node

### no-pan-class-name <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: `string`

- Default: `nopan`

- Details:

  Set a class name which prevents elements from triggering pan-scroll events.

### min-zoom <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: `number`

- Default: `0.5`

### max-zoom <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: `number`

- Default: `2`

### default-zoom <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: `number`

- Default: `1`

### default-position <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: `[x: number, y: number]`

- Default: `[0, 0]`

- Details:

  Default viewport position on initial load.

### translate-extent <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: [`CoordinateExtent`](/typedocs/types/CoordinateExtent.html/)

- Default: 

```ts:no-line-numbers
[
  [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
]
```

- Details:

  The area in which the viewport can be moved around.

## Selection Options

### selection-key-code <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: `KeyCode`

- Default: `Shift`

- Details:

  Define a key which can be used to activate the selection rect.

### multi-selection-key-code <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: `KeyCode`

- Default: `Meta`

- Details:

  Define a key which can be used to activate multi-selection.

  Multi-selection can be used to select multiple nodes with clicks.

### delete-key-code <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: `KeyCode`

- Default: `Backspace`

- Details:

  Define a key which can be used to activate remove elements from the pane.


## Global Node Options

### nodes-draggable <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: `boolean`

- Default: `true`

- Details:

  Globally enable/disable dragging nodes. 

  Can be overwritten by setting `draggable` on a specific node element.

- Example:

```vue:no-line-numbers{5-6,10}
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

### nodes-connectable <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: `boolean`

- Default: `true`

- Details:

  Globally enable/disable connecting nodes.

  Can be overwritten by setting `connectable` on a specific node element.

- Example:

```vue:no-line-numbers{5-6,10}
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

### nodes-extent <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: [`CoordinateExtent`](/typedocs/types/CoordinateExtent.html/)

- Default:

```ts:no-line-numbers
[
  [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
]
```

- Details:

  The area in which nodes can be moved around.

  Can be overwritten by setting `extent` on a specific node element.

- Example:

```vue:no-line-numbers{5-6}
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

### select-nodes-on-drag <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: `boolean`

- Default: `true`

### snap-to-grid <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: `boolean`

- Default: `false`

- Details:

  If enabled, nodes will be placed and moved in a grid-like fashion.

### snap-grid <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: [`SnapGrid`](/typedocs/types/SnapGrid.html)

- Default: `[15, 15]`

- Details:

  If `snapToGrid` is enabled, nodes will be placed and moved in a grid-like fashion according to the `snapGrid` value.

## Global Edge Options

### edges-updatable <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: `boolean`

- Default: `true`

- Details:

  Globally enable/disable updating edges.

  Can be overwritten by setting `updatable` on a specific edge element.

- Example:

```vue:no-line-numbers{7-8,12}
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

### default-marker-color <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: `string`

- Default: `#b1b1b7`

- Details:

  The default color value which is used when presenting edge-markers (arrowheads).

### edge-updater-radius <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: `number`

- Default: `10`

- Details:

  The radius at which an edge-updater can be triggered.

### connect-on-click <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: `boolean`

- Default: `true`

- Details:

  Allow edges to be created by clicking two handles in a row. 

  Useful if you want to enable creating edges on a touch device.

### default-edge-options <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: [`DefaultEdgeOptions`]()

- Details:

  Default values when creating a new edge.

  Does not work for the `addEdge` utility!

### auto-connect <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: `boolean` | [`Connector`](/typedocs/types/Connector.html/)

- Default: `false`

- Details:

  When connection is emitted, automatically create a new edge from params.

  Also accepts a [`Connector`](/typedocs/types/Connector.html/) which returns an edge-like object or false (if creating an edge is not allowed).

  This option can be used as a shorthand for `onConnect((params) => addEdges([params]))`.

#### Examples

##### Boolean value

```vue:no-line-numbers{2}
<template>
  <VueFlow v-model="elements" auto-connect />
</template>
```

#### [Connector](/typedocs/types/Connector.html/)

```vue:no-line-numbers{6-18,22}
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

## Global Element Options

### only-render-visible-elements <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: `boolean`

- Default: `false`

- Details:

  Skip rendering elements that are not visible currently (either hidden or outside the current pane dimensions).

### elements-selectable <Badge class="text-white" style="line-height: inherit" text="optional" vertical="top" />

- Type: `boolean`

- Default: `true`

- Details:

  Enable/disable selecting elements. This will also disable pointer-events in general.
