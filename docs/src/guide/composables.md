---
title: Composables
---

# Composables

## [useVueFlow](/typedocs/functions/useVueFlow)

The `useVueFlow` composable provides you with a set of methods to interact with the graph.

```ts twoslash
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
```

`useVueFlow` exposes the whole internal state, including the nodes and edges.
The values are reactive, meaning changing the values returned from `useVueFlow` will trigger changes in the graph.

## [useHandleConnections](/typedocs/functions/useHandleConnections)

`useHandleConnections` provides you with an array of connections that are connected to the node you pass to it.

```ts twoslash
import type { Connection } from '@vue-flow/core'
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
  // you need to pass the handle id if there are multiple handles of the same type (`source` or `target`)
  id: 'handle-1',

  // you can pass a node id, otherwise it's used from the `NodeId  injection
  nodeId: '1',
  
  type: 'target',
  
  onConnect: (connections: Connection[]) => {
    // ... handle new connections
  },
  
  onDisconnect: (connections: Connection[]) => {
    // ... handle disconnected connections
  },
})
```

## [useNodesData](/typedocs/functions/useNodesData)

`useNodesData` provides you with an array of data objects depending on the node ids you pass to it.
It's especially useful when used together with `useHandleConnections`.

```ts twoslash
import { useNodesData, useHandleConnections } from '@vue-flow/core'

// get all connections where this node is the target (incoming connections)
const connections = useHandleConnections({
  type: 'target',
})

const data = useNodesData(() => connections.value.map((connection) => connection.source))

console.log(data.value) // [{ /* ... */]
```

To further narrow down the type of the returned data, you can pass a guard function as the 2nd argument.

```ts twoslash
import type { Node } from '@vue-flow/core'
import { useNodesData, useHandleConnections } from '@vue-flow/core'

type MyNode = Node<{ foo: string }>

const connections = useHandleConnections({
  type: 'target',
})

const data = useNodesData(() => connections.value.map((connection) => connection.source), (node): node is MyNode => node.type === 'foo')

console.log(data.value) // [{ /* id: string; type: string; data: { foo: string } */]
```

## [useNodeId](/typedocs/functions/useNodeId)

`useNodeId` provides you with the current node id.

This composable should be called *inside a custom node component*,
as the id for the node is provided by the internal `<NodeWrapper />` component.

```ts twoslash
import { useNodeId } from '@vue-flow/core'

const nodeId = useNodeId()

console.log(nodeId.value) // '1'
```

## [useHandle](/typedocs/functions/useHandle)

Instead of using the Handle component you can use the useHandle composable to create your own custom nodes. `useHandle`
provides you with a mouseDown- and click-handler functions that you can apply to the element you want to use as a
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

const { id, hooks, connectionStartHandle } = useVueFlow()
const nodeId = inject(NodeId, '')

const { onMouseDown, onClick } = useHandle()
const onMouseDownHandler = (event: MouseEvent) =>
  onMouseDown(event, props.id ?? null, nodeId, props.type === 'target', props.isValidConnection, undefined, (connection) =>
    hooks.value.connect.trigger(connection),
  )
const onClickHandler = (event: MouseEvent) => onClick(event, props.id ?? null, nodeId, props.type, props.isValidConnection)
</script>

<script lang="ts">
export default {
  name: 'Handle',
}
</script>

<template>
  <div
    :data-handleid="props.id"
    :data-nodeid="nodeId"
    :data-handlepos="props.position"
    class="vue-flow__handle nodrag"
    :class="[
      `vue-flow__handle-${props.position}`,
      `vue-flow__handle-${id}`,
      {
        source: props.type !== 'target',
        target: props.type === 'target',
        connectable: props.connectable,
        connecting:
          connectionStartHandle?.nodeId === nodeId &&
          connectionStartHandle?.handleId === props.id &&
          connectionStartHandle?.type === props.type,
      },
    ]"
    @mousedown="onMouseDownHandler"
    @click="onClickHandler"
  >
    <slot :node-id="nodeId" v-bind="props"></slot>
  </div>
</template>
```
