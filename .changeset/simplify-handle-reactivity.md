---
"@vue-flow/core": patch
---

Simplify `<Handle>`'s per-instance reactivity. The seven connection-state `toRef`s (`connectingFrom`/`connectingTo`/`valid`/`connectionInProcess`/…) all derived from the same global `connection*` store state and were used only in the class binding — they're consolidated into a single `connectionClasses` computed. The redundant `isConnectableStart`/`isConnectableEnd` refs are dropped too (their props already default to `true`). Each handle now allocates ~5 reactive effects instead of ~13 — meaningful since handles are the highest-multiplicity element (~2 per node). Identical rendered classes; no behavior or API change.
