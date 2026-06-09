---
"@vue-flow/core": patch
---

Compute parent-aware initial node positions through `@xyflow/system`'s `adoptUserNodes`. The `createGraphNodes` helper now hands raw user nodes to system's adopt routine, which produces `internals.positionAbsolute`, `internals.z`, `internals.rootParentIndex`, and `internals.handleBounds` correct from the first paint — the previous flow set `internals.positionAbsolute` naively to `node.position` and relied on the per-node `NodeWrapper` watcher to "correct" child positions on the next reactive tick. Each adopt result is then promoted into a vue-flow `GraphNode` via the existing `parseNode` so default flags (`selected: false`, `dragging: false`, etc.) and existing-node reference identity are preserved.

Also reshape `store.parentLookup` from `Map<string, Set<string>>` to `Map<string, Map<string, GraphNode<NodeType>>>` to match `@xyflow/system`'s `ParentLookup`. The only existing consumer (`NodeWrapper`'s `isParent` derived ref) used `.size`, which works the same on both shapes. This makes the lookup usable as a direct argument to `updateAbsolutePositions` / `updateNodeInternals` / `handleExpandParent` in future work.

No public-API changes. Hand-written code that called `store.parentLookup.value.get(id)?.has(childId)` (set semantics) needs to switch to `.has(childId)` on the inner `Map` — same call signature, same answer.

Note: replacing the per-node `NodeWrapper` positionAbsolute watcher with imperative `updateAbsolutePositions` calls (the rest of the "full inversion" toward xyflow/react parity) is deferred. It depends on making `nodeLookup` the primary mutable state, which is itself blocked behind the upcoming `VueFlowStorage` → `<VueFlowContext>` refactor — `@xyflow/system` replaces lookup entries with spread-clones on change, Vue components capture node refs at setup time, and `useWatchProps` round-trips deep mutations back through `setNodes`. All three need fixing together to avoid `state.nodes` / `nodeLookup` divergence.
