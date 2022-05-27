<script lang="ts" setup>
import type { VueFlowStore } from '@braks/vue-flow'
import { Controls, MiniMap, VueFlow } from '@braks/vue-flow'
import { getElements } from './utils'

const onLoad = (flowInstance: VueFlowStore) => {
  flowInstance.fitView()
  console.log(flowInstance.getElements())
}

const elements = getElements()
</script>

<template>
  <VueFlow v-model="elements" :min-zoom="0.2" @pane-ready="onLoad">
    <MiniMap />
    <Controls />
  </VueFlow>
</template>
