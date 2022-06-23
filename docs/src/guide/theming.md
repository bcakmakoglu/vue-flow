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

When you are using the default theme there are three ways how you can style the graph pane and the elements. You can create
your own CSS rules, pass style/class properties to the components or use the available css variables.

### Using classes

You can customize the default theme by simply overwriting the class definitions with your own custom ones.

```css:no-line-numbers
.vue-flow {
  background: red;
}
```

### Using styles

You can also pass a style or class attribute directly to the Vue Flow component.

```vue:no-line-numbers{4}
<div style="height: 300px">
  <VueFlow
    v-model="elements"
    :style="{ background: 'red' }"
  />
</div>
```

Nodes/Edges can also be styled with a style or class attribute.

```ts:no-line-numbers{8-12,20-27}
const nodes = ref<Node[]>([
  { 
    id: '1', 
    label: 'Node 1', 
    position: { x: 250, y: 5 },
    
    // Add a class name to the node
    class: 'my-custom-node-class',
    
    // You can pass an object containing CSSProperties or CSS variables
    style: { backgroundColor: 'green', width: '200px', height: '100px' },
  },
  
  { 
    id: '2', 
    label: 'Node 2', 
    position: { x: 100, y: 100 }, 
    
    /* 
     * You can also use a function which will receive your current element as it's input.
     * Useful if you want to add styles if the element is selected
     */
    style: (el) => {
      if (el.selected) return { background: 'purple' }
      return { background: 'green' }
    }
  },
])
```

### [Using CSS variables](/typedocs/types/CSSVars.html/)

Some theme stylings can be overwritten by using css variables.
These variables can either be applied globally or you can define them on an element basis.

```css
/* global defaults */
:root {
  --vf-node-bg: #fff;
  --vf-node-text: #222;
  --vf-connection-path:  #b1b1b7;
  --vf-handle: #555;
}
```

```ts:no-line-numbers{4-5}
const elements = ref<Elements>([
  { id: '1', type: 'input', label: 'Node 1', position: { x: 250, y: 5 } },
  
  // Overwrite the `--vf-node-color` variable to change the border, box-shadow and handle color of a node
  { id: '2', label: 'Node 2', position: { x: 100, y: 100 }, style: { '--vf-node-color': 'blue' } },
  
  { id: '3', label: 'Node 3', position: { x: 400, y: 100 } },
  { id: '4', label: 'Node 4', position: { x: 400, y: 200 } },
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
])
```

## CSS Variables

| Variable              | Effect                                   |
|-----------------------|------------------------------------------|
| --vf-node-color       | Node border, box-shadow and handle color |
| --vf-box-shadow       | Node box-shadow color                    |
| --vf-node-bg          | Node background color                    |
| --vf-node-text        | Node font color                          |
| --vf-handle           | Node handle color                        |
| --vf-connection-path  | Connectionline color                     |



## Classes

| Name                          | Container                                                |
|-------------------------------|----------------------------------------------------------|
| .vue-flow                     | Outer container                                          |
| .vue-flow__container          | Wrapping container elements                              |
| .vue-flow__viewport           | Inner container                                          |
| .vue-flow__transformationpane | Zoom & pan pane                                          |
| .vue-flow__selectionpane      | Selection pane                                           |
| .vue-flow__selection          | User selection                                           |
| .vue-flow__edges              | Edges renderer wrapper                                   |
| .vue-flow__edge               | Edge element wrapper                                     |
| .vue-flow__edge-{$type}       | Edge type, either a custom or default type               |
| .vue-flow__edge .selected     | Selected Edge                                            |
| .vue-flow__edge .animated     | Animated edge                                            |
| .vue-flow__edge-path          | Edge element svg path                                    |
| .vue-flow__edge-text          | Edge label wrapper                                       |
| .vue-flow__edge-textbg        | Edge label wrapper background                            |
| .vue-flow__connectionline     | Connection line container element                        |
| .vue-flow__connection         | Connection line element                                  |
| .vue-flow__connection-path    | Connection line svg path                                 |
| .vue-flow__nodes              | Nodes renderer wrapper                                   |
| .vue-flow__node               | Node element wrapper                                     |
| .vue-flow__node .selected     | Selected Node                                            |
| .vue-flow__node-{$type}       | Node type, either a custom or default type               |
| .vue-flow__nodesselection     | Nodes selection rect                                     |
| .vue-flow__handle             | Node handle element wrapper                              |
| .vue-flow__handle-bottom      | Handle position bottom                                   |
| .vue-flow__handle-top         | Handle position top                                      |
| .vue-flow__handle-left        | Handle position left                                     |
| .vue-flow__handle-right       | Handle position right                                    |
| .vue-flow__handle-connecting  | Connectionline is above handle                           |
| .vue-flow__handle-valid       | Connectionline is above handle & the connection is valid |
| .vue-flow__background         | Background component                                     |
| .vue-flow__minimap            | Mini map component                                       |
| .vue-flow__controls           | Controls component                                       |
 
