---
"@vue-flow/core": patch
---

`FlowEmits` now uses Vue's object/tuple emit notation (`eventName: [arg: T]`) instead of call-signature overloads — the style `defineEmits` recommends. The `update:nodes` / `update:edges` / `update:viewport` entries were also dropped: they're auto-declared by the `defineModel` calls in `<VueFlow>`, so re-listing them was redundant. No runtime or event-payload change — the same events fire with the same arguments.
