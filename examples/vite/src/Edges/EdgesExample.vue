<script lang="ts" setup>
import { VueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'

import CustomEdge from './CustomEdge.vue'
import CustomEdge2 from './CustomEdge2.vue'
import { initialEdges, initialNodes } from './initial-elements'
</script>

<template>
  <VueFlow :edges="initialEdges" :nodes="initialNodes" fit-view-on-init snap-to-grid>
    <template #edge-custom="props">
      <CustomEdge v-bind="props" />
    </template>

    <template #edge-custom2="props">
      <CustomEdge2 v-bind="props" />
    </template>

    <MiniMap />
    <Controls />
    <Background />
  </VueFlow>
</template>
