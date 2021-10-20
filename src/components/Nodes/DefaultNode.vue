<script lang="ts" setup>
import Handle from '~/components/Handle/Handle.vue'
import { NodeProps, Position } from '~/types'

interface DefaultNodeProps {
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
  <template v-else>
    {{ props.data?.label }}
  </template>
  <Handle type="source" :position="props.sourcePosition" :is-connectable="props.connectable" />
</template>
