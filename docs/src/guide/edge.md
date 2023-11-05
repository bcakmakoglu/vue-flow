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
</script>

# Introduction to Edges

Edges are the links connecting your nodes, forming a map.
Each edge runs from one handle to another, and can be customized to your liking.

Remember, every edge is unique and thus **requires a unique id**, a source and target node id.

For the full list of options available for an edge, check out the [Edge Type](/typedocs/types/Edge).

## Adding Edges to the Graph

Edges are generally created by adding them to the `mode-value` (using `v-model`) or to the `edges` prop of the Vue Flow component.
This can be done dynamically at any point in your component's lifecycle.

:::code-group

```vue [<LogosJavascript />]

<script setup>
import { ref, onMounted } from 'vue'
import { VueFlow } from '@vue-flow/core'

const elements = ref([
  {
    id: '1',
    position: { x: 50, y: 50 },
    label: 'Node 1',
  },
  {
    id: '2',
    position: { x: 50, y: 250 },
    label: 'Node 2',
  }
]);

onMounted(() => {
  elements.value.push({
    id: 'e1-2',
    source: '1',
    target: '2',
  })
})
</script>

<template>
  <VueFlow v-model="elements"/>
</template>
```

```vue [<LogosTypescript />]

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Elements } from '@vue-flow/core'
import { VueFlow } from '@vue-flow/core'

const elements = ref<Elements>([
  {
    id: '1',
    position: { x: 50, y: 50 },
    label: 'Node 1',
  },
  {
    id: '2',
    position: { x: 50, y: 250 },
    label: 'Node 2',
  }
]);

onMounted(() => {
  elements.value.push({
    id: 'e1-2',
    source: '1',
    target: '2',
  })
})
</script>

<template>
  <VueFlow v-model="elements"/>
</template>
```

:::

If you are working with more complex graphs that necessitate extensive state access, the `useVueFlow` composable should
be employed.
The [`addEdges`](/typedocs/interfaces/Actions#addEdges) action is available
through [useVueFlow](/typedocs/functions/useVueFlow), allowing you to add edges straight to the state.

What's more, this action isn't limited to the component rendering the graph; it can be utilized elsewhere, like in a
Sidebar or Toolbar.

::: code-group

```vue [<LogosJavascript />]
<script setup>
import { VueFlow, useVueFlow } from '@vue-flow/core'

const initialNodes = ref([
  {
    id: '1',
    position: { x: 50, y: 50 },
    label: 'Node 1',
  },
  {
    id: '2',
    position: { x: 50, y: 250 },
    label: 'Node 2',
  }
])

const { addEdges } = useVueFlow()

onMounted(() => {
  // add an edge after mount
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
})
</script>

<template>
  <VueFlow :nodes="initialNodes" />
</template>
```

```vue [<LogosTypescript />]
<script setup lang="ts">
import type { Node } from '@vue-flow/core'  
import { VueFlow, useVueFlow } from '@vue-flow/core'

const initialNodes = ref<Node[]>([
  {
    id: '1',
    position: { x: 50, y: 50 },
    label: 'Node 1',
  },
  {
    id: '2',
    position: { x: 50, y: 250 },
    label: 'Node 2',
  }
])

const { addEdges } = useVueFlow()

onMounted(() => {
  // add an edge after mount
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
})
</script>

<template>
  <VueFlow :nodes="initialNodes" />
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

```js [edges <LogosJavascript />]
import { ref } from 'vue'

export const edges = ref([
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    // this will create the edge-type `custom`
    type: 'custom',
  },
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    // this will create the edge-type `special`
    type: 'special',
  }
])
```

```vue [CustomEdge.vue <LogosJavascript />]
<script setup>
import { BezierEdge } from '@vue-flow/core';

const props = defineProps(['sourceX', 'sourceY', 'targetX', 'targetY', 'sourcePosition', 'targetPosition']);

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

