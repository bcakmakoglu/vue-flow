<script lang="ts" setup>
import Handle from '../Handle/Handle.vue'
import { Position } from '../../types'
import type { NodeProps } from '../../types/node'

const props = withDefaults(defineProps<NodeProps>(), {
  data: () => {},
  connectable: false,
  targetPosition: 'top' as Position,
})
</script>
<script lang="ts">
export default {
  name: 'OutputNode',
  inheritAttrs: false,
}
</script>
<template>
  <slot v-bind="props">
    <component :is="props.label" v-if="typeof props.label !== 'string'" />
    <span v-else v-html="props.label"></span>
  </slot>
  <Handle
    type="source"
    :position="props.targetPosition"
    :is-connectable="props.connectable"
    :is-valid-connection="props.isValidTargetPos"
  />
</template>
