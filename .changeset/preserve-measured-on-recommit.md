---
"@vue-flow/core": patch
---

Fix nodes turning invisible after a re-commit that doesn't change their size. Re-committing fresh node objects — a one-way `:nodes` reassignment, a layout pass, `nodes.value.map((n) => ({ ...n }))` — dropped each node's measured dimensions: the node-rep split keeps `measured` off the user `Node`s, and the system's `adoptUserNodes` only sources `measured` from the incoming user node. The node then failed the `nodeHasDimensions` gate and rendered with `visibility: hidden`, and because its DOM size hadn't actually changed the `ResizeObserver` never re-fired to restore it. `adoptNodes` now carries the previously measured dimensions forward for re-committed nodes that don't supply their own (mirroring how the system already reuses `handleBounds`); a genuine resize still re-measures via the `ResizeObserver`.
