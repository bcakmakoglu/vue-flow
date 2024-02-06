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

  if (props.data.isCancelled) {
    return '#fbbf24'
  }

  return '#4b5563'
})
</script>

<template>
  <div class="process-node" :style="{ backgroundColor: bgColor }">
    <Handle type="target" :position="targetPosition" />
    <Handle type="source" :position="sourcePosition" />

    <div v-if="data.isRunning" class="spinner" />
    <span v-else-if="data.hasError">&#x274C;</span>
    <span v-else-if="data.isSkipped">&#x1F6A7;</span>
    <span v-else-if="data.isFinished"> &#x1F60E;</span>
    <span v-else-if="data.isCancelled"> &#x1F6AB;</span>
    <span v-else> &#x1F4E6;</span>
  </div>
</template>

<style scoped>
.process-node {
  padding: 10px;
  color: white;
  border: 1px solid #4b5563;
  border-radius: 99px;
  font-size: 12px;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #10b981;
  border-radius: 50%;
  width: 10px;
  height: 10px;
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
