# MiniMap

## Usage

To use the minimap simply pass the `MiniMap` component as a child to the `VueFlow` component.

::: tip
The minimap styles ship in `@vue-flow/core/dist/style.css` — make sure that base stylesheet is imported (see [Getting Started](/guide/getting-started)).
:::

```vue
<script setup>
import { MiniMap, VueFlow } from '@vue-flow/core'
</script>

<template>
  <VueFlow>
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

| Name             | Definition                   | Type                                                              | Optional | Default                                           |
|------------------|------------------------------|-------------------------------------------------------------------|----------|---------------------------------------------------|
| nodeColor        | Node background color        | string, [MiniMapNodeFunc](/typedocs/type-aliases/MiniMapNodeFunc) | true     | `var(--xy-minimap-node-background-color-default)` |
| nodeStrokeColor  | Node border color            | string, [MiniMapNodeFunc](/typedocs/type-aliases/MiniMapNodeFunc) | true     | `var(--xy-minimap-node-stroke-color-default)`     |
| nodeClassName    | Extra node classes           | string, [MiniMapNodeFunc](/typedocs/type-aliases/MiniMapNodeFunc) | true     | -                                                 |
| nodeBorderRadius | Node border radius           | number                                                            | true     | 5                                                 |
| nodeStrokeWidth  | Node stroke width            | number                                                            | true     | 2                                                 |
| maskColor        | Mask (background) color      | string                                                            | true     | `var(--xy-minimap-mask-background-color-default)` |
| maskStrokeColor  | Mask border color            | string                                                            | true     | `var(--xy-minimap-mask-stroke-color-default)`     |
| maskStrokeWidth  | Mask border width            | number                                                            | true     | 1                                                 |
| maskBorderRadius | Mask border radius           | number                                                            | true     | 0                                                 |
| position         | Position of the minimap      | PanelPosition                                                     | true     | bottom-right                                      |
| pannable         | Use Minimap to pan on drag   | boolean                                                           | true     | false                                             |
| zoomable         | Use Minimap to zoom on wheel | boolean                                                           | true     | false                                             |
| inversePan       | Invert the pan direction     | boolean                                                           | true     | false                                             |
| zoomStep         | Zoom step when zooming       | number                                                            | true     | 1                                                 |
| offsetScale      | Minimap viewbox offset scale | number                                                            | true     | 5                                                 |
| width            | Minimap width                | number                                                            | true     | -                                                 |
| height           | Minimap height               | number                                                            | true     | -                                                 |
| ariaLabel        | Accessibility label          | string \| null                                                    | true     | Vue Flow mini map                                 |

## Slots

| Name                | Definition        | Props                                                     | Default                                       |
|---------------------|-------------------|-----------------------------------------------------------|-----------------------------------------------|
| `node-${node.type}` | MiniMap Node slot | [MiniMapNodeProps](/typedocs/interfaces/MiniMapNodeProps) | [MiniMapNode](/guide/components/minimap-node) |
