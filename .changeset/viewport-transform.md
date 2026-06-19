---
"@vue-flow/core": patch
---

Internal: make the `[x, y, zoom]` `transform` tuple the canonical viewport state (the `@xyflow/system` representation), with `viewport` (`{ x, y, zoom }`) derived from it.

This mirrors how `@xyflow/react`/`@xyflow/svelte` store the viewport internally and removes the bidirectional `{x,y,zoom}` ↔ `[x,y,zoom]` mapping that previously happened at every `@xyflow/system` call site. The public API is unchanged: `useVueFlow().viewport` still resolves to `{ x, y, zoom }` (now a derived `computed`), and `setViewport`/`getViewport`/`fitView`/`onViewportChange`/`toObject().viewport` are all unchanged.

The only behavioral nuance: `useVueFlow().viewport` is now a read-only `ComputedRef` — set the viewport via `setViewport`/`zoom*`/`fitView` (mutating `viewport.value` directly was never a supported API).
