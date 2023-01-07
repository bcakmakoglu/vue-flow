---
'@vue-flow/core': patch
---

Skip updating positions when `updateNodeInternals` is triggered - it will only update node dimensions (which can trigger a position update)
