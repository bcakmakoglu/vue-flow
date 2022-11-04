---
'@vue-flow/core': minor
---

Add intersection utils to help with checking if a node intersects with either other nodes or a given area

### Usage

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
