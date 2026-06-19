---
"@vue-flow/core": minor
---

Expose the raw pointer position during a connection (mirrors xyflow/react & xyflow/svelte, "pass current pointer position to connection"):

- Custom connection-line components (`#connection-line`) now receive a `pointer` prop — the unsnapped pointer position in flow coordinates, distinct from `toX`/`toY` (which snap to the hovered handle).
- `useConnection().pointer` is now the raw pointer position. Previously it tracked the snapped end (it was aliased to the connection's `to`); the snapped end is still available via `to` / `toHandle`.
