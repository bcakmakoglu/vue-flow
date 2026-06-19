# State

Under the hood Vue Flow uses [Provide/Inject](https://vuejs.org/guide/components/provide-inject) to pass its state between components.

The store is created and owned by `<VueFlow>` (or a standalone `<VueFlowProvider>`). Any descendant component can then reach it through two composables:

- [`useVueFlow`](/guide/composables#usevueflow) — actions, computed getters and event hooks (mirrors `useReactFlow` / `useSvelteFlow`). It is a pure *consumer*: it takes **no arguments** and resolves the store from the nearest `<VueFlow>` / `<VueFlowProvider>` ancestor (it throws if there is none).
- `useStore` — the raw reactive state (`nodes`, `edges`, `transform`, the lookups, …), read directly like a Pinia store. Use `storeToRefs(useStore())` to destructure individual state fields as refs.

The state is reactive, so manipulating it (typically via the actions returned by `useVueFlow`) is reflected on the graph.

```vue
<script setup>
import { useVueFlow } from '@vue-flow/core'

const { getNodes, onInit } = useVueFlow()

// event handler
onInit((instance) => instance.fitView())

// watch the stored nodes
watch(getNodes, (nodes) => console.log('nodes changed', nodes))
</script>
```

## Accessing Internal State

Because the store lives in the component tree, you can read and update it from any descendant — no prop drilling.

Consider a `Sidebar` that should be able to select all nodes. Wrap the flow and the sidebar in a common `<VueFlowProvider>` so both resolve the *same* store:

```vue
<!-- Container.vue -->
<script setup>
import { VueFlow, VueFlowProvider } from '@vue-flow/core'
import Sidebar from './Sidebar.vue'
</script>

<template>
  <VueFlowProvider>
    <Sidebar />

    <div class="wrapper">
      <VueFlow :nodes="nodes" :edges="edges" />
    </div>
  </VueFlowProvider>
</template>
```

`<VueFlowProvider>` creates the store and provides it to everything inside it, so both `<VueFlow>` and `<Sidebar>` share one instance. (A bare `<VueFlow>` provides its own store too, but only to *its* children — a sibling like `<Sidebar>` sits outside it, which is why we hoist the provider.)

Now the `Sidebar` can reach the state directly:

```vue
<script setup>
import { storeToRefs, useStore, useVueFlow } from '@vue-flow/core'

// actions + computed getters come from the instance
const { addSelectedNodes, getNodes } = useVueFlow()

// raw state fields come from the store — destructure them as refs with storeToRefs
const { nodesSelectionActive } = storeToRefs(useStore())

const selectAll = () => {
  addSelectedNodes(getNodes.value)
  nodesSelectionActive.value = true
}
</script>

<template>
  <aside>
    <div class="description">
      This is an example of how you can access the internal state outside of the Vue Flow component.
    </div>
    <div class="selectall">
      <button @click="selectAll">select all nodes</button>
    </div>
  </aside>
</template>
```

::: tip
Each flow needs its own `<VueFlow>` or `<VueFlowProvider>`. There is no global registry or lookup-by-id in 2.0 — `useVueFlow()` always resolves the store of the nearest provider ancestor, so multiple flows on a page simply live in separate provider trees.
:::

## State Updates

State updates like removing elements or updating positions are applied by default.
If you want to strictly control state changes you can disable this behavior by setting the `autoApplyChanges` option/prop
to `false`.

```vue
<template>
    <VueFlow :nodes="nodes" :edges="edges" :auto-apply-changes="false" />
</template>
```

State changes are emitted by the `onNodesChange` or `onEdgesChange` events, which will provide an array of changes that
have been triggered.
To take control of state changes you can implement your own state update handlers or use the state helper functions that
come with the library to mix it up.

::: info
Read more about this in the [controlled flow](/guide/controlled-flow) guide.
:::

## Access State in the Options API

`useVueFlow` is built for the composition API, but it works in the options API too — it just has to run inside `setup()`, where `inject` is available. As always, the component calling it must be rendered **inside** a `<VueFlow>` / `<VueFlowProvider>` ancestor, so put the flow logic in a child of the provider:

```vue
<!-- App.vue -->
<script>
import { VueFlowProvider } from '@vue-flow/core'
import Flow from './Flow.vue'

export default defineComponent({
  components: { VueFlowProvider, Flow },
})
</script>

<template>
  <VueFlowProvider>
    <Flow />
  </VueFlowProvider>
</template>
```

```vue
<!-- Flow.vue -->
<script>
import { useVueFlow, VueFlow } from '@vue-flow/core'

export default defineComponent({
  components: { VueFlow },
  setup() {
    // resolves the store from the <VueFlowProvider> ancestor
    const { addEdges, onConnect } = useVueFlow()

    onConnect((params) => addEdges([params]))

    return { addEdges }
  },
  data() {
    return {
      nodes: [
        { id: '1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
      ],
      edges: [],
    }
  },
  methods: {
    handleConnect(params) {
      this.addEdges([params])
    },
  },
})
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" @connect="handleConnect" />
</template>
```
