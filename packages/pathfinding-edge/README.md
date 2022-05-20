# Vue Flow Pathfinding Edge 🧲

### Custom Edge that avoids crossing other Nodes

## 🛠 Setup

```bash
# install
$ yarn add @braks/vue-flow-pathfinding-edge

# or
$ npm i --save @braks/vue-flow-pathfinding-edge
```

## 🎮 Quickstart

```vue
<script setup>
import { VueFlow, useVueFlow } from '@braks/vue-flow'
import { PathFindingEdge } from '@braks/vue-flow-pathfinding-edge'
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
  {
    id: 'e12',
    source: '1',
    target: '2',
    label: 'Smart Edge',
    style: { stroke: 'red' },
    // assign pathfinding edge type
    type: 'pathfinding'
  },
]
```
