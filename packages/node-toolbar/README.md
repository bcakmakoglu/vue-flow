# Vue Flow: Toolbar Component

This is a toolbar component for Vue Flow.
It can be used to create a floating Toolbar next to your nodes.
You can either display the Toolbar by setting the visibility prop or automatically showing the Toolbar
on selected nodes.

## 🛠 Setup

```bash
# install
$ yarn add @vue-flow/node-toolbar

# or
$ npm i --save @vue-flow/node-toolbar
```

## 🎮 Quickstart

```vue
<script setup>
import { VueFlow } from '@vue-flow/core'
import initialElements from './initial-elements'

// some nodes and edges
const elements = ref(initialElements)
</script>

<template>
  <VueFlow v-model="elements" fit-view-on-init>
    <template #node-custom="nodeProps">
      <CustomNode :data="nodeProps.data" :label="nodeProps.label" />
    </template>
  </VueFlow>
</template>
```

```vue
<script lang="ts" setup>
import { Handle, Position } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

interface NodeData {
  toolbarVisible: boolean
  toolbarPosition: Position
}

interface Props {
  data: NodeData
  label: string
}

defineProps<Props>()
</script>

<template>
  <NodeToolbar :is-visible="data.toolbarVisible" :position="data.toolbarPosition">
    <button>delete</button>
    <button>copy</button>
    <button>expand</button>
  </NodeToolbar>

  <div :style="{ padding: '10px 20px' }">
    {{ label }}
  </div>

  <Handle type="target" :position="Position.Left" />
  <Handle type="source" :position="Position.Right" />
</template>
```
