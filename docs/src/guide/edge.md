---
title: Edges
---

<script setup>
import LogosJavascript from '~icons/logos/javascript';
import LogosTypescript from '~icons/logos/typescript-icon';
import { Background, Panel, VueFlow } from '@vue-flow/core';
import Check from '~icons/mdi/check';
import Close from '~icons/mdi/close';
import { ref } from 'vue';

const nodes = ref([
  {
    id: '1',
    type: 'input',
    data: { label: 'Node 1' },
    position: { x: 50, y: 25 },
  },
  {
    id: '2',
    data: { label: 'Node 2' },
    position: { x: 100, y: 125 },
  },
]);

const bezierEdges = ref([
  {
    id: 'e1-2',
    source: '1',
    target: '2',
  }
]);

const stepEdges = ref([
  {
    id: 'e1-2',
    type: 'step',
    source: '1',
    target: '2',
  },
]);

const smoothStepEdges = ref([
  {
    id: 'e1-2',
    type: 'smoothstep',
    source: '1',
    target: '2',
  },
]);

const straightNodes = ref([
  {
    id: '1',
    type: 'input',
    data: { label: 'Node 1' },
    position: { x: 50, y: 25 },
  },
  {
    id: '2',
    data: { label: 'Node 2' },
    position: { x: 50, y: 125 },
  },
]);

const straightEdges = ref([
  {
    id: 'e1-2',
    type: 'straight',
    source: '1',
    target: '2',
  },
]);

function logEvent(name, data) {
  console.log(name, data)
}
</script>

# Introduction to Edges

Edges are the links connecting your nodes, forming a map.
Each edge runs from one handle to another, and can be customized to your liking.

Remember, every edge is unique and thus **requires a unique id**, a source and target node id.

For the full list of options available for an edge, check out the [Edge Type](/typedocs/type-aliases/Edge).

## Adding Edges to the Graph

Edges are rendered by passing them to the `edges` prop (or `v-model:edges` for two-way binding) of the Vue Flow component.

:::warning
This method will *not* create a change. Check out the [Controlled Flow](/guide/controlled-flow.html) section for more information.
:::

:::code-group

```vue [<LogosJavascript />]

<script setup>
import { ref, onMounted } from 'vue'
import { VueFlow } from '@vue-flow/core'

const nodes = ref([
  {
    id: '1',
    position: { x: 50, y: 50 },
    data: { label: 'Node 1', },
  },
  {
    id: '2',
    position: { x: 50, y: 250 },
    data: { label: 'Node 2', },
  }
]);

const edges = ref([
  {
    id: 'e1->2',
    source: '1',
    target: '2',
  }
]);
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" />
</template>
```

```vue [<LogosTypescript />]

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Node, Edge } from '@vue-flow/core'
import { VueFlow } from '@vue-flow/core'

const nodes = ref<Node[]>([
  {
    id: '1',
    position: { x: 50, y: 50 },
    data: { label: 'Node 1', },
  },
  {
    id: '2',
    position: { x: 50, y: 250 },
    data: { label: 'Node 2', },
  }
]);

const edges = ref<Edge[]>([
  {
    id: 'e1->2',
    source: '1',
    target: '2',
  }
]);
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" />
</template>
```

:::

If you are working with more complex graphs or simply require access to the internal state,
the [useVueFlow](/typedocs/functions/useVueFlow) composable will come in handy.

