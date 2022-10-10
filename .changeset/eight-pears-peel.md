---
'@vue-flow/core': minor
---

# What's changed?

* Add `HandleConnectable` type
* Update `connectable` prop of `Handle` to `HandleConnectable` type
* Allow to specify if Handles are connectable
  * any number of connections
  * none
  * single connection
  * or a cb to determine whether the Handle is connectable

Example: 
```html
<script lang="ts" setup>
import { Handle, HandleConnectable } from '@vue-flow/core'  

const handleConnectable: HandleConnectable = (node, connectedEdges) => {
  console.log(node, connectedEdges)
  return true
}
</script>
<template>
  <!-- single connection -->
  <Handle type="target" position="left" connectable="single" />
  <div>
    Custom Node
  </div>
  <!-- cb -->
  <Handle id="a" position="right" :connectable="handleConnectable" />
</template>
```

* Update `node.connectable` prop to `HandleConnectable`

For Example:
```js
const nodes = ref([
  {
    id: '1',
    position: { x: 0, y: 0 },
    connectable: 'single' // each handle is only connectable once (default node for example)
  },
  {
    id: '2',
    position: { x: 200, y: 0 },
    connectable: (node, connectedEdges) => {
      return true // will allow any number of connections
    }
  },
  {
    id: '3',
    position: { x: 400, y: 0 },
    connectable: true // will allow any number of connections
  },
  {
    id: '4',
    position: { x: 200, y: 0 },
    connectable: false // will disable handles
  }
])
```
