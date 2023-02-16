<script setup>
import { VueFlow } from '@vue-flow/core'
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
    position: { x: 350, y: 200 },
    data: {},
  },
  {
    id: '3',
    label: 'Click to teleport',
    type: 'teleportable',
    position: { x: 0, y: 200 },
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
    <VueFlow v-model="elements" fit-view-on-init>
      <template #node-teleportable="{ id }">
        <TeleportableNode :id="id" />
      </template>
    </VueFlow>

    <Sidebar />
  </div>
</template>
