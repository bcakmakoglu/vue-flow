<script lang="ts" setup>
import type { Node, NodeProps, ValidConnectionFunc } from '@vue-flow/core'
import { Handle, Position } from '@vue-flow/core'

type ValidationInputNode = Node<{ isValidTargetPos: ValidConnectionFunc }, 'custominput'>

const props = defineProps<NodeProps<ValidationInputNode>>()
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div>Only connectable with B</div>
  <Handle type="source" :position="Position.Right" :is-valid-connection="props.data.isValidTargetPos" />
</template>
