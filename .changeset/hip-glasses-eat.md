---
"@vue-flow/core": patch
---

Remove `stop` from `EdgeRenderer` as watcher has been removed and stop refers to `window.stop` which causes requests to be cancelled when VueFlow is unmounted
