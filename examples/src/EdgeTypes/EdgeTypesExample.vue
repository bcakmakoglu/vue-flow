<script lang="ts" setup>
import { getElements } from './utils'
import { VueFlow, MiniMap, Controls, FlowInstance } from '@braks/vue-flow'

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
