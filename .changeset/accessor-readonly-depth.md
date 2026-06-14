---
"@vue-flow/core": patch
---

Fix `TS2589: Type instantiation is excessively deep and possibly infinite` on the store's read accessors. `getNodes`/`getEdges`/`getSelectedNodes`/`getSelectedEdges` returned `DeepReadonly<…[]>`, which recurses into every nested property — and `Edge.label?: string | VNode | Component` makes it descend into Vue's deeply self-referential `VNode`/`Component` types, past TypeScript's instantiation-depth ceiling. The error surfaced on ordinary reads like `getEdges.value.filter(…)`. These accessors now return a shallow `readonly EdgeType[]` / `readonly NodeType[]`, and `getNode`/`getEdge` return the plain element type. The returned list stays read-only (change nodes/edges via `setNodes`/`updateNode`/`applyNodeChanges`). Fixes #1886.
