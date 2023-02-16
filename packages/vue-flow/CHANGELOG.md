# vueflow

## 1.0.0

### Major Changes

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

### Patch Changes

- Updated dependencies [[`78f9ee1c`](https://github.com/bcakmakoglu/vue-flow/commit/78f9ee1cb77cc00590b8d4529da7cd124ddfc0f6), [`e175cf81`](https://github.com/bcakmakoglu/vue-flow/commit/e175cf8157be1851651d6df0a9e87f732b53de59), [`2e2c449b`](https://github.com/bcakmakoglu/vue-flow/commit/2e2c449bf60efed7152930962df2f9b5c0037386), [`e1c28a26`](https://github.com/bcakmakoglu/vue-flow/commit/e1c28a26c75a86b8c2790480bb8dadf37ad2ff12), [`08ad1735`](https://github.com/bcakmakoglu/vue-flow/commit/08ad17356f5fbd50255af27f7c482da756eda4aa)]:
  - @vue-flow/core@1.1.0
  - @vue-flow/additional-components@1.1.0
