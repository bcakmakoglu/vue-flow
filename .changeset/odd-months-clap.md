---
"@vue-flow/core": patch
---

When updating nodes or edges by overwriting the original array, update the nodes and edges in the state by using them as the target for `Object.assign`. This keeps reference in-tact and ensures reactivity when these objects are changed/updated
