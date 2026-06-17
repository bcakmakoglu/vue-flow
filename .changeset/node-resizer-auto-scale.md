---
"@vue-flow/core": minor
---

Add an `autoScale` prop to `NodeResizer` / `NodeResizeControl` (mirrors xyflow/react #5326). Handle controls already scale up by `Math.max(1 / zoom, 1)` so they don't shrink below their base size when zooming out; `autoScale` (default `true`) now lets you opt out — previously the prop existed but had no effect. The handle is also centered via the `translate` CSS property instead of `transform`, so the centering composes with the zoom `scale` and the handle stays pinned to the node corner at any zoom (aligns with `@xyflow/system`).
