# Getting Started

## Prerequisites

- [Node.js v12+](https://nodejs.org/)
- [Vue 3](https://vuejs.org/)
- [Yarn v1 classic](https://classic.yarnpkg.com/en/) (Optional)

## Installation

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash:no-line-numbers
yarn add @braks/vue-flow
```

  </CodeGroupItem>


  <CodeGroupItem title="NPM">

```bash:no-line-numbers
npm i --save @braks/vue-flow
```

  </CodeGroupItem>
</CodeGroup>

## Usage

A flow consists of [<span class="font-bold text-blue-500">nodes</span>](https://types.vueflow.dev/interfaces/Node.html)
and (optionally) [<span class="font-bold text-purple-500">edges</span>](https://types.vueflow.dev/interfaces/Edge.html).
Together we call them
[<span class="font-bold text-green-500">elements</span>](https://types.vueflow.dev/modules.html#Elements).

<span class="font-bold text-blue-500">Each element needs a unique id.</span>
A node also needs a [xy-position](https://types.vueflow.dev/interfaces/XYPosition.html). An edge needs at least a
source (node id) and a target (node id).

```vue:no-line-numbers
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

## Quickstart

The recommended method of using Vue Flow is the composition API as it allows for full control of the state, thanks to
composables and the power of [provide/inject](https://vuejs.org/guide/components/provide-inject.html). You can even
access the state outside the context and manipulate it to your liking. However, using the options API is possible,
though more limited it will probably satisfy most of your needs if you are not looking for too advanced handling of
states.

A basic setup would look like this:

<CodeGroup>
  <CodeGroupItem title="Composition API" active>

@[code vue:no-line-numbers](../../../examples/src/Basic/Basic.vue)

  </CodeGroupItem>


  <CodeGroupItem title="Options API">

@[code vue:no-line-numbers](../../../examples/src/Basic/BasicOptionsAPI.vue)

  </CodeGroupItem>
</CodeGroup>

## TypeScript

Vue Flow is fully written in [TypeScript](https://www.typescriptlang.org/), so it is highly recommended to use TypeScript to have the best possible DX and
avoid common mistakes.
The types are included in the library.

[You can find the TypeDocs here](https://types.vueflow.dev/).
