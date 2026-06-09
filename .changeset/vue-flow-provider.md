---
"@vue-flow/core": minor
---

Add `<VueFlowProvider>` — a context provider component mirroring `<ReactFlowProvider>` / `<SvelteFlowProvider>`. Render it as an ancestor of a `<VueFlow>` and any sibling/descendant components that need the same store; they all resolve it via `inject`:

```vue
<VueFlowProvider>
  <Sidebar />   <!-- can call useVueFlow() and share the flow's store -->
  <VueFlow />   <!-- reuses the provided store instead of creating its own -->
</VueFlowProvider>
```

Pass an optional `id` to label the store (`<VueFlowProvider id="my-flow">`), readable via `useVueFlow().id`. The provider owns the store and provides it via context; it is the supported way to share one flow's store with sibling components. For multiple independent flows on a page, give each its own `<VueFlowProvider>` (or bare `<VueFlow>`) — one provider scopes one store, so a single provider is not meant to host several `<VueFlow>` instances.
