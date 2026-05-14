<script lang="ts" setup>
import type { Node, NodeProps, ValidConnectionFunc } from '@vue-flow/core'
import { Handle, Position } from '@vue-flow/core'

type ValidationNode = Node<{ isValidSourcePos: ValidConnectionFunc }, 'customnode'>

const props = defineProps<NodeProps<ValidationNode>>()
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <Handle type="target" :position="Position.Left" :is-valid-connection="props.data.isValidSourcePos" />
  <div>{{ props.id }}</div>
</template>
