---
"@vue-flow/core": patch
---

Remove the internal `until` watcher from `setState` (no more polling a reactive flag to detect async readiness). Min/max-zoom and `translateExtent` are now applied directly — those setters already write to state, and `XYPanZoom` reads them when it mounts, so deferring until the panZoom instance existed was redundant. No public API change.
