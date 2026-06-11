---
"@vue-flow/core": minor
---

Stop duplicating `@xyflow/system` utilities and remove dead code. Most of these are internal helpers (not part of `@vue-flow/core`'s public export surface), but two collapses change user-observable behavior:

- **Auto-generated edge IDs now use the `xy-edge__` prefix** (previously `vueflow__edge-`), matching `@xyflow/react`/`@xyflow/svelte`. This only affects edges created without an explicit `id` (e.g. connections drawn by the user, or `addEdges`/`updateEdge` with a bare `Connection`). Edges with an explicit `id` are unaffected. If you select auto-generated edges by id (CSS `[data-id^="vueflow__edge-"]`, query selectors, persisted references), update them to `xy-edge__`.
- **Handle measurement now uses `@xyflow/system`'s `getHandleBounds`**, which collects handles via the `.source` / `.target` class (matching react/svelte) instead of vue-flow's `.vue-flow__handle.${type}` scoping. Vue Flow handles always carry the `source`/`target` class, so behavior is unchanged — unless a custom node template puts a bare `source`/`target` class on a non-handle element, which would now be measured as a handle.

The remaining changes are internal-only with no public API impact:

- `getHandlePosition`, `oppositePosition` and `getNodeDimensions` were byte-for-byte (or near) copies of `@xyflow/system` exports; their consumers now import from `@xyflow/system` directly and the local copies are removed. As a side effect, handle positioning + node dimensions now honor `initialWidth`/`initialHeight` (pre-measurement sizing), matching xyflow/react+svelte.
- Removed the re-export shims that simply forwarded `@xyflow/system` exports (`getEventPosition`, `pointToRendererPoint`, `nodeToRect`, `getNodesBounds`, `getViewportForBounds`, `getNodesInside`, `getConnectedEdges` from `utils/graph.ts`; `areSetsEqual`, `areConnectionMapsEqual`, `handleConnectionChange` from `utils/store.ts`). Consumers now import these from `@xyflow/system` directly. The public re-exports of `getNodesInside` and `getConnectedEdges` (via the package root `index.ts`) are preserved — they now re-export straight from `@xyflow/system`.
- Removed unused helpers with no callers: `getClosestHandle`, `isConnectionValid`, `getNodesWithinDistance`, `getHandles`, `resetRecentHandle` (`utils/handle.ts`), `getConnectedNodes` (`utils/graph.ts`), and `getNodeDimensions` (`utils/general.ts`, file deleted). The connection flow runs through system's `XYHandle`.
