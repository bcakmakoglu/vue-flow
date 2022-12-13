# Node Toolbar

This is a toolbar component for Vue Flow.
It can be used to create a floating Toolbar next to your nodes.
You can either display the Toolbar by setting the visibility prop or automatically showing the Toolbar
on selected nodes.

## Installation

```bash
yarn add @vue-flow/node-toolbar

# or
npm install @vue-flow/node-toolbar
```

## Usage

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

## [Props](/typedocs/interfaces/NodeToolbarProps)

| Name            | Definition                                        | Type                                 | Optional | Default                 |
|-----------------|---------------------------------------------------|--------------------------------------|----------|-------------------------|
| nodeId          | Node(s) the toolbar is supposed to be attached to | string array                         | true     | NodeId from context     |
| isVisible       | Force visibility of toolbar                       | boolean                              | true     | Selected node           |
| position        | Toolbar position (top, left, right, bottom)       | [Position](/typedocs/enums/Position) | true     | Top                     |
| offset          | Offset of toolbar position                        | number                               | true     | 10                      |

## Slots

| Name    | Definition                           |
|---------|--------------------------------------|
| default | Default toolbar slot for any content | 
