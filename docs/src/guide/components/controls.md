# Controls

The control panel contains a zoom-in, zoom-out, fit-view and a lock/unlock button.

## Usage

To use the controls simply pass the `Controls` component as a child to the `VueFlow` component.

```vue
<template>
  <VueFlow>
    <Controls />
  </VueFlow>
</template>
```

## Props

| Name            | Definition                | Type                                                                  | Optional | Default |
|-----------------|---------------------------|-----------------------------------------------------------------------|----------|---------|
| showZoom        | Show zoom btn             | boolean                                                               | true     | true    |
| showFitView     | Show fit-view btn         | boolean                                                               | true     | true    |
| showInteractive | Show lock interactive btn | boolean                                                               | true     | true    |
| showZoom        | Show zoom button          | boolean                                                               | true     | true    |
| fitViewParams   | Params to use on fit-view | [FitViewParams](https://types.vueflow.dev/modules.html#FitViewParams) | true     | -       |

## Emits

| Name               | Definition                  |
|--------------------|-----------------------------|
| zoom-in            | Zoom-in btn clicked         |
| zoom-out           | Zoom-out btn clicked        |
| fit-view           | Fit-view btn clicked        |
| interaction-change | Interaction locked/unlocked |
