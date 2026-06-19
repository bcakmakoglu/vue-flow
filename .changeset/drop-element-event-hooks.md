---
"@vue-flow/core": patch
---

Remove the internal `useNodeHooks`/`useEdgeHooks` composables. They created a second, per-wrapper set of `ExtendedEventHook`s whose only listener forwarded to the global `emits` hooks — so `NodeWrapper`/`EdgeWrapper` now call `emits.node*`/`emits.edge*` directly. Behavior is identical (the global hooks still back both `onNodeClick`/`onEdgeClick` and the Vue `@node-click` emitter), but this drops 9 hook instances + 9 forwarding closures **per node and per edge** of setup cost and memory. The unused `NodeEventsEmit`/`EdgeEventsEmit` types are removed with them.
