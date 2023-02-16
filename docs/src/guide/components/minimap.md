# MiniMap

## Installation

```bash
yarn add @vue-flow/minimap
  
# or
npm install @vue-flow/minimap
```

## Usage

To use the minimap simply pass the `MiniMap` component as a child to the `VueFlow` component.

::: warning
Make sure you also import the styles as these are *not* part of the default theme anymore.
:::

```vue
<script setup>
import { VueFlow } from '@vue-flow/core'
import { MiniMap } from '@vue-flow/minimap'

// import default minimap styles
import '@vue-flow/minimap/dist/style.css'

import initialElements from './initial-elements'

// some nodes and edges
const elements = ref(initialElements)
</script>

<template>
  <VueFlow v-model="elements" fit-view-on-init class="vue-flow-basic-example">
    <MiniMap />
  </VueFlow>
</template>
```

### Interactive MiniMap

The minimap can be made interactive by using the `pannable` and `zoomable` props.

```vue
<template>
  <VueFlow>
    <MiniMap pannable zoomable />
  </VueFlow>
</template>
```

When enabled, these props allow you to pan on drag and zoom on scroll using the MiniMap.

## [Props](/typedocs/interfaces/MiniMapProps)

| Name             | Definition                   | Type                                                       | Optional | Default                 |
|------------------|------------------------------|------------------------------------------------------------|----------|-------------------------|
| nodeColor        | Node(s) Background color     | string, [MiniMapNodeFunc](/typedocs/types/MiniMapNodeFunc) | true     | #fff                    |
| nodeStrokeColor  | Border color                 | string, [MiniMapNodeFunc](/typedocs/types/MiniMapNodeFunc) | true     | #555                    |
| nodeClassName    | Extra classes                | string, [MiniMapNodeFunc](/typedocs/types/MiniMapNodeFunc) | true     | -                       |
| nodeBorderRadius | Border radius                | number                                                     | true     | 5                       |
| nodeStrokeWidth  | Stroke width                 | number                                                     | true     | 2                       |
| maskColor        | Minimap Background color     | string                                                     | true     | rgb(240, 242, 243, 0.7) |
| pannable         | Use Minimap to pan on drag   | boolean                                                    | true     | false                   |
| zoomable         | Use Minimap to zoom on wheel | boolean                                                    | true     | false                   |

## Slots

| Name                | Definition        | Props                                                     | Default                                       |
|---------------------|-------------------|-----------------------------------------------------------|-----------------------------------------------|
| `node-${node.type}` | MiniMap Node slot | [MiniMapNodeProps](/typedocs/interfaces/MiniMapNodeProps) | [MiniMapNode](/guide/components/minimap-node) |
