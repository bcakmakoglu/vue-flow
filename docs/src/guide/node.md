---
title: Nodes
---

<script setup>
import LogosJavascript from '~icons/logos/javascript';
import LogosTypescript from '~icons/logos/typescript-icon';
import { VueFlow, Panel } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
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

function logEvent(name, data) {
  console.log(name, data)
}
</script>

# Introduction to Nodes

Nodes are the underlying components of your graph.
They can be any kind of data you want to visualize in your graph, existing independently and being interconnected
through edges to create a data map.

Remember, every node is unique and thus **requires a unique id** and **an [XY-position](/typedocs/interfaces/XYPosition)**.

For the full list of options available for a node, check out the [Node Interface](/typedocs/interfaces/Node).

## Adding Nodes to the Graph

Nodes are rendered by passing them to the `nodes` prop (or the deprecated `v-model` prop) of the Vue Flow component.

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
    label: 'Random Node',
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
    label: 'Random Node',
    data: { 
      hello: 'world',
    }
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

Similar to adding nodes, nodes can be removed from the graph by removing them from the `mode-value` (using `v-model`) or from the `nodes` prop of the Vue Flow component.

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

Since nodes are reactive object, you can update their data at any point by simply mutating it.
This allows you to disable or enable handles, change the label, or even add new properties to the data object at any point in time.

There are multiple ways of achieving this, here are some examples:

::: code-group

```ts [useVueFlow]
import  { useVueFlow } from '@vue-flow/core'

const instance = useVueFlow()

// use the `updateNodeData` method to update the data of an edge
instance.updateNodeData(edgeId, { hello: 'mona' })

// find the node in the state by its id
const node = instance.findNode(nodeId)

node.data = {
  ...node.data,
  hello: 'world',
}

// you can also mutate properties like `selectable` or `draggable`
node.selectable = false
node.draggable = false

// or use `updateNode` to update the node directly
instance.updateNode(nodeId, { selectable: false, draggable: false })
```

```vue [useNode]
<!-- CustomNode.vue -->
<script setup>
import { useNode } from '@vue-flow/core'

// `useNode` returns us the node object straight from the state
// since the node obj is reactive, we can mutate it to update our nodes' data
const { node } = useNode()

function onSomeEvent() {
  node.data = {
    ...node.data,  
    hello: 'world',
  }
  
  // you can also mutate properties like `selectable` or `draggable`
  node.selectable = false
  node.draggable = false
}
</script>
```

```vue [v-model]
<script setup>
import { ref } from 'vue'

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
  const node = nodes.value.find((node) => node.id === nodeId)

  node.data = {
    ...nodes.value[0].data,
    hello: 'world',
  }
    
  // you can also mutate properties like `selectable` or `draggable`
  node.selectable = false
  node.draggable = false
}
</script>

<template>
  <VueFlow :nodes="nodes">
    <Panel>
      <button type="button" @click="onSomeEvent('1')">Update Node 1</button>
    </Panel>
  </VueFlow>
</template>
```

:::

## [Predefined Node-Types](/typedocs/types/DefaultNodeTypes)

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
  <VueFlow v-model="defaultNode">
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
  <VueFlow v-model="inputNode">
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
  <VueFlow v-model="outputNode">
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

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps(['label'])
</script>

<template>
  <div>
    <Handle type="target" :position="Position.Top" />
    <div>{{ label }}</div>
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

// You can pass 3 optional generic arguments to the Node interface, allowing you to define:
// 1. The data object type
// 2. The events object type
// 3. The possible node types

export interface CustomData {
  hello: string
}

export interface CustomEvents {
  onCustomEvent: (event: MouseEvent) => void
}

type CustomNodeTypes = 'custom' | 'special'

type CustomNode = Node<CustomData, CustomEvents, CustomNodeTypes>

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
    // this will throw a type error, as the type is not defined in the CustomEdgeTypes
    // regardless it would be rendered as a default edge type
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
import { Position } from '@vue-flow/core'

import { CustomData, CustomEvents } from './nodes'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<CustomData, CustomEvents>>()
  
console.log(props.data.hello) // 'world'
</script>

<template>
  <div>
    <Handle type="target" :position="Position.Top" />
    <div>{{ label }}</div>
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

| Prop Name                                                   | Description                                                         | Type                                                       | Optional                                   |
|-------------------------------------------------------------|---------------------------------------------------------------------|------------------------------------------------------------|--------------------------------------------|
| id                                                          | Unique node id                                                      | string                                                     | <Close class="text-red-500" />             |
| type                                                        | Node Type                                                           | string                                                     | <Close class="text-red-500" />             |
| selected                                                    | Is node selected                                                    | boolean                                                    | <Close class="text-red-500" />             |
| connectable                                                 | Can node handles be connected                                       | [HandleConnectable](/typedocs/types/HandleConnectable)     | <Close class="text-red-500" />             |
| position                                                    | Node's x, y (relative) position on the graph                        | [XYPosition](/typedocs/interfaces/XYPosition)              | <Close class="text-red-500" />             |
| dimensions                                                  | Dom element dimensions (width, height)                              | [Dimensions](/typedocs/interfaces/Dimensions)              | <Close class="text-red-500" />             |
| label                                                       | Node label, either a string or a VNode. `h('div', props, children)` | string \| VNode \| Component \| Object                     | <Check class="text-[var(--vp-c-brand)]" /> |
| isValidTargetPos <Badge type="warning" text="deprecated" /> | Called when used as target for new connection                       | [ValidConnectionFunc](/typedocs/types/ValidConnectionFunc) | <Check class="text-[var(--vp-c-brand)]" /> |
| isValidSourcePos <Badge type="warning" text="deprecated" /> | Called when used as the source for a new connection                 | [ValidConnectionFunc](/typedocs/types/ValidConnectionFunc) | <Check class="text-[var(--vp-c-brand)]" /> |
| parent                                                      | Parent node id                                                      | string                                                     | <Check class="text-[var(--vp-c-brand)]" /> |
| dragging                                                    | Is node currently dragging                                          | boolean                                                    | <Close class="text-red-500" />             |
| resizing                                                    | Is node currently resizing                                          | boolean                                                    | <Close class="text-red-500" />             |
| zIndex                                                      | Node z-index                                                        | number                                                     | <Close class="text-red-500" />             |
| targetPosition                                              | Handle position                                                     | [Position](/typedocs/enums/Position)                       | <Check class="text-[var(--vp-c-brand)]" /> |
| sourcePosition                                              | Handle position                                                     | [Position](/typedocs/enums/Position)                       | <Check class="text-[var(--vp-c-brand)]" /> |
| dragHandle                                                  | Drag handle query selector                                          | string                                                     | <Check class="text-[var(--vp-c-brand)]" /> |
| data                                                        | Additional data of node                                             | any object                                                 | <Close class="text-red-500" />             |
| events                                                      | Contextual and custom events of node                                | [NodeEventsOn](/typedocs/types/NodeEventsOn)               | <Close class="text-red-500" />             |

## [Node Events](/typedocs/types/NodeEventsHandler)

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
    v-model="defaultNode" 
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
  <VueFlow :model-value="[{ id: '1', type: 'scrollable', label: 'Node 1', position: { x: 50, y: 50 } }]">
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
  <VueFlow :model-value="[{ id: '1', type: 'input-field', label: 'Node 1', position: { x: 50, y: 50 } }]">
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
