---
"@vue-flow/core": patch
---

Remove the `useGetPointerPosition` composable. It was an `@internal` helper that nothing in core (or the examples/docs) used — the drag/connection paths derive pointer positions inline via `@xyflow/system`. Its public re-export is dropped.
