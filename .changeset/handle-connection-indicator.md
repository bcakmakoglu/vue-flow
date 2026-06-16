---
"@vue-flow/core": patch
---

Align the handle `connectionindicator` class with xyflow/react's model (fixes the click-connection case from xyflow/react #5042). It now keys off the global connection state — `isConnectableEnd` for possible end handles while a connection is in progress (drag **or** click), `isConnectableStart` otherwise — instead of a per-handle "is this the connection's start/end handle" check. Previously a handle with `connectableStart: false, connectableEnd: true` never showed the indicator as a connection target.
