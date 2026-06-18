---
"@vue-flow/core": patch
---

Drop the unused `d3-interpolate` runtime dependency. The d3 zoom/transition/interpolate logic now lives inside `@xyflow/system`, and `@vue-flow/core` no longer imports `d3-interpolate` (or the `@types/d3-*` packages) directly.
