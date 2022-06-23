# Edges

Edges are what connects your nodes into a map.

They cannot exist on their own and need nodes to which they are connected.

Each edge <span class="font-bold text-blue-500">requires a unique id, a source node and a target node id.</span>
Anything else is optional.

You can check the full options for an edge element in the TypeDocs [here](/typedocs/interfaces/Edge.html/).

## Usage

Generally you create edges by adding them to the model-value or the edges prop of the Vue Flow component.

```vue:no-line-numbers
<script>
import { VueFlow } from '@braks/vue-flow'

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
[useVueFlow](/typedocs/functions/useVueFlow.html/) will provide
you with an [`addEdges`](/typedocs/interfaces/Actions.html#addedges/) utility function, which you can use to add edges
directly to the state.

```vue:no-line-numbers
<script setup>
import { VueFlow, useVueFlow } from '@braks/vue-flow'

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

You can also apply changes (like removing elements safely) using
the [`applyEdgeChanges`](/typedocs/interfaces/Actions.html#applyedgechanges/) utility function, which expects an array
of [changes](/typedocs/types/EdgeChange.html/) to be applied to the currently stored edges.

## [Default Edge-Types](/typedocs/types/DefaultEdgeTypes.html/)

Vue Flow comes with built-in edges that you can use right out of the box.
These edge types include `default` (bezier), `step`, `smoothstep` and `straight`.

### Default Edge (Bezier)

A bezier edge has a curved path.

```js:no-line-numbers
const edges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
  }
]
```

### Step Edge

A step edge has a straight path with a step towards the target.

```js:no-line-numbers{4}
const edges = [
  {
    id: 'e1-2',
    type: 'step',
    source: '1',
    target: '2',
  }
]
```

### Smoothstep Edge

The same as the step edge though with a border radius on the step (rounded step).

```js:no-line-numbers{4}
const edges = [
  {
    id: 'e1-2',
    type: 'smoothstep',
    source: '1',
    target: '2',
  }
]
```

### Straight Edge

A simple straight path.

```js:no-line-numbers{4}
const edges = [
  {
    id: 'e1-2',
    type: 'straight',
    source: '1',
    target: '2',
  }
]
```

## Custom Edges

In addition to the default edge types from the previous chapter, you can define any amount of custom edge-types.
Edge-types are inferred from your edge's definition.

```js:no-line-numbers{5,11}
const edges = [
  {
    id: 'e1-2',
    type: 'special',
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

```vue:no-line-numbers{18,26}
<script setup>
import { VueFlow } from '@braks/vue-flow'
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

```vue:no-line-numbers{5-7,28}
<script setup>
import { markRaw } from 'vue'
import CustomEdge from './CustomEdge.vue'

const edgeTypes = {
  custom: markRaw(CustomNode),
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

```vue:no-line-numbers
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

### [Custom Edge Props](/typedocs/interfaces/EdgeProps.html/)

Your custom edges are wrapped so that the basic functions like selecting work.
But you might want to extend on that functionality or implement your own business logic inside of edges, therefore
your edges receive the following props:

| Name                | Definition                  | Type              | Optional |
|---------------------|-----------------------------|-------------------|----------|
| id                  | Edge id                     | string            | false    |
| source              | The source node id          | string            | false    |
| target              | The target node id          | string            | false    |
| sourceNode          | The source node             | GraphNode         | false    |
| targetNode          | The target node             | GraphNode         | false    |
| sourceX             | X position of source handle | number            | false    |
| sourceY             | Y position of source handle | number            | false    |
| targetX             | X position of target handle | number            | false    |
| targetY             | Y position of target handle | number            | false    |
| type                | Edge type                   | string            | true     |
| targetPosition      | Target handle position      | Position          | true     |
| sourcePosition      | Source handle position      | Position          | true     |
| sourceHandleId      | Source handle id            | string            | true     |
| targetHandleId      | Target handle id            | string            | true     |
| data                | Custom data object          | Any object        | true     |
| label               | Edge label                  | string, Component | true     |
| labelStyle          | Additional label styles     | CSSProperties     | true     |
| labelShowBg         | Enable/Disable label bg     | boolean           | true     |
| labelBgPadding      | Edge label bg padding       | number            | true     |
| labelBgBorderRadius | Edge label bg border radius | number            | true     |
| selected            | Is edge selected            | boolean           | true     |
| animated            | Is edge animated            | boolean           | true     |
| updatable           | Is edge updatable           | boolean           | true     |
| markerStart         | Edge marker                 | string            | true     |
| markerEnd           | Edge marker                 | string            | true     |
| curvature           | Edge path curvature         | number            | true     |
