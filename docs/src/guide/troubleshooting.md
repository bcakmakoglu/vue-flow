---
title: Troubleshooting
---

# Troubleshooting

This section aims to help you understand, avoid, and fix errors that may occur when using Vue Flow.

## Errors and Fixes

Vue Flow can emit several error types to help diagnose and resolve issues.

### MISSING_VIEWPORT_DIMENSIONS
- **Description:** The Vue Flow parent container needs a width and a height to render the graph.
- **Fix:** Ensure the parent container of Vue Flow has defined width and height.

```vue
<template>
  <!-- Ensure the parent container has a width and height -->
  <div style="width: 500px; height: 500px">
    <VueFlow v-model="elements" />
  </div>
</template>
```

### NODE_INVALID
- **Description:** A node is considered invalid, potentially due to incorrect configuration.
- **Fix:** Check the node configuration for correctness, ensuring all required properties are set.

```ts
// Here's an example of some valid node configurations
const nodes = ref([
  { id: '1', type: 'input', label: 'Node 1', position: { x: 250, y: 5 } },
  { id: '2', label: 'Node 2', position: { x: 100, y: 100 } },
  { id: '3', type: 'output', label: 'Node 3', position: { x: 400, y: 200 } },
  { id: '4', type: 'special', label: 'Node 4', position: { x: 400, y: 200 } },
])
```

### NODE_NOT_FOUND
- **Description:** A corresponding node could not be found when calling `useNode`.
- **Fix:** Verify the node exists when you call `useNode` outside of a custom node component.

### NODE_MISSING_PARENT
- **Description:** A node is missing a defined parent node, necessary for nested nodes.
- **Fix:** Ensure the parent node exists before adding a child node for it.

```ts
// Here's an example of a valid nested node configuration
const nodes = ref([
  { id: '1', type: 'input', label: 'Node 1', position: { x: 250, y: 5 } },
  { id: '2', label: 'Node 2', position: { x: 100, y: 100 }, parentNode: '1' },
  { id: '3', type: 'output', label: 'Node 3', position: { x: 400, y: 200 }, parentNode: '1' },
])
```

### NODE_TYPE_MISSING
- **Description:** A node's type has no corresponding component defined.
- **Fix:** Define a component for every node-type you use to ensure correct rendering of your custom nodes.

### NODE_EXTENT_INVALID
- **Description:** Only child nodes can use a parent extent, indicating an invalid configuration.
- **Fix:** Ensure only child nodes use a parent extent, and that the parent node exists.

### EDGE_INVALID
- **Description:** An edge is missing a source or target.
- **Fix:** Ensure all edges have both `source` and `target` properties correctly set.

```ts
// Here's an example of some valid edge configurations
const edges = ref([
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-4', source: '1', target: '4' },
])
```

### EDGE_NOT_FOUND
- **Description:** A corresponding edge could not be found when calling `useEdge`.
- **Fix:** Verify the edge exists when you call `useEdge` outside of a custom edge component.

### EDGE_SOURCE_MISSING / EDGE_TARGET_MISSING
- **Description:** An edge's source or target node is missing.
- **Fix:** Ensure both the source and target nodes exist and are correctly set for each edge.

### EDGE_TYPE_MISSING
- **Description:** An edge's type has no corresponding component defined.
- **Fix:** Define a component for every edge-type you use to ensure correct rendering of your custom edges.

### EDGE_SOURCE_TARGET_SAME
- **Description:** An edge's source and target are the same node.
- **Fix:** If this is intentional, you can ignore this error. Otherwise, ensure the source and target nodes are different.

### EDGE_SOURCE_TARGET_MISSING
- **Description:** Both, the source *and* target nodes are missing from an edge.
- **Fix:** Ensure both the source and target nodes exist and are correctly set for each edge.

### EDGE_ORPHANED
- **Description:** An edge has lost its source or target node, likely due to node deletion.
- **Fix:** If you intentionally orphaned the edge, you can ignore this error. Otherwise, ensure the source and target nodes exist or that you clean up edges before they are orphaned.

## Evaluating Errors During Runtime

During development, Vue Flow emits warnings to the console for errors encountered. These warnings are intended to help developers identify and resolve issues without failing silently. In production, however, these warnings are suppressed to avoid exposing potentially sensitive information to end users.

### Hooking into onError or @error Events

You can handle errors programmatically by hooking into the `onError` or `@error` events. This allows you to perform custom operations based on the type of error encountered. Here's an example of how to use `isErrorOfType` to handle a specific error type:

```ts
import { isErrorOfType, ErrorCode } from '@vue-flow/core'

onError((error) => {
  if (isErrorOfType(error, ErrorCode.NODE_INVALID)) {
    const [nodeId] = error.args
    // Handle the NODE_INVALID error, e.g., by notifying the user or logging details.
  }
})
```

```vue
<template>
  <VueFlow v-model="elements" @error="handleError" />
</template>
```


