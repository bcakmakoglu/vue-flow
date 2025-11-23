<script setup>
import { computed } from 'vue'
import { Handle, Position, useNodeConnections, useNodesData } from '@vue-flow/core'

defineProps(['id'])

const mathFunctions = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
}

// Get the source connections of the result node. In this example it's only one operator node.
const sourceConnections = useNodeConnections({
  // type target means all connections where *this* node is the target
  // that means we go backwards in the graph to find the source of the connection(s)
  handleType: 'target',
})

// Get the source connections of the operator node
const operatorSourceConnections = useNodeConnections({
  handleType: 'target',
  nodeId: () => sourceConnections.value[0]?.source,
})

const operatorData = useNodesData(() => sourceConnections.value.map((connection) => connection.source))

const valueData = useNodesData(() => operatorSourceConnections.value.map((connection) => connection.source))

const result = computed(() => {
  const currResult = operatorData.value.reduce((acc, { data }) => {
    const operator = data?.operator

    if (operator) {
      const [a, b] = valueData.value.map(({ data }) => data?.value)

      if (a && b) {
        return mathFunctions[operator](a, b)
      }
    }

    return acc
  }, 0)

  // Round to 2 decimal places
  return Math.round(currResult * 100) / 100
})
</script>

<template>
  <div class="calculation">
    <template v-for="(value, i) in valueData" :key="`${value.id}-${value.data}`">
      <span>
        {{ value.data?.value }}
      </span>

      <span v-if="i !== valueData.length - 1">
        {{ operatorData[0].data?.operator }}
      </span>
    </template>
  </div>

  <span> = </span>

  <span class="result" :style="{ color: result > 0 ? '#5EC697' : '#f15a16' }">
    {{ result }}
  </span>

  <Handle
    type="target"
    :position="Position.Left"
    :connectable="false"
    :style="{ background: result > 0 ? '#5EC697' : '#f15a16' }"
  />
</template>
