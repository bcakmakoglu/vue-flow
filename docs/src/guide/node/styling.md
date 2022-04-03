# Styling

::: tip
To overwrite default theme styles check the [Theming section](/guide/theming/).
:::

## Custom Nodes

When you create a new node type you also need to implement some styling. Your custom node has no default styles.

```css:no-line-numbers
.vue-flow__node-custom {
  background: #9CA8B3;
  color: #fff;
  padding: 10px;
}
```

## Allow scrolling inside a node

You can use the `noWheelClassName` prop to define a class which will prevent zoom-on-scroll or pan-on-scroll behavior on that element.
By default the `noWheelClassName` is `.nowheel`.
By adding this class you can also enable scrolling inside a node.
