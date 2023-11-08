# Vue Flow Pathfinding Edge 🧲

⚠️ DEPRECATED - WILL BE REMOVED WITH NEXT MAJOR RELEASE ⚠️

__Custom edge that avoids crossing nodes__

## 🛠 Setup

```bash
# install
$ yarn add @vue-flow/pathfinding-edge

# or
$ npm i --save @vue-flow/pathfinding-edge
```

## 🎮 Quickstart

```vue
<script setup>
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { PathFindingEdge } from '@vue-flow/pathfinding-edge'
import initialElements from './initial-elements'

const elements = ref(initialElements)

// create a new context so we can fetch nodes
const { getNodes } = useVueFlow()
</script>
<template>
  <div style="height: 300px">
    <VueFlow v-model="elements">
      <template #edge-pathfinding="props">
        <PathFindingEdge v-bind="props" :nodes="getNodes" />
      </template>
    </VueFlow>
  </div>
</template>
```

```js
// initial-elements.js
export default [
  {
    id: 'e12',
    source: '1',
    target: '2',
    label: 'Smart Edge',
    style: { stroke: 'red' },
    // assign pathfinding edge type
    type: 'pathfinding'
  },
  {
    id: '1',
    label: 'Node 1',
    position: {
      x: 430,
      y: 0,
    },
  },
  {
    id: '2',
    label: 'Node 2',
    position: {
      x: 230,
      y: 90,
    },
  },
]
```
