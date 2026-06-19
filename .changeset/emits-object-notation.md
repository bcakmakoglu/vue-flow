---
"@vue-flow/core": patch
---

Convert the component emit type definitions (`MiniMapEmits`, `MiniMapNodeEmits`, `ControlEmits`, `NodeResizerEmits`, and `ControlButton`'s inline emit) from the call-signature overload form to Vue 3.3+ object notation (`{ eventName: [args] }`), matching `FlowEmits`. Event names and payloads are unchanged and `defineEmits` accepts both forms, so component usage is unaffected — only update if you imported one of these interfaces and relied on its old callable shape. Also types the `MiniMap` `click` payload's `position` as `XYPosition` (was an inline `{ x, y }`).
