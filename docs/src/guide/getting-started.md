# Getting Started

## Prerequisites

- [Node.js v12+](https://nodejs.org/)
- [Vue 3](https://vuejs.org/)

## Installation

```bash
npm i --save @braks/vue-flow

yarn i @braks/vue-flow

pnpm i @braks/vue-flow
```

## Usage

A flow consists of [<span class="font-bold text-blue-500">nodes</span>](/typedocs/interfaces/Node)
and (optionally) [<span class="font-bold text-purple-500">edges</span>](/typedocs/interfaces/Edge).
Together we call them
[<span class="font-bold text-green-500">elements</span>](/typedocs/types/Elements).

<span class="font-bold text-blue-500">Each element needs a unique id.</span>
A node also needs a [xy-position](/typedocs/interfaces/XYPosition). An edge needs at least a
source (node id) and a target (node id).

```vue
<script setup>
import { VueFlow  } from '@braks/vue-flow'

const elements = ref([
  // Nodes
  // An input node, specified by using `type: 'input'`
  { id: '1', type: 'input', label: 'Node 1', position: { x: 250, y: 5 } },

  // Default nodes, you can omit `type: 'default'`
  { id: '2', label: 'Node 2', position: { x: 100, y: 100 }, },
  { id: '3', label: 'Node 3', position: { x: 400, y: 100 } },

  // An output node, specified by using `type: 'output'`
  { id: '4', type: 'output', label: 'Node 4', position: { x: 400, y: 200 } },

  // Edges
  // Most basic edge, only consists of an id, source-id and target-id
  { id: 'e1-3', source: '1', target: '3' },

  // An animated edge
  { id: 'e1-2', source: '1', target: '2', animated: true },
])
</script>
<template>
  <VueFlow v-model="elements" />
</template>
```

::: warning Necessary styles
Make sure you include the necessary styles.
See the [Theming](/guide/theming) section for more info.
:::

## TypeScript

Vue Flow is fully written in [TypeScript](https://www.typescriptlang.org/), so it is highly recommended to use TypeScript to have the best possible DX and
avoid common mistakes.
The types are included in the library.

[You can find the TypeDocs here](/typedocs/).
