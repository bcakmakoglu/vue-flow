# Slots

Vue Flow provides several slots for customization.
In addition to the node and edge slots (see the guide on [nodes](/guide/node.html) and [edges](/guide/edge.html)),
there are a number of other slots you can use to customize the visualization.

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

The full description of connection line props can be found [here](/typedocs/interfaces/ConnectionLineProps.html/).

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
