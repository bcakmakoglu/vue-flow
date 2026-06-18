---
"@vue-flow/core": major
---

Align two structural element class names with `@xyflow/react`/`@xyflow/svelte`: `.vue-flow__transformationpane` → `.vue-flow__renderer`, and `.vue-flow__edge-labels` → `.vue-flow__edgelabel-renderer`. Only these two `vue-flow__*` suffixes change (the `vue-flow__` prefix is unchanged). If you target either in custom CSS — or query them from JS — update the selector.
