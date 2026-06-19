---
"@vue-flow/core": patch
---

`NodeWrapper` now resolves its node with a direct `computed(() => getInternalNode(id))` instead of the public `useNode` composable. It only ever used `useNode`'s `node`; resolving directly drops the unused `parentNode`/`connectedEdges` computeds and the `nodeEl` inject (plus a redundant `useVueFlow`/`useStore` resolution) that `useNode` allocated per node. `useNode` itself is unchanged for custom-node use.
