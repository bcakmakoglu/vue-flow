---
"@vue-flow/core": patch
---

Correctly check if an event listener was bound to the VueFlow component, using for example `@node-click` or if a listener was bound using the exposed event hooks from `useVueFlow` when determening if a listener for an event exists at all.
