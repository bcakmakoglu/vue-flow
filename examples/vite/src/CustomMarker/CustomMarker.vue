<script lang="ts" setup>
import { VueFlow, useCustomMarker } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'

import { initialEdges, initialNodes, ExtendedMarkerType } from './initial-elements'

const { registerMarkerType } = useCustomMarker();

// Register custom marker types
registerMarkerType(ExtendedMarkerType.Circle, {
  path: 'M 0,-4 a 4,4 0 1,0 0,8 a 4,4 0 1,0 0,-8',
});

registerMarkerType(ExtendedMarkerType.Diamond, {
  path: 'M 0,-5 L 5,0 L 0,5 L -5,0 Z',
});

registerMarkerType(ExtendedMarkerType.Square, {
  path: 'M -4 -4 H 4 V 4 H -4 Z'
});

</script>

<template>
  <VueFlow :edges="initialEdges"
           :nodes="initialNodes"
           fit-view-on-init
           snap-to-grid>
    <Controls />
    <Background />
  </VueFlow>
</template>
