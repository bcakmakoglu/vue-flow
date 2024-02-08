<script setup>
import { toRef } from 'vue'
import { Handle, useHandleConnections } from '@vue-flow/core'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  sourcePosition: {
    type: String,
  },
  targetPosition: {
    type: String,
  },
})

const sourceConnections = useHandleConnections({
  type: 'target',
})

const targetConnections = useHandleConnections({
  type: 'source',
})

const isSender = toRef(() => sourceConnections.value.length <= 0)

const isReceiver = toRef(() => targetConnections.value.length <= 0)

const bgColor = toRef(() => {
  if (isSender.value) {
    return '#4b5563'
  }

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

const processLabel = toRef(() => {
  if (props.data.hasError) {
    return '❌'
  }

  if (props.data.isSkipped) {
    return '🚧'
  }

  if (props.data.isCancelled) {
    return '🚫'
  }

  if (isSender.value) {
    return '📦'
  }

  if (props.data.isFinished) {
    return '😎'
  }

  return '🏠'
})
</script>

<template>
  <div class="process-node" :style="{ backgroundColor: bgColor }">
    <Handle v-if="!isSender" type="target" :position="targetPosition" />
    <Handle v-if="!isReceiver" type="source" :position="sourcePosition" />

    <div v-if="!isSender && data.isRunning" class="spinner" />
    <span v-else>
      {{ processLabel }}
    </span>
  </div>
</template>

<style scoped>
.process-node {
  padding: 10px;
  color: white;
  border-radius: 99px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.process-node .vue-flow__handle {
  border: none;
  height: unset;
  width: unset;
  background: transparent;
  font-size: 12px;
}

.spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #2563eb;
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
