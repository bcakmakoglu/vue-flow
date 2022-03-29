<script lang="ts" setup>
import { getElements } from './utils'
import { VueFlow, FlowInstance } from '@braks/vue-flow'

const instance = ref<FlowInstance>()
const onLoad = (flowInstance: FlowInstance) => {
  flowInstance.fitView()
  instance.value = flowInstance
  console.log(flowInstance.getNodes())
}

const { nodes, edges } = getElements(10, 10)
</script>
<template>
  <VueFlow :nodes="nodes" :edges="edges" @pane-ready="onLoad"> </VueFlow>
</template>
