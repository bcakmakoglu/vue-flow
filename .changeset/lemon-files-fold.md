---
"@vue-flow/core": patch
---

Don't set user selection flags on pointer down, only setting them when pointer is moved to allow pane click events to occur when `selectionKeyCode` is `true` (i.e. selection on drag).
