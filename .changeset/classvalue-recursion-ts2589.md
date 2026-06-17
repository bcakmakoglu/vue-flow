---
"@vue-flow/core": patch
---

Fix `TS2589: Type instantiation is excessively deep and possibly infinite` when spreading or mapping nodes — e.g. the extremely common `nodes.value = nodes.value.map((n) => ({ ...n, position }))`. The internal `ClassValue` type (used by `Node['class']`) was self-referential (`string | Record<string, boolean> | ClassValue[]`), so `UnwrapRef<Node[]>` and node spreads pushed TypeScript past its recursion-depth ceiling. `ClassValue` is now one level deep (`string | Record<string, boolean> | Array<string | Record<string, boolean>>`), which still matches Vue's `class` binding — it's type-only, no runtime change.
