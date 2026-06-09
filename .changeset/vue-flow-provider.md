---
"@vue-flow/core": minor
---

Add `<VueFlowProvider>` — a context provider component mirroring `<ReactFlowProvider>` / `<SvelteFlowProvider>`. Render it as an ancestor of one or more `<VueFlow>` instances (or of sibling components) and they all resolve the same store via `inject`:

```vue
<VueFlowProvider>
  <Sidebar />   <!-- can call useVueFlow() and share the flow's store -->
  <VueFlow />   <!-- reuses the provided store instead of creating its own -->
</VueFlowProvider>
```

Pass an optional `id` to label the store (`<VueFlowProvider id="my-flow">`), readable via `useVueFlow().id`. The provider owns the store and provides it via context; it is the supported way to share one flow's store across siblings or to scope multiple independent flows on a page.
