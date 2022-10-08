<script lang="ts" setup>
import type { NodeProps, ValidConnectionFunc } from '@vue-flow/core'
import { Handle, Position } from '@vue-flow/core'

interface CustomNodeProps extends NodeProps {
  id: string
  isValidSourcePos: ValidConnectionFunc
}

const props = defineProps<CustomNodeProps>()
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <Handle type="target" :position="Position.Left" :is-valid-connection="props.isValidSourcePos" />
  <div>{{ props.id }}</div>
</template>
