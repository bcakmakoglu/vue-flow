---
"@vue-flow/core": patch
---

Watch `applyDefault` state in `useVueFlow` scope instead of component scope otherwise adding nodes/edges to the state is impossible until the `VueFlow` component has mounted unless the changes handlers are explicitly bound by the user.
