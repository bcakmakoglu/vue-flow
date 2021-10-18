<script lang="ts" setup>
import Handle from '~/components/Handle/Handle.vue'
import { NodeProps, Position } from '~/types'

interface InputNodeProps {
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
  <div class="revue-flow__node-input">
    {{ props.data?.label }}
    <Handle type="source" :position="props.sourcePosition" :connectable="props.connectable" />
  </div>
</template>
