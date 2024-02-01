---
"@vue-flow/core": minor
---

Add `useHandleConnections` composable

## 🧙 Example

```ts
const connections = useHandleConnections({
  // type of the handle you are looking for - accepts a `MaybeRefOrGetter<string>`
  type: 'source',

  // the id of the handle you are looking for - accepts a `MaybeRefOrGetter<string | undefined> | undefined` [OPTIONAL]
  id: 'a',

  // if not provided, the node id from the NodeIdContext is used - accepts a `MaybeRefOrGetter<string | undefined> | undefined`
  nodeId: '1',
  
  // a cb that is called when a new connection is added
  onConnect: (params) => {
    console.log('onConnect', params)
  },

  // a cb that is called when a connection is removed
  onDisconnect: (params) => {
    console.log('onDisconnect', params)
  },
})

watch(
  connections,
  (next) => {
    console.log('connections', next)
  },
  { immediate: true },
)
```
