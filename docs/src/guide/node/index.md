# Nodes

Nodes are the building blocks of your graph. They represent any sort of data you want to present in your graph.

They can exist on their own but can be connected to each other with edges to create a map.

Each node <span class="font-bold text-blue-500">requires a unique id and
a [xy-position](https://types.vueflow.dev/interfaces/XYPosition.html).</span>
Anything else is optional.

You can check the full options for a node element in the TypeDocs [here](https://types.vueflow.dev/interfaces/Node.html)
.

## Usage

Generally you create nodes by adding them to the model-value or the nodes prop of the Vue Flow component. 

```vue:no-line-numbers
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

For more
advanced graphs that require more state access you will want to use the useVueFlow composable. UseVueFlow will provide
you with an
`addNodes` utility function, which you can use to add nodes directly to the state.

```vue:no-line-numbers
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

You can also apply changes (like removing elements safely) using the `applyNodeChanges` utility function, which expects an array of changes to be
applied to the currently stored nodes.

```vue:no-line-numbers
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
