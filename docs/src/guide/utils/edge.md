# Edge

Vue Flow exports a couple of utilities you can use to create your own custom edges without having to worry how to actually
implement the edge path calculation.

This can be helpful if you don't want to actually change the way the edge path is calculated 
but just want to implement some custom logic on top of the regular edge behavior.

Alternatively, all default edge components are also exported and can be used to create custom edges.

```vue
<script lang="ts" setup>
// CustomEdge.vue
import { EdgeProps, BezierEdge, SmoothStepEdge, StepEdge, StraightEdge } from '@vue-flow/core'

const props = defineProps<EdgeProps>()

// do some custom logic
</script>
<template>
  <!-- wrap the bezier edge or do something else in the template -->
  <BezierEdge v-bind="props" />
</template>
```

## [getBezierPath](/typedocs/functions/getBezierPath)

- Details:
  
  A function that returns a bezier path and center positions.

- Arguments:
  - `sourceX`: The x position of the source handle.
  - `sourceY`: The y position of the source handle.
  - `sourcePosition`: The position of the source handle.
  - `targetX`: The x position of the target handle.
  - `targetY`: The y position of the target handle.
  - `targetPosition`: The position of the target handle.
  - `curvature`: The curvature of the path.

- Returns:
  - `path`: A string representing the path.
  - `labelX`: The x position of the label.
  - `labelY`: The y position of the label.
  - `offsetX`: The x offset of the label.
  - `offsetY`: The y offset of the label.

- Example:

```vue
<script lang="ts" setup>
import { computed } from "vue"
import { BaseEdge, getBezierPath, EdgeProps } from '@vue-flow/core'

const props = defineProps<EdgeProps>()

const edgePathParams = computed(() => getBezierPath({ ...props, curvature: 0.5 }))
</script>

<template>
  <BaseEdge :path="edgePathParams[0]" />
</template>
```

## [getSimpleBezierPath](/typedocs/functions/getSimpleBezierPath)

- Details:

A function that returns a simple bezier path (no curvature from and toward handles) and center positions.

- Arguments:
  - `sourceX`: The x position of the source handle.
  - `sourceY`: The y position of the source handle.
  - `sourcePosition`: The position of the source handle.
  - `targetX`: The x position of the target handle.
  - `targetY`: The y position of the target handle.
  - `targetPosition`: The position of the target handle.

- Returns:
  - `path`: A string representing the path.
  - `labelX`: The x position of the label.
  - `labelY`: The y position of the label.
  - `offsetX`: The x offset of the label.
  - `offsetY`: The y offset of the label.

- Example:

```vue
<script lang="ts" setup>
import { computed } from "vue"
import { BaseEdge, getSimpleBezierPath, EdgeProps } from '@vue-flow/core'

const props = defineProps<EdgeProps>()

const edgePathParams = computed(() => getSimpleBezierPath(props))
</script>

<template>
  <BaseEdge :path="edgePathParams[0]" />
</template>
```

## [getSmoothStepPath](/typedocs/functions/getSmoothStepPath)

- Details:

  A function that returns a smoothstep path (you can use a `borderRadius` 0 for a step path).

- Arguments:
  - `sourceX`: The x position of the source handle.
  - `sourceY`: The y position of the source handle.
  - `sourcePosition`: The position of the source handle.
  - `targetX`: The x position of the target handle.
  - `targetY`: The y position of the target handle.
  - `targetPosition`: The position of the target handle.
  - `centerX`: The x position of the center.
  - `centerY`: The y position of the center.
  - `offset`: The offset of the path.
  - `borderRadius`: The border radius of the path.

  ::: info
  You can use `borderRadius: 0` to create a step path with no smooth corners.
  :::

- Returns:
  - `path`: A string representing the path.
  - `labelX`: The x position of the label.
  - `labelY`: The y position of the label.
  - `offsetX`: The x offset of the label.
  - `offsetY`: The y offset of the label.

- Example:

```vue
<script lang="ts" setup>
import { computed } from "vue"
import { BaseEdge, getSmoothStepPath, EdgeProps } from '@vue-flow/core'

const props = defineProps<EdgeProps>()

const edgePathParams = computed(() => getSmoothStepPath({ ...props, borderRadius: 8 }))
</script>

<template>
  <BaseEdge :path="edgePathParams[0]" />
</template>
```

## [getStraightPath](/typedocs/functions/getStraightPath)

- Details:

  A function that returns a straight path.

- Arguments:
  - `sourceX`: The x position of the source handle.
  - `sourceY`: The y position of the source handle.
  - `targetX`: The x position of the target handle.
  - `targetY`: The y position of the target handle.

- Returns:
  - `path`: A string representing the path.
  - `labelX`: The x position of the label.
  - `labelY`: The y position of the label.
  - `offsetX`: The x offset of the label.
  - `offsetY`: The y offset of the label.

- Example:

```vue
<script lang="ts" setup>
import { computed } from "vue"
import { BaseEdge, getStraightPath, EdgeProps } from '@vue-flow/core'

const props = defineProps<EdgeProps>()

const edgePathParams = computed(() => getStraightPath(props))
</script>

<template>
  <BaseEdge :path="edgePathParams[0]" />
</template>
```
