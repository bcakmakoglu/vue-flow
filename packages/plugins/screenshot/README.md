# Vue Flow: Plugin Screenshot

This package contains a simple Screenshot plugin that can be used with Vue Flow.
Simply install the plugin onto your Vue Flow App and you can start using the composable to
screenshot your graph.

## 🛠 Setup

```bash
# install
$ yarn add @vue-flow/plugin-screenshot

# or
$ npm i --save @vue-flow/plugin-screenshot
```

## 🎮 Quickstart

- Install the plugin

```ts
// main.ts or your app entry point
import { createVueFlow } from '@vue-flow/core'
import { PluginScreenshot } from '@vue-flow/plugin-screenshot'
import { createApp } from 'vue'

import App from './App.vue'

const app = createApp(App)

const vueFlowApp = createVueFlow()

vueFlowApp.use(PluginScreenshot)

app.mount('#root')
```

- Attach the handlers

```vue
<script setup>
// App.vue
import { VueFlow } from '@vue-flow/core'
import { useScreenshot } from '@vue-flow/plugin-screenshot'
import initialElements from './initial-elements'

const elements = ref(initialElements)

const { screenshot } = useScreenshot()
</script>

<template>
  <VueFlow v-model="elements" fit-view-on-init>
    <Panel :position="PanelPosition.TopCenter">
      <button @click="screenshot">Click to save Screenshot</button>
    </Panel>
  </VueFlow>
</template>
```
