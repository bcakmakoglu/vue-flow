# Vue Flow Resizable Rotatable Node

### Custom Node that can be resized and rotated

## 🛠 Setup

```bash
# install
$ yarn add @vue-flow/resize-rotate-node

# or
$ npm i --save @vue-flow/resize-rotate-node
```

## 🎮 Quickstart

```vue

<script setup>
import { VueFlow } from '@vue-flow/core'
import { ResizeRotateNode } from '@vue-flow/resize-rotate-node'
import initialElements from './initial-elements'

const elements = ref(initialElements)
</script>
<template>
  <div style="height: 300px">
    <VueFlow v-model="elements">
      <template #node-resize-rotate="props">
        <ResizeRotateNode v-bind="props" />
      </template>
    </VueFlow>
  </div>
</template>
```

```js
// initial-elements.js
export default [
  {
    id: '1',
    label: 'Node 1',
    type: 'resize-rotate',
    targetPosition: 'left',
    sourcePosition: 'right',
    position: {
      x: 0,
      y: 0,
    },
    data: {
      // additional styles for the node
      // cannot use the regular style tag as those apply to the node wrapper
      style: {
        background: 'rgb(255, 0, 114) none repeat scroll 0% 0%',
        padding: '20px',
        borderRadius: '20px',
      },
    },
  },
  {
    id: '2',
    label: 'Node 2',
    type: 'resize-rotate',
    targetPosition: 'left',
    position: {
      x: 330,
      y: 50,
    },
    data: {
      style: {
        background: 'rgb(50, 188, 188) none repeat scroll 0% 0%',
        padding: '20px',
        borderRadius: '20px',
      },
    },
  },
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'smoothstep',
  },
]
```
