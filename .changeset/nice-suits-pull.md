---
"@vue-flow/core": minor
---

Add `updateNodeData` action

## 🧙 Example

```ts
const { updateNodeData } = useVueFlow()

updateNodeData('1', { foo: 'bar' })

// or using a function to update the data
updateNodeData('1', (data) => ({ ...data, foo: 'bar' }))

// passing options - `replace` will replace the data instead of merging it
updateNodeData('1', { foo: 'bar' }, { replace: true })
```
