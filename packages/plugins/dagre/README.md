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
import { PluginDagreLayout } from '@vue-flow/plugin-dagre'
import { createApp } from 'vue'

import App from './App.vue'

const app = createApp(App)

const vueFlowApp = createVueFlow()

vueFlowApp.use(PluginDagreLayout)

app.mount('#root')
```

- Use the layout action to lay out your graph

```vue
<script setup>
// App.vue
import { VueFlow } from '@vue-flow/core'
import { useDagreLayout } from '@vue-flow/plugin-dagre'
import initialElements from './initial-elements'

const elements = ref(initialElements)

const { layout, dagreGraph } = useDagreLayout()
</script>
<template>
  <div style="height: 100vh">
    <VueFlow v-model="elements" @nodes-initialized="layout('TB')" />
  </div>
</template>
```
