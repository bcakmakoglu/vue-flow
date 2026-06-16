---
title: Theming
---

<script setup>
import LogosJavascript from '~icons/logos/javascript';
import { ref, h } from 'vue';
import { Background, Handle, Position, VueFlow } from '@vue-flow/core';

const CustomNode = (props) => h('div', [
  h(Handle, { connectable: false, type: 'target', position: Position.Top }),
  h('div', props.label),
  h(Handle, { connectable: false, type: 'source', position: Position.Bottom }),
]);

const nodes = ref([
  { id: '1', label: 'Node 1', position: { x: 0, y: 0 }, draggable: false, deletable: false, selectable: false, type: 'custom' },
  { id: '2', label: 'Node 2', position: { x: 75, y: 75 }, draggable: false, deletable: false, selectable: false, type: 'custom' },
])

const edges = ref([
  { id: 'e1-2', source: '1', target: '2', animated: true, selectable: false, deletable: false },
])
</script>

# Theming

Let's take a tour around the library styles, customization opportunities, and other features that Vue Flow offers out of
the box.

## Library Styles

Vue Flow values flexibility and allows you to take the lead when it comes to styling.
It showcases some obligatory stylings that must be imported, while leaving optional features, such as the default theme,
up to your preference.

To import the necessary and optional styles:

```css
/* these are necessary styles for vue flow */
@import '@vue-flow/core/dist/style.css';

/* this contains the default theme, these are optional styles */
@import '@vue-flow/core/dist/theme-default.css';
```

## Adjusting the Default Theme

The Vue Flow default theme functions as your baseline, which you can customize and decorate as per your liking using CSS
rules, style and class properties, and CSS variables.

### Styling with CSS Classes

Here's how you can use CSS classes to add a pop of color or alter the font style for the theme:

```css
/* Use a purple theme for our custom node */
.vue-flow__node-custom {
    background: purple;
    color: white;
    border: 1px solid purple;
    border-radius: 4px;
    box-shadow: 0 0 0 1px purple;
    padding: 8px;
}
```

<div class="mt-4 bg-[var(--vp-code-block-bg)] rounded-lg h-50">
  <VueFlow v-model:nodes="nodes" v-model:edges="edges" fit-view>
    <template #node-custom="props">
      <CustomNode v-bind="props" />
    </template>
    <Background />
  </VueFlow>
</div>

<style>
.vue-flow__node-custom {
  background: purple;
  color: white;
  border: 1px solid purple;
  border-radius: 4px;
  box-shadow: 0 0 0 1px purple;
  padding: 8px;
}
</style>

### Using CSS Properties

You can also directly pass a style or class attribute to Vue Flow components and nodes/edges.

Below are a couple of examples on how you can do this:

Directly styling the Vue Flow component:

```vue{4-5}
<VueFlow
  :nodes="nodes"
  :edges="edges"
  class="my-diagram-class"  
  :style="{ background: 'red' }"
/>
```

Styling nodes/edges with a style or class attribute:

::: code-group

```js{8-12} [<LogosJavascript />]
/* Customizing node by assigning class and style properties */
const nodes = ref([
  { 
    id: '1', 
    position: { x: 250, y: 5 },
    data: { label: 'Node 1' },
    
    // Add a class name to the node
    class: 'my-custom-node-class',
    
    // You can pass an object containing CSSProperties or CSS variables
    style: { backgroundColor: 'green', width: '200px', height: '100px' },
  },
])
```

:::

### [Redefining Styles with CSS variables](/typedocs/type-aliases/CSSVars)

Some of the defined theme styles can be overwritten using CSS variables.
These alterations can be implemented either on a global scale or to individual elements.

::: code-group

```css
/* Global default CSS variable values */
:root {
    --vf-node-bg: #fff;
    --vf-node-text: #222;
    --vf-connection-path: #b1b1b7;
    --vf-handle: #555;
}
```

```js{6-7} [<LogosJavascript />]
const nodes = ref([
  { 
    id: '1', 
    position: { x: 100, y: 100 }, 
    data: { label: 'Node 1' },
    /* Overriding the `--vf-node-color` variable to change node border, box-shadow and handle color */
    style: { '--vf-node-color': 'blue' } 
  },
])
```

:::

## CSS Variables

Here's a concise list of CSS variables you can consider, along with their effects:

