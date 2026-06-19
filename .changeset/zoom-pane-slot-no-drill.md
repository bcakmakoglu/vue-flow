---
"@vue-flow/core": patch
---

Stop drilling the `zoom-pane` slot through `VueFlow → ZoomPane → Pane → Viewport`. It now renders inside `Viewport` (the transformed layer it belongs to) from the provided `Slots`, via a small propless `ZoomPaneSlot` component. This keeps ZoomPane's slot to Viewport static — so Pane/Viewport bail out of ZoomPane/Pane re-renders — and the slot itself bails out of Viewport's per-frame transform re-renders (invoked once and riding the CSS transform, instead of being rebuilt each pan/zoom frame). No API change.
