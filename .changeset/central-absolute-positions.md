---
"@vue-flow/core": patch
---

Compute node `internals.positionAbsolute` / `internals.z` centrally via `@xyflow/system`'s `updateAbsolutePositions`, driven by the store on every node mutation, and remove the per-node positionAbsolute watcher (and its `clampPosition`) that previously lived in each `NodeWrapper`. This mirrors how `@xyflow/svelte`/`@xyflow/react` derive absolute positions and replaces vue-flow's custom `getXYZPos` parent-chain math.

Behaviour is unchanged for the common cases (parent-relative positioning, `extent: 'parent'`, extent clamping, z-index elevation on select). Two narrow notes:

- The `padding` on a `CoordinateExtentRange` extent (`{ range, padding }`) is not applied by the system clamp pass — the node is clamped to its `range` (e.g. parent bounds) without the extra padding. (`@xyflow/system` has no `CoordinateExtentRange` concept; tracked as a follow-up.)
- Root-node `z` is derived from `node.zIndex` + select-elevation (matching `@xyflow/system`'s `calculateZ`); the previous `style.zIndex` fallback for root z is no longer consulted.
