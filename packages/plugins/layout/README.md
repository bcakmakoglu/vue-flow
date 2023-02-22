# Vue Flow: Plugin Layout

This package contains a simple layout plugin using [dagre.js](https://github.com/dagrejs/dagre).

## 🛠 Setup

```bash
# install plugin & dagre (plugin does not include dagre)
$ yarn add @vue-flow/plugin-layout dagre

# or
$ npm i --save @vue-flow/plugin-layout dagre
```

## 🎮 Quickstart

- Use the layout action to lay out your graph

```vue

<script setup>
// App.vue
import { VueFlow } from '@vue-flow/core'
import { layout } from '@vue-flow/plugin-layout'
import initialElements from './initial-elements'

const elements = ref(initialElements)
</script>
<template>
  <div style="height: 100vh">
    <VueFlow v-model="elements" @nodes-initialized="layout(elements, { direction: 'TB' })"/>
  </div>
</template>
```
