# Nodes

Nodes are the building blocks of your graph. They represent any sort of data you want to present in your graph.

They can exist on their own but can be connected to each other with edges to create a map.

Each node <span class="font-bold text-blue-500">requires a unique id and
a [xy-position](/typedocs/interfaces/XYPosition).</span>
Anything else is optional.

You can check the full options for a node element [here](/typedocs/interfaces/Node).

## Usage

Generally you create nodes by adding them to the model-value or the nodes prop of the Vue Flow component.

```vue
<script>
import { VueFlow } from '@braks/vue-flow'

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
[useVueFlow](/typedocs/functions/useVueFlow) will provide
you with an [`addNodes`](/typedocs/interfaces/Actions#addnodes) utility function, which you can use to add nodes
directly to the state.

```vue
<script setup>
import { VueFlow, useVueFlow } from '@braks/vue-flow'

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

You can also apply changes using the [`applyNodeChanges`](/typedocs/interfaces/Actions#applynodechanges/) utility
function,
which expects an array of [changes](/typedocs/types/NodeChange) to be applied to the currently stored nodes.

```vue{11,17-22}
<script setup>
import { VueFlow, useVueFlow } from '@braks/vue-flow'

const initialNodes = ref([
  {
    id: '1',
    position: { x: 50, y: 50 },
    label: 'Node 1',
  }
])
const { applyNodeChanges } = useVueFlow({
  nodes: initialNodes,
})

onMounted(() => {
  // Remove an element after mount
  applyNodeChanges([
    {
      id: '1',
      type: 'remove',
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

![vue flow default node](https://images.prismic.io/bcakmakoglu/235b4a10-5bdc-41c0-ba3f-4fb402fba65f_Default-node.png?auto=compress,format)

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

![vue flow input node](https://images.prismic.io/bcakmakoglu/fd871fe3-6c5f-4ef1-8e71-fb66d947866b_Input-node.png?auto=compress,format)

An input node has a single handle, located at the bottom by default.
It represents a starting point of your map.

### Output Node

![vue flow output node](https://images.prismic.io/bcakmakoglu/abe32a60-d0a4-40ee-a710-092570d4d128_Output-node.png?auto=compress,format)

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
import { VueFlow } from '@braks/vue-flow'
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
import CustomNode from './OverwriteCustomNode.vue'
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

| Name             | Definition                                       | Type                                                       | Optional |
|------------------|--------------------------------------------------|------------------------------------------------------------|----------|
| id               | Node id                                          | string                                                     | false    |
| type             | Node type                                        | string                                                     | false    |
| selected         | Is node selected                                 | boolean                                                    | false    |
| dragging         | Is node dragging                                 | boolean                                                    | false    |
| connectable      | Is node connectable                              | boolean                                                    | false    |
| position         | Relative position of a node                      | [XYPosition](/typedocs/interfaces/XYPosition)              | false    |
| zIndex           | Node z-index                                     | number                                                     | false    |
| dimensions       | Node size                                        | [Dimensions](/typedocs/interfaces/Dimensions)         | false    |
| data             | Custom data object                               | Any object                                                 | true     |
| events           | Node events and custom events                    | [NodeEventsOn](/typedocs/types/NodeEventsOn)               | true     |
| label            | Node label                                       | string, Component                                          | true     |
| isValidTargetPos | Called when target handle is used for connection | [ValidConnectionFunc](/typedocs/types/ValidConnectionFunc) | true     |
| isValidSourcePos | Called when source handle is used for connection | [ValidConnectionFunc](/typedocs/types/ValidConnectionFunc) | true     |
| parentNode       | Parent node id                                   | string                                                     | true     |
| targetPosition   | Target handle position                           | [Position](/typedocs/enums/Position)                       | true     |
| sourcePosition   | Source handle position                           | [Position](/typedocs/enums/Position)                       | true     |
| dragHandle       | Node drag handle class                           | string                                                     | true     |

### (Custom) Node Events

In addition to the event handlers that you can access through [`useVueFlow`](/guide/composables#useVueFlow/) or the Vue
Flow component,
you can also pass in event handlers in your initial node definition, or you can access the node events through
the `events` prop passed
to your node components.

```vue{9-13}
<script setup>
import { VueFlow } from '@braks/vue-flow'

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
import type { NodeProps, NodeEventsOn } from '@braks/vue-flow'

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

## Allow scrolling inside a node

You can use the `noWheelClassName` prop to define a class which will prevent zoom-on-scroll or pan-on-scroll behavior on
that element.
By default, the `noWheelClassName` is `.nowheel`.
By adding this class you can also enable scrolling inside a node.

## Dynamic handle positions / Adding handles dynamically

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
import { useVueFlow } from '@braks/vue-flow'

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
