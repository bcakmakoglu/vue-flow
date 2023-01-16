---
'@vue-flow/core': patch
---

Check if position is a number when updating, instead of checking if the value is truthy. Fixes 0 values not being used when updating.
