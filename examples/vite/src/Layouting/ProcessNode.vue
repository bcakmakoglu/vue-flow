<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Handle } from '@vue-flow/core'

const props = defineProps<NodeProps>()

const bgColor = toRef(() => {
  if (props.data.hasError) {
    return '#f87171'
  }

  if (props.data.isFinished) {
    return '#10b981'
  }

  if (props.data.isRunning || props.data.isSkipped) {
    return '#6b7280'
  }

  return '#1a192b'
})
</script>

<template>
  <div class="process-node" :style="{ backgroundColor: bgColor }">
    <Handle type="target" :position="targetPosition" />
    <Handle type="source" :position="sourcePosition" />

    <div style="display: flex; align-items: center; gap: 8px">
      <div v-if="data.isRunning" class="spinner" />
      <span v-else-if="data.hasError">&#x274C;</span>
      <span v-else-if="data.isSkipped">&#x1F6A7;</span>
      <span v-else>&#x1F4E6;</span>
    </div>
  </div>
</template>

<style scoped>
.process-node {
  padding: 10px;
  color: white;
  border: 1px solid #1a192b;
  border-radius: 99px;
  font-size: 10px;
  width: 15px;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  width: 8px;
  height: 8px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
