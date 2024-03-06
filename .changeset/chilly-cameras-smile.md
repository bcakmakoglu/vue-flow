---
"@vue-flow/core": patch
---

Use separate interfaces for Edge- and NodeEvents and extend FlowEmit interface from them. Fixes edge events overwriting node event definitions when types are created.
