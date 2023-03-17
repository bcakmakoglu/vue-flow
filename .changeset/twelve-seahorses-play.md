---
"@vue-flow/core": patch
---

Rename `parentNode` prop for custom nodes to `parent` to avoid TypeError which occurs as `div` already has `parentNode` defined which cannot be overwritten
