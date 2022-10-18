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

const vueFlowApp = createVueFlow()

vueFlowApp.use(PluginScreenshot)
```

- Attach the handlers

```vue
<script setup>
// Flowchart.vue
import { useScreenshot } from '@vue-flow/plugin-screenshot'
import { VueFlow } from '@vue-flow/core'
import initialElements from './initial-elements'

// some nodes and edges
const elements = ref(initialElements)

// your drag and drop handler is bound to the current vue flow instance
// it will never apply to other store instances at the same time
const { screenshot, download } = useScreenshot()

const onClick = async () => {
  await screenshot('png', 'my-flowchart')
}
</script>
<template>
  <div style="height: 300px">
    <VueFlow v-model="elements">
      <div style="position: absolute; top: 0; right: 0; padding: 10px; z-index: 5">
        <button @click="onClick">Download Screenshot</button>  
      </div>
    </VueFlow>
  </div>
</template>
```
