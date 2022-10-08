<script setup>
import { Handle, Position } from '@vue-flow/core'

const props = defineProps({
  isValidTargetPos: {
    type: Function,
    required: false,
  },
})
</script>

<script>
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div>Only connectable with B</div>
  <Handle type="source" :position="Position.Right" :is-valid-connection="props.isValidTargetPos" />
</template>
