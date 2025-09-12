<script lang="ts" setup>
import type { Node } from '@vue-flow/core'
import { VueFlow } from '@vue-flow/core'

import { Background } from '@vue-flow/background'
import type { ControlType } from '@vue-flow/controls'
import { Controls } from '@vue-flow/controls'

const nodes = ref<Node[]>([
  { id: '1', type: 'input', label: 'Node 1', position: { x: 250, y: 5 }, class: 'light' },
  { id: '2', label: 'Node 2', position: { x: 100, y: 100 }, class: 'light' },
  { id: '3', label: 'Node 3', position: { x: 400, y: 100 }, class: 'light' },
  { id: '4', label: 'Node 4', position: { x: 400, y: 200 }, class: 'light' },
])

const tooltips: Record<ControlType, string> = {
  'zoom-in': 'Zoom In',
  'zoom-out': 'Zoom Out',
  'fit-view': 'Fit View',
  'interactive': 'Lock/Unlock Interaction',
}
</script>

<template>
  <VueFlow :nodes="nodes" fit-view-on-init class="vue-flow-controls-example">
    <Background />
    <Controls>
      <template #control-item="{ control, disabled, onClick, icon }">
        <button class="control" :title="tooltips[control]" :disabled="disabled" @click="onClick">
          <component :is="icon" class="icon" />
        </button>
      </template>

      <template #control-interactive="{ interactive, toggleInteractive }">
        <button class="control" :title="interactive ? 'Lock' : 'Unock'" @click="toggleInteractive">
          {{ interactive ? '🔓' : '🔒' }}
        </button>
      </template>
    </Controls>
  </VueFlow>
</template>

<style scoped>
.control {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: #fafafa;
  cursor: pointer;
}

.control:not(:disabled):hover {
  background: #eee;
}

.control:disabled {
  cursor: not-allowed;
  color: #ccc;
}

.icon {
  fill: currentColor;
  width: 16px;
  height: 16px;
}
</style>
