<script setup>
import { Handle, Position } from '@vue-flow/core'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
})

function isValidConnection(connection) {
  return connection.target === props.data.validTarget && connection.source === props.data.validSource
}
</script>

<script>
export default {
  inheritAttrs: false,
}
</script>

<template>
  <Handle type="target" :position="Position.Left" :is-valid-connection="isValidConnection" />
  <div>{{ props.id }}</div>
</template>
