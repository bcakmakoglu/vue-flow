---
'@vue-flow/core': minor
---

Add intersection utils to help with checking if a node intersects with either other nodes or a given area

### Usage

- You can either use the action `getIntersectingNodes` to find all nodes that intersect with a given node

```js
const { onNodeDrag, getIntersectingNodes, getNodes } = useVueFlow()

onNodeDrag(({ node }) => {
  const intersections = getIntersectingNodes(node).map((n) => n.id)

  getNodes.value.forEach((n) => {
    // highlight nodes that are intersecting with the dragged node  
    n.class = intersections.includes(n.id) ? 'highlight' : ''
  })
})
```

- Node drag events will provide you with the intersecting nodes without having to call the action explicitly.

```js

onNodeDrag(({ intersections }) => {
  getNodes.value.forEach((n) => {
    n.class = intersections?.some((i) => i.id === n.id) ? 'highlight' : ''
  })
})
```

- Or you can use the `isIntersecting` util to check if a node intersects with a given area

```js
const { onNodeDrag, isNodeIntersecting } = useVueFlow()

onNodeDrag(({ node }) => {
  // highlight the node if it is intersecting with the given area
  node.class = isNodeIntersecting(node, { x: 0, y: 0, width: 100, height: 100 }) ? 'highlight' : ''
})
```
