# Controls

The control panel contains a zoom-in, zoom-out, fit-view and a lock/unlock button.

## Installation

```bash
yarn add @vue-flow/controls

# or
npm install @vue-flow/controls
```

## Usage

To use the controls simply pass the `Controls` component as a child to the `VueFlow` component.

::: warning
Make sure you also import the styles as these are *not* part of the default theme anymore.
:::

```vue
<script setup>
import { VueFlow } from '@vue-flow/core'
import { Controls } from '@vue-flow/controls'

// import default controls styles
import '@vue-flow/controls/dist/style.css'
</script>

<template>
  <VueFlow>
    <Controls />
  </VueFlow>
</template>
```


## [Props](/typedocs/interfaces/ControlProps)

| Name            | Definition                             | Type                                           | Optional | Default |
|-----------------|----------------------------------------|------------------------------------------------|----------|---------|
| showZoom        | Show zoom btn                          | boolean                                        | true     | true    |
| showFitView     | Show fit-view btn                      | boolean                                        | true     | true    |
| showInteractive | Show lock interactive btn              | boolean                                        | true     | true    |
| showZoom        | Show zoom button                       | boolean                                        | true     | true    |
| fitViewParams   | Params to use on fit-view button click | [FitViewParams](/typedocs/types/FitViewParams) | true     | -       |

## Emits

| Name               | Definition                  |
|--------------------|-----------------------------|
| zoom-in            | Zoom-in btn clicked         |
| zoom-out           | Zoom-out btn clicked        |
| fit-view           | Fit-view btn clicked        |
| interaction-change | Interaction locked/unlocked |

## Slots

### Control Buttons

| Name                | Definition                 |
|---------------------|----------------------------|
| top                 | Slot above default buttons |
| control-zoom-in     | Zoom-in btn                |
| control-zoom-out    | Zoom-out btn               |
| control-fit-view    | Fit-view btn               |
| control-interactive | Interaction btn            |
| default             | Slot below default buttons |

### Icons

| Name          | Definition                |
|---------------|---------------------------|
| icon-zoom-in  | Zoom-in icon              |
| icon-zoom-out | Zoom-out icon             |
| icon-fit-view | Fit-view icon             |
| icon-lock     | Interaction locked icon   |
| icon-unlock   | Interaction unlocked icon |


