---
"@vue-flow/core": minor
---

Add node id and node type to return of `useNodesData`.

⚠️This is a small breaking change from the previous implementation!

Previously you would only receive the data object back, now you will receive an object with the data and the node id and type.

```ts
const nodesData = useNodesData(nodeIds);

// Previously
nodesData.forEach((data) => {
  // ...
});

// Now
nodesData.forEach(({ id, type, data }) => {
  // ...
});
```
