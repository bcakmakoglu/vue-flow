---
title: Handles
---

# Introduction to Handles

Handles are the small circles that are usually placed on the borders of a node. They are used to connect nodes
together by dragging a connection-line from one handle to another, resulting in a connection ([Edge](/guide/edge))
between the nodes.

Handles are a crucial part of VueFlow, as they are the main interaction point for a user to create edges between nodes.

Without handles, it is basically impossible to create edges between nodes, as the handles are used
to calculate the source and target points for edges.

## `<Handle>` Component

The `<Handle>` component is a component exported by `@vue-flow/core` that you can use to create a handle for a node. 
It is a wrapper around a `<div>` element that provides the necessary event handler bindings to start connections.

The `<Handle>` component can be used in a (custom) node component to create handles for the node.
Using `<Handle>` components outside a node component context will not work as expected, so try to avoid this.

```vue
<script setup>
import { Handle } from '@vue-flow/core'
  
defineProps(['id', 'sourcePosition', 'targetPosition', 'data'])
</script>

<template>
  <Handle type="source" :position="sourcePosition" />
  
  <span>{{ data.label }}</span>
  
  <Handle type="target" :position="targetPosition" />
</template>
```

## Handle Positions

Handles can be placed on the following positions:

- `Top`
- `Right`
- `Bottom`
- `Left`

Each position corresponds to a side of the node.
The position of the handle also determines which direction an edge will bend towards when drawn from and to a handle.

For example a handle with `position="Position.Top"` will result in an edge that bends to the *top* when drawn *from* that handle.
A handle with `position="Position.Right"` will result in an edge that bends to the *left* when drawn *to* that handle.

### Adjusting Handle Positions

Handles are positioned on their respective side using CSS with an `absolute` position.
That means you can adjust what element a handle aligns itself with by wrapping it in a container that has a `relative` position.

```vue
<template>
  <div>
    <span>{{ data.label }}</span>

    <div style="position: relative; padding: 10px">
      <Handle type="source" :position="Position.Right" />


      <Handle type="target" :position="Position.Left" />
    </div>
  </div>
</template>
```

## Multiple Handles

A node can have multiple handles, the number of handles is not limited and you can use as many handles as you need.
When using multiple handles of the same type (`source` or `target`), each handle needs to have a unique id.

```vue
<!-- each of these handles needs a unique id since we're using two `source` type handles -->
<Handle id="source-a" type="source" :position="Position.Right" />
<Handle id="source-b" type="source" :position="Position.Right" />

<!-- each of these handles needs a unique id since we're using two `target` type handles -->
<Handle id="target-a" type="target" :position="Position.Left" />
<Handle id="target-b" type="target" :position="Position.Left" />
```

The `id` prop is used to identify the handle when creating edges between nodes. If no `id` is provided, the first handle 
of the necessary type will be used.

```ts
const { onConnect } = useVueFlow()

onConnect(({ source, target, sourceHandle, targetHandle }) => {
  console.log('source', source)
  console.log('target', target)
  // these are the handle ids of the source and target node
  // if no id is specified these will be `null`, meaning the first handle of the necessary type will be used
  console.log('sourceHandle', sourceHandle)
  console.log('targetHandle', targetHandle)
})
```

### Positioning with Multiple Handles

Sometimes you want to add multiple handles to the same side. In that case you often end up having two handles on top of each other instead of next to each other.
Handles will not layout themselves automatically, so you need to manually adjust their position.

You can do so using CSS styles. 
For example, you can set the `top` and `bottom` properties to position the handles on the top and bottom of the right side of the node.
```vue
<Handle id="source-a" type="source" :position="Position.Right" style="top: 10px" />
<Handle id="source-b" type="source" :position="Position.Right" style="bottom: 10px; top: auto;" />
```

## Specifying Edge Type for Connections

You can specify which edge type should be used when creating connections from a handle by setting the `connectionEdgeType` prop.

When a connection is created from a handle with `connectionEdgeType` specified, the resulting connection object will include a `type` field. 
This allows `addEdges()` to automatically create edges with the specified type.

```vue
<script setup>
import { Handle, Position } from '@vue-flow/core'
</script>

<template>
  <!-- Connections from this handle will create 'smoothstep' edges -->
  <Handle 
    type="source" 
    connectionEdgeType="custom"
    :position="Position.Right" 
  />
</template>
```

```vue
<script setup>
import { ref } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'

const { addEdges } = useVueFlow()

// When onConnect is called, the connection will include type: 'custom'
// addEdges will create an edge with this type
onConnect(addEdges)
</script>
```

## Hidden Handles

In some cases you might not want to display a handle at all. You can hide a handle by setting `opacity: 0` as the styles for that handle.

You cannot hide a handle by removing it from the DOM (for example using `v-if` or `v-show`) as that would break the calculations for the edges.

```vue
<Handle type="source" :position="Position.Right" style="opacity: 0" />
```

## Limiting Connections

You can limit the number of connections a handle can have by setting the `connectable` prop on the `<Handle>` component.

This prop accepts a boolean value (defaults to `true`), a number (the maximum number of connections), or a function that returns a boolean.

Using a function allows you to implement custom logic to determine if a handle can be connected to or not.
```vue
<script lang="ts" setup>
import { Position, Handle, type HandleConnectableFunc } from '@vue-flow/core'  
  
const handleConnectable: HandleConnectableFunc = (node, connectedEdges) => {
  // only allow connections if the node has less than 3 connections
  return connectedEdges.length < 3
}
</script>

<template>
  <Handle type="source" :position="Position.Right" :connectable="handleConnectable" />
</template>
```

## Connection Mode

By default, Vue Flow will use `<VueFlow :connection-mode="ConnectionMode.Loose" />` which allows you to connect edges to any handle.
That means connections between a `source` and another `source` type `<Handle>` are allowed.

If you want to restrict connections to only be made between `source` and `target` type handles, you can set the `connection-mode` prop to `ConnectionMode.Strict`.

```vue
<script setup>
import { ConnectionMode, VueFlow } from '@vue-flow/core'
</script>

<template>
  <VueFlow :connection-mode="ConnectionMode.Strict" />
</template>
```

## Dynamic Handle Positions & Adding/Removing Handles Dynamically

::: tip
In Vue Flow 1.x, there's no need to manually invoke `updateNodeInternals` when dynamically adding handles.
Upon mounting, handles will automatically attempt to attach to the node.
However, if for any reason this isn't happening as expected, you can stick to the guideline provided below to enforce Vue Flow to update the node internals.
:::

At times, you may need to modify handle positions dynamically or programmatically add new handles to a node. In this scenario, the [`updateNodeInternals`](/typedocs/type-aliases/UpdateNodeInternals) method found in Vue Flow's API comes in handy.

Invoking this method is vital when dealing with dynamic handles. If not, the node might fail to recognize these new handles, resulting in misaligned edges.

The `updateNodeInternals` function can be deployed in one of two ways:

- **Using the store action:** This approach allows you to update several nodes at once by passing their IDs into the method.
- **Emitting the `updateNodeInternals` event from your customized node component:** This doesn't require any parameters to be passed.

::: code-group

```js [store action]
import { useVueFlow } from '@vue-flow/core'

const { updateNodeInternals } = useVueFlow()

const onSomeEvent = () => {
  updateNodeInternals(['1'])
}
```

```vue [emit event]
<script setup>
const emits = defineEmits(['updateNodeInternals'])

const onSomeEvent = () => {
  emits('updateNodeInternals')
}
</script>
```

:::
