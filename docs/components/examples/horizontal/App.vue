<script setup>
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import { ref } from 'vue'
import { initialElements } from './initial-elements.js'

const { onConnect, addEdges } = useVueFlow()

const elements = ref(initialElements)

onConnect((params) => addEdges(params))
</script>

<template>
  <VueFlow
    v-model="elements"
    class="basicflow"
    :default-edge-options="{ type: 'smoothstep' }"
    :default-viewport="{ zoom: 1.5 }"
    :min-zoom="0.2"
    :max-zoom="4"
    fit-view-on-init
  >
    <Background pattern-color="#aaa" gap="8" />

    <MiniMap />

    <Controls />
  </VueFlow>
</template>
