# MiniMap Node

The minimap node component can be used to extend the default minimap nodes.
You can use it to add an icon to your node, or to add a custom tooltip etc.

## Usage

To use the component pass the `MiniMapNode` as a child to the [`MiniMap`](/guide/components/minimap.html/) component.

```vue
<template>
  <VueFlow>
    <MiniMap>
      <template #node-input="props">
        <MiniMapNode v-bind="props" />
      </template>
    </MiniMap>
  </VueFlow>
</template>
```

## [Props](/typedocs/interfaces/MiniMapNodeProps.html/)

| Name           | Definition                      | Type                                                | Optional | Default |
|----------------|---------------------------------|-----------------------------------------------------|----------|---------|
| id             | Node id                         | string                                              | false    | -       |
| parentNode     | Parent node id                  | string                                              | true     | -       |
| selected       | Is node selected                | boolean                                             | true     | false   |
| dragging       | Is node dragging                | boolean                                             | true     | false   |
| position       | XY position of node             | [XYPosition](/typedocs/interfaces/XYPosition.html/) | false    | -       |
| dimensions     | Node dimensions                 | [Dimensions](/typedocs/interfaces/Dimensions.html/) | false    | -       |
| borderRadius   | MiniMap node css border-radius  | number                                              | true     | -       |
| color          | MiniMap node css color          | string                                              | true     | -       |
| shapeRendering | MiniMap node css shapeRendering | ShapeRendering                                      | true     | -       |
| strokeColor    | MiniMap node css stroke-color   | string                                              | true     | -       |
| strokeWidth    | MiniMap node css stroke-width   | string                                              | true     | -       |

## Slots

| Name    | Definition                   |
|---------|------------------------------|
| default | Slot below MiniMap node rect |