| Variable               | Effect                                             |
|------------------------|----------------------------------------------------|
| --vf-node-color        | Defines node border, box-shadow, and handle colors |
| --vf-box-shadow        | Defines color of node box-shadow                   |
| --vf-node-bg           | Defines node background color                      |
| --vf-node-text         | Defines node text color                            |
| --vf-handle            | Defines node handle color                          |
| --vf-handle-border     | Defines node handle border color                   |
| --vf-connection-path   | Defines connection line color                      |
| --vf-edge-text         | Defines edge label text color                      |
| --vf-edge-text-bg      | Defines edge label background color                |
| --vf-background-color  | Defines the flow container background color        |
| --vf-controls-bg       | Defines the `Controls` button background color     |
| --vf-controls-bg-hover | Defines the `Controls` button hover background     |
| --vf-controls-border   | Defines the `Controls` button border color         |
| --vf-controls-color    | Defines the `Controls` button icon color           |
| --vf-minimap-bg        | Defines the `MiniMap` background color             |
| --vf-minimap-node-bg   | Defines the default `MiniMap` node color           |
| --vf-minimap-mask      | Defines the `MiniMap` mask (overlay) color         |

## Color Mode

Vue Flow ships a built-in dark theme. Set the [`colorMode`](/typedocs/interfaces/FlowProps#colormode)
prop to `dark`, `light` (default) or `system` (follows the OS `prefers-color-scheme`):

```vue
<template>
  <VueFlow :nodes="nodes" :edges="edges" color-mode="dark" />
</template>
```

The resolved mode is applied as a `light`/`dark` class on the `.vue-flow` container, and the default
theme overrides the CSS variables above under `.vue-flow.dark`. To theme your own elements for dark
mode, scope your rules the same way:

```css
.vue-flow.dark .my-custom-node {
  background: #1e1e1e;
  color: #f8f8f8;
}
```

::: tip
`color-mode="system"` reacts to OS theme changes at runtime — switching your system between light and
dark updates the flow without a remount.
:::

## CSS Class Names

Here you'll find a handy reference guide of class names and their respective elements:

#### Containers
| Name                  | Container                                 |
| --------------------- | ----------------------------------------- |
| .vue-flow             | The outer container                       |
| .vue-flow__container  | Wrapper for container elements            |
| .vue-flow__viewport   | The inner container                       |
| .vue-flow__background | Background component                      |
| .vue-flow__minimap    | MiniMap component                         |
| .vue-flow__controls   | Controls component                        |

#### Edges
| Name                      | Description                                       |
| ------------------------- | ------------------------------------------------- |
| .vue-flow__edges          | Wrapper rendering edges                           |
| .vue-flow__edge           | Wrapper around each edge element                  |
| .vue-flow__pane           | Pane handling panning & user selection            |
| .vue-flow__selection      | Defines current user selection box                |
| .vue-flow__edge-\{type\}  | Edge type (either custom or default)              |
| .vue-flow__edge.selected  | Defines the currently selected edge(s)            |
| .vue-flow__edge.animated  | Defines an animated edge                          |
| .vue-flow__edge-path      | SVG path for edge elements                        |
| .vue-flow__edge-text      | Wrapper around edge label                         |
| .vue-flow__edge-textbg    | Background wrapper around edge label              |
| .vue-flow__connectionline | Container for the connection line elements        |
| .vue-flow__connection     | Individual connection line element                |
| .vue-flow__connection-path| SVG path for connection line                      |

#### Nodes
| Name                  | Description                               |
| --------------------- | ----------------------------------------- |
| .vue-flow__nodes      | Rendering wrapper around nodes            |
| .vue-flow__node       | Wrapper around each node element          |
| .vue-flow__node.selected | Defines the currently selected node(s)  |
| .vue-flow__node-\{type\}   | Node type (either custom or default)     |
| .vue-flow__nodesselection | Defines selection rectangle for nodes   |

#### Node Handles
| Name                      | Description                               |
| ------------------------- | ----------------------------------------- |
| .vue-flow__handle         | Wrapper around node handle elements       |
| .vue-flow__handle-bottom  | Defines a handle at bottom                |
| .vue-flow__handle-top     | Defines a handle at top                   |
| .vue-flow__handle-left    | Defines a handle at left                  |
| .vue-flow__handle-right   | Defines a handle at right                 |
| .vue-flow__handle.connectable         | Handle that can be connected                    |
| .vue-flow__handle.connecting          | Handle the connection started from              |
| .vue-flow__handle.connectionindicator | Handle highlighted as a valid connection target |
