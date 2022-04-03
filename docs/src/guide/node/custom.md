# Custom Nodes

In addition to the default node types from the previous chapter, you can define any amount of custom node-types.
Node-types are inferred from your node's definition.

```js:no-line-numbers{5,11}
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

Vue Flow will now try to resolve this node type to a component.
First and foremost we will look for a definition in the `nodeTypes` object of the state.
After that we will try to resolve the component to a globally registered one that matches the exact name.
Finally, we will check if a template slot has been provided to fill the node-type.

If none of these methods succeed in resolving the component the default node-type will be used as a fallback.

### Template slots

The easiest way to define custom nodes is, by passing them as template slots.
Your custom node-types are dynamically resolved to slot-names, meaning a node with the type `custom`
will expect a slot to have the name `node-custom`.

```vue:no-line-numbers{9,16}
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

You can also define node-types by passing an object as a prop to the VueFlow component (or as an option to the composable).

::: warning
When doing this, mark your components as raw (using the designated function from the vue library) to avoid them being turned into reactive objects.
Otherwise, vue will throw a warning in the console.
:::

```vue:no-line-numbers{6-9,26}
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
You can find a more advanced example <router-link to="/examples/custom-node/">here</router-link>.
:::

## Custom Node Props

Your custom nodes are wrapped so that the basic functions like dragging or selecting work. 
But you might want to extend on that functionality or implement your own business logic inside of nodes, therefore
your nodes receive the following props:

| Name             | Definition                                       | Type              | Optional |
|------------------|--------------------------------------------------|-------------------|----------|
| id               | Node id                                          | string            | false    |
| nodeElement      | Current DOM Element                              | HTMLDivElement    | false    |
| type             | Node type                                        | string            | false    |
| selected         | Is node selected                                 | boolean           | false    |
| dragging         | Is node dragging                                 | boolean           | false    |
| connectable      | Is node connectable                              | boolean           | false    |
| computedPosition | Absolute position of a node                      | XYZPosition       | false    |
| position         | Relative position of a node                      | XYPosition        | false    |
| zIndex           | Node z-index                                     | number            | false    |
| dimensions       | Node size                                        | Dimensions        | false    |
| data             | Custom data object                               | Any object        | true     |
| label            | Node label                                       | string, Component | true     |
| isValidTargetPos | Called when target handle is used for connection | Function          | true     |
| isValidSourcePos | Called when source handle is used for connection | Function          | true     |
| parentNode       | Parent node id                                   | string            | true     |
| targetPosition   | Target handle position                           | Position          | true     |
| sourcePosition   | Source handle position                           | Position          | true     |
| dragHandle       | Node drag handle class                           | string            | true     |


You can find the TypeDocs [here](https://types.vueflow.dev/interfaces/NodeProps.html).
