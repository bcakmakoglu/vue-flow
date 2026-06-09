---
"@vue-flow/core": patch
---

Remove the internal `until` watcher (no more polling a reactive flag to detect async readiness).

- `setState` applies min/max-zoom and `translateExtent` directly — those setters already write to state, and `XYPanZoom` reads them when it mounts, so the deferral was redundant.
- `fromObject` now calls `setViewport` directly, which applies immediately when the viewport is initialized and warns + no-ops otherwise — matching React/Svelte Flow's restore model.

Behavioral note: calling `fromObject` *before* the flow has mounted no longer defers the viewport restore until initialization (nodes/edges still restore). Restore the viewport from `onInit`, or after the flow is mounted — the same way you would with React/Svelte Flow. `fromObject` no longer mutates `defaultViewport`.
