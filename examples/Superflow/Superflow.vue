<script lang="ts" setup>
import { ref } from 'vue'
import Flowy from '~/container/Flow.vue'
import { Elements } from '~/types'

const elements = ref<Elements>([
  { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
  { id: '3', data: { label: 'Node 3' }, position: { x: 400, y: 100 } },
  { id: '4', data: { label: 'Node 4' }, position: { x: 400, y: 200 } },
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
] as Elements)
</script>

<template>
  <Flowy :elements="elements">
    <div>Foobar!</div>
  </Flowy>
</template>
