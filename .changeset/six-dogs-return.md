---
'@vue-flow/core': patch
---

# What's changed?

- Simplify `useHandle` usage
- Pass props to the composable as possible refs
  - Still returns onClick & onMouseDown handlers but only expects mouse event now

Before: 
```vue
<script lang="ts" setup>
import { useHandle, NodeId } from '@vue-flow/core'

const nodeId = inject(NodeId)

const handleId = 'my-handle'

const type = 'source'

const isValidConnection = () => true

const { onMouseDown } = useHandle()

const onMouseDownHandler = (event: MouseEvent) => {
  onMouseDown(event, handleId, nodeId, type === 'target', isValidConnection, undefined)
}
</script>

<template>
  <div @mousedown="onMouseDownHandler" />
</template>
```

After: 
```vue
<script lang="ts" setup>
import { useHandle, useNode } from '@vue-flow/core'

const { nodeId } = useNode()

const handleId = 'my-handle'

const type = 'source'

const isValidConnection = () => true

const { onMouseDown } = useHandle({
  nodeId,
  handleId,
  isValidConnection,
  type,
})
</script>

<template> 
  <div @mousedown="onMouseDown" />
</template>
```
