# @vue-flow/core

## 1.1.0

### Minor Changes

- [#311](https://github.com/bcakmakoglu/vue-flow/pull/311) [`78f9ee1c`](https://github.com/bcakmakoglu/vue-flow/commit/78f9ee1cb77cc00590b8d4529da7cd124ddfc0f6) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - # What's changed?

  - Add `HandleConnectable` type
  - Update `connectable` prop of `Handle` to `HandleConnectable` type
  - Allow to specify if Handles are connectable
    - any number of connections
    - none
    - single connection
    - or a cb to determine whether the Handle is connectable

  Example:

  ```html
  <script lang="ts" setup>
    import { Handle, HandleConnectable } from '@vue-flow/core'

    const handleConnectable: HandleConnectable = (node, connectedEdges) => {
      console.log(node, connectedEdges)
      return true
    }
  </script>
  <template>
    <!-- single connection -->
    <Handle type="target" position="left" connectable="single" />
    <div>Custom Node</div>
    <!-- cb -->
    <Handle id="a" position="right" :connectable="handleConnectable" />
  </template>
  ```

  - Update `node.connectable` prop to `HandleConnectable`

  For Example:

  ```js
  const nodes = ref([
    {
      id: '1',
      position: { x: 0, y: 0 },
      connectable: 'single', // each handle is only connectable once (default node for example)
    },
    {
      id: '2',
      position: { x: 200, y: 0 },
      connectable: (node, connectedEdges) => {
        return true // will allow any number of connections
      },
    },
    {
      id: '3',
      position: { x: 400, y: 0 },
      connectable: true, // will allow any number of connections
    },
    {
      id: '4',
      position: { x: 200, y: 0 },
      connectable: false, // will disable handles
    },
  ])
  ```

### Patch Changes

- [#311](https://github.com/bcakmakoglu/vue-flow/pull/311) [`e175cf81`](https://github.com/bcakmakoglu/vue-flow/commit/e175cf8157be1851651d6df0a9e87f732b53de59) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - # What's changed?

  - Add `vueflow` pkg that exports all features

  ```vue
  <script setup>
  // `vueflow` pkg exports all features, i.e. core + additional components
  import { VueFlow, Background, MiniMap, Controls } from 'vueflow'
  </script>

  <template>
    <VueFlow>
      <Background />
      <MiniMap />
      <Controls />
    </VueFlow>
  </template>
  ```

  ### Chores

  - Rename `core` pkg directory to `core` from `vue-flow`
  - Rename bundle outputs

- [#311](https://github.com/bcakmakoglu/vue-flow/pull/311) [`e1c28a26`](https://github.com/bcakmakoglu/vue-flow/commit/e1c28a26c75a86b8c2790480bb8dadf37ad2ff12) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - # What's changed?

  - Simplify `useHandle` usage
  - Pass props to the composable as possible refs
    - Still returns onClick & onMouseDown handlers but only expects mouse event now

  Before:

  ```vue
  <script lang="ts" setup>
  import { useHandle, NodeId } from '@vue-flow/core'

  const nodeId = inject(NodeId)

  const handleId = 'my-handle'

  const type = 'source'

  const isValidConnection = () => true

  const { onMouseDown } = useHandle()

  const onMouseDownHandler = (event: MouseEvent) => {
    onMouseDown(event, handleId, nodeId, type === 'target', isValidConnection, undefined)
  }
  </script>

  <template>
    <div @mousedown="onMouseDownHandler" />
  </template>
  ```

  After:

  ```vue
  <script lang="ts" setup>
  import { useHandle, useNode } from '@vue-flow/core'

  const { nodeId } = useNode()

  const handleId = 'my-handle'

  const type = 'source'

  const isValidConnection = () => true

  const { onMouseDown } = useHandle({
    nodeId,
    handleId,
    isValidConnection,
    type,
  })
  </script>

  <template>
    <div @mousedown="onMouseDown" />
  </template>
  ```

- [#311](https://github.com/bcakmakoglu/vue-flow/pull/311) [`08ad1735`](https://github.com/bcakmakoglu/vue-flow/commit/08ad17356f5fbd50255af27f7c482da756eda4aa) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - # Bugfixes

  - Edges not returned by getter when `paneReady` event is triggered

## 1.0.0

### Major Changes

- [#305](https://github.com/bcakmakoglu/vue-flow/pull/305) [`939bff50`](https://github.com/bcakmakoglu/vue-flow/commit/939bff503039af3b790160640548ddde984cf2bc) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - # What's changed?

  - Simplify edge path calculations
    - remove `getEdgeCenter` and `getSimpleEdgeCenter`

  # Breaking Changes

  - `getEdgeCenter` has been removed
    - Edge center positions can now be accessed from `getBezierPath` or `getSmoothStepPath` functions

  Before:

  ```js
  import { getBezierPath, getEdgeCenter } from '@braks/vue-flow'

  // used to return the path string only
  const edgePath = computed(() => getBezierPath(pathParams))

  // was necessary to get the centerX, centerY of an edge
  const centered = computed(() => getEdgeCenter(centerParams))
  ```

  After:

  ```js
  import { getBezierPath } from '@vue-flow/core'

  // returns the path string and the center positions
  const [path, centerX, centerY] = computed(() => getBezierPath(pathParams))
  ```

- [#305](https://github.com/bcakmakoglu/vue-flow/pull/305) [`47d837aa`](https://github.com/bcakmakoglu/vue-flow/commit/47d837aac096e59e7f55213990dff2cc7eba0c01) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - # What's changed?

  - Change pkg scope from 'braks' to 'vue-flow'
    - Add `@vue-flow/core` package
    - Add `@vue-flow/additional-components` package
    - Add `@vue-flow/pathfinding-edge` package
    - Add `@vue-flow/resize-rotate-node` package

  # Features

  - `useNode` and `useEdge` composables
    - can be used to access current node/edge (or by id) and their respective element refs (if used inside the elements' context, i.e. a custom node/edge)
  - `selectionKeyCode` as `true`
    - allows for figma style selection (i.e. create a selection rect without holding shift or any other key)
  - Handles to trigger handle bounds calculation on mount
    - if no handle bounds are found, a Handle will try to calculate its bounds on mount
    - should remove the need for `updateNodeInternals` on dynamic handles
  - Testing for various features using Cypress 10

  # Bugfixes

  - Fix `removeSelectedEdges` and `removeSelectedNodes` actions not properly removing elements from store

  # Breaking Changes

  - `@vue-flow/core` package is now required to use vue-flow
  - `@vue-flow/additional-components` package contains `Background`, `MiniMap` and `Controls` components and related types
    - When switching to the new pkg scope, you need to change the import path.

  Before:

  ```js
  import { VueFlow, Background, MiniMap, Controls } from '@braks/vue-flow'
  ```

  After

  ```js
  import { VueFlow } from '@vue-flow/core'
  import { Background, MiniMap, Controls } from '@vue-flow/additional-components'
  ```
