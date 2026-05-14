<script setup>
import { Handle, NodeToolbar, Position, useVueFlow } from '@vue-flow/core'

const props = defineProps(['id', 'data'])

const actions = ['👎', '✋', '👍']

const { updateNodeData } = useVueFlow()
</script>

<template>
  <NodeToolbar :is-visible="data.toolbarVisible" :position="data.toolbarPosition">
    <button
      v-for="action of actions"
      :key="action"
      type="button"
      :class="{ selected: action === data.action }"
      @click="updateNodeData(props.id, { action })"
    >
      {{ action }}
    </button>
  </NodeToolbar>

  <div>
    {{ data.label }}
  </div>

  <Handle type="target" :position="Position.Left" />
  <Handle type="source" :position="Position.Right" />
</template>
