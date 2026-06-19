---
"@vue-flow/core": patch
---

Perf: read the reactive store directly in the per-element components (`NodeWrapper`, `EdgeWrapper`, `Handle`) and the per-element composables they call (`useNode`, `useHandle`, `useDrag`, `useUpdateNodePositions`, `useNodeConnections`) instead of `storeToRefs(useStore())`. `storeToRefs` runs `toRefs` over the whole state — allocating a ref for every state key — on each call, which adds up when it runs once per node, edge, and handle on a large graph. Inside a component's computeds/render, `store.x` already tracks reactively, so no refs are needed.

`useStore` and `storeToRefs` are unchanged (`storeToRefs` is still the way to destructure state into refs and carry them around). The guidance for custom nodes/edges: read fields off `useStore()` directly (`const store = useStore(); store.transform`) rather than `storeToRefs` per instance.
