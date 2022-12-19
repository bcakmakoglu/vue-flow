<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { ARIA_EDGE_DESC_KEY, ARIA_LIVE_MESSAGE, ARIA_NODE_DESC_KEY } from '../../utils/a11y'

const { id, disableKeyboardA11y, ariaLiveMessage } = useVueFlow()

const ariaLiveStyle: CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  margin: -1,
  border: 0,
  padding: 0,
  overflow: 'hidden',
  clip: 'rect(0px, 0px, 0px, 0px)',
  clipPath: 'inset(100%)',
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
    :style="ariaLiveStyle"
  >
    {{ ariaLiveMessage }}
  </div>
</template>
