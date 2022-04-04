# Edge

All default edge components are exported and can be used or extended if necessary.

```vue:no-line-numbers
<script setup>
// CustomEdge.vue
import { EdgeProps, BezierEdge } from '@braks/vue-flow'

const props = defineProps<EdgeProps>()

// do some custom logic
</script>
<template>
  <!-- wrap the bezier edge or do something else in the template -->
  <BezierEdge v-bind="props" />
</template>
```

## Path utils

Vue Flow exports a couple of functions you can use to create your own custom edges without having to worry how to actually
create a bezier path.

This can be helpful if you don't want to actually change the way the path is calculated but just want to implement some custom logic on top of the 
regular edge behavior.

### [getBezierPath](https://types.vueflow.dev/modules.html#getBezierPath)

- Details:

  Returns a bezier path.

### [getBezierCenter](https://types.vueflow.dev/modules.html#getBezierPath)

- Details:

  Returns a bezier path's center x and y values.

### [getSimpleBezierPath](https://types.vueflow.dev/modules.html#getBezierPath)

- Details:

  Returns a simple bezier path (no curvature at handles).

### [getSimpleBezierCenter](https://types.vueflow.dev/modules.html#getBezierPath)

- Details:

  Returns a simple bezier path's center x and y values.

### [getSmoothStepPath](https://types.vueflow.dev/modules.html#getSmoothStepPath)

- Details:

  Returns a smoothstep path (use border-radius 0 for a step path).

### [getEdgeCenter](https://types.vueflow.dev/modules.html#getEdgeCenter)

- Details:

  Returns an edge path's center x and y values.
