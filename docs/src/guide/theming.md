# Theming

VueFlow comes without any pre-injected stylings. Some necessary stylings have to be imported, though optional styles (i.e.
the default theme) can be skipped.

```css:no-line-numbers
/* these are necessary styles for vue flow */
@import '@braks/vue-flow/dist/style.css';

/* this contains the default theme, these are optional styles */
@import '@braks/vue-flow/dist/theme-default.css';
```

## Customizing default theme

When you are using the default theme there are two ways how you can style the graph pane and the elements. You can create
your own CSS rules or pass style/class properties to the components.

<CodeGroup>
  <CodeGroupItem title="Overwriting classes" active>

```css:no-line-numbers
.vue-flow {
  background: red;
}
```

  </CodeGroupItem>


  <CodeGroupItem title="Passing styles">

```vue
<div style="height: 300px">
  <VueFlow
    v-model="elements"
    :style="{ background: 'red' }"
  />
</div>
```

  </CodeGroupItem>

  <CodeGroupItem title="Using Tailwindcss">

```vue
<div style="height: 300px">
  <VueFlow
    v-model="elements"
    class="bg-red-500"
  />
</div>
```

  </CodeGroupItem>
</CodeGroup>

## Classnames

| Classname                        | Container                                                |
|----------------------------------|----------------------------------------------------------|
| `.vue-flow`                      | Outer container                                          |
| `.vue-flow__container`           | Wrapping container elements                              |
| `.vue-flow__renderer`            | Inner container                                          |
| `.vue-flow__transformation-pane` | Zoom & pan pane                                          |
| `.vue-flow__selectionpane`       | Selection pane                                           |
| `.vue-flow__selection`           | User selection                                           |
| `.vue-flow__edges`               | Edges renderer wrapper                                   |
| `.vue-flow__edge`                | Edge element wrapper                                     |
| `.vue-flow__edge-{$type}`        | Edge type, either a custom or default type               |
| `.vue-flow__edge .selected`      | Selected Edge                                            |
| `.vue-flow__edge .animated`      | Animated edge                                            |
| `.vue-flow__edge-path`           | Edge element svg path                                    |
| `.vue-flow__edge-text`           | Edge label wrapper                                       |
| `.vue-flow__edge-textbg`         | Edge label wrapper background                            |
| `.vue-flow__connection`          | Connection line element                                  |
| `.vue-flow__connection-path`     | Connection line svg path                                 |
| `.vue-flow__nodes`               | Nodes renderer wrapper                                   |
| `.vue-flow__node`                | Node element wrapper                                     |
| `.vue-flow__node .selected`      | Selected Node                                            |
| `.vue-flow__node-{$type}`        | Node type, either a custom or default type               |
| `.vue-flow__nodesselection`      | Nodes selection rect                                     |
| `.vue-flow__handle`              | Node handle element wrapper                              |
| `.vue-flow__handle-bottom`       | Handle position bottom                                   |
| `.vue-flow__handle-top`          | Handle position top                                      |
| `.vue-flow__handle-left`         | Handle position left                                     |
| `.vue-flow__handle-right`        | Handle position right                                    |
| `.vue-flow__handle-connecting`   | Connectionline is above handle                           |
| `.vue-flow__handle-valid`        | Connectionline is above handle & the connection is valid |
| `.vue-flow__background`          | Background component                                     |
| `.vue-flow__minimap`             | Mini map component                                       |
| `.vue-flow__controls`            | Controls component                                       |
 
