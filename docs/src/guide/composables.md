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

const { onInit, getNode, fitView, updateNode } = useVueFlow()

const nodes = ref([/* ... */])

const edges = ref([/* ... */])

// `<VueFlow>` settings such as grid snapping are props — drive them from a ref
const snapToGrid = ref(true)

// any event that is emitted from the `<VueFlow />` component can be listened to using the `onEventName` method
onInit((instance) => {
  // `instance` is the same type as the return of `useVueFlow` (VueFlowInstance)
  
  fitView()
  
  const node = getNode('1')
  
  if (node) {
    // nodes are stored immutably — update them through the `updateNode` action, not by mutating in place
    updateNode('1', { position: { x: 100, y: 100 } })
  }
})
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" :snap-to-grid="snapToGrid" />
</template>
```

`useVueFlow` returns the flow's reactive getters (`getNodes`, `getEdges`, `viewport`, …), actions (`updateNode`, `addEdges`, `fitView`, …) and event hooks (`onInit`, `onConnect`, …) — not the raw state.
The getters are read-only; update the graph through the actions (or by binding `v-model:nodes` / `:edges` etc. on `<VueFlow>`). If you need the writable state directly, reach for `useStore` / `storeToRefs`.

### State creation and injection

`useVueFlow` does **not** create a store — it's a pure consumer. It takes no arguments and resolves the instance from the nearest `<VueFlow>` / `<VueFlowProvider>` ancestor via Vue's `inject` (it throws if there is none).

The store is created and owned by whichever provider sits above the call site:

- `<VueFlow>` provides its own store to its children.
- `<VueFlowProvider>` creates a store and shares it with everything inside it — use it when components *outside* `<VueFlow>` (a sidebar, a toolbar) need the same instance, or when you want to call `useVueFlow` in the same component that renders `<VueFlow>`.

You can read more about this in the [State section of the guide](/guide/vue-flow/state).

#### Multiple flows

There is no global registry or lookup-by-id. Each flow lives in its own provider tree, so multiple flows on a page simply get their own `<VueFlow>` / `<VueFlowProvider>`, and `useVueFlow()` always resolves the nearest one.

## [useNodeConnections](/typedocs/functions/useNodeConnections)

`useNodeConnections` provides you with an array of connections that are connected to a specific node.
This composable is especially useful when you want to get all connections (of either type `source` or `target`) of a node.

```ts
import { type NodeConnection, useNodeConnections } from '@vue-flow/core'

// get all connections where this node is the target (incoming connections)
const targetConnections = useNodeConnections({
  // type is required
  handleType: 'target',
})

// get all connections where this node is the source (outgoing connections)
const sourceConnections = useNodeConnections({
  handleType: 'source',
})

const handleConnections = useNodeConnections({
  handleType: 'source',
  handleId: 'handle-1', // pass a handle id to narrow to a specific handle (requires `handleType`)
})

const connections = useNodeConnections({
  id: '1', // you can explicitly pass a node id, otherwise it's used from the `NodeId` injection
  handleType: 'target',
  onConnect: (connections: NodeConnection[]) => {
    // do something with the connections
  },
  onDisconnect: (connections: NodeConnection[]) => {
    // do something with the connections
  },
})
```

## [useNodesData](/typedocs/functions/useNodesData)

`useNodesData` provides you with an array of data objects depending on the node ids you pass to it.
It's especially useful when used together with `useNodeConnections`.

```ts
import { useNodesData, useNodeConnections } from '@vue-flow/core'

// get all connections where this node is the target (incoming connections)
const connections = useNodeConnections({
  handleType: 'target',
})

const data = useNodesData(() => connections.value.map((connection) => connection.source))

console.log(data.value) // [{ /* ... */]
```

To further narrow down the type of the returned data, you can pass a guard function as the 2nd argument.

```ts
import { useNodesData, useNodeConnections, type Node } from '@vue-flow/core'

type MyNode = Node<{ foo: string }>

const connections = useNodeConnections({
  handleType: 'target',
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
import { useHandle, useNodeId, useStore } from '@vue-flow/core'
import type { HandleProps, Position } from '@vue-flow/core'

const props = withDefaults(defineProps<HandleProps>(), {
  type: 'source',
  position: 'top' as Position,
  isConnectable: true,
})

const nodeId = useNodeId()

// read raw store state directly — `store.x` is reactive inside computeds/templates, so a per-instance
// component doesn't need `storeToRefs` (which re-derives a ref for every state key on each call)
const store = useStore()

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
        connectable: isConnectable,
        connecting:
          store.connectionStartHandle?.nodeId === nodeId &&
          store.connectionStartHandle?.id === id &&
          store.connectionStartHandle?.type === type,
      },
    ]"
    @mousedown="onMouseDownHandler"
    @click="onClickHandler"
  >
    <slot :node-id="nodeId" v-bind="props"></slot>
  </div>
</template>
```
