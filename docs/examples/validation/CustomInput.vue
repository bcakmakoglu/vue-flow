<script setup>
import { Handle, Position } from '@vue-flow/core'

const props = defineProps({
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
  <div>Only connectable with {{ data.validTarget }}</div>
  <Handle type="source" :position="Position.Right" :is-valid-connection="isValidConnection" />
</template>
