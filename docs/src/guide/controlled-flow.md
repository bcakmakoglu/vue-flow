---
title: Controlled Flow
---

# Taking Control of Vue Flow

::: warning
This API is subject to change in the next major release where changes will not be applied automatically anymore.
:::

By default, Vue Flow will apply *changes* automatically, so you don't have to worry about it.

Though, there are cases where you want to take control of changes and apply them manually after some processing and validations for example.

In this guide, we will learn how to take control of changes and apply them manually.

## What is a [Change](https://vueflow.dev/typedocs/type-aliases/NodeChange.html)?

A *change* is anything that is triggered by an interaction with the flow, like adding, updating (position, selected), or removing a node or an edge, either
by dragging, clicking etc. or by using the provided API.

These changes are communicated to the user-land through the `onNodesChange` and `onEdgesChange` events.

Possible Changes include:

- [`add`](https://vueflow.dev/typedocs/interfaces/NodeAddChange.html): A node or an edge was added.
- [`remove`](https://vueflow.dev/typedocs/interfaces/NodeRemoveChange.html): A node or an edge was removed.
- [`select`](https://vueflow.dev/typedocs/interfaces/NodeSelectionChange.html): A node or an edge was selected/unselected.
- [`position`](https://vueflow.dev/typedocs/interfaces/NodePositionChange.html): A nodes' position was updated.
- [`dimensions`](https://vueflow.dev/typedocs/interfaces/NodeDimensionChange.html): A nodes' dimensions were updated.

::: warning
Changes *do not* refer to *any* change in the flow, like zooming or panning, or just updating the `data` object of a node.
:::

### Why is no change emitted when I update a node?

Vue Flow will not track your nodes/edges and try to figure out what changed, it will only emit changes when you interact with the flow or use the API.

For example this *will not* emit a change:

```vue
<script setup>
import { ref } from 'vue'

const nodes = ref([
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { label: 'Node 1' },
  },
])

// this function *will not* emit a change
function removeNode() {
  nodes.value = nodes.value.filter((node) => node.id !== '1')
}
</script>
```

This is because Vue Flow does not know that the node with id `1` was removed, it only knows about changes that are triggered by the user or the API.

This, for example, *will* emit a change:

```vue
<script setup>
import { ref } from 'vue'
import { useVueFlow } from '@vue-flow/core'

const nodes = ref([
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { label: 'Node 1' },
  },
])

// this function *will* emit a change
const { removeNodes } = useVueFlow()

removeNodes('1')
</script>
```

## The `applyDefault` option

The `applyDefault` option is a prop that can be passed to the `<VueFlow>` component to enable or disable automatic change handling.

By setting this option to `false`, we tell Vue Flow to not apply changes automatically anymore, 
that way we can take control of changes and apply them manually.

```vue
<template>
  <VueFlow :nodes="nodes" :edges="edges" :apply-default="false" />
</template>
```

## `onNodesChange` / `onEdgesChange` events

Vue Flow provides two events that can be used to listen to changes on nodes and edges.
These events are emitted regardless of the `applyDefault` option, so you can use them to listen to changes even if you have automatic changes enabled.

```vue
<script setup>
import { VueFlow, useVueFlow } from '@vue-flow/core'  

const { onNodesChange, onEdgesChange } = useVueFlow()

onNodesChange((changes) => {
  // changes are arrays of type `NodeChange`
  console.log(changes)
})

onEdgesChange((changes) => {
  // changes are arrays of type `EdgeChange`
  console.log(changes)
})
  
const onChange = (changes) => {
  // changes are arrays of type `NodeChange` or `EdgeChange`
  console.log(changes)
}
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" @nodes-change="onChange" @edges-change="onChange" />
</template>
```

## `applyNodeChanges` / `applyEdgeChanges`

Vue Flow provides two functions that can be used to apply changes manually.

These functions are available from the `useVueFlow` composable.

```vue
<script setup>
import { useVueFlow } from '@vue-flow/core'

const { applyNodeChanges, applyEdgeChanges } = useVueFlow();

const onChange = (changes) => {
  // apply changes manually
  applyNodeChanges(changes)
}
</script>
```

## Validating Changes

Using what we just learned, we can now take control of changes and apply them manually.

In this example, we will first disable automatic change handlers with `applyDefault`, 
then use the `onNodesChange` event to listen to changes and validate delete changes and, 
if they are valid, use `applyNodeChanges` to apply them.

::: info
Checkout the [confirm delete example](/examples/confirm.html).
:::

```vue
<script setup>
import { ref } from 'vue'
import { useVueFlow, VueFlow } from '@vue-flow/core'

const { applyNodeChanges } = useVueFlow();

const { confirm } = useConfirm();

const nodes = ref([
  {
    id: '1',
    position: { x: 0, y: 0 },
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
    source: '1',
    target: '2',
  },
])

const onNodesChange = async (changes) => {
  const nextChanges = []

  for (const change of changes) {
    if (change.type === 'remove') {
      const isConfirmed = await confirm('Are you sure you want to delete this node?')

      if (isConfirmed) {
        nextChanges.push(change)
      }
    } else {
      nextChanges.push(change)
    }
  }

  applyNodeChanges(nextChanges)
}
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" :apply-changes="false" @nodes-change="onNodesChange" />
</template>
```
