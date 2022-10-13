---
'@vue-flow/core': patch
---

`connectOnClick`: mouseup handler resets startHandle before connections can be made

## Bugfixes

- Prevent `mouseup` handler from resetting `startHandle` before connections can be made when using `connectOnClick`
