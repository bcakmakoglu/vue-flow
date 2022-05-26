<script lang="ts" setup>
import { VueFlow } from '@braks/vue-flow'
import { ref } from 'vue'
import Controls from './Controls.vue'

const elements = ref([
  { id: '1', label: 'Node 1', position: { x: 100, y: 100 } },
  { id: '2', label: 'Node 2', position: { x: 100, y: 200 } },
  { id: 'e1-2', source: '1', target: '2' },
])
</script>

<template>
  <VueFlow v-model="elements">
    <Controls />
  </VueFlow>
</template>
