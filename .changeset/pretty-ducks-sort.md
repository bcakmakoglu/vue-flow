---
"@vue-flow/core": patch
---

Revert extending FlowEmits from separate interfaces for nodes and edges as it breaks event definitions for the actual component, causing warnings that the event was emitted by isn't defined.
