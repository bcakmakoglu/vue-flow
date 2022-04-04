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

## Props

| Name             | Definition               | Type                                                                         | Optional | Default                 |
|------------------|--------------------------|------------------------------------------------------------------------------|----------|-------------------------|
| nodeColor        | Node(s) Background color | string, [MiniMapNodeFunc](https://types.vueflow.dev/modules.html#StringFunc) | true     | #fff                    |
| nodeStrokeColor  | Border color             | string, [MiniMapNodeFunc](https://types.vueflow.dev/modules.html#StringFunc) | true     | #555                    |
| nodeClassName    | Extra classes            | string, [MiniMapNodeFunc](https://types.vueflow.dev/modules.html#StringFunc) | true     | -                       |
| nodeBorderRadius | Border radius            | number                                                                       | true     | 5                       |
| nodeStrokeWidth  | Stroke width             | number                                                                       | true     | 2                       |
| maskColor        | Minimap Background color | string                                                                       | true     | rgb(240, 242, 243, 0.7) |
