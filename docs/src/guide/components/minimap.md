# MiniMap

## Usage

To use the minimap simply pass the `MiniMap` component as a child to the `VueFlow` component.

```vue
<template>
  <VueFlow>
    <MiniMap />
  </VueFlow>
</template>
```

## [Props](/typedocs/interfaces/MiniMapProps)

| Name             | Definition               | Type                                                             | Optional | Default                 |
|------------------|--------------------------|------------------------------------------------------------------|----------|-------------------------|
| nodeColor        | Node(s) Background color | string, [MiniMapNodeFunc](/typedocs/types/MiniMapNodeFunc) | true     | #fff                    |
| nodeStrokeColor  | Border color             | string, [MiniMapNodeFunc](/typedocs/types/MiniMapNodeFunc) | true     | #555                    |
| nodeClassName    | Extra classes            | string, [MiniMapNodeFunc](/typedocs/types/MiniMapNodeFunc) | true     | -                       |
| nodeBorderRadius | Border radius            | number                                                           | true     | 5                       |
| nodeStrokeWidth  | Stroke width             | number                                                           | true     | 2                       |
| maskColor        | Minimap Background color | string                                                           | true     | rgb(240, 242, 243, 0.7) |

## Slots

| Name                | Definition        | Props                                                           | Default                                             |
|---------------------|-------------------|-----------------------------------------------------------------|-----------------------------------------------------|
| `node-${node.type}` | MiniMap Node slot | [MiniMapNodeProps](/typedocs/interfaces/MiniMapNodeProps) | [MiniMapNode](/guide/components/minimap-node) |
