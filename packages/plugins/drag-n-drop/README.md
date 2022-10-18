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

const vueFlowApp = createVueFlow()

vueFlowApp.use(PluginDragNDrop)
```

- Attach the handlers

```vue
<script setup>
// Flowchart.vue
import { useDragNDrop } from '@vue-flow/plugin-drag-n-drop'
import { VueFlow } from '@vue-flow/core'
import Sidebar from './Sidebar.vue'
import initialElements from './initial-elements'

// some nodes and edges
const elements = ref(initialElements)

// your drag and drop handler is bound to the current vue flow instance
// it will never apply to other store instances at the same time
const { handleDragOver, handleDrop } = useDragNDrop()
</script>
<template>
  <div style="height: 300px" @dragover="handleDragOver">
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
