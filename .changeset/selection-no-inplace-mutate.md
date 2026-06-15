---
"@vue-flow/core": patch
---

Fix node selection desyncing the internal lookup under `autoApplyChanges: false`. `getSelectionChanges` mutated the lookup node's `selected` in place as a synchronous "deselect the previous node" hack. With markRaw'd nodes that mutation didn't re-render, and with `autoApplyChanges: false` (no auto-apply) it left the lookup's `selected` permanently out of sync with the user node — so `XYDrag` (which reads `selected` from the lookup) could pick up nodes the user's state considered unselected.

The mutation is removed: selection now flows purely through the change pipeline (the synchronous `applyNodeChanges` re-adopt already produces the deselect-previous behavior). No change for `autoApplyChanges: true`; under `autoApplyChanges: false` the store no longer half-applies selection — you apply the emitted `select` changes yourself, as intended for controlled flow.
