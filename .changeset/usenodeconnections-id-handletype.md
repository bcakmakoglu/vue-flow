---
"@vue-flow/core": major
---

Align `useNodeConnections` params with xyflow/react and xyflow/svelte:

- Rename the `nodeId` param to `id` (`useNodeConnections({ nodeId })` → `useNodeConnections({ id })`). Like before, it's optional and falls back to the node id from the `useNodeId` context injection.
- `handleId` now requires `handleType` to be set. Passing `handleId` on its own is a type error — `handleId` is meaningless at runtime without a `handleType`, and the type now points you at the fix (mirrors xyflow/react & xyflow/svelte). Runtime behavior is unchanged.
