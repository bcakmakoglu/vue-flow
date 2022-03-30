<script lang="ts" setup>
import { Handle, NodeProps, Position } from '@braks/vue-flow'
interface RBGOutputNodeProps extends NodeProps {
  rgb: string
}
const props = defineProps<RBGOutputNodeProps>()
const emit = defineEmits(['next'])
const next = () => emit('next')
</script>
<template>
  <div :style="{ backgroundColor: props.rgb }" class="rgb-output-node" @click="next">
    <div class="text-md uppercase">{{ props.rgb }}</div>
    Click me to continue.
    <Handle type="target" :position="Position.Left" />
  </div>
</template>
<style>
.rgb-output-node {
  padding: 9px;
  border-radius: 25px;
  text-align: left;
  color: white;
}
</style>
