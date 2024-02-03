---
"@vue-flow/core": minor
---

Add `useNodesData` composable

## 🧙 Example

### Single node id

```ts
const nodeId = '1'

const data = useNodesData(nodeId)

console.log(data.value) // '[{ /* ... */ }]
```

### Array of node ids
```ts
const nodeIds = ['1', '2', '3']

const data = useNodesData(nodeIds)

console.log(data.value) // '[{ /* ... */ }]
```

### Asserting data type
```ts
import type { Node } from '@vue-flow/core'

interface Data {
	foo: string;
	bar: string;
}

type MyNode = Node<CustomNodeData>

const nodeId = '1'

const data = useNodesData([nodeId], (node): node is MyNode => {
  return 'foo' in node.data && 'bar' in node.data
})

console.log(data.value) // '[{ /* foo: string; bar: string */ }]
```
