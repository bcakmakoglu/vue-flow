---
"@vue-flow/core": minor
---

Add `updateNode` action

## 🧙 Example

```ts
const { updateNode } = useVueFlow()

updateNode('1', { position: { x: 100, y: 100 } })

// or using a function to update the node
updateNode('1', (node) => ({ ...node, position: { x: 100, y: 100 } }))

// passing options - `replace` will replace the node instead of merging it
updateNode('1', { id: '1', label: 'Node 1', position: { x: 100, y: 100 } }, { replace: true })
```
