# Control Button

You can use the existing `ControlButton` component to create new control buttons.

## Usage

To use the component pass the `ControlButton` component as a child to the [`Controls`](/guide/components/controls) component.

```vue
<script setup>
import { ControlButton, Controls, VueFlow } from '@vue-flow/core'
</script>

<template>
  <VueFlow>
    <Controls>
      <ControlButton>
        <i class="fa fa-plus"></i>
      </ControlButton>
    </Controls>
  </VueFlow>
</template>
```

## Props

| Name     | Definition         | Type    | Optional | Default |
|----------|--------------------|---------|----------|---------|
| disabled | Disable the button | boolean | true     | false   |

## Emits

| Name  | Definition     | Payload    |
|-------|----------------|------------|
| click | Button clicked | MouseEvent |

## Slots

| Name    | Definition                                             |
|---------|--------------------------------------------------------|
| default | inner slot of btn (is wrapped by a `<button>` element) |

