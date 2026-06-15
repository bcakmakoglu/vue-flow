---
"@vue-flow/core": major
---

Rename the `applyDefault` prop/option to `autoApplyChanges`.

`applyDefault` was opaque: it toggles whether Vue Flow automatically applies node/edge changes (drag, resize, select, add/remove) back to your `nodes`/`edges`. The new name says what it does and pairs with the `applyNodeChanges` / `applyEdgeChanges` helpers you call when it is off. The default is unchanged (`true`).

```diff
- <VueFlow :nodes="nodes" :edges="edges" :apply-default="false" />
+ <VueFlow :nodes="nodes" :edges="edges" :auto-apply-changes="false" />
```

If you passed `applyDefault` to `useVueFlow()` / `<VueFlow>` (as a prop or option) or read it from the store, rename it to `autoApplyChanges`.
