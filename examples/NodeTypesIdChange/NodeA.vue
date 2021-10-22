<script lang="ts" setup>
import { NodeProps } from '~/index'

interface NodeAProps extends NodeProps {
  nodeStyles: Record<string, any>
}
const props = defineProps<NodeAProps>()
</script>
<template>
  <div :style="props.nodeStyles">A</div>
</template>
