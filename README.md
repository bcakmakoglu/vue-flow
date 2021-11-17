# Vue Flow 🌊

[![vue flow](./src/assets/vue-flow.gif)](https://vueflow.dev/)
![top-language](https://img.shields.io/github/languages/top/bcakmakoglu/vue-flow)
[![dependencies Status](https://status.david-dm.org/gh/bcakmakoglu/vue-flow.svg)](https://david-dm.org/bcakmakoglu/vue-flow)
[![devDependencies Status](https://status.david-dm.org/gh/bcakmakoglu/vue-flow.svg?type=dev)](https://david-dm.org/bcakmakoglu/vue-flow?type=dev)
![vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/bcakmakoglu/vue-flow)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/bcakmakoglu/vue-flow)
![GitHub last commit](https://img.shields.io/github/last-commit/bcakmakoglu/vue-flow)

### __Vue Flow: A highly customizable Vue3 Flowchart component.__

With Vue Flow you can build your own, customized node-based applications like static diagrams or even more complex and
interactive editors!

You can find a detailed explanation on how to get started in the [documentation](https://vueflow.dev/docs) or check
the [examples](https://vueflow.dev/examples).

If you want to see how it's used with Nuxt3, check out the [docs repo](https://github.com/bcakmakoglu/vue-flow-docs)!

## ⭐️ Features

- 👶 Easy to use: Seamless zooming & panning behaviour and single and multi-selections of
  elements

- 🎨 Customizable: Different and edge types and support for custom nodes with multiple handles and custom edges

- 🚀 Fast rendering: Only nodes that have changed are re-rendered and only those that are in the viewport are displayed (optionally)

- 🧲 Utils: Snap-to-grid and graph helper functions

- 📦 Additional Components:

  - 🖼 Background

  - 🧭 Minimap

  - 🕹 Controls

- 🦾 Fully written in TypeScript

## 🛠 Setup

```bash
$ npm i @braks/vue-flow
# or
$ yarn add @braks/vue-flow
```

## 🎮 Quickstart

```vue
<template>
  <VueFlow :elements="elements"></VueFlow>
</template>
<script lang="ts" setup>
import { VueFlow, Elements, Position } from '@braks/vue-flow'

const elements = ref<Elements>([
  {
    id: '1',
    data: {
      label: 'node 1',
    },
    position: { x: 100, y: 100 },
    targetPosition: Position.Right
  },
  {
    id: '2',
    data: {
      label: 'node 2',
    },
    position: { x: 100, y: 200 },
    sourcePosition: Position.Left
  },
  {
    id: 'e1-2',
    label: 'default edge',
    target: '2',
    source: '1',
  },
])
</script>
```

### ▸ Vue 2

**_This library doesn't work with Vue2._**

## 🧪 Development

```bash
# start (dev)
$ yarn dev

# build dist
$ yarn build
```

## 💝 Credit

Thanks to [webkid](https://webkid.io/) for creating React Flow! Without their work this would've been impossible for me.
