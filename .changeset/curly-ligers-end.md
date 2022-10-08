---
'@vue-flow/additional-components': major
'@vue-flow/pathfinding-edge': major
'@vue-flow/resize-rotate-node': major
'@vue-flow/core': major
---

# What's changed?

- Simplify edge path calculations
  - remove `getEdgeCenter` and `getSimpleEdgeCenter`

# Breaking Changes

- `getEdgeCenter` has been removed
  - Edge center positions can now be accessed from `getBezierPath` or `getSmoothStepPath` functions

Before:
```js
import { getBezierPath, getEdgeCenter } from '@braks/vue-flow'

// used to return the path string only
const edgePath = computed(() => getBezierPath(pathParams),)

// was necessary to get the centerX, centerY of an edge
const centered = computed(() => getEdgeCenter(centerParams))
```

After:
```js
import { getBezierPath } from '@vue-flow/core'

// returns the path string and the center positions
const [path, centerX, centerY] = computed(() => getBezierPath(pathParams),)
```

