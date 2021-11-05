<script lang="ts" setup>
import { NodeProps } from '@braks/vue-flow'

interface NodeBPro extends NodeProps {
  nodeStyles: Record<string, any>
}
const props = defineProps<NodeBPro>()
</script>
<template>
  <div :style="props.nodeStyles">B</div>
</template>
