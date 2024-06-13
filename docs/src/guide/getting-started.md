---
title: Getting Started
---

<script setup>
import LogosJavascript from '~icons/logos/javascript';
import LogosTypescript from '~icons/logos/typescript-icon';
</script>

# Getting Started

This guide covers the basics of setting up and using Vue Flow. 
You'll learn how to install Vue Flow, configure it, and create your first flowchart.

## Prerequisites

Before you strap in, make sure you're equipped with:

- [Node.js v20 or above](https://nodejs.org/)
- [Vue 3.3 or above](https://vuejs.org/)

## CodeSandbox

If you're looking for a quick way to get started, check out the [CodeSandbox template](https://codesandbox.io/p/sandbox/vue-flow-basic-gfgro4).

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

## Quick Start

In Vue Flow, a graph consists of [**nodes**](/typedocs/interfaces/Node) and [**edges**](/typedocs/types/Edge).

**Each node or edge requires a unique id.**

Nodes also need a [XY-position](/typedocs/interfaces/XYPosition), while edges require a `source` and a
`target` node id.

::: warning NOTE!
To ensure Vue Flow's is correctly displayed, make sure you include the necessary styles.

```css
/* these are necessary styles for vue flow */
@import '@vue-flow/core/dist/style.css';

/* this contains the default theme, these are optional styles */
@import '@vue-flow/core/dist/theme-default.css';
```

Refer to the [Theming](/guide/theming) section for additional information.
:::

Here's a simple example to get you started:

::: code-group

```vue [<LogosJavascript />]
<script setup>
import { ref } from 'vue'
import { VueFlow } from '@vue-flow/core'

// these components are only shown as examples of how to use a custom node or edge
// you can find many examples of how to create these custom components in the examples page of the docs
import SpecialNode from './components/SpecialNode.vue'
import SpecialEdge from './components/SpecialEdge.vue'

// these are our nodes
const nodes = ref([
  // an input node, specified by using `type: 'input'`
  { 
    id: '1',
    type: 'input', 
    position: { x: 250, y: 5 },
    // all nodes can have a data object containing any data you want to pass to the node
    // a label can property can be used for default nodes
    data: { label: 'Node 1' },
  },

  // default node, you can omit `type: 'default'` as it's the fallback type
  { 
    id: '2', 
    position: { x: 100, y: 100 },
    data: { label: 'Node 2' },
  },

  // An output node, specified by using `type: 'output'`
  { 
    id: '3', 
    type: 'output', 
    position: { x: 400, y: 200 },
    data: { label: 'Node 3' },
  },

  // this is a custom node
  // we set it by using a custom type name we choose, in this example `special`
  // the name can be freely chosen, there are no restrictions as long as it's a string
  {
    id: '4',
    type: 'special', // <-- this is the custom node type name
    position: { x: 400, y: 200 },
    data: {
      label: 'Node 4',
      hello: 'world',
    },
  },
])

// these are our edges
const edges = ref([
  // default bezier edge
  // consists of an edge id, source node id and target node id
  { 
    id: 'e1->2',
    source: '1', 
    target: '2',
  },

  // set `animated: true` to create an animated edge path
  { 
    id: 'e2->3',
    source: '2', 
    target: '3', 
    animated: true,
  },

  // a custom edge, specified by using a custom type name
  // we choose `type: 'special'` for this example
  {
    id: 'e3->4',
    type: 'special',
    source: '3',
    target: '4',

    // all edges can have a data object containing any data you want to pass to the edge
    data: {
      hello: 'world',
    }
  },
])
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges">
    <!-- bind your custom node type to a component by using slots, slot names are always `node-<type>` -->
    <template #node-special="specialNodeProps">
      <SpecialNode v-bind="specialNodeProps" />
    </template>

    <!-- bind your custom edge type to a component by using slots, slot names are always `edge-<type>` -->
    <template #edge-special="specialEdgeProps">
      <SpecialEdge v-bind="specialEdgeProps" />
    </template>
  </VueFlow>
</template>

<style>
/* import the necessary styles for Vue Flow to work */
@import '@vue-flow/core/dist/style.css';

/* import the default theme, this is optional but generally recommended */
@import '@vue-flow/core/dist/theme-default.css';
</style>
```

```vue [<LogosTypescript />]
<script setup lang="ts">
import { ref } from 'vue'
import type { Node, Edge } from '@vue-flow/core'  
import { VueFlow } from '@vue-flow/core'

// these components are only shown as examples of how to use a custom node or edge
// you can find many examples of how to create these custom components in the examples page of the docs
import SpecialNode from './components/SpecialNode.vue'
import SpecialEdge from './components/SpecialEdge.vue'

// these are our nodes
const nodes = ref<Node[]>([
  // an input node, specified by using `type: 'input'`
  {
    id: '1',
    type: 'input',
    position: { x: 250, y: 5 },
    // all nodes can have a data object containing any data you want to pass to the node
    // a label can property can be used for default nodes
    data: { label: 'Node 1' },
  },

  // default node, you can omit `type: 'default'` as it's the fallback type
  {
    id: '2',
    position: { x: 100, y: 100 },
    data: { label: 'Node 2' },
  },

  // An output node, specified by using `type: 'output'`
  {
    id: '3',
    type: 'output',
    position: { x: 400, y: 200 },
    data: { label: 'Node 3' },
  },

  // this is a custom node
  // we set it by using a custom type name we choose, in this example `special`
  // the name can be freely chosen, there are no restrictions as long as it's a string
  {
    id: '4',
    type: 'special', // <-- this is the custom node type name
    position: { x: 400, y: 200 },
    data: {
      label: 'Node 4',
      hello: 'world',
    },
  },
])

// these are our edges
const edges = ref<Edge[]>([
  // default bezier edge
  // consists of an edge id, source node id and target node id
  {
    id: 'e1->2',
    source: '1',
    target: '2',
  },

  // set `animated: true` to create an animated edge path
  {
    id: 'e2->3',
    source: '2',
    target: '3',
    animated: true,
  },

  // a custom edge, specified by using a custom type name
  // we choose `type: 'special'` for this example
  {
    id: 'e3->4',
    type: 'special',
    source: '3',
    target: '4',

    // all edges can have a data object containing any data you want to pass to the edge
    data: {
      hello: 'world',
    }
  },
])
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges">
    <!-- bind your custom node type to a component by using slots, slot names are always `node-<type>` -->
    <template #node-special="specialNodeProps">
      <SpecialNode v-bind="specialNodeProps" />
    </template>

    <!-- bind your custom edge type to a component by using slots, slot names are always `edge-<type>` -->
    <template #edge-special="specialEdgeProps">
      <SpecialEdge v-bind="specialEdgeProps" />
    </template>
  </VueFlow>
</template>

<style>
/* import the necessary styles for Vue Flow to work */
@import '@vue-flow/core/dist/style.css';

/* import the default theme, this is optional but generally recommended */
@import '@vue-flow/core/dist/theme-default.css';
</style>
```

:::

## TypeScript

As Vue Flow is entirely written in TypeScript, we highly recommend utilizing TypeScript for improved developer
experience and prevention of common errors.
The necessary type definitions are included with the library.

For more information, review our [TypeDocs documentation](/typedocs/).
