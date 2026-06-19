---
"@vue-flow/core": patch
---

Fix save/restore leaving nodes invisible. `toObject()` now mirrors xyflow/react: it shallow-clones each node/edge (keeping `measured` and the other fields) and reads the viewport off the transform, instead of stripping fields and round-tripping through `JSON.stringify`/`parse`.

Previously `measured` was stripped from the export, so restoring a saved flow (`setNodes` with the same node ids) produced nodes with no measured size. A node stays `visibility: hidden` until it's measured, and because the restored nodes reuse their existing DOM elements (same id → no re-mount), the `ResizeObserver` never re-fires to re-measure them — so they were stuck hidden. Keeping `measured` in the export means a restored flow renders immediately.
