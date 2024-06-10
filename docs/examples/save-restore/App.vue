<script setup>
import { ref } from 'vue'
import { VueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import SaveRestoreControls from './Controls.vue'

const nodes = ref([{ id: '1', data: { label: 'Node 1' }, position: { x: 100, y: 100 } }])

const edges = ref([])
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges">
    <SaveRestoreControls />

    <Background />
  </VueFlow>
</template>
