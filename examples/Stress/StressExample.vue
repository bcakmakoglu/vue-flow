<script lang="ts" setup>
import { getElements } from './utils'
import { VueFlow, FlowInstance } from '~/index'

const instance = ref<FlowInstance>()
const onLoad = (flowInstance: FlowInstance) => {
  flowInstance.fitView()
  instance.value = flowInstance
  console.log(flowInstance.getNodes())
}

const { nodes, edges } = getElements(5, 5)
</script>
<template>
  <VueFlow :nodes="nodes" :edges="edges" @load="onLoad"> </VueFlow>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}

.fade-enter-from,
.fade-leave-active {
  opacity: 0;
}
</style>
