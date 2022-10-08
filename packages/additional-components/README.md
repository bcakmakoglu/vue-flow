# Vue Flow: Additional Components

This package contains additional components that can be used with Vue Flow.
These components include:

- [Background](https://vueflow.dev/guide/components/background)
- [Controls](https://vueflow.dev/guide/components/controls)
  - [ControlButton](https://vueflow.dev/guide/components/control-button)
- [MiniMap](https://vueflow.dev/guide/components/minimap)
  - [MiniMap Node](https://vueflow.dev/guide/components/minimap-node)

## 🛠 Setup

```bash
# install
$ yarn add @vue-flow/additional-components

# or
$ npm i --save @vue-flow/additional-components
```

## 🎮 Quickstart

```vue

<script setup>
import { VueFlow } from '@vue-flow/core'
import { Background, BackgroundVariant, Controls, MiniMap } from '@vue-flow/additional-components'
import initialElements from './initial-elements'

// some nodes and edges
const elements = ref(initialElements)
</script>
<template>
  <div style="height: 300px">
    <VueFlow v-model="elements">
      <!-- Adds a background to your graph. Use variant to specifiy which type of Background to use (lines, dots) -->
      <Background :variant="BackgroundVariant.Dots" />
      
      <!-- Adds zoom/interaction controls to your graph. You can add more buttons by using slots. -->
      <Controls />

      <!-- Adds a minimap to your graph. -->
      <MiniMap />
    </VueFlow>
  </div>
</template>
```
