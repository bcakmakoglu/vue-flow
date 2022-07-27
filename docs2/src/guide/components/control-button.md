# Control Button

You can use the existing `ControlButton` component to create new control buttons.

## Usage

To use the component pass the `ControlButton` component as a child to the [`Controls`](/guide/components/control-button.html/) component.

```vue
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

## Slots

| Name    | Definition                                             |
|---------|--------------------------------------------------------|
| default | inner slot of btn (is wrapped by a `<button>` element) |

