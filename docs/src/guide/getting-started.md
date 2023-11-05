<script setup>
import LogosJavascript from '~icons/logos/javascript';
import LogosTypescript from '~icons/logos/typescript-icon';
</script>

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

::: code-group

```vue [<LogosJavascript />]
<script setup>
import { VueFlow } from '@vue-flow/core'

import SpecialNode from './components/SpecialNode.vue'
import SpecialEdge from './components/SpecialEdge.vue'

const elements = ref([
  // nodes

  // an input node, specified by using `type: 'input'`
  { id: '1', type: 'input', label: 'Node 1', position: { x: 250, y: 5 } },

  // default node, you can omit `type: 'default'` as it's the fallback type
  { id: '2', label: 'Node 2', position: { x: 100, y: 100 }, },

  // An output node, specified by using `type: 'output'`
  { id: '3', type: 'output', label: 'Node 3', position: { x: 400, y: 200 } },

  // A custom node, specified by using a custom type name
  // we choose `type: 'special'` for this example
  {
    id: '4',
    type: 'special',
    label: 'Node 4',
    position: { x: 400, y: 200 },

    // pass custom data to the node
    data: {
      // you can pass any data you want to the node
      hello: 'world',
    },
  },

  // edges

  // simple default bezier edge
  // consists of an id, source-id and target-id
  { id: 'e1-3', source: '1', target: '3' },

  // an animated edge, specified by using `animated: true`
  { id: 'e1-2', source: '1', target: '2', animated: true },

  // a custom edge, specified by using a custom type name
  // we choose `type: 'special'` for this example
  {
    id: 'e1-4',
    type: 'special',
    source: '1',
    target: '4',

    // pass custom data to the edge
    data: {
      // You can pass any data you want to the edge       
      hello: 'world',
    }
  },
])
</script>

<template>
  <VueFlow v-model="elements">
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
import type { Elements } from '@vue-flow/core'  
import { VueFlow } from '@vue-flow/core'

import SpecialNode from './components/SpecialNode.vue'
import SpecialEdge from './components/SpecialEdge.vue'

const elements = ref<Elements>([
  // nodes
    
  // an input node, specified by using `type: 'input'`
  { id: '1', type: 'input', label: 'Node 1', position: { x: 250, y: 5 } },

  // default node, you can omit `type: 'default'` as it's the fallback type
  { id: '2', label: 'Node 2', position: { x: 100, y: 100 }, },

  // An output node, specified by using `type: 'output'`
  { id: '3', type: 'output', label: 'Node 3', position: { x: 400, y: 200 } },
    
  // A custom node, specified by using a custom type name
  // we choose `type: 'special'` for this example
  { 
    id: '4', 
    type: 'special', 
    label: 'Node 4', 
    position: { x: 400, y: 200 },

    // pass custom data to the node
    data: {
      // you can pass any data you want to the node
      hello: 'world',
    },
  },  

  // edges
    
  // simple default bezier edge
  // consists of an id, source-id and target-id
  { id: 'e1-3', source: '1', target: '3' },

  // an animated edge, specified by using `animated: true`
  { id: 'e1-2', source: '1', target: '2', animated: true },
    
  // a custom edge, specified by using a custom type name
  // we choose `type: 'special'` for this example
  { 
    id: 'e1-4', 
    type: 'special', 
    source: '1', 
    target: '4',
    
    // pass custom data to the edge
    data: {
      // You can pass any data you want to the edge       
      hello: 'world',
    }
  },
])
</script>

<template>
  <VueFlow v-model="elements">
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
