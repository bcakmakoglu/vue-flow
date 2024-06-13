---
title: Handles
---

# Introduction to Handles

Handles are the small circles that are usually placed on the borders of a node. They are used to connect nodes
together by dragging a connection-line from one handle to another, resulting in a connection ([Edge](/guide/edge))
between the nodes.

Handles are a crucial part of the VueFlow library, as they are the main interaction point for the user to create
connections between nodes.

Without handles, it is basically impossible to create edges between nodes, as the `<Handle>` components are used
to calculate the points for the edges.

## Handle Component

The `<Handle>` component is a simple component that is used to create a handle for a node. It is a wrapper around a
`<div>` element that provides the necessary event handlers to create edges between nodes.

The `<Handle>` component is used in the `<Node>` component to create handles for the node.

## Multiple Handles

A node can have multiple handles, the number of handles is not limited and you can use as many handles as you need.
When using multiple handles of the same type (`source` or `target`), each handle needs to have a unique id.

```vue
<!-- each of these handles needs a unique id since we're using two `source` type handles -->
<Handle id="a" type="source" :position="Position.Right" />
<Handle id="b" type="source" :position="Position.Right" />
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

## Hide Handles

In some cases you might not want to display a handle at all. You can hide a handle by setting `opacity: 0` as the styles for that handle.

You cannot hide a handle by removing it from the DOM (for example using `v-if` or `v-show`) as that would break the calculations for the edges.

```vue
<Handle type="source" :position="Position.Right" style="opacity: 0" />
```
