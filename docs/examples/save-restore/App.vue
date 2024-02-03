<script lang="ts" setup>
import { ref } from 'vue'
import { VueFlow } from '@vue-flow/core'
import SaveRestoreControls from './Controls.vue'

const nodes = ref([{ id: '1', label: 'Node 1', position: { x: 100, y: 100 } }])
</script>

<template>
  <VueFlow :nodes="nodes">
    <SaveRestoreControls />
  </VueFlow>
</template>
