<script setup>
import { Handle, Position, useVueFlow } from '@vue-flow/core'

const props = defineProps(['id', 'data'])

const { updateNodeData } = useVueFlow()

function onChange(event) {
  const value = Number.parseFloat(event.target.value)

  if (!Number.isNaN(value)) {
    updateNodeData(props.id, { value })
  }
}
</script>

<template>
  <label :for="`${id}-input`"> </label>
  <input :id="`${id}-input`" :value="data.value" type="number" class="nodrag" @change="onChange" />

  <Handle type="source" :position="Position.Right" :connectable="false" />
</template>
