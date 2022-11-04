# Vue Flow: Plugin Dagre

This package contains a simple Dagre Layout plugin that can be used with Vue Flow.
Simply install the plugin onto your Vue Flow App and you can start using the composable to
lay out your graph.

## 🛠 Setup

```bash
# install plugin & dagre (plugin does not include dagre)
$ yarn add @vue-flow/plugin-dagre dagre

# or
$ npm i --save @vue-flow/plugin-dagre dagre
```

## 🎮 Quickstart

- Install the plugin

```ts
// main.ts or your app entry point
import { createVueFlow } from '@vue-flow/core'
import { PluginScreenshot } from '@vue-flow/plugin-dagre'

const vueFlowApp = createVueFlow()

vueFlowApp.use(PluginScreenshot)
```

- Attach the handlers

```vue
<script setup>
// Flowchart.vue
import { useDagreLayout } from '@vue-flow/plugin-dagre'
import { VueFlow } from '@vue-flow/core'
import initialElements from './initial-elements'

// some nodes and edges
const elements = ref(initialElements)

// your drag and drop handler is bound to the current vue flow instance
// it will never apply to other store instances at the same time
const { layout, dagreGraph } = useDagreLayout()
</script>
<template>
  <div style="height: 300px">
    <VueFlow v-model="elements" @pane-ready="layout" />
  </div>
</template>
```
