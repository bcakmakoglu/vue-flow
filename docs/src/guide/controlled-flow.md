---
title: Controlled Flow
---

# Taking Control of Vue Flow

Vue Flow is designed to be flexible and customizable, allowing you to take control of the flow of your application.
By default, Vue Flow will apply changes automatically, so you don't have to worry about it.

::: warning
This API is subject to change in the next major release where changes will *most likely* not be applied automatically anymore.
:::

Though, there are cases where you want to take control of changes and apply them manually after some processing and validations for example.

This guide will show you how to take control of Vue Flow and apply these changes manually.

## The `applyChanges` option

The `applyChanges` option is a flag that can be passed to the `VueFlow` component to enable or disable automatic change handling.

By setting this option to `false`, we tell Vue Flow to not apply changes automatically anymore.

```vue
<template>
  <VueFlow v-model="elements" :apply-changes="false" />
</template>
```

## `onNodesChange` / `onEdgesChange` events

Vue Flow provides two events that can be used to listen to changes on nodes and edges.
These events are emitted regardless of the `applyChanges` option, so you can use them to listen to changes even if you have automatic changes enabled.

```vue
<script setup>
const onChange = (changes) => {
  // changes are arrays of type `NodeChange` or `EdgeChange`
  console.log(changes) // will log the changes
}
</script>

<template>
  <VueFlow v-model="elements" @nodes-change="onChange" @edges-change="onChange" />
</template>
```

## `applyNodeChanges` / `applyEdgeChanges`

Vue Flow provides two functions that can be used to apply changes manually.

These functions are available from the `useVueFlow` composable.

```vue
<script setup>
import { useVueFlow } from '@vue-flow/core'

const { applyNodeChanges, applyEdgeChanges } = useVueFlow();

const onChange = (changes) => {
  // apply changes manually
  applyNodeChanges(changes)
}
</script>
```

## Validating Changes

Using what we just learned, we can now take control of changes and apply them manually.

In this example, we will first disable automatic change handlers with `applyChanges`, 
then use the `onNodesChange` event to listen to changes and validate delete changes and, 
if they are valid, use `applyNodeChanges` to apply them.

```vue
<script setup>
import { useVueFlow, VueFlow } from '@vue-flow/core'
import { ref } from 'vue'

const { applyNodeChanges } = useVueFlow();

const { confirm } = useConfirm();

const elements = ref([
  {
    id: '1',
    label: 'Node 1',
    position: { x: 0, y: 0 },
  },
  {
    id: '2',
    label: 'Node 2',
    position: { x: 100, y: 100 },
  },
  {
    id: 'e1-2',
    source: '1',
    target: '2',
  },
])

const onNodesChange = (changes) => {
    changes.forEach(async (change) => {
        // if the change is a remove change, we want to validate it first
        if (change.type === 'remove') {
          const isConfirmed = await confirm();

          if (isConfirmed) {
            // if confirmed, apply the change
            applyNodeChanges([change])
          }
        } else {
          // apply all other changes
          applyNodeChanges([change])
        }
    })
}
</script>

<template>
  <VueFlow v-model="elements" :apply-changes="false" @nodes-change="onNodesChange" />
</template>
```
