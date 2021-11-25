<script lang="ts" setup>
import Handle from '../Handle/Handle.vue'
import { NodeProps, Position, ValidConnectionFunc } from '../../types'

interface InputNodeProps extends NodeProps {
  data?: NodeProps['data']
  connectable?: NodeProps['connectable']
  sourcePosition?: NodeProps['sourcePosition']
  isValidSourcePos?: ValidConnectionFunc
}

const props = withDefaults(defineProps<InputNodeProps>(), {
  data: () => {},
  connectable: false,
  sourcePosition: Position.Bottom,
})
</script>
<script lang="ts">
export default {
  name: 'InputNode',
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
    :position="props.sourcePosition"
    :connectable="props.connectable"
    :is-valid-connection="props.isValidSourcePos"
  />
</template>
