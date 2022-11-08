# Vue Flow: Plugin Drag And Drop

This package contains a simple Drag and Drop plugin that can be used with Vue Flow.
Simply install the plugin onto your Vue Flow App and you can start using the composable to
attach drag and drop handlers to your graph.

## 🛠 Setup

```bash
# install
$ yarn add @vue-flow/plugin-drag-n-drop

# or
$ npm i --save @vue-flow/plugin-drag-n-drop
```

## 🎮 Quickstart

- Install the plugin

```ts
// main.ts or your app entry point
import { createVueFlow } from '@vue-flow/core'
import { PluginDragNDrop } from '@vue-flow/plugin-drag-n-drop'
import { createApp } from 'vue'

import App from './App.vue'

const app = createApp(App)

const vueFlowApp = createVueFlow()

vueFlowApp.use(PluginDragNDrop)

app.mount('#root')
```

- Attach the handlers

```vue
<script setup>
// App.vue
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { useDragNDrop } from '@vue-flow/plugin-drag-n-drop'
import initialElements from './initial-elements'

import Sidebar from './Sidebar.vue'

const { addNodes } = useVueFlow()

// some nodes and edges
const elements = ref(initialElements)

// your drag and drop handler is bound to the current vue flow instance
// it will never apply to other store instances at the same time
const { handleDragOver, handleDrop, onDrop } = useDragNDrop()

onDrop(({ type, position }) => {
  const id = getId()
  
  // add a new node on drop
  addNodes([
    {
      id,
      type,
      position,
      label: `${type} node`,
    },
  ])

  // align node position after drop, so it's centered to the mouse
  nextTick(() => {
    const node = findNode(id)

    const stop = watch(
      () => node.dimensions,
      (dimensions) => {
        if (dimensions.width > 0 && dimensions.height > 0) {
          node.position = { x: node.position.x - node.dimensions.width / 2, y: node.position.y - node.dimensions.height / 2 }
          stop()
        }
      },
      { deep: true, flush: 'post' },
    )
  })
})
</script>
<template>
  <div style="height: 100vh" @dragover="handleDragOver">
    <VueFlow v-model="elements" @drop="handleDrop" />
    
    <Sidebar />
  </div>
</template>
```

```vue
<script lang="ts" setup>
// Sidebar.vue
import { useDragNDrop } from '@vue-flow/plugin-drag-n-drop'

const { handleDragStart } = useDragNDrop()
</script>

<template>
  <aside>
    <div class="description">You can drag these nodes to the pane on the left.</div>
    
    <div class="vue-flow__node-input" :draggable="true" @dragstart="handleDragStart($event, 'input')">Input Node</div>
    
    <div class="vue-flow__node-default" :draggable="true" @dragstart="handleDragStart($event, 'default')">Default Node</div>
    
    <div class="vue-flow__node-output" :draggable="true" @dragstart="handleDragStart($event, 'output')">Output Node</div>
  </aside>
</template>
```
