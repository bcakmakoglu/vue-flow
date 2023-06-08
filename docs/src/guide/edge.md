<script setup>
import { VueFlow } from '@vue-flow/core';
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

# Edges

Edges are what connects your nodes into a map.

They cannot exist on their own and need nodes to which they are connected.

Each edge <span class="font-bold text-blue-500">requires a unique id, a source node and a target node id.</span>

You can view the full options-list for an edge [here](/typedocs/types/Edge).

## Usage

Generally you create edges by adding them to the model-value or the edges prop of the Vue Flow component.

```vue
<script>
import { VueFlow } from '@vue-flow/core'

export default defineComponent({
  components: { VueFlow },
  data() {
    return {
      elements: [
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
      ]
    }
  },
  mounted() {
    // Add an edge after mount
    this.elements.push(
      {
        id: 'e1-2',
        source: '1',
        target: '2',
      }
    )
  }
})
</script>
<template>
  <div style="height: 300px">
    <VueFlow v-model="elements" />
  </div>
</template>
```

For more advanced graphs that require more state access you will want to use the useVueFlow composable.
[useVueFlow](/typedocs/functions/useVueFlow) will provide the [`addEdges`](/typedocs/interfaces/Actions#addedges/) action,
which you can use to add edges directly to the state.

```vue
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
const { addEdges } = useVueFlow({
  nodes: initialNodes,
})

onMounted(() => {
  // Add an edge after mount
  addEdges([
     {
        source: '1',
        target: '2',
        sourceHandle: null,
        targetHandle: null,
     }
  ])
})
</script>
<template>
  <div style="height: 300px">
    <VueFlow />
  </div>
</template>
```

## [Default Edge-Types](/typedocs/interfaces/DefaultEdgeTypes)

Vue Flow comes with built-in edges that you can use right out of the box.
These edge types include `default` (bezier), `step`, `smoothstep` and `straight`.

### Default Edge (Bezier)

The default edge is a bezier curve that connects two nodes.

<div class="mt-4 bg-[var(--vp-code-block-bg)] rounded h-50">
  <VueFlow v-model="bezierEdge">
    <Background />
  </VueFlow>
</div>

### Step Edge

A step edge has a straight path with a step towards the target.

<div class="mt-4 bg-[var(--vp-code-block-bg)] rounded h-50">
  <VueFlow v-model="stepEdge">
    <Background />
  </VueFlow>
</div>

### Smoothstep Edge

The same as the step edge though with a border radius on the step (rounded step).

<div class="mt-4 bg-[var(--vp-code-block-bg)] rounded h-50">
  <VueFlow v-model="smoothStepEdge">
    <Background />
  </VueFlow>
</div>

### Straight Edge

A simple straight path.

<div class="mt-4 bg-[var(--vp-code-block-bg)] rounded h-50">
  <VueFlow v-model="straightEdge">
    <Background />
  </VueFlow>
</div>

## Custom Edges

In addition to the default edge types from the previous chapter, you can define any amount of custom edge-types.
Edge-types are inferred from your edge's definition.

```js{4}
const edges = [
  {
    id: 'e1-2',
    type: 'custom',
    source: '1',
    target: '2',
  },
]
```

Vue Flow will now try to resolve this edge-type to a component.
First and foremost we will look for a definition in the `edgeTypes` object of the state.
After that we will try to resolve the component to a globally registered one that matches the exact name.
Finally, we will check if a template slot has been provided to fill the edge-type.

If none of these methods succeed in resolving the component the default (bezier) edge-type will be used as a fallback.

### Template slots

The easiest way to define custom edges is, by passing them as template slots.
Your custom edge-types are dynamically resolved to slot-names, meaning an edge with the type `custom`
will expect a slot to have the name `edge-custom`.

You can choose any name you want for your edge-type, and it will be resolved to the corresponding slot (i.e. `my-edge-type` -> `#edge-my-edge-type`)

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

You can also define edge-types by passing an object as a prop to the VueFlow component (or as an option to the
composable).

::: warning
When doing this, mark your components as raw (using the designated function from the vue library) to avoid them being
turned into reactive objects.
Otherwise, vue will throw a warning in the console.
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

### Edge Template

You can also set a template per edge, which will overwrite the edge-type component but will retain
the type otherwise.

```vue{30}
<script setup>
import { markRaw } from 'vue'
import CustomEdge from './CustomEdge.vue'

const elements = ref([
  {
    id: '1',
    label: 'Node 1',
    position: { x: 0, y: 0 },
  },
  {
    id: '2',
    label: 'Node 2',
    position: { x: 0, y: 150 },
  },
  {
    id: '3',
    label: 'Node 3',
    position: { x: 0, y: 300 },
  },
  {
    id: 'e1-2',
    source: '1',
    target: '2',
  },
  {
    id: 'e1-3',
    source: '1',
    target: '2',
    template: markRaw(CustomEdge),
  },
])
</script>
<template>
  <div style="height: 300px">
    <VueFlow v-model="elements" />
  </div>
</template>
```

### [Custom Edge Props](/typedocs/interfaces/EdgeProps)

Your custom edges are wrapped so that the basic functions like selecting work.
But you might want to extend on that functionality or implement your own business logic inside of edges, therefore
your edges receive the following props:

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

### (Custom) Edge Events

In addition to the event handlers that you can access through [`useVueFlow`](/guide/composables#useVueFlow/) or the Vue Flow component,
you can also pass in event handlers in your initial edge definition, or you can access the edge events through the `events` prop passed
to your edge components.

```vue{19-26}
<script setup>
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
    position: { x: 50, y: 150 },
  },
  {
    id: 'edge1-2',
    source: '1',
    target: '2',
    events: {
      click: () => {
        console.log('Edge clicked')
      },
      change: () => {
        console.log('Something changed')
      },
    },
  }
])
</script>
```

As you can see above, you can also pass in custom event handlers. These will not be called by Vue Flow but can be used
to forward callback functions to your custom components.
The `click` handler is part of the [`EdgeEventsHandler`](/typedocs/types/EdgeEventsHandler) type, meaning it will be
triggered when the edge is clicked.

```vue
<script lang="ts" setup>
import type { EdgeProps, EdgeEventsOn } from '@vue-flow/core'

// define your events
interface CustomEdgeEvents {
  click: EdgeEventsOn['click']
  customEvent: (input: string) => void
}

interface CustomEdgeProps extends EdgeProps<any, CustomEdgeEvents> {
  id: string
  events: CustomEdgeEvents
}

props.events.click(() => {
  console.log(`Edge ${props.id} clicked`)
})

// custom events are just functions, they are not hooks which you can listen to like `click`
props.events.customEvent('custom event triggered')
</script>
<template>
  <!-- Omitted for simplicty -->
</template>
```
