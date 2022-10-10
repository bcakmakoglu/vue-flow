---
'vueflow': major
'@vue-flow/additional-components': patch
'@vue-flow/core': patch
---

# What's changed?

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
