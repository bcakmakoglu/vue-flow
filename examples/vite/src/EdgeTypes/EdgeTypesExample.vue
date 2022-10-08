<script lang="ts" setup>
import type { VueFlowStore } from '@vue-flow/core'
import { Controls, MiniMap, VueFlow } from '@vue-flow/core'
import { getElements } from './utils'

const onLoad = (flowInstance: VueFlowStore) => {
  flowInstance.fitView()
  console.log(flowInstance.getElements.value)
}

const elements = getElements()
</script>

<template>
  <VueFlow v-model="elements" :min-zoom="0.2" @pane-ready="onLoad">
    <MiniMap />
    <Controls />
  </VueFlow>
</template>