```ts [edges <LogosTypescript />]
import { ref } from 'vue'
import type { Edge } from '@vue-flow/core'

// You can pass 3 optional generic arguments to the Edge type, allowing you to define:
// 1. The data object type
// 2. The events object type
// 3. The possible edge types

interface CustomData {
    hello: string
}

type CustomEdgeTypes = 'custom' | 'special'

type CustomEdge = Edge<CustomEdgeData, any, CustomEdgeTypes>

export const edges = ref<CustomEdge[]>([
    {
        id: 'e1-2',
        source: '1',
        target: '2',
        // this will create the edge-type `custom`
        type: 'custom',
    },
    {
        id: 'e1-2',
        source: '1',
        target: '2',
        // this will create the edge-type `special`
        type: 'special',
    },
    
    // this will throw a type error, as the type is not defined in the CustomEdgeTypes
    // regardless it would be rendered as a default edge type
    {
        id: 'e1-2',
        source: '1',
        target: '2',
        type: 'not-defined',
    }
])
```

```vue [CustomEdge.vue <LogosTypescript />]
<script setup lang="ts">
import type { EdgeProps } from '@vue-flow/core';
import { BezierEdge } from '@vue-flow/core';

import { CustomData } from './edges'

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

```vue{18,26}
<script setup>
import { VueFlow } from '@vue-flow/core'
import CustomEdge from './CustomEdge.vue'

const elements = ref([
  {
    id: '1',
    label: 'Node 1',
    position: { x: 50, y: 50 },
  },
  {
    id: '2',
    label: 'Node 2',
    position: { x: 50, y: 250 },
  },
  {
    id: 'e1-2',
    type: 'custom',
    source: '1',
    target: '2',
  },
])
</script>
<template>
  <VueFlow v-model="elements">
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

```vue{5-7,28}
<script setup>
import { markRaw } from 'vue'
import CustomEdge from './CustomEdge.vue'

const edgeTypes = {
  custom: markRaw(CustomEdge),
}

const elements = ref([
  {
    id: '1',
    label: 'Node 1',
  },
  {
    id: '1',
    label: 'Node 1',
  },
    {
    id: 'e1-2',
    type: 'custom',
    source: '1',
    target: '2',
  },
])
</script>
<template>
  <div style="height: 300px">
    <VueFlow v-model="elements" :edge-types="edgeTypes" />
  </div>
</template>
```

## [Edge Props](/typedocs/interfaces/EdgeProps)

Your custom edges are enclosed so that fundamental functions like selecting operate.
But you may wish to expand on these features or implement your business logic inside edges, thus your edges receive the following properties:

