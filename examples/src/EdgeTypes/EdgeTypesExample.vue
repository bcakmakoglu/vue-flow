<script lang="ts" setup>
import type { FlowInstance } from '@braks/vue-flow'
import { Controls, MiniMap, VueFlow } from '@braks/vue-flow'
import { getElements } from './utils'

const onLoad = (flowInstance: FlowInstance) => {
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
