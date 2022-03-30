<script lang="ts" setup>
import { VueFlow, FlowInstance } from '@braks/vue-flow'
import { getElements } from './utils'

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
