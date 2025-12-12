<script setup>
import { ref } from 'vue'
import { Background, VueFlow } from '@vue-flow/core'
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
