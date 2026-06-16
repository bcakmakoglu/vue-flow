---
title: Nodes
---

<script setup>
import LogosJavascript from '~icons/logos/javascript';
import LogosTypescript from '~icons/logos/typescript-icon';
import { Background, Panel, VueFlow } from '@vue-flow/core';
import Check from '~icons/mdi/check';
import Close from '~icons/mdi/close';
import { ref, h } from 'vue';

const ScrollableNode = () => h('div', { class: 'custom-node-container' }, [
  h('ul', { class: 'nowheel' }, Array.from({ length: 100 }, (_, i) => h('li', { key: i }, `Item ${i}`)))
]);

const InputFieldNode = () => h('div', { class: 'custom-node-container' }, [
  h('input', { class: 'nodrag placeholder-white', placeholder: 'Type something...' })
]);

const defaultNode = ref([
  {
    id: '1',
    data: { label: 'Default Node' },
    position: { x: 50, y: 75 },
  }
]);

const inputNode = ref([
  {
    id: '1',
    type: 'input',
    data: { label: 'Input Node' },
    position: { x: 50, y: 75 },
  }
]);

const outputNode = ref([
  {
    id: '1',
    type: 'output',
    data: { label: 'Output Node' },
    position: { x: 50, y: 75 },
  }
]);

function logEvent(name, data) {
  console.log(name, data)
}
</script>

# Introduction to Nodes

Nodes are the underlying components of your graph.
They can be any kind of data you want to visualize in your graph, existing independently and being interconnected
through edges to create a data map.

Remember, every node is unique and thus **requires a unique id** and **an [XY-position](/typedocs/type-aliases/XYPosition)**.

For the full list of options available for a node, check out the [Node Interface](/typedocs/type-aliases/Node).

## Adding Nodes to the Graph

Nodes are rendered by passing them to the `nodes` prop (or `v-model:nodes` for two-way binding) of the Vue Flow component.

:::warning
This method will *not* create a change. Check out the [Controlled Flow](/guide/controlled-flow.html) section for more information.
:::

:::code-group

```vue [<LogosJavascript />]

<script setup>
import { ref, onMounted } from 'vue'
import { VueFlow, Panel } from '@vue-flow/core'

const nodes = ref([
  {
    id: '1',
    position: { x: 50, y: 50 },
    data: { label: 'Node 1', },
  }
]);

function addNode() {
  const id = Date.now().toString()
  
  nodes.value.push({
    id,
    position: { x: 150, y: 50 },
    data: { label: `Node ${id}`, },
  })
}
</script>

<template>
  <VueFlow :nodes="nodes">
    <Panel>
      <button type="button" @click="addNode">Add a node</button>
    </Panel>
  </VueFlow>
</template>
```

```vue [<LogosTypescript />]

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Node } from '@vue-flow/core'
import { VueFlow, Panel } from '@vue-flow/core'

const nodes = ref<Node[]>([
  {
    id: '1',
    position: { x: 50, y: 50 },
    data: { label: 'Node 1', },
  }
]);

function addNode() {
  const id = Date.now().toString()

  nodes.value.push({
    id,
    position: { x: 150, y: 50 },
    data: { label: `Node ${id}`, },
  })
}
</script>

<template>
  <VueFlow :nodes="nodes">
    <Panel>
      <button type="button" @click="addNode">Add a node</button>
    </Panel>
  </VueFlow>
</template>
```

:::

If you are working with more complex graphs or simply require access to the internal state, 
the [useVueFlow](/typedocs/functions/useVueFlow) composable will come in handy.

