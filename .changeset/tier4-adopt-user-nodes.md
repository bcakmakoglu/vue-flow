---
"@vue-flow/core": patch
---

Compute parent-aware node positions through `@xyflow/system`'s `adoptUserNodes`. vue-flow hands raw user nodes to system's adopt routine, which produces `internals.positionAbsolute`, `internals.z`, `internals.rootParentIndex`, and `internals.handleBounds` correct from the first paint — the previous flow set `internals.positionAbsolute` naively to `node.position` and relied on the per-node `NodeWrapper` watcher to "correct" child positions on the next reactive tick (that watcher is gone; the store recomputes absolute positions imperatively).

Also reshape `store.parentLookup` from `Map<string, Set<string>>` to `Map<string, Map<string, GraphNode<NodeType>>>` to match `@xyflow/system`'s `ParentLookup`. The only existing consumer (`NodeWrapper`'s `isParent` derived ref) used `.size`, which works the same on both shapes. This makes the lookup usable as a direct argument to `updateAbsolutePositions` / `handleExpandParent`.

Hand-written code that called `store.parentLookup.value.get(id)?.has(childId)` (set semantics) needs to switch to `.has(childId)` on the inner `Map` — same call signature, same answer.
