<script lang="ts" setup>
import Handle from '../Handle/Handle.vue'
import { NodeProps, Position, ValidConnectionFunc } from '../../types'

interface OutputNodeProps extends NodeProps {
  data?: NodeProps['data']
  connectable?: NodeProps['connectable']
  targetPosition?: NodeProps['targetPosition']
  isValidTargetPos?: ValidConnectionFunc
}

const props = withDefaults(defineProps<OutputNodeProps>(), {
  data: () => {},
  connectable: false,
  targetPosition: Position.Top,
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
    <component :is="props.data?.label" v-if="typeof props.data?.label !== 'string'" />
    <span v-else v-html="props.data?.label"></span>
  </slot>
  <Handle
    type="source"
    :position="props.targetPosition"
    :is-connectable="props.connectable"
    :is-valid-connection="props.isValidTargetPos"
  />
</template>
