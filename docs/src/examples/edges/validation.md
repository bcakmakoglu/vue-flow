# Connection Validation

To validate connections before they are created you can either pass a function to the `is-valid-connection` prop of the `<Handle />` component
or use the `onConnect` event of the `<VueFlow />` component.

Another alternative is to pass a `isValidConnection` function to the `is-valid-connection` prop of the `<VueFlow />` component.
This function will be applied to *all* connections in the flow (even existing ones).

## Using a handle in a custom node

```vue
<script setup>
import { Handle, Position } from '@vue-flow/core'
</script>

<template>
  <Handle type="source" :position="Position.Right" />
  <Handle type="target" :position="Position.Left" />
</template>
```

<div class="mt-6">
  <Repl example="validation"></Repl>
</div>
