---
"@vue-flow/core": major
---

Remove `useVueFlow().fromObject()` and the `FlowImportObject` type. This aligns the API with React/Svelte Flow, which expose `toObject()` but have no `fromObject` — restore is done explicitly so you control *when* it runs (after the flow is initialized), instead of `fromObject` having to watch for viewport readiness internally.

`toObject()` is unchanged. To restore a saved flow, set the elements and viewport yourself from `onInit` (or any time after mount):

```ts
const { setNodes, setEdges, setViewport, onInit } = useVueFlow()

onInit(() => {
  const flow = JSON.parse(localStorage.getItem('flow') ?? 'null')
  if (!flow) {
    return
  }

  setNodes(flow.nodes)
  setEdges(flow.edges)

  if (flow.viewport) {
    setViewport(flow.viewport)
  }
})
```
