<script lang="ts" setup>
import Handle from '../Handle/Handle.vue'
import { NodeProps, Position, ValidConnectionFunc } from '../../types'

interface DefaultNodeProps extends NodeProps {
  data?: NodeProps['data']
  connectable?: NodeProps['connectable']
  targetPosition?: NodeProps['targetPosition']
  sourcePosition?: NodeProps['sourcePosition']
  isValidTargetPos?: ValidConnectionFunc
  isValidSourcePos?: ValidConnectionFunc
}

const props = withDefaults(defineProps<DefaultNodeProps>(), {
  data: () => {},
  connectable: false,
  targetPosition: Position.Top,
  sourcePosition: Position.Bottom,
})
</script>
<script lang="ts">
export default {
  name: 'DefaultNode',
  inheritAttrs: false,
}
</script>
<template>
  <Handle
    type="target"
    :position="props.targetPosition"
    :is-connectable="props.connectable"
    :is-valid-connection="props.isValidTargetPos"
  />
  <slot v-bind="props">
    <component :is="props.data?.label" v-if="typeof props.data?.label !== 'string'" />
    <span v-else v-html="props.data?.label"></span>
  </slot>
  <Handle
    type="source"
    :position="props.sourcePosition"
    :is-connectable="props.connectable"
    :is-valid-connection="props.isValidSourcePos"
  />
</template>