The [`addEdges`](/typedocs/interfaces/Actions#addEdges) action is available through [useVueFlow](/typedocs/functions/useVueFlow), allowing you to add edges straight to the state.

What's more, this action isn't limited to the component rendering the graph; it can be utilized elsewhere, like in a
Sidebar or Toolbar.

```vue
<script setup>
import { VueFlow, useVueFlow } from '@vue-flow/core'

const initialNodes = ref([
  {
    id: '1',
    position: { x: 50, y: 50 },
    data: { label: 'Node 1', },
  },
  {
    id: '2',
    position: { x: 50, y: 250 },
    data: { label: 'Node 2', },
  }
])

const { addEdges } = useVueFlow()

addEdges([
  {
    source: '1',
    target: '2',

    // if a node has multiple handles of the same type,
    // you should specify which handle to use by id
    sourceHandle: null,
    targetHandle: null,
  }
])
</script>

<template>
  <VueFlow :nodes="initialNodes" />
</template>
```

## Removing Edges from the Graph

Similar to adding edges, edges can be removed from the graph by removing them from your bound array (using `v-model:edges`) or from the `edges` prop of the Vue Flow component.

```vue
<script setup>
import { ref, onMounted } from 'vue'
import { VueFlow, Panel } from '@vue-flow/core'

const nodes = ref([
  {
    id: '1',
    position: { x: 50, y: 50 },
    data: { label: 'Node 1', },
  },
  {
    id: '2',
    position: { x: 50, y: 250 },
    data: { label: 'Node 2', },
  },
]);

const edges = ref([
  {
    id: 'e1->2',
    source: '1',
    target: '2',
  }
]);

function removeEdge(id) {
  edges.value = edges.value.filter((edge) => edge.id !== id)
}
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges">
    <Panel>
      <button @click="removeEdge('e1->2')">Remove Edge</button>
    </Panel>
  </VueFlow>
</template>
```

The [`removeEdges`](/typedocs/interfaces/Actions#removeEdges) action is available through [useVueFlow](/typedocs/functions/useVueFlow), allowing you to remove edges straight from the state.

You can also use this action outside the component rendering the graph, like in a Sidebar or Toolbar.

```vue
<script setup>
import { ref, onMounted } from 'vue'  
import { VueFlow, useVueFlow } from '@vue-flow/core'

const nodes = ref([
  {
    id: '1',
    position: { x: 50, y: 50 },
    data: { label: 'Node 1', },
  },
  {
    id: '2',
    position: { x: 50, y: 250 },
    data: { label: 'Node 2', },
  },
  {
    id: '3',
    position: { x: 250, y: 50 },
    data: { label: 'Node 3', },
  },
  {
    id: '4',
    position: { x: 250, y: 250 },
    data: { label: 'Node 4', },
  },
])

const edges = ref([
  {
    id: 'e1->2',
    source: '1',
    target: '2',
  },
  {
    id: 'e1->3',
    source: '1',
    target: '3',
  },
  {
    id: 'e2->3',
    source: '2',
    target: '3',
  },
  {
    id: 'e2->4',
    source: '2',
    target: '4',
  },
])

const { removeEdges } = useVueFlow()

function removeOneEdge() {
  removeEdges('e1->2')
}

function removeMultipleEdges() {
  removeEdges(['e1->3', 'e2->3'])
}
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges">
    <Panel>
      <button @click="removeOneEdge">Remove Edge 1</button>
      <button @click="removeMultipleEdges">Remove Edges 2 and 3</button>
    </Panel>
  </VueFlow>
</template>
```

## Updating Edge Data

::: warning Vue Flow 2.0
Edges are stored as your plain objects and are **not** deeply reactive — mutating a stored edge in place
(`edge.data = ...`, `edge.animated = !edge.animated`) no longer triggers a re-render. Update edges through
the store helpers (`updateEdgeData`, `updateEdge`, `setEdges`, `applyEdgeChanges`) or by reassigning your
`v-model` array immutably. This mirrors the node model and matches React Flow / Svelte Flow.
:::

There are multiple ways of achieving this, here are some examples:

::: code-group

```ts [useVueFlow]
import { useVueFlow } from '@vue-flow/core'

const { updateEdgeData, setEdges } = useVueFlow()

// the simplest path: merge into an edge's data (pass `{ replace: true }` to overwrite instead of merge)
updateEdgeData(edgeId, { hello: 'world' })

// updater function — receives the current stored edge
updateEdgeData(edgeId, (edge) => ({ count: (edge.data?.count ?? 0) + 1 }))

// for non-data fields (selectable, animated, …) reassign the edge immutably via setEdges
setEdges((edges) =>
  edges.map((edge) => (edge.id === edgeId ? { ...edge, animated: !edge.animated } : edge)),
)
```

```vue [useEdge]
<!-- CustomEdge.vue -->
<script setup>
import { useEdge, useVueFlow } from '@vue-flow/core'

// `useEdge` returns the edge as a `ComputedRef` (read `edge.value`); it is NOT mutable
const { id, edge } = useEdge()
const { updateEdgeData, setEdges } = useVueFlow()

function onSomeEvent() {
  updateEdgeData(id, { hello: 'world' })

  setEdges((edges) =>
    edges.map((e) => (e.id === id ? { ...e, animated: !e.animated } : e)),
  )
}
</script>
```

```vue [v-model]
<script setup>
import { ref } from 'vue'

const edges = ref([
  {
    id: 'e1->2',
    source: '1',
    target: '2',
  },
])

// reassign immutably — a new array with a new object for the changed edge
function onSomeEvent(edgeId) {
  edges.value = edges.value.map((edge) =>
    edge.id === edgeId
      ? { ...edge, data: { ...edge.data, hello: 'world' }, animated: !edge.animated }
      : edge,
  )
}
</script>

<template>
  <VueFlow v-model:edges="edges" />
</template>
```

:::

## [Predefined Edge-Types](/typedocs/interfaces/DefaultEdgeTypes)

Vue Flow provides several built-in edge types that you can leverage immediately.
The included node types are `default` (bezier), `step`, `smoothstep` and `straight`.

### Default Edge (Bezier)

The default edge is a bezier curve that connects two nodes.

<div class="mt-4 bg-[var(--vp-code-block-bg)] rounded-lg h-50">
  <VueFlow v-model:nodes="nodes" v-model:edges="bezierEdges">
    <Background class="rounded-lg" />
  </VueFlow>
</div>

### Step Edge

A step edge has a straight path with a step towards the target.

<div class="mt-4 bg-[var(--vp-code-block-bg)] rounded-lg h-50">
  <VueFlow v-model:nodes="nodes" v-model:edges="stepEdges">
    <Background class="rounded-lg" />
  </VueFlow>
</div>

### Smoothstep Edge

The same as the step edge though with a border radius on the step (rounded step).

<div class="mt-4 bg-[var(--vp-code-block-bg)] rounded-lg h-50">
  <VueFlow v-model:nodes="nodes" v-model:edges="smoothStepEdges">
    <Background class="rounded-lg" />
  </VueFlow>
</div>

### Straight Edge

A simple straight path.

<div class="mt-4 bg-[var(--vp-code-block-bg)] rounded-lg h-50">
  <VueFlow v-model:nodes="straightNodes" v-model:edges="straightEdges">
    <Background class="rounded-lg" />
  </VueFlow>
</div>

## User-Defined Edges

On top of the default edge types mentioned earlier, you can create as many custom edge-types as you need.
Edge-types are determined from your edges' definitions.

::: code-group

```vue [App.vue <LogosJavascript />]
<script setup>
import { ref } from 'vue'
import { VueFlow } from '@vue-flow/core'

import CustomEdge from './CustomEdge.vue'
import SpecialEdge from './SpecialEdge.vue'

export const edges = ref([
  {
    id: 'e1->2',
    source: '1',
    target: '2',
    // this will create the edge-type `custom`
    type: 'custom',
  },
  {
    id: 'e1->3',
    source: '1',
    target: '3',
    // this will create the edge-type `special`
    type: 'special',
  }
])
  
const nodes = ref([
  {
    id: '1',
    position: { x: 50, y: 50 },
    data: { label: 'Node 1', },
  },
  {
    id: '2',
    position: { x: 50, y: 250 },
    data: { label: 'Node 2', },
  },
  {
    id: '3',
    position: { x: 250, y: 50 },
    data: { label: 'Node 3', },
  },
  {
    id: '4',
    position: { x: 250, y: 250 },
    data: { label: 'Node 4', },
  },
])
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges">
    <template #edge-custom="customEdgeProps">
      <CustomEdge v-bind="customEdgeProps" />
    </template>
    
    <template #edge-special="specialEdgeProps">
      <SpecialEdge v-bind="specialEdgeProps" />
    </template>
  </VueFlow>
</template>
```

```vue [CustomEdge.vue <LogosJavascript />]
<script setup>
import { BezierEdge } from '@vue-flow/core';

// props were passed from the slot using `v-bind="customEdgeProps"`
const props = defineProps(['sourceX', 'sourceY', 'targetX', 'targetY', 'sourcePosition', 'targetPosition']);
</script>

<script lang="ts">
export default {
  name: 'CustomEdge',
};
</script>

<template>
  <BezierEdge
      :source-x="sourceX"
      :source-y="sourceY"
      :target-x="targetX"
      :target-y="targetY"
      :source-position="sourcePosition"
      :target-position="targetPosition"
  />
</template>
```

```vue{25-26,32-33,40-42} [App.vue <LogosTypescript />]
<script setup lang="ts">
import { ref } from 'vue'
import type { Edge } from '@vue-flow/core'
import { VueFlow } from '@vue-flow/core'

import CustomEdge from './CustomEdge.vue'
import SpecialEdge from './SpecialEdge.vue'

// You can pass 2 optional generic arguments to the `Edge` type:
// 1. The data object type
// 2. The possible edge-type string union

export interface CustomData {
    hello: string
}

type CustomEdgeTypes = 'custom' | 'special'

export type CustomEdge = Edge<CustomData, CustomEdgeTypes>

export const edges = ref<CustomEdge[]>([
    {
      id: 'e1-2',
      source: '1',
      target: '2',
      // this will create the edge-type `custom`
      type: 'custom',
    },
    {
      id: 'e1-3',
      source: '1',
      target: '3',
      // this will create the edge-type `special`
      type: 'special',
    },
    
    {
      id: 'e1-4',
      source: '1',
      target: '4',
      // this will throw a type error, as the type is not defined in the CustomEdgeTypes
      // regardless it would be rendered as a default edge type
      type: 'not-defined',
    }
])
  
const nodes = ref([
  {
    id: '1',
    position: { x: 50, y: 50 },
    data: { label: 'Node 1', },
  },
  {
    id: '2',
    position: { x: 50, y: 250 },
    data: { label: 'Node 2', },
  },
  {
    id: '3',
    position: { x: 250, y: 50 },
    data: { label: 'Node 3', },
  },
  {
    id: '4',
    position: { x: 250, y: 250 },
    data: { label: 'Node 4', },
  },
])  
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges">
    <template #edge-custom="customEdgeProps">
      <CustomEdge v-bind="customEdgeProps" />
    </template>
    
    <template #edge-special="specialEdgeProps">
      <SpecialEdge v-bind="specialEdgeProps" />
    </template>
  </VueFlow>
</template>
```

```vue [CustomEdge.vue <LogosTypescript />]
<script setup lang="ts">
import type { EdgeProps } from '@vue-flow/core';
import { BezierEdge } from '@vue-flow/core';

import type { CustomEdge } from './edges'

// props were passed from the slot using `v-bind="customEdgeProps"` — `EdgeProps` takes the edge type
const props = defineProps<EdgeProps<CustomEdge>>();

console.log(props.data?.hello)
</script>

<script lang="ts">
export default {
  name: 'CustomEdge',
};
</script>

<template>
  <BezierEdge
      :source-x="sourceX"
      :source-y="sourceY"
      :target-x="targetX"
      :target-y="targetY"
      :source-position="sourcePosition"
      :target-position="targetPosition"
  />
</template>
```

:::

Vue Flow will then attempt to resolve this edge-type to a component.
Priority is given to a definition in the edgeTypes object of the state.
Next, it tries to match the component to a globally registered one with the same name.
Finally, it searches for a provided template slot to fill in the edge-type.

If no methods produce a result in resolving the component, the default edge-type is used as a fallback.

### Template slots

One of the easiest ways to define custom edges is, by passing them as template slots.
Dynamic resolution to slot-names is done for your user-defined edge-types,
meaning a edge with the type `custom` is expected to have a slot named `#edge-custom`.

```vue
<script setup>
import { ref } from 'vue'
import { VueFlow } from '@vue-flow/core'
import CustomEdge from './CustomEdge.vue'

const nodes = ref([
  {
    id: '1',
    position: { x: 50, y: 50 },
    data: { label: 'Node 1', },
  },
  {
    id: '2',
    position: { x: 50, y: 250 },
    data: { label: 'Node 2', },
  },
])

const edges = ref([
  {
    id: 'e1->2',
    type: 'custom',
    source: '1',
    target: '2',
  },
])
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges">
    <template #edge-custom="props">
      <CustomEdge v-bind="props" />
    </template>
  </VueFlow>
</template>
```

### Edge-types object

Alternatively, edge-types can also be defined by passing an object as a prop to the VueFlow component (or as an option to the composable).

::: warning
Take precaution to mark your components as raw (utilizing the marked function from the Vue library) to prevent their conversion into reactive objects. Otherwise, Vue will display a warning on the console.
:::

```vue
<script setup>
import { markRaw } from 'vue'
import CustomEdge from './CustomEdge.vue'

const edgeTypes = {
  custom: markRaw(CustomEdge),
}

const nodes = ref([
  {
    id: '1',
    position: { x: 50, y: 50 },
    data: { label: 'Node 1', },
  },
  {
    id: '2',
    position: { x: 50, y: 250 },
    data: { label: 'Node 2', },
  },
])

const edges = ref([
  {
    id: 'e1->2',
    type: 'custom',
    source: '1',
    target: '2',
  },
])
</script>
<template>
  <VueFlow :nodes="nodes" :edges="edges" :edgeTypes="edgeTypes" />
</template>
```

## [Edge Props](/typedocs/interfaces/EdgeProps)

Your custom edges are enclosed so that fundamental functions like selecting operate.
But you may wish to expand on these features or implement your business logic inside edges, thus your edges receive the following properties:

| Prop Name        | Description                                | Type                                         | Optional                                   |
|------------------|--------------------------------------------|----------------------------------------------|--------------------------------------------|
| id               | Unique edge id                             | string                                       | <Close class="text-red-500" />             |
| source           | ID of the source node                      | string                                       | <Close class="text-red-500" />             |
| target           | ID of the target node                      | string                                       | <Close class="text-red-500" />             |
| sourcePosition   | Source handle position                     | [Position](/typedocs/enumerations/Position)  | <Close class="text-red-500" />             |
| targetPosition   | Target handle position                     | [Position](/typedocs/enumerations/Position)  | <Close class="text-red-500" />             |
| sourceX          | Source x coordinate (render output)        | number                                       | <Close class="text-red-500" />             |
| sourceY          | Source y coordinate (render output)        | number                                       | <Close class="text-red-500" />             |
| targetX          | Target x coordinate (render output)        | number                                       | <Close class="text-red-500" />             |
| targetY          | Target y coordinate (render output)        | number                                       | <Close class="text-red-500" />             |
| type             | Edge type                                  | string                                       | <Check class="text-[var(--vp-c-brand)]" /> |
| data             | Custom edge data                           | object                                       | <Check class="text-[var(--vp-c-brand)]" /> |
| label            | Edge label (string or VNode)               | string \| VNode \| Component \| Object       | <Check class="text-[var(--vp-c-brand)]" /> |
| style            | CSS properties                             | CSSProperties                                | <Check class="text-[var(--vp-c-brand)]" /> |
| selected         | Is the edge selected                       | boolean                                      | <Check class="text-[var(--vp-c-brand)]" /> |
| selectable       | Can the edge be selected                   | boolean                                      | <Check class="text-[var(--vp-c-brand)]" /> |
| deletable        | Can the edge be deleted                    | boolean                                      | <Check class="text-[var(--vp-c-brand)]" /> |
| sourceHandleId   | ID of the source handle                    | string                                       | <Check class="text-[var(--vp-c-brand)]" /> |
| targetHandleId   | ID of the target handle                    | string                                       | <Check class="text-[var(--vp-c-brand)]" /> |
| animated         | Is the edge animated                       | boolean                                      | <Check class="text-[var(--vp-c-brand)]" /> |
| reconnectable    | Is the edge reconnectable                  | boolean                                      | <Check class="text-[var(--vp-c-brand)]" /> |
| markerStart      | Start marker (resolved url string)         | string                                       | <Check class="text-[var(--vp-c-brand)]" /> |
| markerEnd        | End marker (resolved url string)           | string                                       | <Check class="text-[var(--vp-c-brand)]" /> |
| curvature        | The curvature of the edge                  | number                                       | <Check class="text-[var(--vp-c-brand)]" /> |
| interactionWidth | Width of the interaction area for the edge | number                                       | <Check class="text-[var(--vp-c-brand)]" /> |

::: tip
There's no `sourceNode` / `targetNode` on `EdgeProps` anymore — resolve the connected nodes with
`useInternalNode(() => props.source)` / `useInternalNode(() => props.target)`.
:::

## Edge Events

Vue Flow provides two main ways of listening to edge events,
either by using `useVueFlow` to bind listeners to the event handlers or by binding them to the `<VueFlow>` component.

::: code-group

```vue [useVueFlow]
<script setup>
import { ref } from 'vue'  
import { VueFlow, useVueFlow } from '@vue-flow/core'

// useVueFlow provides access to the event handlers
const { 
  onEdgeClick,
  onEdgeDoubleClick,
  onEdgeContextMenu,
  onEdgeMouseEnter,
  onEdgeMouseLeave,
  onEdgeMouseMove,
  onReconnectStart,
  onReconnect,
  onReconnectEnd,
} = useVueFlow()
  
const nodes = ref([
  {
    id: '1',
    position: { x: 50, y: 50 },
    data: { label: 'Node 1', },
  },
  {
    id: '2',
    position: { x: 50, y: 250 },
    data: { label: 'Node 2', },
  },
])

const edges = ref([
  {
    id: 'e1->2',
    source: '1',
    target: '2',
  },
])
  
// bind listeners to the event handlers
onEdgeClick((event) => {
  console.log('edge clicked', event)
})

onEdgeDoubleClick((event) => {
  console.log('edge double clicked', event)
})

onEdgeContextMenu((event) => {
  console.log('edge context menu', event)
})
  
// ... and so on  
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" />
</template>
```

```vue [component]
<script setup>
import { ref } from 'vue'
import { VueFlow } from '@vue-flow/core'

const nodes = ref([
  {
    id: '1',
    position: { x: 50, y: 50 },
    data: { label: 'Node 1', },
  },
  {
    id: '2',
    position: { x: 50, y: 250 },
    data: { label: 'Node 2', },
  },
])

const edges = ref([
  {
    id: 'e1->2',
    source: '1',
    target: '2',
  },
])
  
function logEvent(eventName, data) {
  console.log(eventName, data)
}
</script>

<template>
  <VueFlow
    :nodes="nodes"
    :edges="edges"
    @edge-click="logEvent('edge clicked', $event)"
    @edge-double-click="logEvent('edge double clicked', $event)"
    @edge-context-menu="logEvent('edge context menu', $event)"
    @edge-mouse-enter="logEvent('edge mouse enter', $event)"
    @edge-mouse-leave="logEvent('edge mouse leave', $event)"
    @edge-mouse-move="logEvent('edge mouse move', $event)"
    @reconnect-start="logEvent('reconnect start', $event)"
    @reconnect="logEvent('reconnect', $event)"
    @reconnect-end="logEvent('reconnect end', $event)"
  />
</template>
```

:::

<div class="mt-4 bg-[var(--vp-code-block-bg)] rounded-lg h-50">
  <VueFlow 
    v-model:nodes="nodes" 
    v-model:edges="bezierEdges" 
    @edge-click="logEvent('edge clicked', $event)"
    @edge-double-click="logEvent('edge double clicked', $event)"
    @edge-context-menu="logEvent('edge context menu', $event)"
    @edge-mouse-enter="logEvent('edge mouse enter', $event)"
    @edge-mouse-leave="logEvent('edge mouse leave', $event)"
    @edge-mouse-move="logEvent('edge mouse move', $event)"
    @reconnect-start="logEvent('reconnect start', $event)"
    @reconnect="logEvent('reconnect', $event)"
    @reconnect-end="logEvent('reconnect end', $event)"
  >
    <Panel position="top-center">
        <p class="text-sm">Interact to see events in browser console</p>
    </Panel>

    <Background class="rounded-lg" />
  </VueFlow>
</div>

## Customizing Appearance

::: tip
To override the styles of the default theme, visit the [Theming section](/guide/theming).
:::
