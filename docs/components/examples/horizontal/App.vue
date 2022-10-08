<script setup>
import { Background, Controls, MiniMap } from '@vue-flow/additional-components'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { ref } from 'vue'
import { initialElements } from './initial-elements.js'

const { onConnect, addEdges } = useVueFlow()

const elements = ref(initialElements)

onConnect((params) => addEdges([params]))
</script>

<template>
  <VueFlow
    v-model="elements"
    class="basicflow"
    :default-edge-options="{ type: 'smoothstep' }"
    :default-zoom="1.5"
    :min-zoom="0.2"
    :max-zoom="4"
    :fit-view-on-init="true"
  >
    <Background pattern-color="#aaa" gap="8" />
    <MiniMap />
    <Controls />
  </VueFlow>
</template>
