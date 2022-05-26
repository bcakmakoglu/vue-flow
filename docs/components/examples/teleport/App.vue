<script setup>
import { VueFlow, useVueFlow } from '@braks/vue-flow'
import { ref } from 'vue'
import Sidebar from './Sidebar.vue'
import TeleportableNode from './TeleportableNode.vue'

const elements = ref([
  {
    id: '1',
    label: 'Click to teleport',
    type: 'teleportable',
    position: { x: 125, y: 0 },
    data: {},
  },
  {
    id: '2',
    label: 'Click to teleport',
    type: 'teleportable',
    position: { x: 250, y: 100 },
    data: {},
  },
  {
    id: '3',
    label: 'Click to teleport',
    type: 'teleportable',
    position: { x: 0, y: 100 },
    data: {},
  },
  {
    id: 'e1-2',
    source: '1',
    target: '2',
  },
])
</script>

<template>
  <div class="teleportflow">
    <VueFlow v-model="elements" :fit-view-on-init="true">
      <template #node-teleportable="props">
        <TeleportableNode :id="props.id" />
      </template>
    </VueFlow>
    <Sidebar />
  </div>
</template>
