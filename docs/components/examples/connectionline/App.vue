<script setup>
import { Background, BackgroundVariant, Controls, MiniMap } from '@vue-flow/additional-components'
import { VueFlow } from '@vue-flow/core'
import { ref } from 'vue'
import CustomConnectionLine from './CustomConnectionLine.vue'

const elements = ref([
  {
    id: '1',
    type: 'input',
    label: 'Node 1',
    position: { x: 250, y: 5 },
  },
])
</script>

<template>
  <VueFlow v-model="elements">
    <template #connection-line="props">
      <CustomConnectionLine v-bind="props" />
    </template>

    <Background :variant="BackgroundVariant.Lines" />
  </VueFlow>
</template>
