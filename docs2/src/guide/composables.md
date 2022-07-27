# Composables

## [useVueFlow](/typedocs/functions/useVueFlow.html/)

If you're using the options API of Vue you will soon notice that your access to the state of Vue Flow is limited.

This is where the composition API comes in.

The composition API and the power of provide/inject allows us to act more flexible with the way we provide states inside
a component tree.
Thus accessing the internal state of Vue Flow becomes super easy when using composition.

```vue
<script setup>
import { useVueFlow, VueFlow } from '@braks/vue-flow'

const { nodes, edges } = useVueFlow({
  nodes: [
    {
      id: '1',
      label: 'Node 1',
      position: { x: 0, y: 0 },
    }
  ]
})

onMounted(() => {
  console.log(nodes.value) // will log a single node
  console.log(edges.value) // will log an empty array
})
</script>
<template>
  <VueFlow />
</template>
```

`useVueFlow` exposes basically the whole internal state.
The values are reactive, meaning changing the state values returned from `useVueFlow` will trigger changes in the graph.

## [useZoomPanHelper](/typedocs/functions/useZoomPanHelper.html/)

::: warning [deprecated]
All functions of `useZoomPanHelper` are also available in `useVueFlow`.
`useZoomPanHelper` might be removed in a future version.
:::

The `useZoomPanHelper` utility can be used to access core store functions like getting Elements or
using viewpane transforms.
All functions can also be accessed from `useVueFlow`.
It requires a valid Vue Flow store in its context.

```vue
<script setup>
import { useZoomPanHelper } from '@braks/vue-flow'

const { fitView } = useZoomPanHelper()
</script>
<template>
  <button @click="fitView({ padding: 0.2, includeHiddenNodes: true })"></button>
</template>
```

## [useHandle](/typedocs/functions/useHandle.html/)

Instead of using the Handle component you can use the useHandle composable to create your own custom nodes. `useHandle`
provides you with a mouseDown- and click-handler functions that you can apply to the element you want to use as a
node-handle.

This is how the default handle component is built:

```vue

<script lang="ts" setup>
import { NodeId, useHandle, useVueFlow } from '@braks/vue-flow'
import type { HandleProps, Position } from '@braks/vue-flow'

const props = withDefaults(defineProps<HandleProps>(), {
  type: 'source',
  position: 'top' as Position,
  connectable: true,
})

const { id, hooks, connectionStartHandle } = useVueFlow()
const nodeId = inject(NodeId, '')

const { onMouseDown, onClick } = useHandle()
const onMouseDownHandler = (event: MouseEvent) =>
  onMouseDown(event, props.id ?? null, nodeId, props.type === 'target', props.isValidConnection, undefined, (connection) =>
    hooks.value.connect.trigger(connection),
  )
const onClickHandler = (event: MouseEvent) => onClick(event, props.id ?? null, nodeId, props.type, props.isValidConnection)
</script>

<script lang="ts">
export default {
  name: 'Handle',
}
</script>

<template>
  <div
    :data-handleid="props.id"
    :data-nodeid="nodeId"
    :data-handlepos="props.position"
    class="vue-flow__handle nodrag"
    :class="[
      `vue-flow__handle-${props.position}`,
      `vue-flow__handle-${id}`,
      {
        source: props.type !== 'target',
        target: props.type === 'target',
        connectable: props.connectable,
        connecting:
          connectionStartHandle?.nodeId === nodeId &&
          connectionStartHandle?.handleId === props.id &&
          connectionStartHandle?.type === props.type,
      },
    ]"
    @mousedown="onMouseDownHandler"
    @click="onClickHandler"
  >
    <slot :node-id="nodeId" v-bind="props"></slot>
  </div>
</template>
```
