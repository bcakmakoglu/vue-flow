<script lang="ts" setup>
import { VueFlow, useVueFlow } from '@vue-flow/renderer'
import { getElements } from './utils'

const { nodes, edges } = getElements(10, 10)

const { getNode, onPaneReady } = useVueFlow({
  nodes,
  edges,
})

onPaneReady((i) => {
  i.fitView({
    padding: 0.2,
  })
  console.log(i.getElements())
})
</script>

<template>
  <VueFlow />
</template>
