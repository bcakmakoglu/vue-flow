---
"@vue-flow/core": major
---

Remove dead code and unused public surface (2.0 cleanup).

Removed public API (all were unused / never emitted):

- `ErrorCode.EDGE_ORPHANED` and `ErrorCode.EDGE_SOURCE_TARGET_SAME` — never constructed anywhere; they described behavior that no longer exists.
- Unused exported types: `MaybeElement`, `XYZPosition`, `Box`, `NodeBounds`, `NodeHandle`, `ConnectionHandle` (distinct from the still-present `ConnectingHandle`).
- `IsValidParams.nodeLookup` — `isValidHandle` reads the node lookup from a separate argument; the field was redundant.

Internal-only cleanup (no API change): dropped the unused `on` half of `useNodeHooks`/`useEdgeHooks` (the `NodeEventsOn`/`EdgeEventsOn` types are kept), an unreachable guard in the connection line, a dead parameter in an internal handle helper, and a shadowed no-op. Stale `@deprecated`/JSDoc wording (`onPaneReady`, "removed in the next major", "global storage") was corrected — `autoApplyChanges` and `autoConnect` are no longer tagged `@deprecated` (they are kept).
