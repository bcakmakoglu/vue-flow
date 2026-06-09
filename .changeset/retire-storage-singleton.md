---
"@vue-flow/core": patch
---

Retire the internal `Storage` singleton. Store instances are now built by a standalone `createVueFlowStore` factory and tracked in a slim module-level registry, instead of a `Storage` class stashed on `app.config.globalProperties.$vueFlowStorage`. `useVueFlow` resolves a store via context (`inject`, e.g. under `<VueFlowProvider>`) first, then the registry by id — same resolution order as before.

`Storage` was internal (never exported), so there is no public API change. One behavioural note: the registry is now module-scoped rather than per-Vue-app. For a single app (the overwhelmingly common case) behaviour is identical; for multiple independent Vue apps on one page, address flows by distinct ids or wrap each tree in its own `<VueFlowProvider>` (the recommended way to scope a store).
