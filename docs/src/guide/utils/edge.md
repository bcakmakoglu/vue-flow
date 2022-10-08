# Edge

All default edge components are exported and can be used or extended if necessary.

```vue
<script lang="ts" setup>
// CustomEdge.vue
import { EdgeProps, BezierEdge } from '@vue-flow/core'

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

  Returns a bezier path and center positions.

### getBezierCenter (removed)

::: warning
This function has been removed. The edge center positions are returned by `getBezierPath` now.
:::

- Details:

  Returns a bezier path's center x and y values.

### [getSimpleBezierPath](/typedocs/functions/getSimpleBezierPath)

- Details:

  Returns a simple bezier path (no curvature at handles) and center positions.

### getSimpleBezierCenter (removed)

::: warning
This function has been removed. The edge center positions are returned by `getSimpleBezierPath` now.
:::

- Details:

  Returns a simple bezier path's center x and y values.

### [getSmoothStepPath](/typedocs/functions/getSmoothStepPath)

- Details:

  Returns a smoothstep path (use border-radius 0 for a step path).

### [getStraightPath](/typedocs/functions/getStraightPath)

- Details:

  Returns a straight path.
