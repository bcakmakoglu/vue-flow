---
"@vue-flow/core": patch
---

Fix edges snapping back to a node's default handle positions after a re-commit (e.g. a dagre layout flipping `sourcePosition`/`targetPosition`, or any `nodes.value.map(...)`). `@xyflow/system`'s `parseHandles` resets `handleBounds` to `undefined` whenever a re-committed user node carries no `measured`, and vue-flow's node-rep split deliberately keeps `measured` (and `handleBounds`) off the user `Node` — so every re-commit wiped the handle bounds and edges fell back to the node's default sides instead of its actual handles. `adoptNodes` now carries the prior `handleBounds` forward alongside `measured` (extending the same adapter that already preserves `measured`); a genuine re-measure (`updateNodeDimensions`, e.g. NodeWrapper's `sourcePosition` watcher) still overwrites them, and that fresh result is preserved by the next re-commit.
