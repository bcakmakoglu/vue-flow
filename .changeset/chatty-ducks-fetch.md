---
'@vue-flow/core': patch
---

⚠️ Deprecate options API utils `addEdge` and `updateEdge`. This utils will be removed soon!

## Resolve deprecation warnings

Instead of using these utils, use `addEdges` and `updateEdge` found on the VueFlow store instance.
You receive a store instance by using either a template-ref or listening to the `onPaneReady` event.

### Example

```vue
<script>
import { VueFlow } from '@vue-flow/core'

export default defineComponent({
  name: 'OptionsAPIExample',
  components: { VueFlow },
  data() {
    return {
      vueFlow: null,
      instance: null,
      elements: [
        { id: '1', type: 'input', label: 'Node 1', position: { x: 250, y: 5 }, class: 'light' },
        { id: '2', label: 'Node 2', position: { x: 100, y: 100 }, class: 'light' },
        { id: '3', label: 'Node 3', position: { x: 400, y: 100 }, class: 'light' },
        { id: '4', label: 'Node 4', position: { x: 400, y: 200 }, class: 'light' },
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e1-3', source: '1', target: '3' },
      ],
    }
  },
  methods: {
    // You can listen to `onPaneReady` to get the instance
    onPaneReady(instance) {
      instance.fitView()
      this.instance = instance
    },
    onConnect(params) {
      // either use the instance you have saved in `onPaneReady`
      this.instance?.addEdges([params])
      
      // or use the template-ref
      this.$refs.vueFlow?.addEdges([params])
    },
  },
})
</script>

<template>
  <VueFlow
    v-model="elements"
    ref="vueFlow"
    class="vue-flow-basic-example"
    :default-zoom="1.5"
    :min-zoom="0.2"
    :max-zoom="4"
    :zoom-on-scroll="false"
    @connect="onConnect"
    @pane-ready="onPaneReady"
  />
</template>
```
