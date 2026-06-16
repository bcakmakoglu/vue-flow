---
"@vue-flow/core": major
---

Rename `GraphNode` to `InternalNode` (and the `isGraphNode` type guard to `isInternalNode`), mirroring xyflow/react. `InternalNode` is the enriched, store-internal node returned by `getInternalNode` / `useInternalNode` / `nodeLookup`. The `GraphNode` name is removed — replace `GraphNode<T>` with `InternalNode<T>` and `isGraphNode(…)` with `isInternalNode(…)`.
