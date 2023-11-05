# Kickstart Your Journey with Vue Flow!

This guide covers the basics of setting up and using Vue Flow. You'll learn how to install Vue Flow, configure it, and
utilize it within your own projects.

## Prerequisites

Before you strap in, make sure you're equipped with:

- [Node.js v16 or above](https://nodejs.org/)
- [Vue 3.0 or above](https://vuejs.org/)

## Installation

Use your preferred package manager to install Vue Flow:

::: code-group

```sh [npm]
$ npm add @vue-flow/core
```

```sh [pnpm]
$ pnpm add @vue-flow/core
```

```sh [yarn]
$ yarn add @vue-flow/core
```

:::

## Usage

In Vue Flow, an application structure consists
of [<span class="font-bold">nodes</span>](/typedocs/interfaces/Node)
and [<span class="font-bold">edges</span>](/typedocs/types/Edge), all of which are categorised as
[<span class="font-bold">elements</span>](/typedocs/types/Elements).

<span class="font-bold">Each element requires a unique id.</span>

Nodes additionally need an [XY-position](/typedocs/interfaces/XYPosition), while edges require a source and a
target, both represented by node ids.

::: warning NOTE!
To ensure Vue Flow's is correctly displayed, make sure you include the necessary styles.

Refer to the [Theming](/guide/theming) section for additional information.
:::

Here's a simple Vue Flow example to get you started:

```vue
<script setup>
import { VueFlow } from '@vue-flow/core'

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
  <VueFlow v-model="elements"/>
</template>

<style>
/* import the necessary styles for Vue Flow to work */
@import '@vue-flow/core/dist/style.css';

/* import the default theme, this is optional but generally recommended */
@import '@vue-flow/core/dist/theme-default.css';
</style>
```

## TypeScript

As Vue Flow is entirely written in TypeScript, we highly recommend utilizing TypeScript for improved developer
experience and prevention of common errors.
The necessary type definitions are included with the library.

For more information, review our [TypeDocs documentation](/typedocs/).
