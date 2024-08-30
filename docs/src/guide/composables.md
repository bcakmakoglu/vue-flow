---
title: Composables
---

# Composables

## [useVueFlow](/typedocs/functions/useVueFlow)

The `useVueFlow` composable provides you with a set of methods to interact with the graph.

```vue
<script setup>
import { ref } from 'vue'
import { useVueFlow, VueFlow } from '@vue-flow/core'

const { onInit, findNode, fitView, snapToGrid } = useVueFlow()

const nodes = ref([/* ... */])

const edges = ref([/* ... */])

// to enable snapping to grid
snapToGrid.value = true

// any event that is emitted from the `<VueFlow />` component can be listened to using the `onEventName` method
onInit((instance) => {
  // `instance` is the same type as the return of `useVueFlow` (VueFlowStore)
  
  fitView()
  
  const node = findNode('1')
  
  if (node) {
    node.position = { x: 100, y: 100 }
  }
})
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" />
</template>
```

`useVueFlow` exposes the whole internal state, including the nodes and edges.
The values are reactive, meaning changing the values returned from `useVueFlow` will trigger changes in the graph.

### State creation and injection

The `useVueFlow` composable creates, on first call, a new instance of the `VueFlowStore` and injects it into the Vue component tree.
This allows you to access the store from any child component using the `useVueFlow` composable.

This also means that the *first call* of `useVueFlow` is crucial as it determines the state instance that will be used throughout the component tree.
You can think of it as a sort of `<VueFlowProvider>` wrapper that is automatically injected into the component tree.

You can read more about this in the [State section of the guide](/guide/vue-flow/state).

#### Enforcing a specific state instance

If necessary, you can enforce the use of a specific state instance by passing an `id` to the `useVueFlow` composable.

```ts
import { useVueFlow } from '@vue-flow/core'

const { onInit } = useVueFlow({ id: 'my-flow-instance' })

onInit((instance) => {
  // `instance` is the same type as the return of `useVueFlow` (VueFlowStore)
})
```

## [useHandleConnections](/typedocs/functions/useHandleConnections)

`useHandleConnections` provides you with an array of connections that are connected to the node you pass to it.

```ts
import { useHandleConnections } from '@vue-flow/core'

// get all connections where this node is the target (incoming connections)
const targetConnections = useHandleConnections({
  type: 'target',
})

// get all connections where this node is the source (outgoing connections)
const sourceConnections = useHandleConnections({
  type: 'source',
})

const connections = useHandleConnections({
  id: 'handle-1', // you can explicitly pass a handle id if there are multiple handles of the same type
  nodeId: '1', // you can explicitly pass a node id, otherwise it's used from the `NodeId  injection
  type: 'target',
  onConnect: (connections: Connection[]) => {
    // do something with the connections
  },
  onDisconnect: (connections: Connection[]) => {
    // do something with the connections
  },
})
```

## [useNodesData](/typedocs/functions/useNodesData)

`useNodesData` provides you with an array of data objects depending on the node ids you pass to it.
It's especially useful when used together with `useHandleConnections`.

```ts
import { useNodesData, useHandleConnections } from '@vue-flow/core'

// get all connections where this node is the target (incoming connections)
const connections = useHandleConnections({
  type: 'target',
})

const data = useNodesData(() => connections.value.map((connection) => connection.source))

console.log(data.value) // [{ /* ... */]
```

To further narrow down the type of the returned data, you can pass a guard function as the 2nd argument.

```ts
import { useNodesData, useHandleConnections, type Node } from '@vue-flow/core'

type MyNode = Node<{ foo: string }>

const connections = useHandleConnections({
  type: 'target',
})

const data = useNodesData(() => connections.value.map((connection) => connection.source), (node): node is MyNode => node.type === 'foo')

console.log(data.value) // [{ /* foo: string */]
```

## [useNodeId](/typedocs/functions/useNodeId)

`useNodeId` provides you with the current node id.

This composable should be called *inside a custom node component*,
as the id for the node is provided by the internal `<NodeWrapper />` component.

```ts
import { useNodeId } from '@vue-flow/core'

const nodeId = useNodeId()

console.log(nodeId.value) // '1'
```

## [useHandle](/typedocs/functions/useHandle)

Instead of using the Handle component you can use the useHandle composable to create your own custom nodes. 

`useHandle`
provides you with a pointerDown- and click-handler functions that you can apply to the element you want to use as a
node-handle.

This is how the default handle component is built:

```vue

<script lang="ts" setup>
import { NodeId, useHandle, useVueFlow } from '@vue-flow/core'
import type { HandleProps, Position } from '@vue-flow/core'

const props = withDefaults(defineProps<HandleProps>(), {
  type: 'source',
  position: 'top' as Position,
  connectable: true,
})

const nodeId = inject(NodeId, '')

const { id, hooks, connectionStartHandle } = useVueFlow()

const { handlePointerDown, handleClick } = useHandle({
  nodeId,
  handleId: props.id,
  isValidConnection: props.isValidConnection,
  type: props.type,
})

const onMouseDownHandler = (event: MouseEvent) => handlePointerDown(event)

const onClickHandler = (event: MouseEvent) => handleClick(event)
</script>

<script lang="ts">
export default {
  name: 'CustomHandle',
}
</script>

<template>
  <div
    :data-handleid="id"
    :data-nodeid="nodeId"
    :data-handlepos="position"
    class="vue-flow__handle nodrag"
    :class="[
      `vue-flow__handle-${position}`,
      `vue-flow__handle-${id}`,
      {
        source: type !== 'target',
        target: type === 'target',
        connectable: connectable,
        connecting:
          connectionStartHandle?.nodeId === nodeId &&
          connectionStartHandle?.handleId === id &&
          connectionStartHandle?.type === type,
      },
    ]"
    @mousedown="onMouseDownHandler"
    @click="onClickHandler"
  >
    <slot :node-id="nodeId" v-bind="props"></slot>
  </div>
</template>
```
