---
'@vue-flow/core': patch
---

Passing `single` option breaks `connectable` check when no handle ids are set
- Pass `connectable` to correct handle prop in default node types