The [`addNodes`](/typedocs/interfaces/Actions#addnodes) action is available through [useVueFlow](/typedocs/functions/useVueFlow), allowing you to add nodes straight to the state.

What's more, this action isn't limited to the component rendering the graph; it can be utilized elsewhere, like in a
Sidebar or Toolbar.

::: code-group

```vue [<LogosJavascript />]
<script setup>
import { ref } from 'vue'
import { Panel, VueFlow, useVueFlow } from '@vue-flow/core'

const initialNodes = ref([
  {
    id: '1',
    position: { x: 50, y: 50 },
    data: { label: 'Node 1' },
  }
])
const { addNodes } = useVueFlow()

function generateRandomNode() {
  return {
    id: Math.random().toString(),
    position: { x: Math.random() * 500, y: Math.random() * 500 },
    data: { label: 'Random Node' },
  }
}

function onAddNode() {
  // add a single node to the graph
  addNodes(generateRandomNode())
}

function onAddNodes() {
  // add multiple nodes to the graph
  addNodes(Array.from({ length: 10 }, generateRandomNode))
}
</script>

<template>
  <VueFlow :nodes="initialNodes">
    <Panel>
      <button type="button" @click="onAddNode">Add a node</button>
      <button type="button" @click="onAddNodes">Add multiple nodes</button>
    </Panel>
  </VueFlow>
</template>
```

```vue [<LogosTypescript />]
<script setup lang="ts">
import { ref } from 'vue'  
import type { Node } from '@vue-flow/core'  
import { Panel, VueFlow, useVueFlow } from '@vue-flow/core'

const initialNodes = ref<Node[]>([
  {
    id: '1',
    position: { x: 50, y: 50 },
    data: { label: 'Node 1' },
  }
])
const { addNodes } = useVueFlow()

function generateRandomNode() {
  return {
    id: Math.random().toString(),
    position: { x: Math.random() * 500, y: Math.random() * 500 },
    data: {
      label: 'Random Node',
      hello: 'world',
    },
  }
}

function onAddNode() {
  // add a single node to the graph
  addNodes(generateRandomNode())
}

function onAddNodes() {
  // add multiple nodes to the graph
  addNodes(Array.from({ length: 10 }, generateRandomNode))
}
</script>

<template>
  <VueFlow :nodes="initialNodes">
    <Panel>
      <button type="button" @click="onAddNode">Add a node</button>
      <button type="button" @click="onAddNodes">Add multiple nodes</button>
    </Panel>
  </VueFlow>
</template>
```

:::

::: info
If you want to have two-way binding of nodes, use `v-model:nodes="nodes"`.
This will allow you to mutate *your* nodes and have the changes reflected in the graph.
::: 

## Removing Nodes from the Graph

Similar to adding nodes, nodes can be removed from the graph by removing them from your bound array (using `v-model:nodes`) or from the `nodes` prop of the Vue Flow component.

```vue
<script setup>
import { ref } from 'vue'
import { VueFlow, Panel } from '@vue-flow/core'

const nodes = ref([
  {
    id: '1',
    position: { x: 50, y: 50 },
    data: { label: 'Node 1' },
  },
  {
    id: '2',
    position: { x: 150, y: 50 },
    data: { label: 'Node 2' },
  }
])

function removeNode(id) {
  nodes.value = nodes.value.filter((node) => node.id !== id)
}
</script>

<template>
  <VueFlow :nodes="nodes">
    <Panel>
      <button type="button" @click="removeNode('1')">Remove Node 1</button>
      <button type="button" @click="removeNode('2')">Remove Node 2</button>
    </Panel>
  </VueFlow>
</template>
```

The [`removeNodes`](/typedocs/interfaces/Actions#removeNodes) action is available through [useVueFlow](/typedocs/functions/useVueFlow), allowing you to remove nodes straight from the state.

You can also use this action outside the component rendering the graph, like in a Sidebar or Toolbar.

```vue
<script setup>
import { ref } from 'vue'
import { VueFlow, Panel, useVueFlow } from '@vue-flow/core'

const initialNodes = ref([
  {
    id: '1',
    position: { x: 50, y: 50 },
    data: { label: 'Node 1' },
  },
  {
    id: '2',
    position: { x: 150, y: 50 },
    data: { label: 'Node 2' },
  }
])

const { removeNodes } = useVueFlow()

function removeOneNode() {
  removeNodes('1')
}

function removeMultipleNodes() {
  removeNodes(['1', '2'])
}
</script>

<template>
  <VueFlow :nodes="initialNodes">
    <Panel>
      <button type="button" @click="removeOneNode">Remove Node 1</button>
      <button type="button" @click="removeMultipleNodes">Remove Node 1 and 2</button>
    </Panel>
  </VueFlow>
</template>
```

## Updating Node Data

In 2.0 nodes are stored **immutably** — mutating a node in place no longer triggers an update (see [Immutability](/guide/migration#_3-nodes-and-edges-are-immutable) in the migration guide). Update node data through the store actions (`updateNodeData` / `updateNode`), or reassign your `v-model:nodes` array immutably.

There are multiple ways of achieving this, here are some examples:

::: code-group

```ts [useVueFlow]
import  { useVueFlow } from '@vue-flow/core'

const instance = useVueFlow()

// use the `updateNodeData` method to update the data of an node
instance.updateNodeData(nodeId, { hello: 'mona' })

// pass a function to derive the update from the current data
instance.updateNodeData(nodeId, (node) => ({ visits: (node.data?.visits ?? 0) + 1 }))

// update other node properties (e.g. `selectable` / `draggable`) with `updateNode`
instance.updateNode(nodeId, { selectable: false, draggable: false })
```

```vue [useNode]
<!-- CustomNode.vue -->
<script setup>
import { useNode, useVueFlow } from '@vue-flow/core'

// `useNode` resolves the current node (a `ComputedRef`) plus its parent, connected edges and DOM element
const { id } = useNode()

// `node` is read-only — update through the store action
const { updateNodeData } = useVueFlow()

function onSomeEvent() {
  updateNodeData(id, { hello: 'world' })
}
</script>
```

```vue [v-model]
<script setup>
import { ref } from 'vue'
import { Panel, VueFlow } from '@vue-flow/core'

const nodes = ref([
  {
    id: '1',
    position: { x: 50, y: 50 },
    data: {
      label: 'Node 1',
      hello: 'world',
    }
  },
])

function onSomeEvent(nodeId) {
  // reassign immutably — mutating a node in place won't trigger an update
  nodes.value = nodes.value.map((node) =>
    node.id === nodeId ? { ...node, data: { ...node.data, hello: 'world' } } : node,
  )
}
</script>

<template>
  <VueFlow v-model:nodes="nodes">
    <Panel>
      <button type="button" @click="onSomeEvent('1')">Update Node 1</button>
    </Panel>
  </VueFlow>
</template>
```

:::

## [Predefined Node-Types](/typedocs/type-aliases/DefaultNodeTypes)

Vue Flow provides several built-in node types that you can leverage immediately. 
The included node types are `default`, `input`, and `output`.

### Default Node

A default node includes two handles and serves as a branching junction in your map. 

You have the freedom to determine the location of handles in the node's definition.

```ts
import { ref } from 'vue'
import { Position } from '@vue-flow/core'

const nodes = ref([
  {
    id: '1',
    type: 'default', // You can omit this as it's the fallback type
    targetPosition: Position.Top, // or Bottom, Left, Right,
    sourcePosition: Position.Bottom, // or Top, Left, Right,
    data: { label: 'Default Node' },
  }
])
```

<div class="mt-4 bg-[var(--vp-code-block-bg)] rounded-lg h-50">
  <VueFlow v-model:nodes="defaultNode">
    <Background class="rounded-lg" />
  </VueFlow>
</div>

### Input Node

An input node features a single handle, which is by default positioned at the bottom.
It represents a starting point of your map.

```ts
import { ref } from 'vue'
import { Position } from '@vue-flow/core'

const nodes = ref([
  {
    id: '1',
    type: 'input',
    sourcePosition: Position.Bottom, // or Top, Left, Right,
    data: { label: 'Input Node' },
  }
])
```

<div class="mt-4 bg-[var(--vp-code-block-bg)] rounded-lg h-50">
  <VueFlow v-model:nodes="inputNode">
    <Background class="rounded-lg" />
  </VueFlow>
</div>

### Output Node

An output node also possesses a single handle, although it is typically found at the top. 
This node represents a conclusion point of your map.

```ts
import { ref } from 'vue'
import { Position } from '@vue-flow/core'

const nodes = ref([
  {
    id: '1',
    type: 'output',
    targetPosition: Position.Top, // or Bottom, Left, Right,
    data: { label: 'Output Node' },
  }
])
```

<div class="mt-4 bg-[var(--vp-code-block-bg)] rounded-lg h-50">
  <VueFlow v-model:nodes="outputNode">
     <Background class="rounded-lg" />
  </VueFlow>
</div>


## User-Defined Nodes

On top of the default node types mentioned earlier, you can create as many custom node-types as you need. 
Node-types are determined from your nodes' definitions.

::: code-group

```vue [App.vue <LogosJavascript />]
<script setup>
import { ref } from 'vue'
import { VueFlow } from '@vue-flow/core'

import CustomNode from './CustomNode.vue'
import SpecialNode from './SpecialNode.vue'

export const nodes = ref([
  {
    id: '1',
    data: { label: 'Node 1' },
    // this will create the node-type `custom`
    type: 'custom',
    position: { x: 50, y: 50 },
  },
  {
    id: '1',
    data: { label: 'Node 1' },
    // this will create the node-type `special`
    type: 'special',
    position: { x: 150, y: 50 },
  }
])
</script>

<template>
  <VueFlow :nodes="nodes">
    <template #node-custom="customNodeProps">
      <CustomNode v-bind="customNodeProps" />
    </template>
    
    <template #node-special="specialNodeProps">
      <SpecialNode v-bind="specialNodeProps" />
    </template>
  </VueFlow>
</template>
```

```vue [CustomNode.vue <LogosJavascript />]
<script setup>
import { Position, Handle } from '@vue-flow/core'

// props were passed from the slot using `v-bind="customNodeProps"` — the node's data is under `data`
defineProps(['data'])
</script>

<template>
  <div>
    <Handle type="target" :position="Position.Top" />
    <div>{{ data.label }}</div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
```

```vue{30-31,37-38,45-47} [App.vue <LogosTypescript />]
<script setup lang="ts">
import { ref } from 'vue'
import type { Node } from '@vue-flow/core'
import { VueFlow } from '@vue-flow/core'

import CustomNode from './CustomNode.vue'
import SpecialNode from './SpecialNode.vue'

// You can pass 2 optional generic arguments to the `Node` type:
// 1. The data object type
// 2. The possible node-type string union

export interface CustomData {
  label: string
}

type CustomNodeTypes = 'custom' | 'special'

export type CustomNode = Node<CustomData, CustomNodeTypes>

export const nodes = ref<CustomNode[]>([
  {
    id: '1',
    data: { label: 'Node 1' },
    // this will create the node-type `custom`
    type: 'custom',
    position: { x: 50, y: 50 },
  },
  {
    id: '2',
    data: { label: 'Node 2' },
    // this will create the node-type `special`
    type: 'special',
    position: { x: 150, y: 50 },
  },
    
  {
    id: '3', 
    data: { label: 'Node 3' },
    // this will throw a type error, as the type is not defined in CustomNodeTypes
    // regardless, it would be rendered as the default node type
    type: 'invalid',
    position: { x: 150, y: 50 },
  }
])
</script>

<template>
  <VueFlow :nodes="nodes">
    <template #node-custom="customNodeProps">
      <CustomNode v-bind="customNodeProps" />
    </template>
    
    <template #node-special="specialNodeProps">
      <SpecialNode v-bind="specialNodeProps" />
    </template>
  </VueFlow>
</template>
```

```vue [CustomNode.vue <LogosTypescript />]
<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Handle, Position } from '@vue-flow/core'

import type { CustomNode } from './nodes'

// `NodeProps` takes the node type (not the data type)
const props = defineProps<NodeProps<CustomNode>>()

console.log(props.data.label) // 'Node 1'
</script>

<template>
  <div>
    <Handle type="target" :position="Position.Top" />
    <div>{{ data.label }}</div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
```

:::

Vue Flow will then attempt to resolve this node-type to a component. 
Priority is given to a definition in the nodeTypes object of the state. 
Next, it tries to match the component to a globally registered one with the same name. 
Finally, it searches for a provided template slot to fill in the node-type.

If no methods produce a result in resolving the component, the default node-type is used as a fallback.

### Template slots

One of the easiest ways to define custom nodes is, by passing them as template slots. 
Dynamic resolution to slot-names is done for your user-defined node-types, 
meaning a node with the type `custom` is expected to have a slot named `#node-custom`.

```vue{9,18}
<script setup>
import { VueFlow } from '@vue-flow/core'
import CustomNode from './CustomNode.vue'

const nodes = ref([
  {
    id: '1',
    data: { label: 'Node 1' },
    type: 'custom',
    position: { x: 50, y: 50 },
  }
])
</script>

<template>
  <VueFlow :nodes="nodes">
    <!-- the expected slot name is `node-custom` -->
    <template #node-custom="props">
      <CustomNode v-bind="props" />
    </template>
  </VueFlow>
</template>
```

### Node-types object

Alternatively, node-types can also be defined by passing an object as a prop to the VueFlow component (or as an option to the composable).

::: warning 
Take precaution to mark your components as raw (utilizing the marked function from the Vue library) to prevent their conversion into reactive objects. Otherwise, Vue will display a warning on the console. 
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

const nodes = ref([
  {
    id: '1',
    data: { label: 'Node 1' },
    type: 'custom',
  },
  {
    id: '1',
    data: { label: 'Node 1' },
    type: 'special',
  }
])
</script>

<template>
  <VueFlow :nodes="nodes" :nodeTypes="nodeTypes" />
</template>
```

::: tip
[You can find a working example here](/examples/nodes/).
:::

## [Node Props](/typedocs/interfaces/NodeProps)

Your custom nodes are enclosed so that fundamental functions like dragging or selecting operate. 
But you may wish to expand on these features or implement your business logic inside nodes, thus your nodes receive the following properties:

| Prop Name         | Description                                  | Type                                        | Optional                                   |
|-------------------|----------------------------------------------|---------------------------------------------|--------------------------------------------|
| id                | Unique node id                               | string                                      | <Close class="text-red-500" />             |
| type              | Node type                                    | string                                      | <Close class="text-red-500" />             |
| data              | Custom node data                             | object                                      | <Close class="text-red-500" />             |
| selected          | Is the node selected                         | boolean                                     | <Close class="text-red-500" />             |
| selectable        | Can the node be selected                     | boolean                                     | <Close class="text-red-500" />             |
| deletable         | Can the node be deleted                      | boolean                                     | <Close class="text-red-500" />             |
| draggable         | Can the node be dragged                      | boolean                                     | <Close class="text-red-500" />             |
| dragging          | Is the node currently being dragged          | boolean                                     | <Close class="text-red-500" />             |
| isConnectable     | Can the node's handles be connected          | boolean                                     | <Close class="text-red-500" />             |
| zIndex            | Node z-index                                 | number                                      | <Close class="text-red-500" />             |
| positionAbsoluteX | Absolute x position on the graph             | number                                      | <Close class="text-red-500" />             |
| positionAbsoluteY | Absolute y position on the graph             | number                                      | <Close class="text-red-500" />             |
| width             | Measured width, once known                   | number                                      | <Check class="text-[var(--vp-c-brand)]" /> |
| height            | Measured height, once known                  | number                                      | <Check class="text-[var(--vp-c-brand)]" /> |
| sourcePosition    | Source handle position                       | [Position](/typedocs/enumerations/Position) | <Check class="text-[var(--vp-c-brand)]" /> |
| targetPosition    | Target handle position                       | [Position](/typedocs/enumerations/Position) | <Check class="text-[var(--vp-c-brand)]" /> |
| dragHandle        | Drag-handle query selector                   | string                                      | <Check class="text-[var(--vp-c-brand)]" /> |
| parentId          | Parent node id                               | string                                      | <Check class="text-[var(--vp-c-brand)]" /> |

::: tip
Need the absolute position as a point, the measured size, or handle bounds? Those live on the `InternalNode` —
resolve it with `getInternalNode(id)` or `useInternalNode(id)`. And since node defaults are no longer stamped,
guard optional reads of `data` (`data?.label`).
:::

## [Node Events](/typedocs/interfaces/NodeEventsHandler)

Vue Flow provides two main ways of listening to node events, 
either by using `useVueFlow` to bind listeners to the event handlers or by binding them to the `<VueFlow>` component.

::: code-group

```vue [useVueFlow]
<script setup>
import { ref } from 'vue'  
import { VueFlow, useVueFlow } from '@vue-flow/core'

// useVueFlow provides access to the event handlers
const { 
  onNodeDragStart, 
  onNodeDrag,
  onNodeDragStop, 
  onNodeClick, 
  onNodeDoubleClick, 
  onNodeContextMenu, 
  onNodeMouseEnter, 
  onNodeMouseLeave, 
  onNodeMouseMove 
} = useVueFlow()
  
const nodes = ref([
  {
    id: '1',
    data: { label: 'Node 1' },
    position: { x: 50, y: 50 },
  },
])
  
// bind listeners to the event handlers
onNodeDragStart((event) => {
  console.log('Node drag started', event)
})

onNodeDrag((event) => {
  console.log('Node dragged', event)
})

onNodeDragStop((event) => {
  console.log('Node drag stopped', event)
})
  
// ... and so on  
</script>

<template>
  <VueFlow :nodes="nodes" />
</template>
```

```vue [component]
<script setup>
import { ref } from 'vue'
import { VueFlow } from '@vue-flow/core'

const nodes = ref([
  {
    id: '1',
    data: { label: 'Node 1' },
    position: { x: 50, y: 50 },
  },
])
  
function logEvent(name, data) {
  console.log(name, data)
}
</script>

<template>
  <!-- bind listeners to the event handlers -->
  <VueFlow
    :nodes="nodes"
    @node-drag-start="logEvent('drag start', $event)"
    @node-drag="logEvent('drag', $event)"
    @node-drag-stop="logEvent('drag stop', $event)"
    @node-click="logEvent('click', $event)"
    @node-double-click="logEvent('dblclick', $event)"
    @node-contextmenu="logEvent('contextmenu', $event)"
    @node-mouse-enter="logEvent('mouseenter', $event)"
    @node-mouse-leave="logEvent('mouseleave', $event)"
    @node-mouse-move="logEvent('mousemove', $event)"
  />
</template>
```

:::

<div class="mt-4 bg-[var(--vp-code-block-bg)] rounded-lg h-50">
  <VueFlow 
    v-model:nodes="defaultNode" 
    @node-drag-start="logEvent('drag start', $event)"
    @node-drag="logEvent('drag', $event)"
    @node-drag-stop="logEvent('drag stop', $event)"
    @node-click="logEvent('click', $event)"
    @node-double-click="logEvent('dblclick', $event)"
    @node-contextmenu="logEvent('contextmenu', $event)"
    @node-mouse-enter="logEvent('mouseenter', $event)"
    @node-mouse-leave="logEvent('mouseleave', $event)"
    @node-mouse-move="logEvent('mousemove', $event)"
  >
    <Panel position="top-center">
        <p class="text-sm">Interact to see events in browser console</p>
    </Panel>
    <Background class="rounded-lg" />
  </VueFlow>
</div>


## Customizing Appearance

::: tip
To override the styles of the default theme, visit the [Theming section](/guide/theming).
:::

### User-Defined Nodes

When constructing a new node type, it's necessary for you to add some styling specific to it. 
User-created nodes don't have any default styles associated and thus need custom styling.

```css
.vue-flow__node-custom {
    background: #9CA8B3;
    color: #fff;
    padding: 10px;
}
```

## Implementing Scrolling within Nodes

Sometimes, a node might contain a large amount of content, making it difficult for users to view everything without the aid of a scroll function. 
To facilitate this scrolling ability without invoking zoom or pan behaviors on the node, Vue Flow provides the `noWheelClassName` property.

The `noWheelClassName` property allows you to specify a class name that, when applied to a node, will disable the default zoom-on-scroll or pan-on-scroll events on that particular node. 

By default, the `noWheelClassName` is `nowheel`.

```vue
<script setup>
import { ref } from 'vue'

const listItems = ref(Array.from({ length: 100 }, (_, i) => i))  
</script>

<template>
  <div class="custom-node-container">
    <ul class="nowheel">
      <li v-for="item in listItems" :key="item">Item {{ item }}</li>
    </ul>
  </div>
</template>
```

<div class="mt-4 bg-[var(--vp-code-block-bg)] rounded-lg h-50">
  <VueFlow :nodes="[{ id: '1', type: 'scrollable', data: { label: 'Node 1' }, position: { x: 50, y: 50 } }]">
    <template #node-scrollable>
      <ScrollableNode />
    </template>
    <Background class="rounded-lg" />
  </VueFlow>
</div>

<style>
.vue-flow__node-scrollable {
  @apply bg-accent rounded px-2;
  overflow: auto;
  width: 150px;
}

.custom-node-container ul {
  max-height: 75px;
}
</style>

## Preventing Drag Behavior withing Nodes

There are certain scenarios where you might need to interact with the contents of a node without triggering a drag action on the node itself. 
This can be particularly useful when nodes contain interactive elements like input boxes, buttons, or sliders that you want your users to engage with.

To accomplish this, Vue Flow provides a `noDragClassName` property. 
This property allows specification of a class name, which when applied to an element within a node, 
prevents triggering a drag action on the node when the user interacts with that element.

By default, the `noDragClassName` is set as `nodrag`.

```vue
<script setup>
import { ref } from 'vue'

const inputValue = ref('')
</script>

<template>
  <div class="custom-node-container">
    <input class="nodrag" v-model="inputValue" />
  </div>
</template>
```

<div class="mt-4 bg-[var(--vp-code-block-bg)] rounded-lg h-50">
  <VueFlow :nodes="[{ id: '1', type: 'input-field', data: { label: 'Node 1' }, position: { x: 50, y: 50 } }]">
    <template #node-input-field>
      <InputFieldNode />
    </template>
    <Background class="rounded-lg" />
  </VueFlow>
</div>

<style>
.vue-flow__node-input-field {
  @apply bg-primary rounded p-4;
}
</style>
