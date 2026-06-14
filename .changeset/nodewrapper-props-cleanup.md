---
"@vue-flow/core": major
---

`NodeWrapper` now passes custom node components exactly the documented `NodeProps` surface (xyflow/react parity) and no longer forwards legacy duplicate props that were never part of `NodeProps`:

| Removed prop | Use instead |
|---|---|
| `connectable` | `isConnectable` |
| `position` (`{ x, y, z }`) | `positionAbsoluteX` / `positionAbsoluteY` |
| `dimensions` | `width` / `height` |
| `parent`, `parentNodeId` | `parentId` |
| `resizing` | — (read `node.resizing` via `useNode()`/`getInternalNode()` if needed) |

These duplicates bloated every node's props on each render and leaked onto custom-node DOM as `$attrs` (e.g. `parent="…"`, `position="[object Object]"`) when a custom component didn't set `inheritAttrs: false`. Built-in nodes are unaffected.

Also fixes `NodeWrapper` mutating the user's `node.style` object when applying `width`/`height` — it now clones, so a user's style object is never written to (and width/height no longer get cached stale across renders).
