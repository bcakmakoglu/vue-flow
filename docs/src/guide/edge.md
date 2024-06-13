---
title: Edges
---

<script setup>
import LogosJavascript from '~icons/logos/javascript';
import LogosTypescript from '~icons/logos/typescript-icon';
import { VueFlow, Panel } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import Check from '~icons/mdi/check';
import Close from '~icons/mdi/close';
import { ref } from 'vue';

const nodes = [
  {
    id: '1',
    type: 'input',
    label: 'Node 1',
    position: { x: 50, y: 25 },
  },
  {
    id: '2',
    label: 'Node 2',
    position: { x: 100, y: 125 },
  },
];

const bezierEdge = ref([
  ...nodes,
  {
    id: 'e1-2',
    source: '1',
    target: '2',
  }
]);

const stepEdge = ref([
  ...nodes,
  {
    id: 'e1-2',
    type: 'step',
    source: '1',
    target: '2',
  },
]);

const smoothStepEdge = ref([
  ...nodes,
  {
    id: 'e1-2',
    type: 'smoothstep',
    source: '1',
    target: '2',
  },
]);

const straightEdge = ref([
  {
    id: '1',
    type: 'input',
    label: 'Node 1',
    position: { x: 50, y: 25 },
  },
  {
    id: '2',
    label: 'Node 2',
    position: { x: 50, y: 125 },
  },
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

For the full list of options available for an edge, check out the [Edge Type](/typedocs/types/Edge).

## Adding Edges to the Graph

Edges are rendered by passing them to the `edges` prop (or the deprecated `v-model` prop) of the Vue Flow component.

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

Similar to adding edges, edges can be removed from the graph by removing them from the `mode-value` (using `v-model`) or from the `edges` prop of the Vue Flow component.

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

Since edges are reactive object, you can update their data at any point by simply mutating it.
This allows you to change the label, or even add new properties to the data object at any point in time.

There are multiple ways of achieving this, here are some examples:

::: code-group

```ts [useVueFlow]
import  { useVueFlow } from '@vue-flow/core'

const instance = useVueFlow()

// use the `updateEdgeData` method to update the data of an edge
instance.updateEdgeData(edgeId, { hello: 'mona' })

// find the edge in the state by its id
const edge = instance.findEdge(edgeId)

edge.data = {
  ...edge.data,
  hello: 'world',
}

// you can also mutate properties like `selectable` or `animated`
edge.selectable = !edge.selectable
edge.animated = !edge.animated
```

```vue [useEdge]
<!-- CustomEdge.vue -->
<script setup>
import { useEdge } from '@vue-flow/core'

// `useEdge` returns us the edge object straight from the state
// since the edge obj is reactive, we can mutate it to update our edges' data
const { edge } = useEdge()

function onSomeEvent() {
  edge.data = {
    ...edge.data,  
    hello: 'world',
  }
  
  // you can also mutate properties like `selectable` or `animated`
  edge.selectable = !edge.selectable
  edge.animated = !edge.animated
}
</script>
```

```vue [v-model]
<script setup>
import { ref } from 'vue'

const nodes = ref([
  {
    id: '1',
    position: { x: 50, y: 50 },
    data: {
      label: 'Node 1',
      hello: 'world',
    },
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

function onSomeEvent(edgeId) {
  const edge = edges.value.find((edge) => edge.id === edgeId)
  edge.data = {
    ...elements.value[0].data,
    hello: 'world',
  }

  // you can also mutate properties like `selectable` or `animated`
  edge.selectable = !edge.selectable
  edge.animated = !edge.animated
}
</script>

<template>
  <VueFlow v-model="elements" />
</template>
```

:::

## [Predefined Edge-Types](/typedocs/interfaces/DefaultEdgeTypes)

Vue Flow provides several built-in edge types that you can leverage immediately.
The included node types are `default` (bezier), `step`, `smoothstep` and `straight`.

### Default Edge (Bezier)

The default edge is a bezier curve that connects two nodes.

<div class="mt-4 bg-[var(--vp-code-block-bg)] rounded-lg h-50">
  <VueFlow v-model="bezierEdge">
    <Background class="rounded-lg" />
  </VueFlow>
</div>

### Step Edge

A step edge has a straight path with a step towards the target.

<div class="mt-4 bg-[var(--vp-code-block-bg)] rounded-lg h-50">
  <VueFlow v-model="stepEdge">
    <Background class="rounded-lg" />
  </VueFlow>
</div>

### Smoothstep Edge

The same as the step edge though with a border radius on the step (rounded step).

<div class="mt-4 bg-[var(--vp-code-block-bg)] rounded-lg h-50">
  <VueFlow v-model="smoothStepEdge">
    <Background class="rounded-lg" />
  </VueFlow>
</div>

### Straight Edge

A simple straight path.

<div class="mt-4 bg-[var(--vp-code-block-bg)] rounded-lg h-50">
  <VueFlow v-model="straightEdge">
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

// You can pass 3 optional generic arguments to the Edge type, allowing you to define:
// 1. The data object type
// 2. The events object type
// 3. The possible edge types

interface CustomData {
    hello: string
}

type CustomEdgeTypes = 'custom' | 'special'

type CustomEdge = Edge<CustomData, any, CustomEdgeTypes>

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

import { CustomData } from './edges'

// props were passed from the slot using `v-bind="customEdgeProps"`
const props = defineProps<EdgeProps<CustomData>>();

console.log(props.data.hello) // 'world'
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
| sourceNode       | The originating node                       | [GraphNode](/typedocs/interfaces/GraphNode)  | <Close class="text-red-500" />             |
| targetNode       | The destination node                       | [GraphNode](/typedocs/interfaces/GraphNode)  | <Close class="text-red-500" />             |
| source           | ID of the source node                      | string                                       | <Close class="text-red-500" />             |
| target           | ID of the target node                      | string                                       | <Close class="text-red-500" />             |
| type             | Edge Type                                  | string                                       | <Close class="text-red-500" />             |
| label            | Edge label, can be a string or a VNode     | string \| VNode \| Component \| Object       | <Check class="text-[var(--vp-c-brand)]" /> |
| style            | CSS properties                             | CSSProperties                                | <Check class="text-[var(--vp-c-brand)]" /> |
| selected         | Is edge selected                           | boolean                                      | <Check class="text-[var(--vp-c-brand)]" /> |
| sourcePosition   | Source position                            | [Position](/typedocs/enums/Position)         | <Close class="text-red-500" />             |
| targetPosition   | Target position                            | [Position](/typedocs/enums/Position)         | <Close class="text-red-500" />             |
| sourceHandleId   | ID of the source handle                    | string                                       | <Check class="text-[var(--vp-c-brand)]" /> |
| targetHandleId   | ID of the target handle                    | string                                       | <Check class="text-[var(--vp-c-brand)]" /> |
| animated         | Is edge animated                           | boolean                                      | <Check class="text-[var(--vp-c-brand)]" /> |
| updatable        | Is edge updatable                          | boolean                                      | <Check class="text-[var(--vp-c-brand)]" /> |
| markerStart      | Start marker                               | string                                       | <Close class="text-red-500" />             |
| markerEnd        | End marker                                 | string                                       | <Close class="text-red-500" />             |
| curvature        | The curvature of the edge                  | number                                       | <Check class="text-[var(--vp-c-brand)]" /> |
| interactionWidth | Width of the interaction area for the edge | number                                       | <Check class="text-[var(--vp-c-brand)]" /> |
| data             | Additional data of edge                    | any object                                   | <Close class="text-red-500" />             |
| events           | Contextual and custom events of edge       | [EdgeEventsOn](/typedocs/types/EdgeEventsOn) | <Close class="text-red-500" />             |

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
  onEdgeUpdateStart,
  onEdgeUpdate,
  onEdgeUpdateEnd,
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
onEdgeClick((event, edge) => {
  console.log('edge clicked', edge)
})

onEdgeDoubleClick((event, edge) => {
  console.log('edge double clicked', edge)
})

onEdgeContextMenu((event, edge) => {
  console.log('edge context menu', edge)
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
    @edge-update-start="logEvent('edge update start', $event)"
    @edge-update="logEvent('edge update', $event)"
    @edge-update-end="logEvent('edge update end', $event)"
  />
</template>
```

:::

<div class="mt-4 bg-[var(--vp-code-block-bg)] rounded-lg h-50">
  <VueFlow 
    v-model="bezierEdge" 
    @edge-click="logEvent('edge clicked', $event)"
    @edge-double-click="logEvent('edge double clicked', $event)"
    @edge-context-menu="logEvent('edge context menu', $event)"
    @edge-mouse-enter="logEvent('edge mouse enter', $event)"
    @edge-mouse-leave="logEvent('edge mouse leave', $event)"
    @edge-mouse-move="logEvent('edge mouse move', $event)"
    @edge-update-start="logEvent('edge update start', $event)"
    @edge-update="logEvent('edge update', $event)"
    @edge-update-end="logEvent('edge update end', $event)"
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
