---
'@vue-flow/additional-components': minor
'@vue-flow/core': minor
---

Add zoomable and pannable to MiniMap

### Usage

- Set `zoomable` and `pannable` to `true` in `MiniMap` component to enable interactions with the MiniMap

```vue
<template>
  <VueFlow v-model="elements">
    <MiniMap :zoomable="true" :pannable="true" />
  </VueFlow>
</template>
```
