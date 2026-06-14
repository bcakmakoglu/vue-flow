---
"@vue-flow/core": patch
---

Don't swallow keystrokes typed into page inputs while a modifier is held. The pan/zoom/selection/multi-selection key detection now passes `actInsideInputWithModifier: false` (matching `deleteKeyCode`), so e.g. pressing Space in an `<input>` with Shift held is no longer `preventDefault`-ed by the pan-activation shortcut. Fixes #1999.
