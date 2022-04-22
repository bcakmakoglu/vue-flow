# Vue Flow 🌊

[![vue flow](package/src/assets/vue-flow.gif)](https://vueflow.dev/)
![top-language](https://img.shields.io/github/languages/top/bcakmakoglu/vue-flow)
![vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/bcakmakoglu/vue-flow)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/bcakmakoglu/vue-flow)
![GitHub last commit](https://img.shields.io/github/last-commit/bcakmakoglu/vue-flow)

### __Vue Flow: A highly customizable Vue 3 Flowchart component.__

With Vue Flow you can build your own, customized node-based applications like static diagrams or even more complex and
interactive editors!

You can find a detailed explanation on how to get started in the [documentation](https://vueflow.dev/guide) or check
the [examples](https://vueflow.dev/examples).

## ⭐️ Features

- 👶 __Easy setup__: Get started hassle-free - Built-in zoom- & pan features, element dragging, selection and much more

- 🎨 __Customizable__: Use your own custom nodes, edges, connection lines and expand on the Vue Flows functionality

- 🚀 __Fast__: Tracks changes reactively and only re-renders the appropriate elements

- 🧲 __Utils & Composition__: Comes with graph helper and state composable functions for advanced uses

- 📦 __Additional Components__:

  - 🖼 Background: With two built-in patterns and some configuration options like height, width or color.

  - 🧭 Minimap: Shows current nodes in a small map shape in the bottom right corner

  - 🕹 Controls: Control zoom behavior from a panel on the bottom left

- 🦾 __Reliable__: Fully written in TypeScript

## 🛠 Setup

```bash
$ npm i @braks/vue-flow

# or
$ yarn add @braks/vue-flow
```

## 🎮 Quickstart

A flow consists of __nodes__ and __edges__ (or just nodes). Together we call them
__elements__.

__Each element needs a unique id.__ 

A node also needs a xy-position.
An edge needs a source (node id) and a target (node id). 

A simple setup could look like this:

```vue
<!-- Flowchart.vue -->
<template>
  <VueFlow v-model="elements"></VueFlow>
</template>
<script setup>
import { VueFlow } from '@braks/vue-flow'

const elements = ref([
  {
    id: '1',
    label: 'node 1',
    position: { x: 100, y: 100 },
  },
  {
    id: '2',
    label: 'node 2',
    position: { x: 100, y: 200 },
  },
  {
    id: 'e1-2',
    target: '2',
    source: '1',
  },
])
</script>
```

### __Make sure to import the necessary styles:__

```css
/* main.css */

/* import the required styles */
@import "@braks/vue-flow/dist/style.css";

/* import the default theme (optional) */
@import "@braks/vue-flow/dist/theme-default.css";
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

## ⭐ Stargazers

Thanks for your star!

[![Stargazers repo roster for @braks/vue-flow](https://reporoster.com/stars/bcakmakoglu/vue-flow)](https://github.com/bcakmakoglu/vue-flow/stargazers)

## 💝 Special Thanks

This project is built with

- [React Flow](https://reactflow.dev/)
  - Vue flow is heavily based on [webkid's](https://webkid.io/) [react flow](https://reactflow.dev/). I wholeheartedly thank
  them for their amazing work! Without them this vue flow would not exist.
  Please consider [donating](https://github.com/sponsors/wbkd) to them!

- [D3.js](https://d3js.org/)
  - D3 makes all the zoom and pan actions in the graph possible.
    Check it out to see if you can find other uses for it too!

- [VueUse](https://vueuse.org/)
  - VueUse is a collection of helpful utilities/composables that have been battle tested.
