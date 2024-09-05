---
"@vue-flow/core": patch
---

Prevent overwriting width/height in node styles object with `node.width`/`node.height` if `width`/`height` already exist in the styles object. 
Fixes NodeResizer not working when initial size was passed to a node through `node.width`/`node.height`.
