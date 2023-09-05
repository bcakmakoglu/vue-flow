<script setup>
import { VueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import Check from '~icons/mdi/check';
import Close from '~icons/mdi/close';
import { ref } from 'vue';

const defaultNode = ref([
  {
    id: '1',
    label: 'Default Node',
    position: { x: 50, y: 75 },
  }
]);

const inputNode = ref([
  {
    id: '1',
    type: 'input',
    label: 'Input Node',
    position: { x: 50, y: 75 },
  }
]);

const outputNode = ref([
  {
    id: '1',
    type: 'output',
    label: 'Output Node',
    position: { x: 50, y: 75 },
  }
]);
</script>

# Nodes

Nodes are the building blocks of your graph. They represent any sort of data you want to present in your graph.

They can exist on their own but can be connected to each other with edges to create a map.

Each node <span class="font-bold text-blue-500">requires a unique id and
an [xy-position](/typedocs/interfaces/XYPosition).</span>

You can view the full options-list for a node [here](/typedocs/interfaces/Node).

## Usage

Generally you create nodes by adding them to the model-value or the nodes prop of the Vue Flow component.

```vue
<script>
import { VueFlow } from '@vue-flow/core'

export default defineComponent({
  components: { VueFlow },
  data() {
    return {
      elements: [
        {
          id: '1',
          position: { x: 50, y: 50 },
          label: 'Node 1',
        }
      ]
    }
  },
  mounted() {
    // Add an element after mount
    this.elements.push(
      {
        id: '2',
        position: { x: 150, y: 50 },
        label: 'Node 2',
      }
    )
  }
})
</script>

<template>
  <div style="height: 300px">
    <VueFlow v-model="elements" />
  </div>
</template>
```

For more advanced graphs that require more state access you will want to use the useVueFlow composable.
[useVueFlow](/typedocs/functions/useVueFlow) will provide the [`addNodes`](/typedocs/interfaces/Actions#addnodes) action, 
which you can use to add nodes directly to the state.

This action can be even be used outside the component that is rendering the graph, like a Sidebar or a Toolbar.

```vue
<script setup>
import { VueFlow, useVueFlow } from '@vue-flow/core'

const initialNodes = ref([
  {
    id: '1',
    position: { x: 50, y: 50 },
    label: 'Node 1',
  }
])
const { addNodes } = useVueFlow({
  nodes: initialNodes,
})

onMounted(() => {
  // Add an element after mount
  addNodes([
    {
      id: '2',
      position: { x: 150, y: 50 },
      label: 'Node 2',
    }
  ])
})
</script>

<template>
  <div style="height: 300px">
    <VueFlow />
  </div>
</template>
```

## [Default Node-Types](/typedocs/types/DefaultNodeTypes)

Vue Flow comes with built-in nodes that you can use right out of the box.
These node types include `default`, `input` and `output`.

### Default Node

<div class="mt-4 bg-[var(--vp-code-block-bg)] rounded h-50">
  <VueFlow v-model="defaultNode">
    <Background />
  </VueFlow>
</div>

A default node comes with two handles.
It represents a branching point in your map.

You can specify the position of handles in the node definition.

```js{5-6}
const nodes = [
  {
    id: '1',
    label: 'Node 1',
    targetHandle: Position.Top, // or Bottom, Left, Right,
    sourceHandle: Position.Right,
  }
]
```

### Input Node

<div class="mt-4 bg-[var(--vp-code-block-bg)] rounded h-50">
  <VueFlow v-model="inputNode">
    <Background />
  </VueFlow>
</div>


An input node has a single handle, located at the bottom by default.
It represents a starting point of your map.

### Output Node

<div class="mt-4 bg-[var(--vp-code-block-bg)] rounded h-50">
  <VueFlow v-model="outputNode">
    <Background />
  </VueFlow>
</div>

An output node has a single handle, located at the top by default.
It represents an ending point of your map.

## Custom Nodes

In addition to the default node types from the previous chapter, you can define any amount of custom node-types.
Node-types are inferred from your node's definition.

```js{5,11}
const nodes = [
  {
    id: '1',
    label: 'Node 1',
    type: 'custom',
    position: { x: 50, y: 50 },
  },
  {
    id: '1',
    label: 'Node 1',
    type: 'special',
    position: { x: 150, y: 50 },
  }
]
```

Vue Flow will now try to resolve this node-type to a component.
First and foremost we will look for a definition in the `nodeTypes` object of the state.
After that we will try to resolve the component to a globally registered one that matches the exact name.
Finally, we will check if a template slot has been provided to fill the node-type.

If none of these methods succeed in resolving the component the default node-type will be used as a fallback.

### Template slots

The easiest way to define custom nodes is, by passing them as template slots.
Your custom node-types are dynamically resolved to slot-names, meaning a node with the type `custom`
will expect a slot to have the name `node-custom`.

```vue{9,16}
<script setup>
import { VueFlow } from '@vue-flow/core'
import CustomNode from './CustomNode.vue'

const elements = ref([
  {
    id: '1',
    label: 'Node 1',
    type: 'custom',
    position: { x: 50, y: 50 },
  }
])
</script>
<template>
  <VueFlow v-model="elements">
    <template #node-custom="props">
      <CustomNode v-bind="props" />
    </template>
  </VueFlow>
</template>
```

### Node-types object

You can also define node-types by passing an object as a prop to the VueFlow component (or as an option to the
composable).

::: warning
When doing this, mark your components as raw (using the designated function from the vue library) to avoid them being
turned into reactive objects.
Otherwise, vue will throw a warning in the console.
:::

```vue{6-9,26}
<script setup>
import { markRaw } from 'vue'
import CustomNode from './CustomNode.vue'
import SpecialNode from './SpecialNode.vue'

const nodeTypes = {
  custom: markRaw(CustomNode),
  special: markRaw(SpecialNode),
}

const elements = ref([
  {
    id: '1',
    label: 'Node 1',
    type: 'custom',
  },
  {
    id: '1',
    label: 'Node 1',
    type: 'special',
  }
])
</script>
<template>
  <div style="height: 300px">
    <VueFlow v-model="elements" :node-types="nodeTypes" />
  </div>
</template>
```

::: tip
You can find a more advanced example [here](/examples/nodes/).
:::

### Node Template

You can also set a template per node, which will overwrite the node-type component but will retain
the type otherwise.

```vue{17}
<script setup>
import { markRaw } from 'vue'
import CustomNode from './CustomNode.vue'
import OverwriteCustomNode from './OverwriteCustomNode.vue'
import SpecialNode from './SpecialNode.vue'

const nodeTypes = {
  custom: markRaw(CustomNode),
  special: markRaw(SpecialNode),
}

const elements = ref([
  {
    id: '1',
    label: 'Node 1',
    type: 'custom',
    template: markRaw(OverwriteCustomNode),
  },
  {
    id: '1',
    label: 'Node 1',
    type: 'special',
  }
])
</script>
<template>
  <div style="height: 300px">
    <VueFlow v-model="elements" :node-types="nodeTypes" />
  </div>
</template>
```

### [(Custom) Node Props](/typedocs/interfaces/NodeProps)

Your custom nodes are wrapped so that the basic functions like dragging or selecting work.
But you might want to extend on that functionality or implement your own business logic inside of nodes, therefore
your nodes receive the following props:

| Name             | Definition                                       | Type                                                       | Optional                                   |
|------------------|--------------------------------------------------|------------------------------------------------------------|--------------------------------------------|
| id               | Node id                                          | string                                                     | <Close class="text-red-500" />             |
| type             | Node type                                        | string                                                     | <Close class="text-red-500" />             |
| selected         | Is node selected                                 | boolean                                                    | <Close class="text-red-500" />             |
| dragging         | Is node dragging                                 | boolean                                                    | <Close class="text-red-500" />             |
| connectable      | Is node connectable                              | boolean                                                    | <Close class="text-red-500" />             |
| position         | Relative position of a node                      | [XYPosition](/typedocs/interfaces/XYPosition)              | <Close class="text-red-500" />             |
| zIndex           | Node z-index                                     | number                                                     | <Close class="text-red-500" />             |
| dimensions       | Node size                                        | [Dimensions](/typedocs/interfaces/Dimensions)              | <Close class="text-red-500" />             |
| data             | Custom data object                               | Any object                                                 | <Check class="text-[var(--vp-c-brand)]" /> |
| events           | Node events and custom events                    | [NodeEventsOn](/typedocs/types/NodeEventsOn)               | <Check class="text-[var(--vp-c-brand)]" /> |
| label            | Node label                                       | string, Component                                          | <Check class="text-[var(--vp-c-brand)]" /> |
| isValidTargetPos | Called when target handle is used for connection | [ValidConnectionFunc](/typedocs/types/ValidConnectionFunc) | <Check class="text-[var(--vp-c-brand)]" /> |
| isValidSourcePos | Called when source handle is used for connection | [ValidConnectionFunc](/typedocs/types/ValidConnectionFunc) | <Check class="text-[var(--vp-c-brand)]" /> |
| parentNode       | Parent node id                                   | string                                                     | <Check class="text-[var(--vp-c-brand)]" /> |
| targetPosition   | Target handle position                           | [Position](/typedocs/enums/Position)                       | <Check class="text-[var(--vp-c-brand)]" /> |
| sourcePosition   | Source handle position                           | [Position](/typedocs/enums/Position)                       | <Check class="text-[var(--vp-c-brand)]" /> |
| dragHandle       | Node drag handle class                           | string                                                     | <Check class="text-[var(--vp-c-brand)]" /> |

### (Custom) Node Events

In addition to the event handlers that you can access through [`useVueFlow`](/guide/composables#useVueFlow/) or the Vue
Flow component,
you can also pass in event handlers in your initial node definition, or you can access the node events through
the `events` prop passed
to your node components.

```vue{10-17}
<script setup>
import { VueFlow } from '@vue-flow/core'

const elements = ref([
  {
    id: '1',
    label: 'Node 1',
    type: 'custom',
    position: { x: 50, y: 50 },
    events: {
      click: () => {
        console.log('Node 1 clicked')
      },
      customEvent: () => {
        console.log('Node 1 custom event')
      },
    }
  }
])
</script>
```

As you can see above, you can also pass in custom event handlers. These will not be called by Vue Flow but can be used
to forward callback functions to your custom components.
The `click` handler is part of the [`NodeEventsHandler`](/typedocs/types/NodeEventsHandler) interface, meaning it
will be
triggered when the node is clicked.

```vue
<script lang="ts" setup>
import type { NodeProps, NodeEventsOn } from '@vue-flow/core'

// define your events
interface CustomNodeEvents {
  click: NodeEventsOn['click']
  customEvent: (input: string) => void
}

interface CustomNodeProps extends NodeProps<any, CustomNodeEvents> {
  id: string
  events: CustomNodeEvents
}

const props = defineProps<CustomNodeProps>()

props.events.click(() => {
  console.log(`Node ${props.id} clicked`)
})

// custom events are just functions, they are not hooks which you can listen to like `click`
props.events.customEvent('custom event triggered')
</script>

<template>
  <!-- Omitted for simplicty -->
</template>
```

## Styling

::: tip
To overwrite default theme styles check the [Theming section](/guide/theming).
:::

### Custom Nodes

When you create a new node type you also need to implement some styling. Your custom node has no default styles.

```css
.vue-flow__node-custom {
  background: #9CA8B3;
  color: #fff;
  padding: 10px;
}
```

## Scrolling inside a node

You can use the `noWheelClassName` prop to define a class name which will prevent zoom-on-scroll or pan-on-scroll behavior on
that node.
By default, the `noWheelClassName` is `nowheel`.
By adding this class you can enable scrolling inside a node without triggering zoom-pan behavior.

## Dragging inside a node

You can use the `noDragClassName` prop to define a class name which will not trigger dragging behavior on
that node.
By default, the `noDragClassName` is `nodrag`.

## Dynamic handle positions / Adding handles dynamically


::: info
When using Vue Flow 1.x you don't need to call `updateNodeInternals` when adding handles dynamically.
Handles will try to be added to the node automatically when they are mounted.
If this does not work for you, for whatever reason, you can still follow the guide below and force Vue Flow to update
the node internals.
:::

When working with dynamic handle positions or adding handles dynamically, you need to use
the [`updateNodeInternals`](/typedocs/types/UpdateNodeInternals) method.

You need to call this method otherwise your node will not respond to the new handles and edges will be 
misaligned.

You can either use the store action to update multiple nodes at once by passing their ids into the method, 
or you can emit the `updateNodeInternals` event from your custom node component without passing any parameters.

### Examples

- Using store action

```vue
<script setup>
import { useVueFlow } from '@vue-flow/core'

const { updateNodeInternals } = useVueFlow()

const onSomeEvent = () => {
  updateNodeInternals(['1'])
}
</script>
```

- Emitting event from custom component

```vue
<script setup>
const emits = defineEmits(['updateNodeInternals'])

const onSomeEvent = () => {
  emits('updateNodeInternals')
}
</script>
```
