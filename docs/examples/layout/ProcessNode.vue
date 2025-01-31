<script setup>
import { computed, toRef } from 'vue'
import { Handle, useNodeConnections } from '@vue-flow/core'
import { ProcessStatus } from './useRunProcess'

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

const sourceConnections = useNodeConnections({
  handleType: 'target',
})

const targetConnections = useNodeConnections({
  handleType: 'source',
})

const isStartNode = toRef(() => sourceConnections.value.length <= 0)

const isEndNode = toRef(() => targetConnections.value.length <= 0)

const status = toRef(() => props.data.status)

const bgColor = computed(() => {
  if (isStartNode.value) {
    return '#2563eb'
  }

  switch (status.value) {
    case ProcessStatus.ERROR:
      return '#f87171'
    case ProcessStatus.FINISHED:
      return '#42B983'
    case ProcessStatus.CANCELLED:
      return '#fbbf24'
    default:
      return '#4b5563'
  }
})

const processLabel = computed(() => {
  if (isStartNode.value) {
    return '📦'
  }

  switch (status.value) {
    case ProcessStatus.ERROR:
      return '❌'
    case ProcessStatus.SKIPPED:
      return '🚧'
    case ProcessStatus.CANCELLED:
      return '🚫'
    case ProcessStatus.FINISHED:
      return '😎'
    default:
      return '🏠'
  }
})
</script>

<template>
  <div
    class="process-node"
    :style="{ backgroundColor: bgColor, boxShadow: status === ProcessStatus.RUNNING ? '0 0 10px rgba(0, 0, 0, 0.5)' : '' }"
  >
    <Handle v-if="!isStartNode" type="target" :position="targetPosition">
      <span v-if="status === null">📥 </span>
    </Handle>

    <Handle v-if="!isEndNode" type="source" :position="sourcePosition" />

    <div v-if="status === ProcessStatus.RUNNING" class="spinner" />
    <span v-else>
      {{ processLabel }}
    </span>
  </div>
</template>

<style scoped>
.process-node {
  padding: 10px;
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
</style>
