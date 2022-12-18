---
'@vue-flow/core': patch
---

Only trigger store watcher immediate when elements were set, otherwise wait for changes in store to overwrite model-value
