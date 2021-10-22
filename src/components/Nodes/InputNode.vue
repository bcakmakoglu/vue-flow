<script lang="ts" setup>
import Handle from '../Handle/Handle.vue'
import { NodeProps, Position } from '../../types'

interface InputNodeProps extends NodeProps {
  data?: NodeProps['data']
  connectable?: NodeProps['connectable']
  sourcePosition?: NodeProps['sourcePosition']
}

const props = withDefaults(defineProps<InputNodeProps>(), {
  data: () => {},
  connectable: false,
  sourcePosition: Position.Bottom,
})
</script>
<template>
  <component :is="props.data?.label" v-if="typeof props.data?.label !== 'string'" />
  <span v-else v-html="props.data?.label"></span>
  <Handle type="source" :position="props.sourcePosition" :connectable="props.connectable" />
</template>
