---
"@vue-flow/core": minor
---

Compute edge z-index via `@xyflow/system`'s `getElevatedEdgeZIndex` and add a `zIndexMode` prop (mirrors xyflow/react #5361 + #5637). Edges connected to a parented (child) node now elevate above the parent automatically — even without `elevateEdgesOnSelect` — and a selected edge bumps by `+1000` when `elevateEdgesOnSelect` is on. The new `zIndexMode` prop (`'basic'` default | `'auto'` | `'manual'`) controls how node and edge z-indices are derived; `'manual'` uses each element's explicit `zIndex` verbatim with no elevation.
