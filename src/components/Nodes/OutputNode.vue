<script lang="ts" setup>
import Handle from '../Handle/Handle.vue'
import { NodeProps, Position } from '../../types'

interface OutputNodeProps extends NodeProps {
  data?: NodeProps['data']
  connectable?: NodeProps['connectable']
  targetPosition?: NodeProps['targetPosition']
}

const props = withDefaults(defineProps<OutputNodeProps>(), {
  data: () => {},
  connectable: false,
  targetPosition: Position.Top,
})
</script>
<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>
<template>
  <component :is="props.data?.label" v-if="typeof props.data?.label !== 'string'" />
  <span v-else v-html="props.data?.label"></span>
  <Handle type="source" :position="props.targetPosition" :is-connectable="props.connectable" />
</template>
