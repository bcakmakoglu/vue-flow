---
title: Events
---

# Events

VueFlow provides a set of events that you can listen to in order to react to changes in the flow.

A full list of events can be found in the [API Reference](/typedocs/interfaces/FlowEvents.html).

## Listening to Events

### VueFlow Component

You can listen to events on the VueFlow component by using the `@` directive:

```vue
<script setup>
import { ref } from 'vue';  
import { VueFlow } from '@vue-flow/core';

const nodes = ref([/* ... */]);
const edges = ref([/* ... */]);

// Node click event handler
function onNodeClick({ event, node }) {
  console.log('Node clicked:', node, event);
}

// Edge click event handler
function onEdgeClick({ event, edge }) {
  console.log('Edge clicked:', edge, event);
}
</script>

<template>
  <VueFlow :nodes="nodges" :edges="edges" @node-click="onNodeClick" @edge-click="onEdgeClick"></VueFlow>
</template>
```

### Flow Instance / `useVueFlow`

You can also listen to events on the Flow instance by using the event hooks.

All events are available from `useVueFlow` as `on<EventName>`. For example, the `node-click` event is available as `onNodeClick`.

```vue
<script setup>
import { ref } from 'vue';
import { VueFlow, useVueFlow } from '@vue-flow/core';

const nodes = ref([/* ... */]);
const edges = ref([/* ... */]);

// All events are available from `useVueFlow` as `on<EventName>`
const { onNodeClick, onEdgeClick } = useVueFlow();

// Node click event handler
onNodeClick(({ event, node }) => {
  console.log('Node clicked:', node, event);
});

// Edge click event handler
onEdgeClick(({ event, edge }) => {
  console.log('Edge clicked:', edge, event);
});
</script>

<template>
  <VueFlow :nodes="nodges" :edges="edges" @node-click="onNodeClick" @edge-click="onEdgeClick"></VueFlow>
</template>
```
