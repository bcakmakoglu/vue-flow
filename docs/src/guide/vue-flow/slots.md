# Slots

Vue Flow provides several slots for customization.
In addition to the per-type node and edge slots — `#node-<type>` and `#edge-<type>` (see the guide on [nodes](/guide/node) and [edges](/guide/edge)) — there are a number of other slots you can use to customize the visualization.

All slots are optional: you only need to define the ones you want to customize.

## Default

The default slot can be used to nest elements inside the Vue Flow wrapper `<div>`.
It will not be rendered inside the viewport, meaning it will not receive a transformation for scale or positioning.
You can use the default slot to add a sidebar or floating toolbar etc. to your graph.

## Connection Line

The connection line slot allows you to pass down a custom connection line component, which will be used, when a connection
is triggered.

```vue
<template>
  <VueFlow>
    <template #connection-line="connectionLineProps">
      <CustomConnectionLine v-bind="connectionLineProps" />
    </template>
  </VueFlow>
</template>
```

The full description of connection line props can be found [here](/typedocs/interfaces/ConnectionLineProps). The position props follow xyflow/react's naming — `fromX` / `fromY` / `fromPosition` for the connection's origin and `toX` / `toY` / `toPosition` for the pointer, alongside `fromNode` / `fromHandle` and `toNode` / `toHandle` (renamed from the previous `source*` / `target*`).

## Zoom Pane

The zoom pane slot is placed inside the viewport transformation, so that it scales and moves with the current viewport zoom and position.

```vue
<template>
  <VueFlow>
    <template #zoom-pane>
      <div>Some element inside the zoom pane</div>
    </template>
  </VueFlow>
</template>
```
