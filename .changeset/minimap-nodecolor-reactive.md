---
"@vue-flow/core": patch
---

Fix `<MiniMap>`'s `nodeColor` not reacting to external reactive state. A `nodeColor` / `nodeStrokeColor` / `nodeClassName` function that reads a reactive value declared outside the node (e.g. recoloring a node from a `ref`) didn't update the minimap, because the per-node `v-memo` keyed on the function *reference*. It now keys on the function *result*, so such recolors re-render the affected minimap node while untouched nodes still skip during drag/pan frames.
