<script lang="ts" setup>
import Handle from '~/components/Handle/Handle.vue'
import { NodeProps, Position } from '~/types'

interface DefaultNodeProps extends NodeProps {
  data?: NodeProps['data']
  connectable?: NodeProps['connectable']
  targetPosition?: NodeProps['targetPosition']
  sourcePosition?: NodeProps['sourcePosition']
}

const props = withDefaults(defineProps<DefaultNodeProps>(), {
  data: () => {},
  connectable: false,
  targetPosition: Position.Top,
  sourcePosition: Position.Bottom,
})
</script>
<template>
  <Handle type="target" :position="props.targetPosition" :is-connectable="props.connectable" />
  <component :is="props.data?.label" v-if="typeof props.data?.label !== 'string'" />
  <span v-else v-html="props.data?.label"></span>
  <Handle type="source" :position="props.sourcePosition" :is-connectable="props.connectable" />
</template>
