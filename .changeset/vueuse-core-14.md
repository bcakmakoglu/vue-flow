---
"@vue-flow/core": patch
---

Bump the `@vueuse/core` dependency from `^10` to `^14`.

vue-flow now defines its own event-hook types (`EventHookOn` / `EventHookOff` / `EventHookTrigger`) instead of re-exporting `@vueuse/core`'s. The hook API is unchanged — handlers still receive a single payload (`onNodesChange((changes) => …)`, `onConnect((connection) => …)`, etc.). This decoupling is required because `@vueuse/core` v14 changed its internal `Callback<T>` to spread array payloads (`T extends any[]` → `(...param: T) => void`), which would otherwise have forced vue-flow's array-payload hooks (`NodeChange[]` / `EdgeChange[]`) to an awkward variadic `(...changes) => …` signature.
