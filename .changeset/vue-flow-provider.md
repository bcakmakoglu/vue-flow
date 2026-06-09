---
"@vue-flow/core": minor
---

Add `<VueFlowProvider>` — a context provider component mirroring `<ReactFlowProvider>` / `<SvelteFlowProvider>`. Render it as an ancestor of one or more `<VueFlow>` instances (or of sibling components) and they all resolve the same store via `inject`, without needing the `useVueFlow({ id })` lookup-by-id dance:

```vue
<VueFlowProvider>
  <Sidebar />   <!-- can call useVueFlow() and share the flow's store -->
  <VueFlow />   <!-- reuses the provided store instead of creating its own -->
</VueFlowProvider>
```

Pass an optional `id` to pin the store's id (`<VueFlowProvider id="my-flow">`), addressable later via `useVueFlow('my-flow')`.

This is additive and non-breaking — bare `<VueFlow>` usage is unchanged. It is the first step toward replacing the global `VueFlowStorage` singleton with a context-owned store.
