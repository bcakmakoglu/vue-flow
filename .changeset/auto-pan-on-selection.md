---
"@vue-flow/core": minor
---

Add an `autoPanOnSelection` prop (mirrors xyflow/react and xyflow/svelte). When `true` (the default), the viewport pans automatically as the cursor reaches the edge of the viewport while dragging a selection box, so you can select nodes beyond the visible area in one gesture. Set `:auto-pan-on-selection="false"` to keep the viewport fixed during selection.
