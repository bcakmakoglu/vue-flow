# Vue Flow 🌊

[![vue flow](./src/assets/vue-flow.gif)](https://reactflow.dev/)
![top-language](https://img.shields.io/github/languages/top/bcakmakoglu/vue-flow)
[![dependencies Status](https://status.david-dm.org/gh/bcakmakoglu/vue-flow.svg)](https://david-dm.org/bcakmakoglu/vue-flow)
[![devDependencies Status](https://status.david-dm.org/gh/bcakmakoglu/vue-flow.svg?type=dev)](https://david-dm.org/bcakmakoglu/vue-flow?type=dev)
![vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/bcakmakoglu/vue-flow)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/bcakmakoglu/vue-flow)
![GitHub last commit](https://img.shields.io/github/last-commit/bcakmakoglu/vue-flow)

__A customizable Vue3 Flowchart.__

### __🚧 This library is still under construction__

Check the [docs](https://vue-flow.vercel.app/docs) and [examples](https://vue-flow.vercel.app/examples) to get started.

## Features

- 🎨 Customizable

- 🦾 Fully written in TypeScript

## Table of Contents

* [🛠 Setup](#-setup)

* [🎮 Quickstart](#-quickstart)

* [🧪 Development](#-development)

## 🛠 Setup

```bash
$ npm i @braks/vue-flow
# or
$ yarn add @braks/vue-flow
```

## 🎮 Quickstart

```vue

<template>
  <Flow :elements="elements"></Flow>
</template>
<script setup>
import { Flow, Elements } from '@braks/vue-flow'

const elements = ref < Elements > ([
  {
    id: '1',
    data: {
      label: 'This is a <strong>default node</strong>',
    },
    position: { x: 100, y: 100 },
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
