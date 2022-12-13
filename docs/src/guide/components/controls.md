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

```vue
<template>
  <VueFlow>
    <Controls />
  </VueFlow>
</template>
```

## [Props](/typedocs/interfaces/ControlProps)

| Name            | Definition                | Type                                           | Optional | Default |
|-----------------|---------------------------|------------------------------------------------|----------|---------|
| showZoom        | Show zoom btn             | boolean                                        | true     | true    |
| showFitView     | Show fit-view btn         | boolean                                        | true     | true    |
| showInteractive | Show lock interactive btn | boolean                                        | true     | true    |
| showZoom        | Show zoom button          | boolean                                        | true     | true    |
| fitViewParams   | Params to use on fit-view | [FitViewParams](/typedocs/types/FitViewParams) | true     | -       |

## Emits

| Name               | Definition                  |
|--------------------|-----------------------------|
| zoom-in            | Zoom-in btn clicked         |
| zoom-out           | Zoom-out btn clicked        |
| fit-view           | Fit-view btn clicked        |
| interaction-change | Interaction locked/unlocked |

## Slots

### Control Buttons

| Name                | Definition              |
|---------------------|-------------------------|
| top                 | slot above default btns |
| control-zoom-in     | Zoom-in btn             |
| control-zoom-out    | Zoom-out btn            |
| control-fit-view    | Fit-view btn            |
| control-interaction | Interaction btn         |
| default             | slot below default btns |

### Icons

| Name          | Definition                |
|---------------|---------------------------|
| icon-zoom-in  | Zoom-in icon              |
| icon-zoom-out | Zoom-out icon             |
| icon-fit-view | Fit-view icon             |
| icon-lock     | Interaction locked icon   |
| icon-unlock   | Interaction unlocked icon |


