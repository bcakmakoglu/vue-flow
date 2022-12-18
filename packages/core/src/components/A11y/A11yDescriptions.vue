<script lang="ts" setup>
import { ARIA_EDGE_DESC_KEY, ARIA_NODE_DESC_KEY } from '../../utils/a11y'

const { id, disableKeyboardA11y } = useVueFlow()
</script>

<template>
  <template v-if="!disableKeyboardA11y">
    <div :id="`${ARIA_NODE_DESC_KEY}-${id}`" style="display: none">
      Press enter or space to select a node. You can then use the arrow keys to move the node around, press delete to remove it
      and press escape to cancel.
    </div>

    <div :id="`${ARIA_EDGE_DESC_KEY}-${id}`" style="display: none">
      Press enter or space to select an edge. You can then press delete to remove it or press escape to cancel.
    </div>
  </template>
</template>
