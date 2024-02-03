<script lang="ts" setup>
import { ARIA_EDGE_DESC_KEY, ARIA_LIVE_MESSAGE, ARIA_NODE_DESC_KEY } from '../../utils/a11y'
import { useVueFlow } from '../../composables/useVueFlow'

const { id, disableKeyboardA11y, ariaLiveMessage } = useVueFlow()
</script>

<script lang="ts">
export default {
  name: 'A11yDescriptions',
  compatConfig: { MODE: 3 },
}
</script>

<template>
  <div :id="`${ARIA_NODE_DESC_KEY}-${id}`" style="display: none">
    Press enter or space to select a node.
    {{ !disableKeyboardA11y ? 'You can then use the arrow keys to move the node around.' : '' }}
    You can then use the arrow keys to move the node around, press delete to remove it and press escape to cancel.
  </div>

  <div :id="`${ARIA_EDGE_DESC_KEY}-${id}`" style="display: none">
    Press enter or space to select an edge. You can then press delete to remove it or press escape to cancel.
  </div>

  <div
    v-if="!disableKeyboardA11y"
    :id="`${ARIA_LIVE_MESSAGE}-${id}`"
    aria-live="assertive"
    aria-atomic="true"
    style="
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      border: 0;
      padding: 0;
      overflow: hidden;
      clip: rect(0px, 0px, 0px, 0px);
      clip-path: inset(100%);
    "
  >
    {{ ariaLiveMessage }}
  </div>
</template>
