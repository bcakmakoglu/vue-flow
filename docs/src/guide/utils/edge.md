# Edge

All default edge components are exported and can be used or extended if necessary.

```vue
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

### [getBezierPath](/typedocs/functions/getBezierPath)

- Details:

  Returns a bezier path.

### [getBezierCenter](/typedocs/functions/getBezierCenter)

- Details:

  Returns a bezier path's center x and y values.

### [getSimpleBezierPath](/typedocs/functions/getSimpleBezierPath)

- Details:

  Returns a simple bezier path (no curvature at handles).

### [getSimpleBezierCenter](/typedocs/functions/getSimpleBezierCenter)

- Details:

  Returns a simple bezier path's center x and y values.

### [getSmoothStepPath](/typedocs/functions/getSmoothStepPath)

- Details:

  Returns a smoothstep path (use border-radius 0 for a step path).

### [getEdgeCenter](/typedocs/functions/getEdgeCenter)

- Details:

  Returns an edge path's center x and y values.
