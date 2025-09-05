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

You can also customize the controls by using the provided slots and slot props.

```vue
<script setup>
import { VueFlow } from '@vue-flow/core'
import type { ControlType } from '@vue-flow/controls'
import { ControlButton, Controls } from '@vue-flow/controls'

// import default controls styles
import '@vue-flow/controls/dist/style.css'

// import custom tooltip component
import Tooltip from './Tooltip.vue'

const tooltips: Record<ControlType, string> = {
  'zoom-in': 'Zoom In',
  'zoom-out': 'Zoom Out',
  'fit-view': 'Fit View',
  'interactive': 'Lock/Unlock Interaction',
}
</script>

<template>
  <VueFlow>
    <Controls>
      <template #control-item="{ control, onClick, icon }">
        <Tooltip :text="tooltips[control]">
          <ControlButton @click="onClick">
            <component :is="icon" />
          </ControlButton>
        </Tooltip>
      </template>
    </Controls>
  </VueFlow>
</template>
```

## [Props](/typedocs/interfaces/ControlProps)

| Name            | Definition                             | Type                                                  | Optional | Default |
|-----------------|----------------------------------------|-------------------------------------------------------|----------|---------|
| showZoom        | Show zoom btn                          | boolean                                               | true     | true    |
| showFitView     | Show fit-view btn                      | boolean                                               | true     | true    |
| showInteractive | Show lock interactive btn              | boolean                                               | true     | true    |
| showZoom        | Show zoom button                       | boolean                                               | true     | true    |
| fitViewParams   | Params to use on fit-view button click | [FitViewParams](/typedocs/type-aliases/FitViewParams) | true     | -       |

## Emits

| Name               | Definition                  |
|--------------------|-----------------------------|
| zoom-in            | Zoom-in btn clicked         |
| zoom-out           | Zoom-out btn clicked        |
| fit-view           | Fit-view btn clicked        |
| interaction-change | Interaction locked/unlocked |

## Slots

### Control Buttons

| Name                | Definition                 | Props                                                                                                                |
|---------------------|----------------------------|----------------------------------------------------------------------------------------------------------------------|
| top                 | Slot above default buttons | [ControlsSlotProps](/typedocs/interfaces/ControlsSlotProps)                                                          |
| control-item        | Each control btn           | [ControlItemSlotProps](/typedocs/interfaces/ControlItemSlotProps)                                                    |
| control-zoom-in     | Zoom-in btn                | { disabled: boolean; zoomIn: () \=> any; icon: Component }                                                           |
| control-zoom-out    | Zoom-out btn               | { disabled: boolean; zoomOut: () \=> any; icon: Component }                                                          |
| control-fit-view    | Fit-view btn               | { fitView: () \=> any; icon: Component }                                                                             |
| control-interactive | Interaction btn            | { interactive: boolean; toggleInteractive: () \=> any; icon: Component; lockIcon: Component; unlockIcon: Component } |
| default             | Slot below default buttons | [ControlsSlotProps](/typedocs/interfaces/ControlsSlotProps)                                                          |

### Icons

| Name          | Definition                |
|---------------|---------------------------|
| icon-zoom-in  | Zoom-in icon              |
| icon-zoom-out | Zoom-out icon             |
| icon-fit-view | Fit-view icon             |
| icon-lock     | Interaction locked icon   |
| icon-unlock   | Interaction unlocked icon |
