<script lang="ts" setup>
import type { NodeProps, ValidConnectionFunc } from '../../packages/vue-flow'
import { Handle, Position } from '../../packages/vue-flow'

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
