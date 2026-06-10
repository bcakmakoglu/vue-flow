---
"@vue-flow/core": major
---

Make a `<VueFlow>`'s `v-model:nodes`/`v-model:edges` refs the store's single source of truth, removing the `@vueuse` `watchPausable` two-way sync.

When `<VueFlow>` owns its store, its model refs now back the store directly (svelte `$bindable`-style, via the store's signal proxy): the store mutating nodes/edges (drag, `addEdges`, `applyNodeChanges`, …) *is* the v-model update — the outbound direction is free, with no second array and no pause/resume watcher. A single guarded watch re-adopts an external array reassignment (`nodes.value = [...]`) to rebuild the lookups (the analogue of svelte-flow re-running `adoptUserNodes` on a reference change). When a `<VueFlow>` instead reuses an ancestor `<VueFlowProvider>`'s store, its models can't back the already-created store, so they're synced with a native-`watch` identity-in / snapshot-out binding (no `watchPausable`). `@vueuse/core`'s `watchPausable` is no longer used by core.

Also restores `<VueFlowProvider id="…">` forwarding its `id` to the created store (it had stopped declaring the `id` prop).
