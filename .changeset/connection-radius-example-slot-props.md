---
"@vue-flow/core": patch
---

Migrate the connection-radius example to the current connection-line slot props. The custom `#connection-line` slot exposes its coordinates as `fromX`/`fromY`/`fromPosition` and `toX`/`toY`/`toPosition` (matching `@xyflow/react` and `@xyflow/svelte`), not the old `source*`/`target*` — the example used the old names, so it rendered against `undefined` coordinates. Note the edge path helpers (`getBezierPath` etc.) keep their `source*`/`target*` parameter names, so map the slot's `from*`/`to*` onto them.
