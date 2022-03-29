<script lang="ts" setup>
import Handle from '../Handle/Handle.vue'
import { Position } from '../../types'
import type { NodeProps } from '../../types/node'

const props = withDefaults(defineProps<NodeProps>(), {
  data: () => {},
  connectable: false,
  sourcePosition: 'bottom' as Position,
  targetPosition: 'top' as Position,
})
</script>
<script lang="ts">
export default {
  name: 'DefaultNode',
}
</script>
<template>
  <Handle
    type="target"
    :position="props.targetPosition"
    :is-connectable="props.connectable"
    :is-valid-connection="props.isValidTargetPos"
  />
  <component :is="props.label.component" v-bind="props.label.props" v-if="typeof props.label !== 'string' && props.label" />
  <span v-else v-html="props.label" />
  <Handle
    type="source"
    :position="props.sourcePosition"
    :is-connectable="props.connectable"
    :is-valid-connection="props.isValidSourcePos"
  />
</template>
