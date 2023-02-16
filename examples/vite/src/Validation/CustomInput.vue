<script lang="ts" setup>
import type { ValidConnectionFunc } from '@vue-flow/core'
import { Handle, Position } from '@vue-flow/core'

interface CustomInputProps {
  isValidTargetPos: ValidConnectionFunc
}
const props = defineProps<CustomInputProps>()
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div>Only connectable with B</div>
  <Handle type="source" :position="Position.Right" :is-valid-connection="props.isValidTargetPos" />
</template>
