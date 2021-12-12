<script lang="ts" setup>
import Handle from '../Handle/Handle.vue'
import { Position } from '../../types'
import type { NodeProps } from '../../types/node'

const props = withDefaults(defineProps<NodeProps>(), {
  data: () => {},
  connectable: false,
  sourcePosition: 'bottom' as Position,
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
    <component :is="props.label" v-if="typeof props.label !== 'string'" />
    <span v-else v-html="props.label"></span>
  </slot>
  <Handle
    type="source"
    :position="props.sourcePosition"
    :connectable="props.connectable"
    :is-valid-connection="props.isValidSourcePos"
  />
</template>
