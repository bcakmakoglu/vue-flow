---
"@vue-flow/core": patch
---

Fix reconnectable edges vanishing when you press an edge's reconnect handle without dragging. The edge was hidden eagerly on pointerdown, but `@xyflow/system`'s `XYHandle` only fires its connect/reconnect-end callbacks once the drag threshold (`connectionDragThreshold`, default `1`) is crossed — so a plain click hid the edge and never restored it (it reappeared only on mouse-move, and was gone entirely on mouse-up). The original edge is now hidden — and `reconnectStart` emitted — only once the reconnect drag actually starts (the connection's `onConnectStart`), matching `@xyflow/react` and `@xyflow/svelte`.