| Name                | Definition                    | Type                                           | Optional                                   |
|---------------------|-------------------------------|------------------------------------------------|--------------------------------------------|
| id                  | Edge id                       | string                                         | <Close class="text-red-500" />             |
| source              | The source node id            | string                                         | <Close class="text-red-500" />             |
| target              | The target node id            | string                                         | <Close class="text-red-500" />             |
| sourceNode          | The source node               | GraphNode                                      | <Close class="text-red-500" />             |
| targetNode          | The target node               | GraphNode                                      | <Close class="text-red-500" />             |
| sourceX             | X position of source handle   | number                                         | <Close class="text-red-500" />             |
| sourceY             | Y position of source handle   | number                                         | <Close class="text-red-500" />             |
| targetX             | X position of target handle   | number                                         | <Close class="text-red-500" />             |
| targetY             | Y position of target handle   | number                                         | <Close class="text-red-500" />             |
| type                | Edge type                     | string                                         | <Check class="text-[var(--vp-c-brand)]" /> |
| sourceHandleId      | Source handle id              | string                                         | <Check class="text-[var(--vp-c-brand)]" /> |
| targetHandleId      | Target handle id              | string                                         | <Check class="text-[var(--vp-c-brand)]" /> |
| data                | Custom data object            | Any object                                     | <Check class="text-[var(--vp-c-brand)]" /> |
| events              | Edge events and custom events | [EdgeEventsOn](/typedocs/types/EdgeEventsOn)   | <Check class="text-[var(--vp-c-brand)]" /> |
| label               | Edge label                    | string, Component                              | <Check class="text-[var(--vp-c-brand)]" /> |
| labelStyle          | Additional label styles       | CSSProperties                                  | <Check class="text-[var(--vp-c-brand)]" /> |
| labelShowBg         | Enable/Disable label bg       | boolean                                        | <Check class="text-[var(--vp-c-brand)]" /> |
| labelBgPadding      | Edge label bg padding         | number                                         | <Check class="text-[var(--vp-c-brand)]" /> |
| labelBgBorderRadius | Edge label bg border radius   | number                                         | <Check class="text-[var(--vp-c-brand)]" /> |
| selected            | Is edge selected              | boolean                                        | <Check class="text-[var(--vp-c-brand)]" /> |
| animated            | Is edge animated              | boolean                                        | <Check class="text-[var(--vp-c-brand)]" /> |
| updatable           | Is edge updatable             | [EdgeUpdatable](/typedocs/types/EdgeUpdatable) | <Check class="text-[var(--vp-c-brand)]" /> |
| markerEnd           | Edge marker id                | string                                         | <Check class="text-[var(--vp-c-brand)]" /> |
| markerStart         | Edge marker id                | string                                         | <Check class="text-[var(--vp-c-brand)]" /> |
| curvature           | Edge path curvature           | number                                         | <Check class="text-[var(--vp-c-brand)]" /> |

## Edge Events

Vue Flow provides two main ways of listening to edge events,
either by using `useVueFlow` to bind listeners to the event handlers
or by using binding listeners to the `<VueFlow>` component.

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
  
const elements = ref([
  {
    id: '1',
    label: 'Node 1',
    position: { x: 50, y: 50 },
  },
  {
    id: '2',
    label: 'Node 2',
    position: { x: 50, y: 250 },
  },
  {
    id: 'e1-2',
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
  <VueFlow v-model="elements" />
</template>
```

```vue [component]
<script setup>
import { ref } from 'vue'
import { VueFlow } from '@vue-flow/core'

const elements = ref([
  {
    id: '1',
    label: 'Node 1',
    position: { x: 50, y: 50 },
  },
  {
    id: '2',
    label: 'Node 2',
    position: { x: 50, y: 250 },
  },
  {
    id: 'e1-2',
    source: '1',
    target: '2',
  },
])
</script>

<template>
  <!-- bind listeners to the event handlers -->
  <VueFlow
    v-model="elements"
    @edge-click="console.log('edge clicked', $event)"
    @edge-double-click="console.log('edge double clicked', $event)"
    @edge-context-menu="console.log('edge context menu', $event)"
    @edge-mouse-enter="console.log('edge mouse enter', $event)"
    @edge-mouse-leave="console.log('edge mouse leave', $event)"
    @edge-mouse-move="console.log('edge mouse move', $event)"
    @edge-update-start="console.log('edge update start', $event)"
    @edge-update="console.log('edge update', $event)"
    @edge-update-end="console.log('edge update end', $event)"
  />
</template>
```

:::

<div class="mt-4 bg-[var(--vp-code-block-bg)] rounded-lg h-50">
  <VueFlow 
    v-model="bezierEdge" 
    @edge-click="console.log('edge clicked', $event)"
    @edge-double-click="console.log('edge double clicked', $event)"
    @edge-context-menu="console.log('edge context menu', $event)"
    @edge-mouse-enter="console.log('edge mouse enter', $event)"
    @edge-mouse-leave="console.log('edge mouse leave', $event)"
    @edge-mouse-move="console.log('edge mouse move', $event)"
    @edge-update-start="console.log('edge update start', $event)"
    @edge-update="console.log('edge update', $event)"
    @edge-update-end="console.log('edge update end', $event)"
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
