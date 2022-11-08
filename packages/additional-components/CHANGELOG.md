# @vue-flow/additional-components

## 1.2.2

### Patch Changes

- [#415](https://github.com/bcakmakoglu/vue-flow/pull/415) [`a27ccc4`](https://github.com/bcakmakoglu/vue-flow/commit/a27ccc46838243bfbe889a74f0ead9f2f381a06f) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Render mini map nodes regardless of `onlyRenderVisibleElements`

- [#415](https://github.com/bcakmakoglu/vue-flow/pull/415) [`f89d4ec`](https://github.com/bcakmakoglu/vue-flow/commit/f89d4ecbfbb3e708d217dfa6de39bcce1d4a5266) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Inject minimap slots to avoid performance drops when using template slots

## 1.2.1

### Patch Changes

- [#398](https://github.com/bcakmakoglu/vue-flow/pull/398) [`0635dfa`](https://github.com/bcakmakoglu/vue-flow/commit/0635dfa171de27063e7d08ba8591330f00982732) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Upgrade to vite 3

## 1.2.0

### Minor Changes

- [#396](https://github.com/bcakmakoglu/vue-flow/pull/396) [`03412ac`](https://github.com/bcakmakoglu/vue-flow/commit/03412acf0d4452c104cc342e5e11eb3a7671fe72) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Add zoomable and pannable to MiniMap

  ### Usage

  - Set `zoomable` and `pannable` to `true` in `MiniMap` component to enable interactions with the MiniMap

  ```vue
  <template>
    <VueFlow v-model="elements">
      <MiniMap :zoomable="true" :pannable="true" />
    </VueFlow>
  </template>
  ```

## 1.1.0

### Minor Changes

- [#311](https://github.com/bcakmakoglu/vue-flow/pull/311) [`2e2c449b`](https://github.com/bcakmakoglu/vue-flow/commit/2e2c449bf60efed7152930962df2f9b5c0037386) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - # What's changed?

  - Add `Panel` component
    - Wrap `MiniMap` and `Controls` with `Panel`
  - Add `position` prop to `MiniMap` and `Controls`
    Example:

  ```vue
  <VueFlow v-model="elements">
    <MiniMap position="top-right" />
    <Controls position="top-left" />
  </VueFlow>
  ```

  # Bugfixes

  - Fix `MiniMap` and `Controls` cancelling selections

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

### Patch Changes

- Updated dependencies [[`939bff50`](https://github.com/bcakmakoglu/vue-flow/commit/939bff503039af3b790160640548ddde984cf2bc), [`47d837aa`](https://github.com/bcakmakoglu/vue-flow/commit/47d837aac096e59e7f55213990dff2cc7eba0c01)]:
  - @vue-flow/core@1.0.0
